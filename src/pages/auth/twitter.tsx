/**
 * Sofia Twitter/X OAuth Initiation Page
 *
 * This page initiates the Twitter OAuth 2.0 flow with PKCE.
 * It generates the code verifier/challenge and redirects to Twitter.
 *
 * URL Parameters:
 * - extensionId: Chrome extension ID for sending token back
 */

import { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from '../auth.module.css';

// ============= CONFIGURATION =============
const TWITTER_CLIENT_ID = 'dURILW1BSzVFcEtpSkVPX3V5c0E6MTpjaQ';
// TODO: change to https://sofia.intuition.box/auth/twitter/callback when ready for prod
const TWITTER_REDIRECT_URI = 'http://localhost:3000/auth/twitter/callback';
const TWITTER_SCOPES = ['users.read', 'tweet.read'];

// ============= PKCE HELPER FUNCTIONS =============

// Generate random string for state and code verifier
const generateRandomString = (length: number): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

// Generate code verifier (43-128 characters, base64url)
const generateCodeVerifier = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
};

// Generate code challenge from verifier using SHA-256
const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
};

// Base64 URL encode (no padding, URL-safe characters)
const base64UrlEncode = (buffer: Uint8Array): string => {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

// ============= TWITTER AUTH CONTENT COMPONENT =============

const TwitterAuthContent = () => {
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initiateOAuth = async () => {
      try {
        // Get extension ID from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const extensionId = urlParams.get('extensionId') || '';

        // Generate PKCE values
        const state = generateRandomString(32);
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        // Store OAuth state in localStorage for callback page
        localStorage.setItem('twitter_oauth_state', JSON.stringify({
          state,
          codeVerifier,
          extensionId,
          timestamp: Date.now()
        }));

        // Build Twitter OAuth URL
        const params = new URLSearchParams({
          client_id: TWITTER_CLIENT_ID,
          redirect_uri: TWITTER_REDIRECT_URI,
          scope: TWITTER_SCOPES.join(' '),
          state: state,
          response_type: 'code',
          code_challenge: codeChallenge,
          code_challenge_method: 'S256'
        });

        const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;

        setStatus('redirecting');

        // Small delay to show redirecting message
        setTimeout(() => {
          window.location.href = authUrl;
        }, 500);

      } catch (error) {
        console.error('[Sofia Twitter Auth] Error initiating OAuth:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to initiate Twitter authentication');
      }
    };

    initiateOAuth();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />
        <p className={styles.subtitle}>Twitter/X Authentication</p>

        {status === 'loading' && (
          <>
            <div className={styles.spinner} />
            <p className={styles.text}>Preparing authentication...</p>
          </>
        )}

        {status === 'redirecting' && (
          <>
            <div className={styles.spinner} />
            <p className={styles.text}>Redirecting to Twitter...</p>
            <p className={styles.subtext}>You will be asked to authorize Sofia</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className={styles.errorIcon}>✕</div>
            <p className={styles.text}>Authentication Failed</p>
            <p className={styles.subtext}>{errorMessage}</p>
            <button
              className={styles.btn}
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Loading placeholder for SSR
const LoadingPlaceholder = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <img src="/img/logoBrut.png" alt="Sofia" className={styles.logo} />
      <p className={styles.subtitle}>Twitter/X Authentication</p>
      <div className={styles.spinner} />
      <p className={styles.text}>Loading...</p>
    </div>
  </div>
);

// ============= MAIN PAGE COMPONENT =============

export default function TwitterAuthPage() {
  return (
    <Layout
      title="Twitter Authentication"
      description="Connect your Twitter/X account to Sofia"
      noFooter
    >
      <BrowserOnly fallback={<LoadingPlaceholder />}>
        {() => <TwitterAuthContent />}
      </BrowserOnly>
    </Layout>
  );
}
