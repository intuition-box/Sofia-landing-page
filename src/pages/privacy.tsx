import React from 'react';
import Layout from '@theme/Layout';
import ContentWrapperWide from '@site/src/components/ContentWrapperWide';

export default function Privacy(): React.ReactElement {
  return (
    <Layout
      title="Privacy Policy"
      description="Sofia Extension Privacy Policy">

      <main style={{ padding: '5', color: '#02000B', lineHeight: '2' }}>
        <ContentWrapperWide>
          <article>
            <h1>Privacy Policy</h1>
            <p><strong>Last updated: January 30, 2026</strong></p>

            <h2>1. Overview</h2>
            <p>
              Sofia is a browser extension that transforms your browsing activity into structured knowledge on the blockchain.
              This privacy policy explains how we collect, process, store, and share your data.
            </p>

            <h2>2. Data Collection</h2>
            <p>Sofia collects the following categories of data, stored <strong>locally</strong> on your device:</p>

            <h3>Browsing Data (when tracking is enabled)</h3>
            <ul>
              <li>Page URLs (normalized — tracking parameters are stripped)</li>
              <li>Page titles (cleaned — site suffixes like "- YouTube" are removed)</li>
              <li>Browsing patterns and timestamps</li>
              <li>Page metadata (favicon, description)</li>
            </ul>

            <h3>Wallet Information</h3>
            <ul>
              <li>Ethereum wallet address (detected via EIP-6963 multi-provider discovery — supports MetaMask, Rabby, and other injected wallets)</li>
              <li>On-chain transaction history related to Sofia signals</li>
              <li>All user data (tokens, bookmarks, quests, XP) is isolated per wallet address</li>
            </ul>

            <h3>OAuth Tokens (optional)</h3>
            <ul>
              <li>Authentication tokens for connected platforms (YouTube, Spotify, Twitch, Discord)</li>
              <li>Used only to verify social identity and enrich your profile</li>
              <li>Stored locally, secured with crypto-based OAuth state</li>
            </ul>

            <h2>3. Data Processing</h2>
            <p>Your data is processed in the following ways:</p>
            <ul>
              <li><strong>Page analysis:</strong> Browsing data is analyzed locally to extract themes, intentions, and structured knowledge</li>
              <li><strong>URL normalization:</strong> URLs are cleaned of tracking parameters and page titles are standardized before storage</li>
              <li><strong>Quest & XP system:</strong> Browsing activity and on-chain actions contribute to quests and experience progression</li>
              <li><strong>Group levels:</strong> OAuth verifications and on-chain certifications contribute to intention group progression</li>
            </ul>
            <p>All processing happens <strong>locally on your device</strong>. No browsing data is sent to external servers for analysis.</p>

            <h2>4. Data Storage</h2>
            <p>
              All data is stored <strong>locally</strong> in Chrome's extension storage on your device. Sofia does not maintain external servers that store your personal browsing data.
            </p>
            <ul>
              <li>Each wallet address has its own isolated storage space (tokens, bookmarks, quests, XP, identity)</li>
              <li>When a new wallet is detected, previous wallet data is cleared from local storage</li>
              <li>Local data is encrypted using Chrome's built-in storage encryption</li>
            </ul>

            <h2>5. Data Sharing</h2>
            <p>Sofia only transmits data in the following cases:</p>
            <ul>
              <li>
                <strong>Intuition Protocol (Base blockchain):</strong> When you explicitly choose to publish signals (triples), the signal content is written to the public blockchain. This is always a user-initiated action requiring wallet approval.
              </li>
              <li>
                <strong>IPFS:</strong> Metadata for published signals may be stored on IPFS, a decentralized storage network.
              </li>
              <li>
                <strong>OAuth providers:</strong> When you choose to connect a social account, authentication flows are initiated with the respective provider (YouTube, Spotify, Twitch, Discord). Only the minimum required tokens are stored locally.
              </li>
            </ul>
            <p>Sofia does <strong>not</strong> sell, rent, or share your personal data with any third party.</p>

            <h2>6. User Control</h2>
            <p>You have full control over your data:</p>
            <ul>
              <li><strong>Toggle tracking:</strong> Enable or disable browsing tracking at any time in Settings</li>
              <li><strong>Clear all data:</strong> Delete all local data, OAuth tokens, and connections via Settings</li>
              <li><strong>Disconnect wallet:</strong> Remove your wallet connection at any time</li>
              <li><strong>Revoke OAuth:</strong> Disconnect external platform connections individually</li>
              <li><strong>Per-wallet isolation:</strong> Each wallet address maintains its own separate data space</li>
            </ul>

            <h2>7. Data Security</h2>
            <ul>
              <li>All local data is encrypted using Chrome's built-in storage encryption</li>
              <li>Wallet interactions require explicit user approval via your wallet provider</li>
              <li>No passwords or private keys are ever stored by Sofia</li>
              <li>PostMessage origins are verified and secured</li>
              <li>OAuth state parameters are protected with cryptographic signatures</li>
              <li>Wallet transactions are restricted to HTTPS pages only</li>
              <li>The unsafe <code>eth_sign</code> method is disabled</li>
            </ul>

            <h2>8. Third-Party Services</h2>
            <p>Sofia integrates with:</p>
            <ul>
              <li><strong>EIP-6963 compatible wallets:</strong> MetaMask, Rabby, and other injected wallet providers — for transaction signing and on-chain interactions</li>
              <li><strong>Intuition Protocol:</strong> For on-chain knowledge graph interactions</li>
              <li><strong>OAuth providers:</strong> YouTube, Spotify, Twitch, Discord (optional, user-initiated)</li>
              <li><strong>IPFS:</strong> Decentralized storage for signal metadata</li>
            </ul>

            <h2>9. Children's Privacy</h2>
            <p>Sofia is not intended for use by children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be reflected in the "Last updated" date at the top of this page.
              Continued use of Sofia after changes constitutes acceptance of the updated policy.
            </p>

            <h2>11. Contact</h2>
            <p>For privacy concerns or questions, please contact us at:</p>
            <ul>
              <li>GitHub: <a href="https://github.com/intuition-box/Sofia/issues" target="_blank" rel="noopener noreferrer">https://github.com/intuition-box/Sofia/issues</a></li>
            </ul>

            <br />
            <p><em>By installing and using Sofia, you agree to this privacy policy.</em></p>
          </article>
        </ContentWrapperWide>
      </main>
    </Layout>
  );
}
