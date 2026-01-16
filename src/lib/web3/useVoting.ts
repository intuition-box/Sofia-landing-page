import { useCallback } from 'react';
import { createWalletClient, createPublicClient, custom, http } from 'viem';
import {
  intuitionMainnet,
  MULTIVAULT_ADDRESS,
  MULTIVAULT_ABI,
  STAKE_AMOUNT,
  CURVE_ID,
} from './config';
import { calculateCounterTripleId, parseContractError } from './utils';

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
      transport: http(),
    });

    return { walletClient, publicClient };
  }, []);

  /**
   * Deposit FOR a triple (Support)
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

      // Simulate the transaction first to catch errors
      await publicClient.simulateContract({
        address: MULTIVAULT_ADDRESS,
        abi: MULTIVAULT_ABI,
        functionName: 'deposit',
        args: [account, tripleId, CURVE_ID, 0n],
        value: STAKE_AMOUNT,
        account,
      });

      // Execute the deposit
      const hash = await walletClient.writeContract({
        address: MULTIVAULT_ADDRESS,
        abi: MULTIVAULT_ABI,
        functionName: 'deposit',
        args: [account, tripleId, CURVE_ID, 0n],
        value: STAKE_AMOUNT,
        account,
        chain: intuitionMainnet,
      });

      return hash;
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }, [getClients]);

  /**
   * Deposit AGAINST a triple (Oppose)
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

      // Calculate the counter triple ID for opposition
      const counterTripleId = calculateCounterTripleId(tripleId);

      // Simulate the transaction first to catch errors
      await publicClient.simulateContract({
        address: MULTIVAULT_ADDRESS,
        abi: MULTIVAULT_ABI,
        functionName: 'deposit',
        args: [account, counterTripleId, CURVE_ID, 0n],
        value: STAKE_AMOUNT,
        account,
      });

      // Execute the deposit on the counter triple
      const hash = await walletClient.writeContract({
        address: MULTIVAULT_ADDRESS,
        abi: MULTIVAULT_ABI,
        functionName: 'deposit',
        args: [account, counterTripleId, CURVE_ID, 0n],
        value: STAKE_AMOUNT,
        account,
        chain: intuitionMainnet,
      });

      return hash;
    } catch (error) {
      throw new Error(parseContractError(error));
    }
  }, [getClients]);

  return {
    depositFor,
    depositAgainst,
    stakeAmount: STAKE_AMOUNT,
  };
}
