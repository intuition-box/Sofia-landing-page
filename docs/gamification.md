---
sidebar_position: 4
title: Gamification
description: XP, Gold, Quests, Levels and the reward system
---

# Gamification

Sofia transforms knowledge certification into an engaging game with multiple progression systems. Here's how to level up and earn rewards.

## Currencies

Sofia has two distinct currencies:

### XP (Experience Points)

| Property | Description |
|----------|-------------|
| **Source** | Earned from completing quests |
| **Purpose** | Determines your user level |
| **Storage** | On-chain (verifiable) |
| **Tradeable** | No |

### Gold

| Property | Description |
|----------|-------------|
| **Source** | Certifications (+10), Discovery bonuses, Voting (+5/vote) |
| **Purpose** | Spent on domain level-ups |
| **Storage** | Off-chain (local) |
| **Tradeable** | No |

Gold formula: `totalGold = certificationGold + discoveryGold + voteGold - spentGold`

---

## User Levels

Your overall level reflects your engagement with Sofia:

```
Level 1  ──▶  Level 2  ──▶  Level 3  ──▶  ...  ──▶  Level 50
   │            │            │
   └── 0 XP     └── 100 XP   └── 300 XP
```

### Level Benefits

Higher levels unlock:
- Profile badges
- Extended features
- Community recognition
- Future airdrops eligibility

---

## Domain Levels

Each domain (website) you certify has its own level (1-10):

```
┌─────────────────────────────────────┐
│  github.com                         │
│                                     │
│  Level: ████████░░ 8/10             │
│  Certifications: 47                 │
│  Next Level: 3 more certifications  │
└─────────────────────────────────────┘
```

### Leveling Up Domains

To level up a domain:
1. Reach the certification threshold
2. Spend **Gold** to confirm the level-up
3. Receive XP bonus

### Level Thresholds

Certification thresholds: `[0, 3, 7, 12, 18, 25, 33, 42, 52, 63, 75]`

| Level | Certifications Required | Gold Cost |
|-------|------------------------|-----------|
| 1 → 2 | 3 | 30 Gold |
| 2 → 3 | 7 | 50 Gold |
| 3 → 4 | 12 | 75 Gold |
| 4 → 5 | 18 | 100 Gold |
| 5 → 6 | 25 | — |
| 6 → 7 | 33 | — |
| 7 → 8 | 42 | — |
| 8 → 9 | 52 | — |
| 9 → 10 | 63 | — |
| 10 → 11 | 75 | — |

---

## Quests

Sofia has **174 quests** that reward XP. Complete quests and claim XP on-chain to level up.

### Example Quests

| Quest | Description | Reward |
|-------|-------------|--------|
| **First Signal** | Make your first certification | 50 XP |
| **Daily Certification** | Certify at least 1 page today | 10 XP |
| **Daily Voter** | Vote on certifications today | 10 XP |
| **Domain Explorer** | Certify 5 different domains | 30 XP |
| **Social Linked** | Connect a social platform | 20 XP |
| **Golden Profile** | Verify all 5 social platforms | 100 XP |
| **Committed Streak** | Certify 7 days consecutively | 75 XP |
| **Intention Master** | Use all 8 intention types | 40 XP |
| **Pioneer Spirit** | Be first to certify a page | 15 XP |
| **Heavy Hitter** | Deposit 1+ TRUST in single certification | 50 XP |
| **List Curator** | Create your first curator list | 30 XP |

*...and 163 more quests to discover!*


### Daily Quests

Some quests reset daily:
- **Daily Certification**: Resets at midnight UTC
- **Daily Vote**: Cast your daily votes

---

## Discovery Rewards

When you're among the first to certify a page, you earn **Discovery Gold**:

### Discovery Tiers

| Position | Title | Gold Reward |
|----------|-------|-------------|
| 1st | **Pioneer** | +50 Gold |
| 2nd-10th | **Explorer** | +20 Gold |
| 11th+ | **Contributor** | +10 Gold |

### Discovery Indicator

The Weight Modal shows your potential discovery bonus:

```
┌──────────────────────────────────┐
│  Discovery Status: Pioneer! 🎯    │
│  You'll be the FIRST to certify  │
│  Bonus: +50 Gold                 │
└──────────────────────────────────┘
```

