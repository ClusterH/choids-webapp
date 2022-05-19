import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

// import { File, NFTStorage } from 'nft.storage'
import { File, NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'

import { useReverseENSLookUp } from 'components/Header/hook'
import { CONTRACT_ABIS, DEFAULT_CHAIN_ID } from 'config/constants'
import { notifyToast } from 'config/toast'
import { useActiveWeb3React, useGetMinterContract } from 'hooks'
import { useArtImgData, useArtMetaData, useArtParamSettings } from 'state/artGenerator/hook'
import { setArtMetaData } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import {
  checkMintPhaseStatus,
  estimateGas,
  getContractWithSimpleProvider,
  getMinterAddress,
  getMintPrice,
  mintNFT,
  shortenAddress,
} from 'utils'
import { getSignatureAndNonce } from 'utils/api'

import { b64EncodeUnicode } from '../utils/encodeHelper'

export const useMintPhaseStatus = () => {
  const { account, chainId } = useActiveWeb3React()

  const [mintPhase, setMintPhase] = useState<0 | 1>(0)

  const handleCheckMintPhaseStatus = useCallback(async () => {
    const minterContract = getContractWithSimpleProvider(
      getMinterAddress(chainId && account ? chainId : parseInt(DEFAULT_CHAIN_ID!)),
      CONTRACT_ABIS.MINTER,
      chainId && account ? chainId : parseInt(DEFAULT_CHAIN_ID!)
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

  const dna = useMemo(() => b64EncodeUnicode(artParams), [artParams])
  console.log(dna)
  const creatorName = useMemo(() => (ens ? ens : account ? shortenAddress(account) : ''), [account, ens])

  const [isLoading, setIsLoading] = useState<boolean>(false)
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

    console.log(cid)

    setIsLoading(false)
  }, [artImgData, client, dispatch, dna])

  const handleMint = useCallback(async () => {
    try {
      if (!minterContract || !account) return

      setIsLoading(true)

      const metaData = {
        ...artMetaData,
        name,
        dna,
        attributes: [
          {
            trait_type: 'Creator',
            value: ens ?? account,
          },
          {
            display_type: 'date',
            trait_type: 'Birth Date',
            value: Math.floor(new Date().getTime() / 1000),
          },
          {
            trait_type: 'Edition',
            value: 'First Generation',
          },
        ],
      }

      console.log(metaData)

      const cid = await client.storeBlob(new Blob([JSON.stringify(metaData)]))

      const res = await getSignatureAndNonce(account, cid)
      if (res) {
        const mintPrice = await getMintPrice(minterContract)
        const gas = await estimateGas(minterContract, 'mint', [account, cid, res.nonce, res.signature, { value: mintPrice }], 3000)
        const status = await mintNFT(minterContract, account, cid, res.nonce, res.signature, mintPrice, gas)
        if (status) notifyToast({ id: 'mint', type: 'success', content: 'Successfully Mint Process done' })
        else notifyToast({ id: 'mint_failed', type: 'error', content: 'Mint Failed!' })
      } else notifyToast({ id: 'signature_nonce', type: 'error', content: 'Failed to get Signature' })

      setIsLoading(false)
    } catch (error: any) {
      console.log(error)
      notifyToast({ id: 'mint_failed', type: 'error', content: 'Error Occured, please check console' })
      setIsLoading(false)
    }
  }, [account, artMetaData, client, creatorName, dna, minterContract, name])

  useEffect(() => {
    handleMetaData()
  }, [handleMetaData])

  return { name, artMetaData, artImgData, creatorName, isLoading, handleOnChange, handleMint }
}