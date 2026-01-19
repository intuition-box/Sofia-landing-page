import type { Address, Hash } from 'viem';
import { SofiaFeeProxyAbi } from '../ABI/SofiaFeeProxy';
import { MultiVaultAbi } from '../ABI/MultiVault';
import { MULTIVAULT_ADDRESS, SOFIA_PROXY_ADDRESS, intuitionMainnet } from '../config/chainConfig';

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyClient = any;

/**
 * Centralized service for blockchain operations
 * Handles proxy approval and fee calculations
 */
export class BlockchainService {
  /**
   * ApprovalTypes enum values matching MultiVault contract
   */
  static readonly ApprovalTypes = {
    NONE: 0,      // No approval
    DEPOSIT: 1,   // Can deposit on behalf
    REDEMPTION: 2, // Can redeem on behalf
    BOTH: 3       // Can deposit and redeem
  } as const;

  /**
   * Get total cost for deposit including Sofia fees
   * Fees: 0.1 TRUST fixed + 5% of deposit amount
   */
  static async getTotalDepositCost(
    publicClient: AnyClient,
    depositAmount: bigint
  ): Promise<bigint> {
    return await publicClient.readContract({
      address: SOFIA_PROXY_ADDRESS,
      abi: SofiaFeeProxyAbi,
      functionName: 'getTotalDepositCost',
      args: [depositAmount],
      authorizationList: undefined,
    }) as bigint;
  }

  /**
   * Check if user has approved proxy for deposits on MultiVault
   * Note: If the check fails, we assume no approval and will request one
   */
  static async checkProxyApproval(
    publicClient: AnyClient,
    userAddress: string
  ): Promise<boolean> {
    try {
      const approvalType = await publicClient.readContract({
        address: MULTIVAULT_ADDRESS,
        abi: MultiVaultAbi,
        functionName: 'approvals',
        args: [userAddress as Address, SOFIA_PROXY_ADDRESS],
        authorizationList: undefined,
      }) as number;

      // ApprovalTypes: 0=NONE, 1=DEPOSIT, 2=REDEMPTION, 3=BOTH
      return approvalType === this.ApprovalTypes.DEPOSIT || approvalType === this.ApprovalTypes.BOTH;
    } catch (error) {
      console.error('Error checking proxy approval:', error);
      // If we can't check, assume not approved
      return false;
    }
  }

  /**
   * Request user to approve proxy for deposits on MultiVault
   */
  static async requestProxyApproval(
    walletClient: AnyClient,
    account: Address
  ): Promise<Hash> {
    return await walletClient.writeContract({
      address: MULTIVAULT_ADDRESS,
      abi: MultiVaultAbi,
      functionName: 'approve',
      args: [SOFIA_PROXY_ADDRESS, this.ApprovalTypes.DEPOSIT],
      account,
      chain: intuitionMainnet,
    });
  }

  /**
   * Get counter triple ID from the contract (for oppose/downvote operations)
   * Uses on-chain calculation to ensure correct salt and encoding
   */
  static async getCounterTripleId(
    publicClient: AnyClient,
    tripleId: `0x${string}`
  ): Promise<`0x${string}`> {
    return await publicClient.readContract({
      address: MULTIVAULT_ADDRESS,
      abi: MultiVaultAbi,
      functionName: 'getCounterIdFromTripleId',
      args: [tripleId],
      authorizationList: undefined,
    }) as `0x${string}`;
  }

  /**
   * Check if user has already voted on a triple (has shares on triple or counter-triple)
   * @returns object with hasVoted boolean and voteType ('for' | 'against' | null)
   */
  static async checkExistingVote(
    publicClient: AnyClient,
    userAddress: string,
    tripleId: `0x${string}`,
    curveId: bigint
  ): Promise<{ hasVoted: boolean; voteType: 'for' | 'against' | null }> {
    try {
      console.log('Checking existing vote for:', { userAddress, tripleId, curveId: curveId.toString() });

      // Check shares on the triple (FOR vote)
      const forShares = await publicClient.readContract({
        address: MULTIVAULT_ADDRESS,
        abi: MultiVaultAbi,
        functionName: 'getShares',
        args: [userAddress as Address, tripleId, curveId],
        authorizationList: undefined,
      }) as bigint;

      console.log('FOR shares:', forShares.toString());

      if (forShares > 0n) {
        return { hasVoted: true, voteType: 'for' };
      }

      // Check shares on counter-triple (AGAINST vote)
      const counterTripleId = await this.getCounterTripleId(publicClient, tripleId);
      console.log('Counter triple ID:', counterTripleId);

      const againstShares = await publicClient.readContract({
        address: MULTIVAULT_ADDRESS,
        abi: MultiVaultAbi,
        functionName: 'getShares',
        args: [userAddress as Address, counterTripleId, curveId],
        authorizationList: undefined,
      }) as bigint;

      console.log('AGAINST shares:', againstShares.toString());

      if (againstShares > 0n) {
        return { hasVoted: true, voteType: 'against' };
      }

      console.log('No existing vote found');
      return { hasVoted: false, voteType: null };
    } catch (error) {
      console.error('Error checking existing vote:', error);
      // If check fails, allow voting (will fail on-chain if already voted)
      return { hasVoted: false, voteType: null };
    }
  }

  /**
   * Get contract addresses
   */
  static getProxyAddress(): typeof SOFIA_PROXY_ADDRESS {
    return SOFIA_PROXY_ADDRESS;
  }

  static getMultiVaultAddress(): typeof MULTIVAULT_ADDRESS {
    return MULTIVAULT_ADDRESS;
  }
}