---

## Streaks

Streaks reward consistent daily engagement within a week. **Streaks reset to zero every Monday**, so each week is a fresh challenge.

### How Streaks Work

```
Mon       Tue       Wed       Thu       Fri       Sat       Sun
 ✓    ──▶  ✓    ──▶  ✓    ──▶  ✓    ──▶  ✓    ──▶  ✓    ──▶  ✓
 │         │         │         │         │         │         │
 1         2         3         4         5         6         7 🔥
                                                              │
                                                    MAX STREAK!
```

A streak increments each day you make **at least one certification**. Missing a day resets your streak to zero. At the start of each new week (Monday UTC), everyone's streak resets.

### Streak Rules

| Rule | Description |
|------|-------------|
| **Increment** | Certify at least 1 page per day |
| **Daily Reset** | Miss a day = streak goes to 0 |
| **Weekly Reset** | Every Monday at midnight UTC, all streaks reset to 0 |
| **Timezone** | Based on UTC midnight |
| **Max Streak** | 7 days (full week) |

### Streak Rewards

| Streak Length | Reward |
|---------------|--------|
| 3 days | +25 XP |
| 5 days | +50 XP |
| 7 days (full week) | +100 XP + Weekly Champion badge |

### Streak Display

Your current streak appears in your profile and dashboard:

```
┌─────────────────────────────────────────┐
│  🔥 Current Streak: 5 days              │
│                                         │
│  ┌─┬─┬─┬─┬─┬─┬─┐                        │
│  │M│T│W│T│F│S│S│  This week             │
│  │✓│✓│✓│✓│✓│○│○│                        │
│  └─┴─┴─┴─┴─┴─┴─┘                        │
│                                         │
│  2 more days for Weekly Champion!       │
└─────────────────────────────────────────┘
```

### Streak Tips

- Aim for the full 7-day streak each week for maximum XP
- Even a small certification (0.01 TRUST) counts
- Check your local time vs UTC to avoid missing the deadline
- Weekend certifications are crucial — don't skip Saturday/Sunday

---

## Voting System

Participate in community decisions to earn Gold and XP.

### Vote Types

| Vote Type | Cost | Reward |
|-----------|------|--------|
| **Like/Dislike** on certifications | 1 TRUST (on-chain) | +5 Gold |
| **Support/Oppose** on claims | Custom TRUST | +5 Gold |

### Daily Limits
- **10 votes per day** maximum
- **50 Gold/day** cap from voting
- Each vote also contributes to the **Daily Voter** quest

### What You Can Vote On
- Other users' certifications (Like/Dislike)
- Sofia Claims and Featured Claims (Support/Oppose)
- Featured Lists entries

---

## Badges

Badges are visual achievements displayed on your profile:

### Badge Categories

| Category | Examples |
|----------|----------|
| **Milestones** | First certification, 100 certifications |
| **Streaks** | 7-day streak, 30-day streak |
| **Social** | Verified Twitter, Golden Profile |
| **Pioneer** | First 100 users, Beta tester |
| **Expertise** | Domain specialist badges |

### Badge Display

```
┌─────────────────────────────────────┐
│  Your Badges                        │
│                                     │
│  🏆 Pioneer    🔥 7-Day    ✓ Twitter │
│  📚 Scholar   💎 Diamond   🎯 First  │
└─────────────────────────────────────┘
```

---

## Beta Season Pool

During beta, a portion of all deposits goes to a shared pool:

### How It Works

```
Your Deposit: 1.0 TRUST
     │
     ├── 80% → Triple Vault (yours)
     │
     └── 20% → Beta Season Pool (shared)
```

### Pool Distribution

At the end of beta season:
- Pool is distributed to participants
- Based on contribution and engagement
- Rewards early and active users

---

## Progression Tips

1. **Complete daily quests** for consistent XP gain
2. **Be a Pioneer** — certify new pages first for Gold
3. **Use all 8 intentions** to unlock Intention Master quest
4. **Link social accounts** for easy XP and Golden Profile
5. **Focus on favorite domains** to level them up faster
6. **Vote daily** for steady Gold income

---

:::tip Maximizing Rewards
The best strategy is consistency. Daily certifications and votes compound over time, building both your level and your on-chain reputation.
:::
