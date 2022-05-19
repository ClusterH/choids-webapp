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

export const shortString = (str: string, chars = 10) => {
  const length = str.length
  return `${str.substring(0, chars)}...${str.substring(length - chars)}`
}
