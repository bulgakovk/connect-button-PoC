import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, coinbaseWallet, braveWallet } from "@rainbow-me/rainbowkit/wallets";
import { useEffect, useMemo, useState } from 'react';

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

// Mutates its state after 5 seconds adding two wallets.
const useWallets = () => {
  const [wallets, setWallets] = useState([])

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      setWallets([coinbaseWallet, braveWallet])
    }, 5000)
  })

  return wallets
}

function EthereumConfig({ children }: { children: React.ReactNode }) {
  const wallets = useWallets()

  const connectors = useMemo(() => connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        // @ts-ignore
        ...wallets.map(wallet => wallet({ chains })), // 'wallets' is an empty list on the first render.
        metaMaskWallet({ chains })
      ],
    }]
  ), [wallets])

  const wagmiConfig = useMemo(() => createConfig({
    autoConnect: true,
    connectors,
    publicClient
  }), [connectors])

  return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
  );
}

export default EthereumConfig
