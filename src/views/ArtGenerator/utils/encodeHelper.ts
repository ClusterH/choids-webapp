import AES from 'crypto-js/aes'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'
import Utf8 from 'crypto-js/enc-utf8'
import sha256 from 'crypto-js/sha256'

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

export const encrypt = (plaintext: string) => {
  const secret = process.env.REACT_APP_SECRET_KEY
  const key = sha256(secret!).toString(Hex).slice(0, 32)
  const iv = sha256(secret!).toString(Hex).slice(0, 16)
  const output = AES.encrypt(plaintext, Utf8.parse(key), { iv: Utf8.parse(iv) }).toString()
  const result = Utf8.parse(output).toString(Base64)

  return result
}

export const decrypt = (ciphertext: string) => {
  const secret = process.env.REACT_APP_SECRET_KEY
  const key = sha256(secret!).toString(Hex).slice(0, 32)
  const iv = sha256(secret!).toString(Hex).slice(0, 16)
  const result = AES.decrypt(Base64.parse(ciphertext).toString(Utf8), Utf8.parse(key), { iv: Utf8.parse(iv) }).toString(Utf8)

  return result
}

export const shortString = (str: string, chars = 10) => {
  const length = str.length
  return `${str.substring(0, chars)}...${str.substring(length - chars)}`
}
