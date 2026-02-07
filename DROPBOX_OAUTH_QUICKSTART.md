# Quick Start: Fix Dropbox Authentication

## 🚨 Problem
Your Dropbox access token has expired. You're seeing `expired_access_token` errors in the console.

## ✅ Solution
Follow these steps to set up permanent OAuth 2.0 authentication:

### 1. Update Dropbox App (2 minutes)

1. Go to https://www.dropbox.com/developers/apps
2. Click your app → **Settings** tab
3. Scroll to **Redirect URIs** → Click **Add**
4. Add: `http://localhost:3000/api/auth/dropbox/callback`
5. Click **Add** button
6. Copy your **App key** and **App secret**

### 2. Update Environment Variables (1 minute)

Open `.env.local` and add:

```bash
DROPBOX_APP_KEY=paste_your_app_key_here
DROPBOX_APP_SECRET=paste_your_app_secret_here
NEXT_PUBLIC_DROPBOX_APP_KEY=paste_your_app_key_here
```

### 3. Run OAuth Flow (2 minutes)

```bash
# Start dev server
npm run dev

# Open browser to:
# http://localhost:3000/admin/dropbox-setup

# Click "Connect Dropbox"
# Authorize the app
# Copy the refresh token shown
```

### 4. Add Refresh Token (1 minute)

Add to `.env.local`:

```bash
DROPBOX_REFRESH_TOKEN=paste_refresh_token_here
```

Restart server:
```bash
# Ctrl+C to stop
npm run dev
```

### 5. Test (30 seconds)

1. Go to http://localhost:3000/feedback
2. Click **GGsheet** tab
3. Expand any job with Dropbox folder
4. Should load images! ✅

---

## 🎉 Done!

Your Dropbox integration will now work forever without manual token updates!

**For detailed documentation, see:** [DROPBOX_API_SETUP.md](./DROPBOX_API_SETUP.md)
