---
sidebar_position: 2
title: Core Concepts
description: Understanding Atoms, Triples, and Vaults - the building blocks of Sofia
---

# Core Concepts

Sofia is built on the **Intuition Protocol**, a decentralized knowledge graph. Understanding these three core concepts will help you make the most of the platform.

## Atoms

An **Atom** is the fundamental unit of data in Intuition. Think of it as a unique identifier for any entity — a URL, a user, a concept, or an idea.

### What can be an Atom?

| Type | Example | Description |
|------|---------|-------------|
| **User** | `0x1234...abcd` | Your wallet address |
| **URL** | `https://github.com` | A webpage you visited |
| **Predicate** | `visits for work, trust, distrust` | A relationship type |

### How Atoms are created

When you certify a page for the first time, Sofia automatically creates:
1. An Atom for the URL (if it doesn't exist)
2. An Atom for the predicate (intention type)
3. Links them in a Triple

Each Atom has its own **vault** where users can deposit TRUST tokens.

---

### Anatomy of a Triple

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Subject   │ ──  │    Predicate     │ ──  │     Object      │
│  (You)      │     │ (visits for...)  │     │   (URL/Page)    │
└─────────────┘     └──────────────────┘     └─────────────────┘
```

### Example Triples in Sofia

| Subject | Predicate | Object |
|---------|-----------|--------|
| alice.eth | visits for learning | docs.python.org |
| bob.eth | visits for work | github.com/project |
| carol.eth | visits for inspiration | dribbble.com |

### Triple Properties

Each Triple has:
- **Vault ID**: Unique identifier on the blockchain
- **Creator**: The wallet that created it
- **Deposits**: Total TRUST tokens staked
- **Shares**: Proportional ownership of the vault

---
 
### Depositing & Redeeming

When you certify a page:
1. You **deposit** TRUST tokens into the Triple's vault
2. You receive **shares** proportional to your deposit
3. Early depositors get more shares (bonding curve advantage)

You can later **redeem** your shares for TRUST tokens, potentially at a profit if more users deposited after you.

---

## Putting It Together

Here's how these concepts connect when you certify a page:

```
1. You visit github.com/awesome-project

2. You click "Learning" to certify

3. Sofia creates/finds Atoms:
   - Atom A: Your wallet address
   - Atom B: "visits for learning" predicate
   - Atom C: github.com/awesome-project URL

4. Sofia creates Triple:
   A → B → C

5. You deposit 0.1 TRUST into the Triple's vault

6. You receive shares in that vault 

7. The certification is permanently on-chain
```

:::tip Understanding Value
The more users certify a page, the more valuable its vault becomes. Being an early "Pioneer" means you get more shares for the same TRUST deposit.
:::

---

## Predicates

Predicates are the "verbs" that connect you to the pages you certify. Each intention type has a corresponding predicate:

### Intention-Based Predicates

| Intention | Predicate |
|-----------|-----------|
| **Work** | "visits for work" |
| **Learning** | "visits for learning" |
| **Fun** | "visits for fun" |
| **Inspiration** | "visits for inspiration" |
| **Buying** | "visits for buying" |
| **Music** | "visits for music" |
| **Trusted** | "trusts" |
| **Distrusted** | "distrusts" |

---

