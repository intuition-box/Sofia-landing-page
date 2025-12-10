/**
 * Sofia External Auth Page for Chrome Extension
 *
 * This page handles Privy wallet authentication and sends the wallet address
 * back to the Chrome extension via multiple communication methods.
 *
 * URL Parameters:
 * - extensionId: Chrome extension ID for direct messaging
 * - callback: URL to redirect with wallet address
 * - autoLogin: Set to "true" to auto-trigger login modal
 */

import { useEffect, useState, useCallback } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './auth.module.css';

// Chrome extension API type declaration
declare const chrome: {
  runtime?: {
    sendMessage?: (
      extensionId: string,
      message: any,
      callback?: (response: any) => void
    ) => void;
  };
} | undefined;

// ============= CONFIGURATION =============
const PRIVY_APP_ID = 'cmj05tjsj03thjs0c3mgxrixm';
const PRIVY_CLIENT_ID = 'client-WY6U3b3LFEgbveR2FVgiyTTbRWKCZhy6vEVFzQt9NvZYS';

// Default extension ID - can be overridden via URL param
const DEFAULT_EXTENSION_ID = 'YOUR_EXTENSION_ID_HERE';

// ============= HELPER FUNCTIONS =============

// Extract wallet address from Privy user
const getWalletAddress = (user: any): string | null => {
  if (!user) return null;

  // Try linkedAccounts first (v3 API)
  const walletAccount = user.linkedAccounts?.find(
    (account: any) => account.type === 'wallet'
  );
  if (walletAccount?.address) return walletAccount.address;

  // Fallback to wallet property (v2 API)
  if (user.wallet?.address) return user.wallet.address;

  return null;
};

// Send wallet address to extension via multiple methods
const sendToExtension = (address: string, extensionId?: string) => {
  // Method 1: chrome.runtime.sendMessage (if extension ID is known)
  if (extensionId && extensionId !== DEFAULT_EXTENSION_ID &&
      typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
    try {
      chrome.runtime.sendMessage(extensionId, {
        type: 'WALLET_CONNECTED',
        walletAddress: address
      }, (response) => {
        console.log('[Sofia Auth] Extension response:', response);
        if (response?.success) {
          window.close();
        }
      });
    } catch (e) {
      console.log('[Sofia Auth] Failed to send to extension:', e);
    }
  }

  // Method 2: postMessage to opener window
  if (window.opener) {
    window.opener.postMessage({
      type: 'SOFIA_WALLET_CONNECTED',
      address: address
    }, '*');
    console.log('[Sofia Auth] Sent postMessage to opener');
  }

  // Method 3: Store in localStorage for polling
  try {
    localStorage.setItem('sofia_wallet_address', address);
    localStorage.setItem('sofia_wallet_timestamp', Date.now().toString());
    console.log('[Sofia Auth] Stored in localStorage');
  } catch (e) {
    console.log('[Sofia Auth] LocalStorage not available');
  }

  // Method 4: URL callback redirect
  const urlParams = new URLSearchParams(window.location.search);
  const callbackUrl = urlParams.get('callback');
  if (callbackUrl) {
    try {
      const redirectUrl = new URL(callbackUrl);
      redirectUrl.searchParams.set('address', address);
      console.log('[Sofia Auth] Redirecting to callback:', redirectUrl.toString());
      setTimeout(() => {
        window.location.href = redirectUrl.toString();
      }, 1500);
    } catch (e) {
      console.log('[Sofia Auth] Invalid callback URL');
    }
  }
};

// ============= AUTH CONTENT COMPONENT (Client-side only) =============

