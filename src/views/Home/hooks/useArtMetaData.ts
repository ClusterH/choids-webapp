import { useCallback, useEffect, useState } from 'react'

import { Contract } from 'ethcall'

import { CONTRACT_ABIS, DEFAULT_CHAIN_ID } from 'config/constants'
import { useActiveWeb3React, useTotalSupply } from 'hooks'
import { setMetaDataList, setTokenURIs } from 'state/choid/reducer'
import { useAppDispatch } from 'state/hooks'
import { getMintableAddress, getMultiCall } from 'utils'
import { convertIPFSToWebURL } from 'utils/ipfsHelper'
import { IMetaData } from 'views/ArtGenerator/types'

export const useGetArtMetaData = () => {
  const { chainId } = useActiveWeb3React()
  const { choidTotalSupply } = useTotalSupply()

  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGetArtMetaData = useCallback(async () => {
    try {
      setIsLoading(true)
      const choidContract = new Contract(getMintableAddress(chainId ?? DEFAULT_CHAIN_ID), CONTRACT_ABIS.MINTABLE)
      if (!choidContract) return

      const tokenIds = Array.from({ length: choidTotalSupply }, (_, i) => choidTotalSupply - i).slice(
        0,
        choidTotalSupply <= 5 ? choidTotalSupply : 5
      )

      const _calls = tokenIds.map((id) => {
        return choidContract.tokenURI(id)
      })
      const tokenURIs = (await getMultiCall(_calls, chainId ?? DEFAULT_CHAIN_ID)) as string[]

      const metaDataList = await Promise.all(
        tokenURIs.map(async (uri) => {
          return (await (await fetch(convertIPFSToWebURL(uri))).json()) as IMetaData
        })
      )

      dispatch(setMetaDataList(metaDataList))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [chainId, choidTotalSupply, dispatch])

  return { handleGetArtMetaData, isLoading }
}
