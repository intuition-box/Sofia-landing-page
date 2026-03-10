---
sidebar_position: 3
title: Features
description: Echoes, Intentions, Certifications and how they work together
---

# Features

Sofia organizes your browsing activity and transforms it into meaningful, certified knowledge. Here's how each feature works.

## Getting Started

### Import Chrome Bookmarks

On first launch, Sofia can **import your existing Chrome bookmarks** to give you a rich starting history. This populates your Echoes with domains you've already bookmarked.

### Toggle Tracking

You can **enable or disable tracking** at any time in Settings. When enabled, Sofia tracks pages you visit for 3+ seconds.

---

## Echoes

**Echoes** are your browsing history, intelligently grouped by domain. Instead of a linear list of URLs, Sofia clusters all your visits to the same website together.

### How Echoes Work

```
┌─────────────────────────────────────────────┐
│  github.com                    Level 3  ⭐   │
│  ├── /user/repo-1              Learning     │
│  ├── /user/repo-2              Work         │
│  └── /trending                 (uncertified)│
├─────────────────────────────────────────────┤
│  stackoverflow.com             Level 1      │
│  └── /questions/12345          Learning     │
└─────────────────────────────────────────────┘
```

### Echo Properties

| Property | Description |
|----------|-------------|
| **Domain** | The website (e.g., github.com) |
| **Pages** | Individual URLs visited |
| **Level** | Your progression with this domain (1-10) |
| **Certifications** | Number of certified pages |
| **Last Visit** | When you last visited |

### Domain Normalization

Sofia normalizes domains for cleaner grouping:
- `www.github.com` → `github.com`
- `m.facebook.com` → `facebook.com`
- `app.slack.com` → `slack.com`

### Echo Actions

| Action | Description |
|--------|-------------|
| **Sort** | By level, URL count, alphabetical, or recent visit |
| **Filter** | By intention type (Work, Learning, Fun, etc.) |
| **Open** | View all URLs in a domain |
| **Level Up** | Spend Gold to level up (AI generates new predicate) |
| **Amplify** | Publish on-chain: "I [predicate] [domain]" |
| **Delete** | Remove domain from local view (on-chain certs remain) |
| **Remove URL** | Remove a URL; if certified, reclaim your stake |

### Amplify a Domain

When you **Amplify** a domain, you publish an on-chain identity statement:

```
"I [predicate] [domain]"

Example: "I visit for learning github.com"
```

This costs a minimum of 0.01 TRUST and creates a permanent on-chain record of your relationship with that domain.

---

## Intentions

Every certification requires an **Intention** — your reason for visiting that page. Sofia offers 8 intention types:

### The 8 Intentions

| Intention | Use Case | Examples |
|-----------|----------|----------|
| **Work** | Professional tasks | Documentation, tools, repos |
| **Learning** | Education & growth | Tutorials, courses, docs |
| **Fun**  | Entertainment | Videos, games, social media |
| **Inspiration** | Ideas & creativity | Design, portfolios, articles |
| **Buying** | Shopping & commerce | E-commerce, reviews, deals |
| **Music** | Music content | Spotify, SoundCloud, playlists |
| **Trusted** | Sources you trust | Reliable references, verified info |
| **Distrusted** | Sources you distrust | Misinformation, unreliable content |

### Why Intentions Matter

Intentions create semantic meaning in your certifications:

```
Without intention: "User visited page"
With intention:    "User visits page for learning"
```

This semantic layer enables:
- **Interest mapping**: Track what topics you study vs. work on
- **Trust signals**: Mark sources as trusted or distrusted
- **Profile building**: Your expertise areas emerge from certifications

---

## Certifications

A **Certification** is the act of committing a page visit to the blockchain with an intention and a TRUST deposit.

### Certification Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. Select   │ ─▶ │  2. Choose   │ ─▶ │  3. Deposit  │
│     Page     │    │   Intention  │    │    TRUST     │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  6. Earn     │ ◀─ │  5. Triple   │ ◀─ │  4. Sign     │
│   Rewards    │    │   Created    │    │     TX       │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Certification Details

When you certify, you configure:

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Amount** | TRUST tokens to deposit | 0.01 TRUST |
| **Pool Split** | % going to Beta Season Pool | 20% |
| **Intention** | Your reason for visiting | Required |

### What Happens On-Chain

1. **Atom Creation**: URL atom created (if new)
2. **Triple Creation**: Subject-Predicate-Object relationship
3. **Deposit**: TRUST tokens locked in vault
4. **Shares**: You receive vault shares

### Re-Certifying

You can add more weight to existing certifications:
- **Same intention**: Increases your stake
- **Different intention**: Creates a new triple

---

## The Weight Modal

The **Weight Modal** appears when you certify, showing all transaction details:

```
┌─────────────────────────────────────────┐
│           Certify this page             │
├─────────────────────────────────────────┤
│  Amount:        [0.1 TRUST    ▼]        │
│  Pool Split:    [20%          ▼]        │
├─────────────────────────────────────────┤
│  Breakdown:                             │
│  ├── To Vault:        0.072 TRUST       │
│  ├── To Pool:         0.018 TRUST       │
│  └── Fees:            0.010 TRUST       │
├─────────────────────────────────────────┤
│  Estimated Shares:    ~15.2             │
│  Discovery Bonus:     Pioneer (+50 Gold)│
├─────────────────────────────────────────┤
│  [Cancel]              [Confirm]        │
└─────────────────────────────────────────┘
```

### Understanding Fees

| Fee Type | Description |
|----------|-------------|
| **Protocol Fee** | Intuition network fee |
| **Sofia Fee** | Platform fee (5%) |
| **Gas** | Blockchain transaction cost |

---

## Bookmarks & Signals


### Bookmarks
- Organize into intention lists
- Visible to other users from your profile

---

## Page States

Every page in Sofia has a state:

| State | Description | Visual |
|-------|-------------|--------|
| **Unvisited** | Never tracked | Gray |
| **Visited** | In your Echoes, not certified | White |
| **Certified** | On-chain with intention | Colored by intention |
| **Weighted** | Multiple certifications | Thicker border |

---

:::info Tracking Privacy
Sofia only tracks pages you actively browse (3+ seconds). Auth pages, ads, and tracking pixels are automatically filtered out.
:::
