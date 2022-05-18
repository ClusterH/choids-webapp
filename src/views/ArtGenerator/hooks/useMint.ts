import { useCallback, useEffect, useState } from 'react'

// import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

import { useActiveWeb3React } from 'hooks'
import { useArtImgData, useArtParamSettings } from 'state/artGenerator/hook'

import { b64EncodeUnicode } from '../utils/encodeHelper'

const initState = {
  name: '',
  dna: '',
  description: 'Description',
  image: `ipfs://`, // this may be an id for Google Storage in the near future
  attributes: [
    {
      trait_type: 'Creator',
      value: '',
    },
    {
      display_type: 'date',
      trait_type: 'Birth Date',
      value: 0, // 1644148800 // this needs to be in epoch to work with OpenSea
    },
    {
      trait_type: 'Edition',
      value: 'First Generation',
    },
  ],
}

export const useArtMetaData = () => {
  const { account } = useActiveWeb3React()
  const artImgData = useArtImgData()
  const artParams = useArtParamSettings()
  const encoded = b64EncodeUnicode(artParams)

  const [metaData, setMetaData] = useState(initState)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleMetaData = useCallback(async () => {
    setIsLoading(true)
    const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY
    const storage = new Web3Storage({ token: NFT_STORAGE_KEY! })
    // const cid = await storage.storeBlob(new Blob([artImgData]))

    setMetaData({
      ...metaData,
      dna: encoded,
      image: `ipfs://${''}`,
      attributes: [
        {
          trait_type: 'Creator',
          value: account!,
        },
        {
          display_type: 'date',
          trait_type: 'Birth Date',
          value: new Date().getUTCSeconds(), // 1644148800 // this needs to be in epoch to work with OpenSea
        },
        {
          trait_type: 'Edition',
          value: 'First Generation',
        },
      ],
    })

    setIsLoading(false)
  }, [account, artImgData, encoded, metaData])

  useEffect(() => {
    handleMetaData()
  }, [handleMetaData])

  return { metaData, artImgData, isLoading }
}
