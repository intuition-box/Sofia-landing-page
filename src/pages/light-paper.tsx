import React from 'react';
import Layout from '@theme/Layout';

export default function LightPaper(): React.ReactElement {
  return (
    <Layout
      title="Light Paper"
      description="Sofia Light Paper">
      <main style={{ padding: '4rem 2rem', color: '#02000B', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <h1>Sofia – Give Meaning to Your Browsing</h1>

        <p>
          Sofia is a decentralized, intelligent interface that captures your web navigation, transforms it into verifiable knowledge, and helps you better understand – and leverage – your digital self.
        </p>

        <p>
          Every visited page, every action, every interest becomes a triples (who/what you are – what you do – on what content) stored under your control. This creates a living, semantic graph of your online activity, which you can enrich, share and get certified.
        </p>

        <h2>What Sofia Does for You</h2>

        <p>• Seamless analysis of your browsing – automatic capture of URLs, topics, behaviors</p>
        <p>• Automatic creation of verifiable triples (atoms) about your interests, skills and contributions</p>
        <p>• Personalized recommendations – events, content and people matched to your real behavior</p>
        <p>• Trusted interactions – discover profiles aligned with yours through verifiable links</p>

        <h2>A Network Based on Proof, Not Appearance</h2>

        <p>
          Sofia turns your browsing into personal certifications. Thanks to the Intuition System, your skills, preferences or relationships are not just declared – they are validated by you and by the community.
        </p>

        <h3>Examples:</h3>

        <p>
          You listen to electronic music? Sofia certifies this taste and links it to artists, genres, events.
        </p>

        <p>
          You contribute to open source? Your peers validate your development skills.
        </p>

        <p>
          Sofia also creates missing triplets automatically to connect data (e.g. from "I follow Kendrick Lamar" to "Kendrick Lamar is an artist" to "Artists are a YouTube category"), enriching the graph and making navigation easier.
        </p>

        <h2>How the System Is Funded</h2>

        <p>
          Each user delegates a small portion of their tokens to a personal UserWallet (ERC-4337). This wallet covers operational fees such as:
        </p>

        <p>• API calls through GaiaNet</p>
        <p>• On-chain registration of triples</p>
        <p>• Other interactions related to your data</p>

        <p>
          You remain the owner of your funds and can adjust or withdraw at any time.
        </p>

        <p>
          On our side, Sofia takes positions on triples created (a form of staking/betting on relevance). Profits generated feed an internal investment fund, financing the service and its continuous improvement.
        </p>

        <h2>What You Can Do With Sofia</h2>

        <p>• Build a personal, decentralized knowledge base on your choices</p>
        <p>• Share your interests or skills in a clear and credible way</p>
        <p>• Receive recommendations based on your real behaviors, not on opaque algorithms</p>
        <p>• Interact with certified profiles according to precise and verifiable affinities</p>
        <p>• Vote on others' knowledge or skills and strengthen their profile – like yours</p>

        <h2>You Remain in Control of Your Data</h2>

        <p>Sofia is built for privacy and decentralization:</p>

        <p>• Sensitive data protected</p>
        <p>• Ability to disable tracking at any time</p>
        <p>• Your data is not held by a large platform (neither by us)</p>
        <p>• You decide what to share, with whom and for what purpose</p>

        <h2>Why Sofia Is Unique</h2>

        <p>
          Unlike classic social networks or recommendation engines, Sofia does not guess who you are – it understands you. It builds with you a rich, evolving and certified digital identity, based on what you actually do. Each piece of information becomes an element of trust, validated by others in a human, contextual and transparent network.
        </p>

        <h2>Who Is Sofia For?</h2>

        <p>Sofia is for people who:</p>

        <p>• Want to regain control of their digital data</p>
        <p>• Seek useful and personalized recommendations</p>
        <p>• Wish to showcase their skills without constant self-promotion</p>
        <p>• Like to discover people and content truly aligned with them</p>
      </main>
    </Layout>
  );
}