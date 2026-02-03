# Dropbox API Setup Guide

## 🔑 Getting Your API Token

Follow these steps to enable auto-preview for Dropbox folders:

### 1. Create Dropbox App

1. Go to https://www.dropbox.com/developers/apps
2. Click **"Create app"**
3. Choose:
   - **API:** Scoped access
   - **Access:** Full Dropbox
   - **Name:** `FeedbackReportViewer` (or any name)
4. Click **"Create app"**

### 2. Set Permissions

1. Go to **"Permissions"** tab
2. Enable these permissions:
   - ✅ `files.metadata.read` - Read file and folder metadata
   - ✅ `files.content.read` - Read file content
   - ✅ `sharing.read` - Read shared links
3. Click **"Submit"** at bottom

### 3. Generate Access Token

1. Go to **"Settings"** tab
2. Scroll down to **"Generated access token"** section
3. Click **"Generate"** button
4. Copy the token (starts with `sl.`)

### 4. Add Token to Environment

**For Local Development:**

Create/edit `.env.local` file in project root:

```bash
DROPBOX_ACCESS_TOKEN=sl.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**For Vercel Deployment:**

1. Go to Vercel dashboard → Your project
2. Settings → Environment Variables
3. Add new variable:
   - **Name:** `DROPBOX_ACCESS_TOKEN`
   - **Value:** `sl.xxxxxxx...` (your token)
   - **Environment:** Production, Preview, Development
4. Click **"Save"**
5. Redeploy project for changes to take effect

### 5. Restart Server

**Local:**
```bash
# Stop current dev server (Ctrl+C)
npm run dev
```

**Vercel:**
- Automatic redeploy when env var added

---

## 🧪 Testing

1. Open feedback page: `/feedback`
2. Go to **"GGsheet"** tab
3. Expand any job with Dropbox folder input (e.g., Job #1)
4. Should see:
   - "⏳ Loading folder contents..." (briefly)
   - Then carousel with all images from folder

---

## ⚠️ Troubleshooting

### Error: "Dropbox API token not configured"
- Token not in environment variables
- Check `.env.local` exists and has correct token
- Restart dev server after adding token

### Error: "Failed to get folder metadata"
- Shared link might be invalid
- Check link is set to "Anyone with link can view"
- Make sure link is for a folder, not file

### Error: "No images found in folder"
- Folder contains no images/videos
- Check folder has .jpg, .png, .mp4, etc.

### Images not loading
- Temporary links expire after 4 hours
- Folder contents are cached for 1 hour
- Expand/collapse job card to re-fetch

---

## 🔒 Security Notes

- ✅ Token is **read-only** (no write access)
- ✅ Token stored server-side only (never in browser)
- ✅ API route validates all requests
- ✅ Cached data stored locally only

---

## 📊 API Rate Limits

**Dropbox Free Tier:**
- ~300 API requests per hour
- Each folder preview = 2-3 requests

**Mitigation:**
- Folder contents cached for 1 hour (localStorage)
- Only fetches when job card expanded
- Shared cache across browser sessions

---

## ✅ Done!

Once token is added, all Dropbox folders will auto-preview with carousel. No more manual link listing! 🎉
