import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import {useMemo} from "react";

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

function EthereumConfig({ children }: { children: React.ReactNode }) {
  const connectors = useMemo(() => connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet({ chains })
      ],
    }]
  ), [])

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
  );
}

export default EthereumConfig
