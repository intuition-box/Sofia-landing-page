import { useState, useCallback, useEffect } from 'react';
import { CHAIN_PARAMS, intuitionMainnet } from './config';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export function useWalletConnection() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  // Check if MetaMask is installed
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' &&
           typeof window.ethereum !== 'undefined';
  }, []);

  // Switch to Intuition chain or add it if not present
  const switchToIntuitionChain = useCallback(async () => {
    if (!window.ethereum) return;

    const chainIdHex = `0x${intuitionMainnet.id.toString(16)}`;

    try {
      // Try to switch to the chain
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (switchError: unknown) {
      // Chain not added yet, add it
      const error = switchError as { code?: number };
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [CHAIN_PARAMS],
          });
        } catch (addError) {
          throw new Error('Failed to add Intuition network to MetaMask');
        }
      } else {
        throw switchError;
      }
    }
  }, []);

  // Connect wallet
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      // Open MetaMask install page
      window.open('https://metamask.io/download/', '_blank');
      setState(prev => ({
        ...prev,
        error: 'MetaMask not installed. Please install MetaMask and refresh the page.'
      }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Request account access
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts'
      }) as string[];

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Switch to Intuition chain
      await switchToIntuitionChain();

      setState({
        address: accounts[0],
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (err: unknown) {
      const error = err as { code?: number; message?: string };
      let errorMessage = 'Connection failed';

      if (error.code === 4001) {
        errorMessage = 'Connection request cancelled';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
    }
  }, [isMetaMaskInstalled, switchToIntuitionChain]);

  // Disconnect (clear local state - MetaMask doesn't have real disconnect)
  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Listen for account and chain changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts: unknown) => {
      const accountList = accounts as string[];
      if (accountList.length === 0) {
        disconnect();
      } else if (state.isConnected) {
        setState(prev => ({ ...prev, address: accountList[0] }));
      }
    };

    const handleChainChanged = () => {
      // Reload on chain change to ensure consistent state
      window.location.reload();
    };

    window.ethereum!.on('accountsChanged', handleAccountsChanged);
    window.ethereum!.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum!.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum!.removeListener('chainChanged', handleChainChanged);
    };
  }, [disconnect, isMetaMaskInstalled, state.isConnected]);

  // Check if already connected on mount
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const checkConnection = async () => {
      try {
        const accounts = await window.ethereum!.request({
          method: 'eth_accounts'
        }) as string[];

        if (accounts.length > 0) {
          // Verify we're on the right chain
          const chainId = await window.ethereum!.request({
            method: 'eth_chainId'
          }) as string;

          const expectedChainId = `0x${intuitionMainnet.id.toString(16)}`;

          if (chainId === expectedChainId) {
            setState({
              address: accounts[0],
              isConnected: true,
              isConnecting: false,
              error: null,
            });
          }
        }
      } catch {
        // Silently fail - user will need to connect manually
      }
    };

    checkConnection();
  }, [isMetaMaskInstalled]);

  return {
    ...state,
    connect,
    disconnect,
    clearError,
    isMetaMaskInstalled: isMetaMaskInstalled(),
  };
}
