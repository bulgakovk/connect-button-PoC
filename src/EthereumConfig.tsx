import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, coinbaseWallet, braveWallet } from "@rainbow-me/rainbowkit/wallets";
import { useEffect, useMemo, useState } from 'react';

const { chains, provider } = configureChains(
    [mainnet],
    [
      alchemyProvider({
        apiKey: '4Ow2G3LYC6SXr_AOesCG8Fi0_bxTGf1x',
        priority: 0,
      }),
      publicProvider({
        priority: 1,
      }),
    ],
);

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
        ...wallets.map(wallet => wallet({ chains })),
        metaMaskWallet({ chains })
      ],
    }]
  ), [wallets])

  const wagmiClient = useMemo(() => createClient({
    autoConnect: true,
    connectors,
    provider
  }), [connectors])

  return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
  );
}

export default EthereumConfig
