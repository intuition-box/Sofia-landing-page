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
   */
  static async checkProxyApproval(
    publicClient: AnyClient,
    userAddress: string
  ): Promise<boolean> {
    const approvalType = await publicClient.readContract({
      address: MULTIVAULT_ADDRESS,
      abi: MultiVaultAbi,
      functionName: 'approvals',
      args: [userAddress as Address, SOFIA_PROXY_ADDRESS],
      authorizationList: undefined,
    }) as number;

    // ApprovalTypes: 0=NONE, 1=DEPOSIT, 2=REDEMPTION, 3=BOTH
    return approvalType === this.ApprovalTypes.DEPOSIT || approvalType === this.ApprovalTypes.BOTH;
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
   * Get contract addresses
   */
  static getProxyAddress(): typeof SOFIA_PROXY_ADDRESS {
    return SOFIA_PROXY_ADDRESS;
  }

  static getMultiVaultAddress(): typeof MULTIVAULT_ADDRESS {
    return MULTIVAULT_ADDRESS;
  }
}
