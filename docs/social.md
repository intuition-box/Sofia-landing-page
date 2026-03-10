---
sidebar_position: 6
title: Social Features
description: Following, Trust Circle, Curator Lists, and social verification
---

# Social Features

Sofia is more than a personal tool — it's a social knowledge network. Connect with others, build trust, and curate shared knowledge.

## Social Verification

Link your social accounts to verify your identity and earn rewards.

### Supported Platforms

| Platform | Verification Method | Quest Reward |
|----------|--------------------| -------------|
| **Twitter/X** | OAuth connection | 20 XP |
| **Discord** | OAuth connection | 20 XP |
| **YouTube** | OAuth connection | 20 XP |
| **Twitch** | OAuth connection | 20 XP |
| **Spotify** | OAuth connection | 20 XP |

### Golden Profile

When you verify **all 5 platforms**, you unlock:
- **Golden Border**: A distinctive golden avatar frame
- **Golden Profile Quest**: +100 XP bonus
- **Enhanced Trust**: Higher credibility in the network

```
┌─────────────────────────────────────────┐
│  Social Verification                    │
│                                         │
│  ✓ Twitter    ✓ Discord    ✓ YouTube   │
│  ✓ Twitch     ✓ Spotify                │
│                                         │
│  🏆 Golden Profile Achieved!            │
└─────────────────────────────────────────┘
```

---

## Following System

Follow other users to track their certifications and build your network.

### How Following Works

```
┌─────────────┐         ┌─────────────┐
│    You      │ ──────▶ │   Expert    │
│             │ follow  │             │
└─────────────┘         └─────────────┘
        │                      │
        │                      ▼
        │              Their Certifications
        │              appear in your feed
        │                      │
        └──────────────────────┘
```

### Follow Actions

| Action | Result |
|--------|--------|
| **Follow** | See their certifications in your feed |
| **Unfollow** | Remove them from your feed |
| **View Profile** | See their full certification history |

### Following vs. Trust Circle

| Feature | Following | Trust Circle |
|---------|-----------|--------------|
| **Cost** | Free | TRUST deposit |
| **Relationship** | Social | Economic |
| **On-chain** | No | Yes |
| **Shows support** | Weakly | Strongly |

---

## Trust Circle

The **Trust Circle** is an on-chain way to vouch for other users by staking TRUST tokens.

### How Trust Circle Works

When you add someone to your Trust Circle:
1. You deposit TRUST tokens on their account atom
2. You receive shares in their account vault
3. Your stake shows public support for them
4. You can redeem later (potentially with gains)

```
┌─────────────────────────────────────────┐
│  Trust Circle                           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ vitalik.eth                     │    │
│  │ Staked: 10 TRUST | Shares: 145  │    │
│  │ P&L: +2.3 TRUST (+23%)         │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ naval.eth                       │    │
│  │ Staked: 5 TRUST | Shares: 67    │    │
│  │ P&L: +0.8 TRUST (+16%)         │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Trust Economics

| Metric | Description |
|--------|-------------|
| **Total Staked** | TRUST tokens you've deposited |
| **Shares** | Your ownership in their vault |
| **Market Cap** | Total value staked by all supporters |
| **P&L** | Your profit/loss if you redeemed now |

---

## Curator Lists

Create and share curated collections of certifications.

### What Are Curator Lists?

A **Curator List** is a themed collection of triples (certifications) that you assemble and share with others:

```
┌─────────────────────────────────────────┐
│  📚 "Best React Learning Resources"     │
│  by alice.eth                           │
│                                         │
│  15 pages | 234 followers | +45 P&L     │
│                                         │
│  ├── react.dev/learn                    │
│  ├── beta.reactjs.org/reference         │
│  ├── epicreact.dev                      │
│  ├── kentcdodds.com/blog                │
│  └── ... 11 more                        │
│                                         │
│  [Follow List] [View All]               │
└─────────────────────────────────────────┘
```

### List Features

| Feature | Description |
|---------|-------------|
| **Theme** | Topic or category of the list |
| **Entries** | Triples included in the list |
| **Followers** | Users following your list |
| **P&L** | Performance of the combined positions |
| **Market Cap** | Total value across all entries |

### Creating a List

1. Go to the **Lists** tab
2. Click **Create New List**
3. Name your list and add a description
4. Add triples from your certifications or search
5. Publish to make it discoverable

### List Economics

When others follow your list:
- They can stake on your curation
- Your list gains visibility
- High-performing lists attract more followers

---

## User Profiles

Every Sofia user has a public profile showing their activity.

### Profile Components

```
┌─────────────────────────────────────────┐
│  ┌─────┐  alice.eth                     │
│  │ 👤  │  Level 12 | 1,240 XP          │
│  │     │  Member since Jan 2024         │
│  └─────┘                                │
├─────────────────────────────────────────┤
│  Badges: 🏆 Pioneer  🔥 Streak  ✓ Gold │
├─────────────────────────────────────────┤
│  Stats:                                 │
│  • 156 Certifications                   │
│  • 23 Domains at Level 5+               │
│  • 12 Curator Lists                     │
│  • 89 Trust Circle members              │
├─────────────────────────────────────────┤
│  Top Interests:                         │
│  Software Development, Design, Web3     │
├─────────────────────────────────────────┤
│  Recent Activity:                       │
│  • Certified react.dev for Learning     │
│  • Created list "Web3 Security"         │
│  • Followed vitalik.eth                 │
└─────────────────────────────────────────┘
```

### Profile Stats

| Stat | Description |
|------|-------------|
| **Level** | Overall user level from XP |
| **Certifications** | Total on-chain certifications |
| **Domains** | Unique websites certified |
| **Lists** | Curator lists created |
| **Trust Circle** | Users in your circle |
| **Followers** | Users following you |
| **Following** | Users you follow |

---

## Discovery Feed

See what the community is certifying:

### Feed Types

| Feed | Content |
|------|---------|
| **Following** | Certifications from users you follow |
| **Trending** | Most certified pages right now |
| **Global** | All recent certifications |

### Feed Entry

```
┌─────────────────────────────────────────┐
│  bob.eth certified github.com/project   │
│  for Work • 2 hours ago                 │
│                                         │
│  "Uses professionally for backend dev"  │
│                                         │
│  Deposit: 0.5 TRUST | Pioneer 🎯        │
│                                         │
│  [👍 Vote] [View Page] [Follow]         │
└─────────────────────────────────────────┘
```

---

## Community Voting

Participate in the community and earn Gold by voting.

### Vote Types

| Action | Cost | Reward |
|--------|------|--------|
| **Like/Dislike** certifications | 1 TRUST | +5 Gold |
| **Support/Oppose** claims | Custom TRUST | +5 Gold |

### Daily Limits

- **10 votes per day** maximum
- **50 Gold daily cap** from voting

:::note More on Voting
See [Resonance](./resonance.md) for details on Claims, Featured Lists, and the Debate system.
:::

---

:::tip Building Reputation
Your on-chain reputation grows with every certification, every follower, and every successful curation. Consistency and quality matter more than quantity.
:::
