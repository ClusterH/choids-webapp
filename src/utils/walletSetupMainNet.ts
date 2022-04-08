export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = 1
    try {
      await provider.request!({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }], // chainId: 1 for Ethereum Mainnet
      })
      return true
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await provider.request!({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: 'Ethereum Mainnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                blockExplorerUrls: [`https://etherscan.io`],
              },
            ],
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
          return false
        }
      }
    }
  } else {
    console.error("Can't setup the Polygon network on metamask because window.ethereum is undefined")
    return false
  }
}
