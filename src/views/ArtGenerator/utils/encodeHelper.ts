import CryptoJS from 'crypto-js'
import { ethers } from 'ethers'

// export const b64EncodeUnicode = (data: any) => {
//   const secret = 'choid_secret_key'
//   return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString()
// }

// export const b64DecodeUnicode = (data: string) => {
//   const secret = 'choid_secret_key'
//   return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, secret)))
// }

export const b64EncodeUnicode = (data: any) => {
  const str = JSON.stringify(data)
  return window.btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(('0x' + p1) as any)
    })
  )
}

export const b64DecodeUnicode = (str: string) => {
  return decodeURIComponent(
    window
      .atob(str)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}
