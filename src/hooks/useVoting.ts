import { useCallback } from 'react';
import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { BlockchainService } from '@site/src/lib/services/blockchainService';
import { SofiaFeeProxyAbi } from '@site/src/lib/ABI/SofiaFeeProxy';
import { intuitionMainnet, SOFIA_PROXY_ADDRESS, BLOCKCHAIN_CONFIG } from '@site/src/lib/config/chainConfig';
import { STAKE_AMOUNT, CURVE_ID } from '@site/src/lib/config/constants';
import { calculateCounterTripleId, parseContractError } from '@site/src/lib/web3/utils';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useVoting() {
  /**
   * Get wallet and public clients
   */
  const getClients = useCallback(() => {
    if (!window.ethereum) {
      throw new Error('MetaMask not available');
    }

    const walletClient = createWalletClient({
      chain: intuitionMainnet,
      transport: custom(window.ethereum),
    });

    const publicClient = createPublicClient({
      chain: intuitionMainnet,
      transport: http(intuitionMainnet.rpcUrls.default.http[0]),
    });

    return { walletClient, publicClient };
  }, []);

  /**
   * Ensure proxy is approved before deposit
   */
  const ensureProxyApproval = useCallback(async (
    walletClient: ReturnType<typeof createWalletClient>,
    publicClient: ReturnType<typeof createPublicClient>,
    account: `0x${string}`
  ): Promise<void> => {
    const isApproved = await BlockchainService.checkProxyApproval(publicClient, account);

    if (!isApproved) {
      const approvalHash = await BlockchainService.requestProxyApproval(walletClient, account);
      await publicClient.waitForTransactionReceipt({ hash: approvalHash });
    }
  }, []);

  /**
   * Deposit FOR a triple (Support/Vote)
   * @param tripleId - The triple ID to support
   * @returns Transaction hash
   */
  const depositFor = useCallback(async (tripleId: `0x${string}`): Promise<string> => {
    try {
      const { walletClient, publicClient } = getClients();
      const [account] = await walletClient.getAddresses();

      if (!account) {
        throw new Error('No account connected');
      }

      // Ensure proxy is approved (auto-approval on first vote)
      await ensureProxyApproval(walletClient, publicClient, account);

      // Calculate total cost with Sofia fees
      const totalCost = await BlockchainService.getTotalDepositCost(publicClient, STAKE_AMOUNT);

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

      return hash;
    } catch (error) {
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
      const { walletClient, publicClient } = getClients();
      const [account] = await walletClient.getAddresses();

      if (!account) {
        throw new Error('No account connected');
      }

      // Ensure proxy is approved (auto-approval on first vote)
      await ensureProxyApproval(walletClient, publicClient, account);

      // Calculate the counter triple ID for opposition
      const counterTripleId = calculateCounterTripleId(tripleId);

      // Calculate total cost with Sofia fees
      const totalCost = await BlockchainService.getTotalDepositCost(publicClient, STAKE_AMOUNT);

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

      return hash;
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }, [getClients, ensureProxyApproval]);

  return {
    depositFor,
    depositAgainst,
    stakeAmount: STAKE_AMOUNT,
  };
}
