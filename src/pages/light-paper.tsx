import React from 'react';
import Layout from '@theme/Layout';

export default function LightPaper(): React.ReactElement {
  return (
    <Layout
      title="Light Paper"
      description="Sofia Light Paper">
      <main style={{ padding: '4rem 2rem', color: '#02000B', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <h1>Sofia – Give Meaning to Your Browsing</h1>
        <br></br>

        <p>
          Sofia is a decentralized, intelligent interface that captures your web navigation, transforms it into verifiable knowledge, and helps you better understand – and leverage – your digital self.
        </p>

        <p>
          Every visited page, every action, every interest becomes a signal (who/what you are – what you do – on what content) stored under your control. This creates a living, semantic graph of your online activity, which you can enrich, share and get certified.
        </p>
        <br></br>


        <h2>What Sofia Does for You</h2>

        <ul>
          <li>An AI that belongs to you – Thanks to Gaianet and ElizaOS, Sofia provides you with a personal and inviolable AI.</li>
          <li>Seamless analysis of your browsing – automatic capture of URLs, topics, behaviors</li>
          <li>Automatic creation of verifiable signals (triples of atoms) about your interests, skills and taste</li>
          <li>Personalized recommendations – content and people matched to your real behavior</li>
          <li>Trusted interactions – discover profiles aligned with yours through verifiable links</li>
        </ul>
        <br></br>

        <h2>A Network Based on Proof, Not Appearance</h2>

        <p>
          Sofia turns your browsing into personal certifications. Thanks to the Intuition System, your skills, preferences or relationships are not just declared – they are validated by you and by the community.
        </p>

        <p>Examples:</p>

        <ul>
          <li>You listen to electronic music? Sofia certifies this taste and links it to artists, genres, events.</li>
          <li>You contribute to an open source dApp? Your peers validate your development skills by voting on your signals.</li>
          <li>Sofia creates missing signals automatically to connect data (e.g. from "I follow Kendrick Lamar" to "Kendrick Lamar is an artist" to "Artists are on YouTube"), enriching the global graph and making navigation and recommendation easier.</li>
        </ul>
<br></br>

        <h2>Subscription Model</h2>

        <p>
          By subscribing to Sofia, you activate a UserWallet (ERC-4337) linked to your Metamask wallet.
        </p>

        <p>Your subscription funds are used to automatically cover the operational costs of the service, including:</p>
        <ul>
          <li>On-chain creation and registration of your signals</li>
          <li>API calls through GaiaNet</li>
        </ul>

        <p>You remain the full owner of your funds: you can top up, adjust, or cancel your subscription at any time. More details will come on the beta launch.</p>

        {/* <p>
          On our side, Sofia takes positions on signals created (a form of staking/betting on relevance). Profits generated feed an internal investment fund, financing the service and its continuous improvement.
        </p> */}

        <br></br>
        <h2>What You Can Do With Sofia</h2>

        <ul>
          <li>Build a personal, decentralized knowledge base on your choices</li>
          <li>Share your interests or skills in a clear and credible way with your trust circle</li>
          <li>Receive recommendations based on your real behaviors, not on opaque algorithms</li>
          <li>Interact with certified profiles according to precise and verifiable affinities</li>
          <li>Vote on other's knowledge or skills and strengthen their profile – like yours</li>
        </ul>

        <br></br>
        <h2>You Remain in Control of Your Data</h2>

        <p>Sofia is built for privacy and decentralization:</p>

        <ul>
          <li>Sensitive data protected</li>
          <li>Personal AI</li>
          <li>Ability to disable tracking at any time</li>
          <li>Your data is not held by a large platform (neither by us)</li>
          <li>You decide what to share, with whom and for what purpose</li>
        </ul>
        
        
        <br></br>
        <h2>Why Sofia Is Unique</h2>

        <p>
          Unlike classic social networks or recommendation engines, Sofia does not guess who you are – it understands you. It builds with you a rich, evolving and certified digital identity, based on what you actually do. Each piece of information becomes an element of trust, validated by others in a human, contextual and transparent network.
        </p>

        <br></br>
        <h2>Who Is Sofia For?</h2>

        <p>Sofia is for people who:</p>

        <ul>
          <li>Want to regain control of their digital data</li>
          <li>Seek useful and personalized recommendations</li>
          <li>Wish to showcase their skills without constant self-promotion</li>
          <li>Like to discover people and content truly aligned with them</li>
        </ul>
      </main>
    </Layout>
  );
}