import { utils } from 'ethers'

export const convertHexToNumber = (hexString: string) => {
  const length = utils.hexDataLength(hexString)
  const sufix = utils.hexDataSlice(hexString, length / 2 - 1)
  const id = parseInt(sufix)

  return id
}
