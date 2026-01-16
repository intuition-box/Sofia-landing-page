import { defineChain } from 'viem';

// Intuition Mainnet Chain Definition
export const intuitionMainnet = defineChain({
  id: 1155,
  name: 'Intuition Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Trust',
    symbol: 'TRUST',
  },
  rpcUrls: {
    default: { http: ['https://rpc.intuition.systems'] },
    public: { http: ['https://rpc.intuition.systems'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.intuition.systems' },
  },
});

// Chain parameters for MetaMask wallet_addEthereumChain
export const CHAIN_PARAMS = {
  chainId: `0x${(1155).toString(16)}`, // 0x483
  chainName: 'Intuition Mainnet',
  nativeCurrency: {
    name: 'Trust',
    symbol: 'TRUST',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.intuition.systems'],
  blockExplorerUrls: ['https://explorer.intuition.systems'],
};

// Contract addresses
export const MULTIVAULT_ADDRESS = '0x6E35cF57A41fA15eA0EaE9C33e751b01A784Fe7e' as const;

// Explorer URLs
export const EXPLORER_URLS = {
  TRANSACTION: 'https://explorer.intuition.systems/tx/',
  ADDRESS: 'https://explorer.intuition.systems/address/',
};

// Stake amount: 0.1 TRUST in wei
export const STAKE_AMOUNT = BigInt('100000000000000000'); // 0.1 TRUST

// Curve ID: 1 (Linear/default)
export const CURVE_ID = 1n;

// Values data with triple IDs
export const VALUES_DATA = [
  {
    id: 1,
    name: 'Digital Sovereignty',
    description: 'The user writes and certifies their own digital history on the blockchain. We value online activity to transform a passive trace into a strategic asset.',
    tripleId: '0xf1b04a678cf6b6bb9150357e6d1a96a83ec45016d542f4201564deed37dbc363' as `0x${string}`,
  },
  {
    id: 2,
    name: 'Transparent Integrity',
    description: 'We replace "blind trust" with "verifiable truth." By utilizing local data processing and auditable open-source infrastructure, Sofia eliminates the "black box" of modern tech. We ensure that your digital life is protected by math and code, not just corporate promises.',
    tripleId: '0x89b8575460750b55e0706eb391bcbc3f89b7cba2f2d6d9f839b6e3c25c1a872f' as `0x${string}`,
  },
  {
    id: 3,
    name: 'Identity Through Action',
    description: 'Who we are is defined by what we do. We believe in a "show, don\'t tell" philosophy, ensuring that every customer experience is backed by real-world action and consistent values.',
    tripleId: '0xee59085abd8f08d5e5eaf2ea763f9f3b0fb0daf7fce77114abb46be340fb7dc8' as `0x${string}`,
  },
  {
    id: 4,
    name: 'Contribution-Based Power',
    description: 'Sofia is a community where influence is earned, not bought. Our decentralized governance ensures that value flows to those who contribute, participate, and build. We are creating an ecosystem that rewards meaningful engagement over financial extraction.',
    tripleId: '0x9c113944ab2d277c651f3816a02f45d25157566a52176a88ac3f50169827ac97' as `0x${string}`,
  },
  {
    id: 5,
    name: 'Collective Narrative',
    description: 'Sofia is built in public and open-source by design, embracing transparency at every level. Regular quarterly reports ensure accountability, while the community retains real control over the direction and evolution of the protocol.',
    tripleId: '0x4190a5bf28eb7608c9ee34d50a66733cc55bac461f09b9ca8adcc03572f612ec' as `0x${string}`,
  },
] as const;

// Minimal MultiVault ABI for deposit and counter triple calculation
export const MULTIVAULT_ABI = [
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      { name: 'receiver', type: 'address', internalType: 'address' },
      { name: 'termId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'curveId', type: 'uint256', internalType: 'uint256' },
      { name: 'minShares', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getCounterIdFromTripleId',
    inputs: [{ name: 'tripleId', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'pure',
  },
] as const;
