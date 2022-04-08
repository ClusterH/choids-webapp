export interface IWalletModalItem {
  name: string
  iconUrl: string
  isClickable?: boolean
  handleClick?: () => void
  href?: string
  isActive?: boolean
}
