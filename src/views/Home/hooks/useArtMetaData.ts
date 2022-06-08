import { useCallback, useState } from 'react'

import { setMetaDataList } from 'state/choid/reducer'
import { useAppDispatch } from 'state/hooks'
import { getMetadata } from 'utils/api/metadata'
import { IMetaData } from 'views/ArtGenerator/types'

export const useGetArtMetaData = () => {
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGetArtMetaData = useCallback(async () => {
    try {
      setIsLoading(true)

      const res = await getMetadata(10)

      if (!!res) {
        const metaDataList = ((await getMetadata(10)) as IMetaData[]).filter((metadata) => metadata.minted === true)
        if (metaDataList && metaDataList.length > 0) dispatch(setMetaDataList(metaDataList))
      }
    } catch (error) {
      console.log(error)
    } finally {
      window.setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [dispatch])

  return { handleGetArtMetaData, isLoading }
}
