import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { formatEther } from '@ethersproject/units'
import keccak256 from 'keccak256'
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'

import { useReverseENSLookUp } from 'components/Header/hook'
import { CONTRACT_ABIS, DEFAULT_CHAIN_ID } from 'config/constants'
import { notifyToast } from 'config/toast'
import { useActiveWeb3React, useGetMinterContract, useGetTotalSupply } from 'hooks'
import { useArtImgData, useArtMetaData, useArtParamSettings } from 'state/artGenerator/hook'
import { setArtMetaData } from 'state/artGenerator/reducer'
import { setPrice } from 'state/choid/reducer'
import { useAppDispatch } from 'state/hooks'
import {
  checkCIDIsUnique,
  checkMintPhaseStatus,
  checkNameIsUnique,
  estimateGas,
  getContractWithSimpleProvider,
  getMinterAddress,
  mintNFT,
  shortenAddress,
} from 'utils'
import { getSignatureAndNonce } from 'utils/api'
import { checkArtNameUniqueness, getDefaultMetadata, storeMetadata } from 'utils/api/metadata'
import { convertHexToNumber } from 'utils/byte32Helper'

import { ISignatureRequest, TUseCase } from '../types'
import { b64EncodeUnicode, encrypt } from '../utils/encodeHelper'

export const useMintPhaseStatus = () => {
  const { account, chainId } = useActiveWeb3React()

  const [mintPhase, setMintPhase] = useState<0 | 1>(0)

  const handleCheckMintPhaseStatus = useCallback(async () => {
    const minterContract = getContractWithSimpleProvider(
      getMinterAddress(chainId && account ? chainId : DEFAULT_CHAIN_ID),
      CONTRACT_ABIS.MINTER,
      chainId && account ? chainId : DEFAULT_CHAIN_ID
    )

    if (!minterContract) return
    try {
      const status = await checkMintPhaseStatus(minterContract)
      setMintPhase(status)
    } catch (error) {
      console.log(error)
    }
  }, [account, chainId])

  useEffect(() => {
    handleCheckMintPhaseStatus()
  }, [handleCheckMintPhaseStatus])

  return { mintPhase }
}

export const useGetDefaltMetadata = () => {
  const dispatch = useAppDispatch()
  const handleGetDefaultMetadata = useCallback(async () => {
    try {
      const { price } = await getDefaultMetadata()
      if (price) dispatch(setPrice(formatEther(price)))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  return { handleGetDefaultMetadata }
}

export const useGenerateArtMetaData = () => {
  const { account } = useActiveWeb3React()
  const artImgData = useArtImgData()
  const artParams = useArtParamSettings()
  const artMetaData = useArtMetaData()
  const ens = useReverseENSLookUp()
  const { handleFetchTotalSupply } = useGetTotalSupply()

  const creatorName = useMemo(() => (ens ? ens : account ? shortenAddress(account) : ''), [account, ens])
  const dna = useMemo(() => b64EncodeUnicode(artParams), [artParams])

  const [isDuplicatedName, setIsDuplicatedName] = useState<boolean>(false)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [isMinted, setIsMinted] = useState<boolean>(false)
  const [txData, setTxData] = useState<{ id: number; txHash: string }>()
  const [name, setName] = useState<string>('')

  const dispatch = useAppDispatch()

  const minterContract = useGetMinterContract(true, false)

  // const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY
  // const client = useMemo(() => new NFTStorage({ token: NFT_STORAGE_KEY! }), [NFT_STORAGE_KEY])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    if (name.length > 30) {
      notifyToast({ id: 'name_error', type: 'error', content: 'Name must be less than 30 characters' })
    }
    setName(e.target.value)
  }, [])

  const handleMint = useCallback(async () => {
    try {
      if (!minterContract || !account) return

      if (name === '') return

      setIsMinting(true)

      const nameHash = keccak256(name).toString('hex')

      const isDuplicatedName = await checkArtNameUniqueness(nameHash)
      const isDuplicatedNameContract = await checkNameIsUnique(minterContract, `0x${nameHash}`)
      if (isDuplicatedName === true || isDuplicatedNameContract === true) {
        notifyToast({ id: 'duplicated_name', type: 'error', content: 'Name is already exist, Please use another one' })
        setIsDuplicatedName(true)
        return
      } else setIsDuplicatedName(false)

      const metadata = { useCase: '#1', name, account: creatorName, dna, base64Image: artImgData }

      const { result } = await storeMetadata(encrypt(JSON.stringify(metadata)))

      if (result) {
        const isDuplicatedCID = await checkCIDIsUnique(minterContract, result.cid)
        if (isDuplicatedCID === true) {
          notifyToast({ id: 'duplicated_cid', type: 'error', content: 'CID is already exist, Please try again' })
          return
        }
        const dnaHash = keccak256(dna).toString('hex')
        const creation = { price: result.price, cid: result.cid, dnaHash: `0x${dnaHash}`, nameHash: `0x${nameHash}` }
        const body: ISignatureRequest = { ...result, address: account, amount: '1' }

        const res = await getSignatureAndNonce(body)
        if (res) {
          const gas = await estimateGas(
            minterContract,
            'mint',
            [account, creation, res.result.nonce, res.result.signature, { value: creation.price }],
            3000
          )
          const { status, logs, transactionHash } = await mintNFT(
            minterContract,
            account,
            creation,
            res.result.nonce,
            res.result.signature,
            creation.price,
            gas
          )
          if (status) {
            notifyToast({ id: 'mint', type: 'success', content: 'Successfully Mint Process done' })
            const mintedTokenId = convertHexToNumber(logs[0].topics[3])
            setTxData({ id: mintedTokenId, txHash: transactionHash })
            setIsMinted(true)
            handleFetchTotalSupply()
          } else notifyToast({ id: 'mint_failed', type: 'error', content: 'Mint Failed!' })
        } else notifyToast({ id: 'signature_nonce', type: 'error', content: 'Failed to get Signature' })
      } else notifyToast({ id: 'store_metadata', type: 'error', content: 'Failed to store Metadata' })
    } catch (error: any) {
      console.log(error)
      notifyToast({ id: 'mint_failed', type: 'error', content: 'Error Occured, please check console' })
    } finally {
      setIsMinting(false)
    }
  }, [account, artImgData, creatorName, dna, handleFetchTotalSupply, minterContract, name])

  // useEffect(() => {
  //   handleMetaData()
  // }, [handleMetaData])

  return { name, dna, artImgData, creatorName, isDuplicatedName, isMinting, isMinted, txData, handleOnChange, handleMint }
}