const AuthContentInner = () => {
  // Dynamic import of Privy hooks (client-side only)
  const { PrivyProvider, usePrivy, useLogin } = require('@privy-io/react-auth');

  const PrivyAuthContent = () => {
    const { authenticated, ready, user, logout } = usePrivy();
    const [status, setStatus] = useState<'loading' | 'connect' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    // Get extension ID from URL params
    const extensionId = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('extensionId') || DEFAULT_EXTENSION_ID
      : DEFAULT_EXTENSION_ID;

    const { login } = useLogin({
      onComplete: ({ user }: { user: any }) => {
        console.log('[Sofia Auth] onComplete triggered, user:', user);
        const address = getWalletAddress(user);
        console.log('[Sofia Auth] Extracted address:', address);
        if (address) {
          setWalletAddress(address);
          setStatus('success');
          sendToExtension(address, extensionId);
        } else {
          console.log('[Sofia Auth] No address found in user object');
          setStatus('error');
          setErrorMessage('No wallet address found. Please try connecting with a wallet.');
        }
      },
      onError: (error: any) => {
        console.error('[Sofia Auth] Login error:', error);
        setStatus('error');
        setErrorMessage(typeof error === 'string' ? error : 'Authentication failed. Please try again.');
      }
    });

    // Check initial state when Privy is ready
    useEffect(() => {
      if (ready) {
        if (authenticated && user) {
          const address = getWalletAddress(user);
          if (address) {
            setWalletAddress(address);
            setStatus('success');
            sendToExtension(address, extensionId);
          } else {
            setStatus('connect');
          }
        } else {
          setStatus('connect');
        }
      }
    }, [ready, authenticated, user, extensionId]);

    // Auto-trigger login if specified in URL (only once)
    const [autoLoginTriggered, setAutoLoginTriggered] = useState(false);

    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (autoLoginTriggered) return;

      const urlParams = new URLSearchParams(window.location.search);
      const autoLogin = urlParams.get('autoLogin');

      if (autoLogin === 'true' && ready && !authenticated && status === 'connect') {
        setAutoLoginTriggered(true);
        login();
      }
    }, [ready, authenticated, status, autoLoginTriggered, login]);

    const handleClose = useCallback(() => {
      window.close();
    }, []);

    const handleRetry = useCallback(() => {
      setErrorMessage(null);
      setStatus('connect');
    }, []);

    const handleDisconnect = useCallback(async () => {
      await logout();
      setWalletAddress(null);
      setStatus('connect');
      try {
        localStorage.removeItem('sofia_wallet_address');
        localStorage.removeItem('sofia_wallet_timestamp');
      } catch (e) {}
    }, [logout]);

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />
          <p className={styles.subtitle}>Secure Wallet Connection</p>

          {/* Loading State */}
          {status === 'loading' && (
            <>
              <div className={styles.spinner} />
              <p className={styles.text}>Initializing...</p>
            </>
          )}

          {/* Connect State */}
          {status === 'connect' && (
            <>
              <p className={styles.text}>Connect your wallet</p>
              <p className={styles.subtext}>Connect with MetaMask or another Web3 wallet</p>
              <button className={styles.btn} onClick={() => login()}>
                Connect Wallet
              </button>
            </>
          )}

          {/* Success State */}
          {status === 'success' && walletAddress && (
            <>
              <div className={styles.checkmark}>✓</div>
              <p className={styles.text}>Wallet Connected!</p>
              <div className={styles.walletAddress}>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
              <div className={styles.instructions}>
                <p className={styles.instructionsText}>
                  Your wallet is now connected to Sofia. You can close this tab.
                </p>
              </div>
              <button className={styles.closeBtn} onClick={handleClose}>
                Close
              </button>
              <button className={styles.disconnectBtn} onClick={handleDisconnect}>
                Disconnect
              </button>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className={styles.errorIcon}>✕</div>
              <p className={styles.text}>Connection Failed</p>
              <p className={styles.subtext}>{errorMessage}</p>
              <button className={styles.btn} onClick={handleRetry}>
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

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
      <PrivyAuthContent />
    </PrivyProvider>
  );
};

// Loading placeholder for SSR
const LoadingPlaceholder = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />
      <p className={styles.subtitle}>Secure Wallet Connection</p>
      <div className={styles.spinner} />
      <p className={styles.text}>Loading...</p>
    </div>
  </div>
);

// ============= MAIN PAGE COMPONENT =============

export default function SofiaAuthPage() {
  return (
    <Layout
      title="Wallet Authentication"
      description="Connect your wallet to Sofia Chrome Extension"
      noFooter
    >
      <BrowserOnly fallback={<LoadingPlaceholder />}>
        {() => <AuthContentInner />}
      </BrowserOnly>
    </Layout>
  );
}
