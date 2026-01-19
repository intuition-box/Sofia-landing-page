import { useCallback } from 'react';
import { createPublicClient, http } from 'viem';
import { useWallets } from '@privy-io/react-auth';
import { BlockchainService } from '@site/src/lib/services/blockchainService';
import { SofiaFeeProxyAbi } from '@site/src/lib/ABI/SofiaFeeProxy';
import { intuitionMainnet, SOFIA_PROXY_ADDRESS, BLOCKCHAIN_CONFIG } from '@site/src/lib/config/chainConfig';
import { STAKE_AMOUNT, CURVE_ID } from '@site/src/lib/config/constants';
import { parseContractError } from '@site/src/lib/web3/utils';

export function useVoting() {
  const { wallets } = useWallets();

  // Check if wallet is ready
  const isWalletReady = wallets.length > 0 && wallets[0]?.address;

  /**
   * Get Privy wallet client and public client
   */
  const getClients = useCallback(async () => {
    console.log('getClients: wallets =', wallets);
    const wallet = wallets[0];
    if (!wallet || !wallet.address) {
      console.error('getClients: No wallet found');
      throw new Error('Please connect your wallet first');
    }

    console.log('getClients: wallet found =', wallet.address, 'type =', wallet.walletClientType);

    // Switch to correct chain if needed
    try {
      console.log('getClients: switching to chain', intuitionMainnet.id);
      await wallet.switchChain(intuitionMainnet.id);
      console.log('getClients: chain switched successfully');
    } catch (switchError) {
      console.error('getClients: chain switch error', switchError);
      throw switchError;
    }

    // Get the EIP-1193 provider from Privy wallet
    console.log('getClients: getting ethereum provider...');
    const provider = await wallet.getEthereumProvider();
    console.log('getClients: provider obtained', provider);

    // Create viem wallet client from Privy provider
    const { createWalletClient, custom } = await import('viem');
    const walletClient = createWalletClient({
      chain: intuitionMainnet,
      transport: custom(provider),
    });
    console.log('getClients: walletClient created');

    const publicClient = createPublicClient({
      chain: intuitionMainnet,
      transport: http(intuitionMainnet.rpcUrls.default.http[0]),
    });
    console.log('getClients: publicClient created');

    const account = wallet.address as `0x${string}`;
    console.log('getClients: returning clients with account', account);

    return { walletClient, publicClient, account };
  }, [wallets]);

  /**
   * Ensure proxy approval before deposit
   */
  const ensureProxyApproval = useCallback(async (
    walletClient: any,
    publicClient: any,
    account: `0x${string}`
  ): Promise<void> => {
    const isApproved = await BlockchainService.checkProxyApproval(publicClient, account);

    if (!isApproved) {
      console.log('Requesting proxy approval...');
      const approvalHash = await BlockchainService.requestProxyApproval(walletClient, account);
      console.log('Approval tx:', approvalHash);
      await publicClient.waitForTransactionReceipt({ hash: approvalHash });
      console.log('Approval confirmed');
    }
  }, []);

  /**
   * Deposit FOR a triple (Support/Vote)
   * @param tripleId - The triple ID to support
   * @returns Transaction hash
   */
  const depositFor = useCallback(async (tripleId: `0x${string}`): Promise<string> => {
    try {
      const { walletClient, publicClient, account } = await getClients();

      console.log('Voting FOR with account:', account);

      // Ensure proxy is approved (auto-approval on first vote)
      await ensureProxyApproval(walletClient, publicClient, account);

      // Calculate total cost with Sofia fees
      const totalCost = await BlockchainService.getTotalDepositCost(publicClient, STAKE_AMOUNT);
      console.log('Total cost:', totalCost.toString());

      // Execute deposit via proxy
      const hash = await walletClient.writeContract({
        address: SOFIA_PROXY_ADDRESS,
        abi: SofiaFeeProxyAbi,
        functionName: 'deposit',
        args: [account, tripleId, CURVE_ID, 0n],
        value: totalCost,
        account,
        chain: intuitionMainnet,
        gas: BLOCKCHAIN_CONFIG.DEFAULT_GAS,
        maxFeePerGas: BLOCKCHAIN_CONFIG.MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: BLOCKCHAIN_CONFIG.MAX_PRIORITY_FEE_PER_GAS,
      });

      console.log('Deposit tx:', hash);
      return hash;
    } catch (error) {
      console.error('depositFor error:', error);
      throw new Error(parseContractError(error));
    }
  }, [getClients, ensureProxyApproval]);

  /**
   * Deposit AGAINST a triple (Oppose/Downvote)
   * @param tripleId - The triple ID to oppose
   * @returns Transaction hash
   */
  const depositAgainst = useCallback(async (tripleId: `0x${string}`): Promise<string> => {
    try {
      const { walletClient, publicClient, account } = await getClients();

      console.log('Voting AGAINST with account:', account);

      // Ensure proxy is approved (auto-approval on first vote)
      await ensureProxyApproval(walletClient, publicClient, account);

      // Get counter triple ID from contract
      const counterTripleId = await BlockchainService.getCounterTripleId(publicClient, tripleId);
      console.log('Counter triple ID:', counterTripleId);

      // Calculate total cost with Sofia fees
      const totalCost = await BlockchainService.getTotalDepositCost(publicClient, STAKE_AMOUNT);
      console.log('Total cost:', totalCost.toString());

      // Execute deposit on the counter triple via proxy
      const hash = await walletClient.writeContract({
        address: SOFIA_PROXY_ADDRESS,
        abi: SofiaFeeProxyAbi,
        functionName: 'deposit',
        args: [account, counterTripleId, CURVE_ID, 0n],
        value: totalCost,
        account,
        chain: intuitionMainnet,
        gas: BLOCKCHAIN_CONFIG.DEFAULT_GAS,
        maxFeePerGas: BLOCKCHAIN_CONFIG.MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: BLOCKCHAIN_CONFIG.MAX_PRIORITY_FEE_PER_GAS,
      });

      console.log('Deposit tx:', hash);
      return hash;
    } catch (error) {
      console.error('depositAgainst error:', error);
      throw new Error(parseContractError(error));
    }
  }, [getClients, ensureProxyApproval]);

  return {
    depositFor,
    depositAgainst,
    stakeAmount: STAKE_AMOUNT,
    isWalletReady,
  };
}
