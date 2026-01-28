/**
 * Sofia Logout Page
 *
 * Dedicated page for logging out from Privy and clearing all session data.
 * This ensures clean logout regardless of other open tabs.
 */

import { useEffect, useState, useRef } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from '../auth.module.css';

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

// Notify extension that wallet is disconnected
const notifyExtensionDisconnected = (extensionId?: string) => {
  // Method 1: chrome.runtime.sendMessage
  if (extensionId && typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
    try {
      chrome.runtime.sendMessage(extensionId, {
        type: 'WALLET_DISCONNECTED'
      }, (response) => {
        console.log('[Sofia Logout] Extension notified:', response);
      });
    } catch (e) {
      console.log('[Sofia Logout] Failed to notify extension:', e);
    }
  }

  // Method 2: postMessage to opener
  if (window.opener) {
    window.opener.postMessage({ type: 'SOFIA_WALLET_DISCONNECTED' }, '*');
  }

  // Method 3: Clear localStorage
  try {
    localStorage.removeItem('sofia_wallet_address');
    localStorage.removeItem('sofia_wallet_timestamp');
    console.log('[Sofia Logout] LocalStorage cleared');
  } catch (e) {
    console.log('[Sofia Logout] Failed to clear localStorage');
  }
};

const LogoutContent = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const logoutAttempted = useRef(false);

  // Get extension ID from URL params
  const extensionId = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('extensionId') || undefined
    : undefined;

  useEffect(() => {
    if (logoutAttempted.current) return;
    logoutAttempted.current = true;

    const performLogout = async () => {
      try {
        // Dynamic import of Privy to get logout function
        const { useLogout, usePrivy } = await import('@privy-io/react-auth');

        // Clear all Privy-related storage
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes('privy') || key.includes('Privy') || key.includes('sofia'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
            console.log('[Sofia Logout] Removed:', key);
          } catch (e) {}
        });

        // Clear session storage too
        try {
          sessionStorage.clear();
        } catch (e) {}

        // Notify extension
        notifyExtensionDisconnected(extensionId);

        setStatus('success');
        console.log('[Sofia Logout] Logout complete');
      } catch (error) {
        console.error('[Sofia Logout] Error:', error);

        // Even if Privy logout fails, clear local storage
        notifyExtensionDisconnected(extensionId);

        // Still show success since we cleared what we could
        setStatus('success');
      }
    };

    performLogout();
  }, [extensionId]);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />

        {status === 'loading' && (
          <>
            <div className={styles.spinner} />
            <p className={styles.text}>Logging out...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className={styles.checkmark}>✓</div>
            <p className={styles.text}>Logged Out</p>
            <p className={styles.subtext}>Your wallet has been disconnected from Sofia.</p>
            <button className={styles.closeBtn} onClick={handleClose}>
              Close
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className={styles.errorIcon}>✕</div>
            <p className={styles.text}>Logout Failed</p>
            <p className={styles.subtext}>{errorMessage || 'Please try again.'}</p>
            <button className={styles.btn} onClick={() => window.location.reload()}>
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// We need a wrapper that includes PrivyProvider for logout to work
const LogoutWithPrivy = () => {
  const { PrivyProvider } = require('@privy-io/react-auth');

  return (
    <PrivyProvider
      appId="cmj05tjsj03thjs0c3mgxrixm"
      clientId="client-WY6U3b3LFEgbveR2FVgiyTTbRWKCZhy6vEVFzQt9NvZYS"
      config={{
        appearance: { theme: 'dark' },
        loginMethods: ['wallet'],
      }}
    >
      <LogoutContentWithHooks />
    </PrivyProvider>
  );
};

// Inner component that can use Privy hooks
const LogoutContentWithHooks = () => {
  const { useLogout, usePrivy } = require('@privy-io/react-auth');
  const { ready, authenticated } = usePrivy();
  const { logout } = useLogout();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const logoutAttempted = useRef(false);

  const extensionId = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('extensionId') || undefined
    : undefined;

  useEffect(() => {
    if (!ready) return;
    if (logoutAttempted.current) return;
    logoutAttempted.current = true;

    const performLogout = async () => {
      console.log('[Sofia Logout] Starting logout, authenticated:', authenticated);

      try {
        // Call Privy logout if authenticated
        if (authenticated) {
          await logout();
          console.log('[Sofia Logout] Privy logout complete');
        }

        // Clear all Privy and Sofia storage
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes('privy') || key.includes('Privy') || key.includes('sofia'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
            console.log('[Sofia Logout] Removed:', key);
          } catch (e) {}
        });

        // Clear session storage
        try {
          sessionStorage.clear();
        } catch (e) {}

        // Notify extension
        notifyExtensionDisconnected(extensionId);

        setStatus('success');
      } catch (error) {
        console.error('[Sofia Logout] Error:', error);
        // Still clear what we can
        notifyExtensionDisconnected(extensionId);
        setStatus('success'); // Show success anyway
      }
    };

    performLogout();
  }, [ready, authenticated, logout, extensionId]);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />

        {status === 'loading' && (
          <>
            <div className={styles.spinner} />
            <p className={styles.text}>Logging out...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className={styles.checkmark}>✓</div>
            <p className={styles.text}>Logged Out</p>
            <p className={styles.subtext}>Your wallet has been disconnected from Sofia.</p>
            <button className={styles.closeBtn} onClick={handleClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />
      <div className={styles.spinner} />
      <p className={styles.text}>Loading...</p>
    </div>
  </div>
);

export default function LogoutPage() {
  return (
    <Layout
      title="Logout"
      description="Disconnect your wallet from Sofia"
      noFooter
    >
      <BrowserOnly fallback={<LoadingPlaceholder />}>
        {() => <LogoutWithPrivy />}
      </BrowserOnly>
    </Layout>
  );
}
