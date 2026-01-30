# ✅ Cloudflare Pages Deploy Checklist

## 🎯 **Quick Reference**

### 📋 **Pre-Deploy Info**
- **GitHub Repo**: https://github.com/Gen099/FotoberRnD
- **Branch**: `main`
- **Project Name**: `fotober-rd-hub`

---

## 🚀 **STEP 1: Deploy Pages** (5 min)

### Go to: https://dash.cloudflare.com/

1. ☐ Workers & Pages → Create application → Pages
2. ☐ Connect to Git → GitHub
3. ☐ Select: `Gen099/FotoberRnD`
4. ☐ Begin setup

**Build Settings**:
```
Project name: fotober-rd-hub
Production branch: main
Build command: npm run build
Build output: dist
Root directory: (empty)
```

**Environment Variables** (click "Add environment variable"):
```
Name: OPENAI_API_KEY
Value: gsk-eyJjb2dlbl9pZCI6IjQzMGZjZDM5LTgxNTEtNDY1NC04M2FhLTI5OTgxZGVhMTAwNCIsImtleV9pZCI6IjY1MjJjMTI2LWRiYTYtNDk1YS1iYTdkLTAyNTc5MTI3YjdhNCIsImN0aW1lIjoxNzY5NzU1Nzg4LCJjbGF1ZGVfYmlnX21vZGVsIjpudWxsLCJjbGF1ZGVfbWlkZGxlX21vZGVsIjpudWxsLCJjbGF1ZGVfc21hbGxfbW9kZWwiOm51bGx9fJusH9qYRzpBSHJPNYEpaknoWDjq4R3jNbESXJ6pkdA6

Name: OPENAI_BASE_URL
Value: https://www.genspark.ai/api/llm_proxy/v1
```

5. ☐ Save and Deploy
6. ☐ Wait 3-5 min
7. ☐ Copy Production URL: `https://fotober-rd-hub.pages.dev`

---

## 💾 **STEP 2: Create D1 Database** (3 min)

1. ☐ Workers & Pages → D1 SQL Database
2. ☐ Create database
   - Name: `fotober-rd-hub-db`
   - Location: Automatic
3. ☐ Copy Database ID: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## 📝 **STEP 3: Run Migrations** (5 min)

1. ☐ Click `fotober-rd-hub-db` → Console tab
2. ☐ Copy SQL from: `migrations/0001_initial_schema.sql`
3. ☐ Paste into Console → Execute
4. ☐ Verify: `SELECT name FROM sqlite_master WHERE type='table';`
5. ☐ Should see: 5 tables

---

## 🔗 **STEP 4: Bind D1 to Pages** (2 min)

1. ☐ Workers & Pages → `fotober-rd-hub` → Settings
2. ☐ Functions → D1 database bindings → Add binding
   - Variable name: `DB`
   - D1 database: `fotober-rd-hub-db`
3. ☐ Save
4. ☐ Deployments tab → Retry deployment
5. ☐ Wait 2-3 min

---

## ✅ **STEP 5: Verify** (2 min)

Test URLs:
```
☐ https://fotober-rd-hub.pages.dev
☐ https://fotober-rd-hub.pages.dev/ai-tools
☐ https://fotober-rd-hub.pages.dev/analytics
☐ https://fotober-rd-hub.pages.dev/api/health
```

**AI Test**:
1. ☐ Go to /ai-tools
2. ☐ Select Gemini
3. ☐ Input: "Fotober là gì?"
4. ☐ Click "Phân tích với AI"
5. ☐ Should see results in 3-5 sec

---

## 🎉 **Done!**

Production URL: **https://fotober-rd-hub.pages.dev**

---

## 🆘 **Quick Fixes**

### ❌ Build failed?
→ Check build log in Cloudflare

### ❌ AI not working?
→ Verify env vars → Redeploy

### ❌ Database error?
→ Check D1 binding → Variable name: `DB`

### ❌ UI broken?
→ Hard refresh: `Ctrl + Shift + R`

---

**Total Time**: ~17 minutes

**Created**: 2026-01-30
**Version**: 1.0
