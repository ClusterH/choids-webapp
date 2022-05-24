import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { ethers } from 'ethers'
import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'

import { useReverseENSLookUp } from 'components/Header/hook'
import { CONTRACT_ABIS, DEFAULT_CHAIN_ID } from 'config/constants'
import { notifyToast } from 'config/toast'
import { useActiveWeb3React, useGetMinterContract } from 'hooks'
// import { File, NFTStorage } from 'nft.storage'
import { useArtImgData, useArtMetaData, useArtParamSettings } from 'state/artGenerator/hook'
import { setArtMetaData } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import {
  checkMintPhaseStatus,
  estimateGas,
  getContractWithSimpleProvider,
  getMinterAddress,
  mintNFT,
  shortenAddress,
  weiToFormatEthToBigNumber,
} from 'utils'
import { getSignatureAndNonce } from 'utils/api'
import { storeMetadata } from 'utils/api/metadata'

import { ISignatureRequest, TUseCase } from '../types'
import { b64EncodeUnicode } from '../utils/encodeHelper'

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

export const useGenerateArtMetaData = () => {
  const { account } = useActiveWeb3React()
  const artImgData = useArtImgData()
  const artParams = useArtParamSettings()
  const artMetaData = useArtMetaData()
  const ens = useReverseENSLookUp()

  const creatorName = useMemo(() => (ens ? ens : account ? shortenAddress(account) : ''), [account, ens])
  const dna = useMemo(() => b64EncodeUnicode(artParams), [artParams])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [isMinted, setIsMinted] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const dispatch = useAppDispatch()

  const minterContract = useGetMinterContract(true, false)

  const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY
  const client = useMemo(() => new NFTStorage({ token: NFT_STORAGE_KEY! }), [NFT_STORAGE_KEY])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const handleMetaData = useCallback(async () => {
    setIsLoading(true)
    const cid = await client.storeBlob(new Blob([artImgData]))
    dispatch(setArtMetaData({ dna, image: `ipfs://${cid}` }))

    setIsLoading(false)
  }, [artImgData, client, dispatch, dna])

  const handleMint = useCallback(async () => {
    try {
      if (!minterContract || !account) return

      setIsMinting(true)

      const metaData = {
        ...artMetaData,
        name,
        description: `${name} is an algorithmically generated art piece created by ${ens ?? account}. For this piece, ${
          ens ?? account
        } chose a background color with hex code ${artParams.backgroundColor} and a pen color with hex code ${
          artParams.canvasColor
        }. A true visionary, ${ens ?? account} utilized ${artParams.radii.length} Rotors to generate the masterpiece before you.`,
        attributes: [
          {
            trait_type: 'Creator',
            value: ens ?? account,
          },
          {
            display_type: 'date',
            trait_type: 'Created on',
            value: Math.floor(new Date().getTime() / 1000),
          },
          {
            trait_type: 'Edition',
            value: 'First Generation',
          },
        ],
        useCase: '#1' as TUseCase,
      }

      const { result } = await storeMetadata(metaData)

      if (result) {
        const creation = { price: result.price, cid: result.cid }
        const body: ISignatureRequest = { ...creation, address: account, amount: '1' }

        const res = await getSignatureAndNonce(body)
        if (res) {
          const gas = await estimateGas(
            minterContract,
            'mint',
            [account, creation, res.result.nonce, res.result.signature, { value: creation.price }],
            3000
          )
          const status = await mintNFT(minterContract, account, creation, res.result.nonce, res.result.signature, creation.price, gas)
          if (status) {
            notifyToast({ id: 'mint', type: 'success', content: 'Successfully Mint Process done' })
            setIsMinted(true)
          } else notifyToast({ id: 'mint_failed', type: 'error', content: 'Mint Failed!' })
        } else notifyToast({ id: 'signature_nonce', type: 'error', content: 'Failed to get Signature' })
      } else notifyToast({ id: 'store_metadata', type: 'error', content: 'Failed to store Metadata' })
    } catch (error: any) {
      console.log(error)
      notifyToast({ id: 'mint_failed', type: 'error', content: 'Error Occured, please check console' })
    } finally {
      setIsMinting(false)
    }
  }, [account, artMetaData, artParams, ens, minterContract, name])

  useEffect(() => {
    handleMetaData()
  }, [handleMetaData])

  return { name, artMetaData, artImgData, creatorName, isLoading, isMinting, isMinted, handleOnChange, handleMint }
}
