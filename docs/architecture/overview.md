---
sidebar_position: 1
title: Overview
---

# Architecture Overview

Sofia's architecture is designed around privacy, decentralization, and verifiable knowledge. The system leverages multiple technologies to ensure your data remains secure while providing powerful AI-driven insights.

## Architecture Diagram

import BrowserOnly from '@docusaurus/BrowserOnly';
import ExcalidrawViewer from '@site/src/components/ExcalidrawViewer';

<BrowserOnly fallback={<p>Loading diagram...</p>}>
  {() => <ExcalidrawViewer src="/excalidraw/architecture-diagram.excalidraw.json" />}
</BrowserOnly>

The Sofia architecture consists of several interconnected layers working together to provide a secure, private, and intelligent experience.

## Key Components

### Chrome Extension (User Layer)

The Sofia Chrome Extension is your gateway to the system. It monitors your browsing activity, capturing URLs and context to build your personal knowledge graph. The extension runs locally in your browser, ensuring initial data capture happens on your device.

### Phala TEE Machine (Privacy Layer)

All sensitive data processing happens within a Trusted Execution Environment (TEE) powered by Phala Network. This ensures that your browsing data is processed in a secure, isolated environment where even the infrastructure provider cannot access your raw data.

Our core values emphasize end-to-end encrypted data certification, ensuring that all information remains protected from the moment it is created until it is processed. We also provide public verification of data encryption through on-chain attestations, offering full transparency and trust.

Our ultimate intention is to guarantee users true decentralization — even we have no access to the data that transits within the TEE.

### ELIZA Docker & Agents (Intelligence Layer)

ElizaOS agents run within the TEE, analyzing your browsing patterns and generating insights. These AI agents are trained to understand context, extract meaningful signals, and create connections in your knowledge graph – all while respecting your privacy.

### GaiaNet (AI Infrastructure)

GaiaNet provides the decentralized AI infrastructure that powers Sofia's intelligent features. It ensures AI models run efficiently while maintaining privacy and decentralization principles.

### Intuition MCP & Indexer (Knowledge Layer)

Anonymized and aggregated signals are sent to the Intuition system, where they're transformed into triples (subject-predicate-object statements) and indexed on-chain. This creates a verifiable, decentralized knowledge graph that you control.


## Data Flow

1. **Capture:** Your browsing activity is captured by the Chrome Extension
2. **Process:** Data is sent to Phala TEE for secure processing
3. **Analyze:** ELIZA agents analyze patterns and generate insights within the TEE
4. **Anonymize:** Processed data is anonymized before leaving the TEE
5. **Index:** Anonymized signals are indexed on-chain through Intuition
6. **Query:** Interaction are made throught the smart contract
