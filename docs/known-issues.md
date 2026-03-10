---
sidebar_position: 7
title: Known Issues
description: Current limitations and workarounds for Sofia alpha
---

# Known Issues

Sofia is in alpha and some issues are known. Here's how to work around them.

## Transaction Failed After Refresh

**Problem**: If you refresh the extension and then try to make a transaction from a tab that was already open, the transaction will fail.

**Solution**: Close the tab and open a new one. Make your certification from the freshly opened tab.

```
❌ Refresh extension → Use existing tab → TX Failed
✓  Refresh extension → Open NEW tab → TX Success
```

---

## Social Verification Issues

**Problem**: Social platform linking (YouTube, Twitch) may fail or not work properly.

**Cause**: This is often because your email address hasn't been registered with the core team. Social OAuth requires backend configuration for each user.

**Solution**: Contact the core team and provide your email address. They need to perform a manual configuration on their end to enable your social verifications.

---

## Spotify Verification

**Problem**: Spotify verification is currently unreliable or unavailable.

**Cause**: This is a Spotify API limitation. Spotify has strict OAuth policies that limit which users can authenticate with third-party apps in development mode.

**Status**: The core team is actively working on a solution. In the meantime, you can still achieve Golden Profile by verifying the other 4 platforms once this limitation is resolved.

---

:::note Alpha Software
These issues are being actively tracked and fixed. If you encounter other bugs, please report them to the core team on the dedicated Discord Channel. Never contact the core team in DM. 
:::
