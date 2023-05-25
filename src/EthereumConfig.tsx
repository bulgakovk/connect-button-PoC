import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect, useMemo, useState } from 'react';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

// Mutates its state after 5 seconds adding two wallets.
const useConnectors = () => {
  const [connectors, setConnectors] = useState([new MetaMaskConnector({ chains })])

  useEffect(() => {
    setTimeout(() => {
      if (connectors.length >= 2) return

      // @ts-ignore
      setConnectors([...connectors, new CoinbaseWalletConnector({
        chains,
        options: { appName: 'wagmi' },
      })])
    }, 5000)
  })

  return connectors
}

function EthereumConfig({ children }: { children: React.ReactNode }) {
  const connectors = useConnectors()

  const wagmiConfig = useMemo(() => createConfig({
    autoConnect: true,
    connectors,
    publicClient
  }), [connectors])

  return (
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
  );
}

export default EthereumConfig
