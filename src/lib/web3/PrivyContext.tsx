import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const PRIVY_APP_ID = 'cmj05tjsj03thjs0c3mgxrixm';
const PRIVY_CLIENT_ID = 'client-WY6U3b3LFEgbveR2FVgiyTTbRWKCZhy6vEVFzQt9NvZYS';

interface WalletContextValue {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
  clearError: () => void;
  isMetaMaskInstalled: boolean;
}

const defaultValue: WalletContextValue = {
  address: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  connect: () => {},
  disconnect: () => {},
  clearError: () => {},
  isMetaMaskInstalled: true,
};

const WalletContext = createContext<WalletContextValue>(defaultValue);

// Extract wallet address from Privy user
const getWalletAddress = (user: any): string | null => {
  if (!user) return null;

  const walletAccount = user.linkedAccounts?.find(
    (account: any) => account.type === 'wallet'
  );
  if (walletAccount?.address) return walletAccount.address;

  if (user.wallet?.address) return user.wallet.address;

  return null;
};

function PrivyWalletProvider({ children }: { children: React.ReactNode }) {
  const { PrivyProvider, usePrivy, useLogin, useLogout } = require('@privy-io/react-auth');

  function InnerProvider({ children }: { children: React.ReactNode }) {
    const { ready, authenticated, user } = usePrivy();
    const { logout } = useLogout();

    const [state, setState] = useState({
      address: null as string | null,
      isConnected: false,
      isConnecting: false,
      error: null as string | null,
    });

    const { login } = useLogin({
      onComplete: ({ user }: { user: any }) => {
        const address = getWalletAddress(user);
        if (address) {
          setState({
            address,
            isConnected: true,
            isConnecting: false,
            error: null,
          });
        } else {
          setState(prev => ({
            ...prev,
            isConnecting: false,
            error: 'No wallet address found.',
          }));
        }
      },
      onError: (error: any) => {
        setState(prev => ({
          ...prev,
          isConnecting: false,
          error: typeof error === 'string' ? error : 'Connection failed.',
        }));
      },
    });

    useEffect(() => {
      if (ready) {
        if (authenticated && user) {
          const address = getWalletAddress(user);
          if (address) {
            setState({
              address,
              isConnected: true,
              isConnecting: false,
              error: null,
            });
          }
        } else {
          setState({
            address: null,
            isConnected: false,
            isConnecting: false,
            error: null,
          });
        }
      }
    }, [ready, authenticated, user]);

    const connect = useCallback(() => {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));
      login();
    }, [login]);

    const disconnect = useCallback(async () => {
      try {
        await logout();
        setState({
          address: null,
          isConnected: false,
          isConnecting: false,
          error: null,
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }, [logout]);

    const clearError = useCallback(() => {
      setState(prev => ({ ...prev, error: null }));
    }, []);

    return (
      <WalletContext.Provider
        value={{
          ...state,
          connect,
          disconnect,
          clearError,
          isMetaMaskInstalled: true,
        }}
      >
        {children}
      </WalletContext.Provider>
    );
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#ffffff',
        },
        loginMethods: ['wallet'],
      }}
    >
      <InnerProvider>{children}</InnerProvider>
    </PrivyProvider>
  );
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <WalletContext.Provider value={defaultValue}>
        {children}
      </WalletContext.Provider>
    );
  }

  return <PrivyWalletProvider>{children}</PrivyWalletProvider>;
}

export function useWalletConnection() {
  return useContext(WalletContext);
}
