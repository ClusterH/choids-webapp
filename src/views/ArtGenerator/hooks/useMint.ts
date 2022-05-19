import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

// import { File, NFTStorage } from 'nft.storage'
import { File, NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'

import { useReverseENSLookUp } from 'components/Header/hook'
import { useActiveWeb3React } from 'hooks'
import { useArtImgData, useArtParamSettings } from 'state/artGenerator/hook'
import { setArtMetaData } from 'state/artGenerator/reducer'
import { useAppDispatch } from 'state/hooks'
import { shortenAddress } from 'utils'

import { b64EncodeUnicode } from '../utils/encodeHelper'

export const useGenerateArtMetaData = () => {
  const { account } = useActiveWeb3React()
  const artImgData = useArtImgData()
  const artParams = useArtParamSettings()
  const encoded = b64EncodeUnicode(artParams)
  const ens = useReverseENSLookUp()

  const creatorName = useMemo(() => (ens ? ens : account ? shortenAddress(account) : ''), [account, ens])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const dispatch = useAppDispatch()

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const handleMetaData = useCallback(async () => {
    setIsLoading(true)
    const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY
    const client = new NFTStorage({ token: NFT_STORAGE_KEY! })
    const cid = await client.storeBlob(new Blob([artImgData]))

    dispatch(setArtMetaData({ image: `ipfs://${cid}` }))

    console.log(cid)

    setIsLoading(false)
  }, [artImgData, dispatch])

  useEffect(() => {
    handleMetaData()
  }, [handleMetaData])

  return { artImgData, dns: encoded, creatorName, isLoading, handleOnChange }
}
