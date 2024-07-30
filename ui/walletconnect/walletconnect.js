import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';

const projectId = 'f39d023340846389630417525b15b326';

const mainnet = {
    chainId: 11155111, // The unique identifier for the Sepolia testnet
    name: 'Sepolia', // The name of the test network
    currency: 'ETH', // The currency used (same as Ethereum, but test ETH)
    explorerUrl: 'https://sepolia.etherscan.io', // Block explorer URL for Sepolia
    rpcUrl: 'https://rpc.sepolia.org' // Public RPC URL for the Sepolia network
};

const metadata = {
    name: 'testbase',
    description: 'My Website description',
    url: 'hhttps://4103-198-54-132-242.ngrok-free.app', // url must match your domain & subdomain
    icons: ['https://4103-198-54-132-242.ngrok-free.app/favicon.ico']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,
})

const modal = createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true // Optional - false as default
});

export default modal;