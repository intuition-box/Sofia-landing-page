/**
 * MultiVault ABI - Minimal subset for approval operations
 */
export const MultiVaultAbi = [
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'sender', type: 'address', internalType: 'address' },
      { name: 'approvalType', type: 'uint8', internalType: 'enum IMultiVault.ApprovalTypes' }
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'approvals',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'sender', type: 'address', internalType: 'address' }
    ],
    outputs: [{ name: '', type: 'uint8', internalType: 'enum IMultiVault.ApprovalTypes' }],
    stateMutability: 'view',
  },
] as const;
