# 🚀 Deployment Guide - Fotober R&D Intelligence Hub

## ✅ GitHub Repository
- **URL**: https://github.com/Gen099/FotoberRnD
- **Branch**: main
- **Status**: ✅ All code pushed successfully

---

## 🌐 Deploy to Cloudflare Pages (via Dashboard)

### Step 1: Login Cloudflare
1. Truy cập: https://dash.cloudflare.com
2. Login với tài khoản Cloudflare

### Step 2: Create Pages Project
1. Sidebar → **Pages** → **Create a project**
2. Click **Connect to Git**
3. Authorize GitHub (if not already)
4. Select repository: **Gen099/FotoberRnD**

### Step 3: Configure Build Settings
```
Project name: fotober-rd-hub
Production branch: main
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
```

### Step 4: Environment Variables (REQUIRED!)
Add these two variables:

**Variable 1:**
```
Name: OPENAI_API_KEY
Value: [Your GenSpark API key from .dev.vars file]
```

**Variable 2:**
```
Name: OPENAI_BASE_URL  
Value: https://www.genspark.ai/api/llm_proxy/v1
```

**How to get OPENAI_API_KEY:**
- Check `/home/user/webapp/.dev.vars` file in sandbox
- Or get from GenSpark API Keys settings

### Step 5: Deploy!
1. Click **Save and Deploy**
2. Wait ~2-3 minutes for build
3. You'll receive URL: `https://fotober-rd-hub.pages.dev`

### Step 6: Verify Deployment
Test these URLs:
- Homepage: `https://fotober-rd-hub.pages.dev/`
- Analytics: `https://fotober-rd-hub.pages.dev/analytics`
- AI Tools: `https://fotober-rd-hub.pages.dev/ai-tools`

---

## 🗄️ D1 Database Setup (Optional but Recommended)

**Note:** Website works without D1. D1 only enables AI usage logging.

### Method 1: Via Cloudflare Dashboard (Recommended)

#### 1. Create Database
1. Sidebar → **D1** → **Create database**
2. Database name: `fotober-rd-hub-db`
3. Location: Automatic
4. Click **Create**
5. **Copy Database ID** (you'll need this)

#### 2. Run Migration
1. Click on database → **Console** tab
2. Open file: `/home/user/webapp/migrations/0001_initial_schema.sql`
3. Copy entire SQL content
4. Paste into Console
5. Click **Execute**
6. Verify: You should see 5 tables created

#### 3. Bind to Pages
1. Go to **Pages** → **fotober-rd-hub** → **Settings** → **Functions**
2. Scroll to **D1 database bindings**
3. Click **Add binding**
4. Settings:
   ```
   Variable name: DB
   D1 database: fotober-rd-hub-db
   ```
5. Click **Save**

#### 4. Redeploy
1. Go to **Deployments** tab
2. Find latest deployment
3. Click **"..."** → **Retry deployment**
4. Wait for redeploy to complete

### Method 2: Via CLI (if you have working Cloudflare API token)

```bash
cd /home/user/webapp

# Create database
npx wrangler d1 create fotober-rd-hub-db

# Copy database_id from output

# Update wrangler.jsonc:
# Add to d1_databases array with the database_id

# Run migrations
npx wrangler d1 migrations apply fotober-rd-hub-db --remote
```

---

## 📝 Deployment Checklist

### Before Deployment
- [x] Code complete and tested
- [x] GitHub repository created and pushed
- [ ] Cloudflare account ready
- [ ] GitHub authorized in Cloudflare
- [ ] OPENAI_API_KEY ready to paste

### During Deployment
- [ ] Connected to Gen099/FotoberRnD repository
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Added OPENAI_API_KEY environment variable
- [ ] Added OPENAI_BASE_URL environment variable
- [ ] Deployment successful

### After Pages Deploy
- [ ] Verified homepage loads
- [ ] Tested /analytics page
- [ ] Tested /ai-tools page
- [ ] Verified AI analysis works

### D1 Database (Optional)
- [ ] Created D1 database
- [ ] Ran migration SQL
- [ ] Bound D1 to Pages project
- [ ] Redeployed Pages
- [ ] Verified no errors

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Cloudflare Pages
- Verify build command is `npm run build`
- Verify output directory is `dist`
- Try redeploying (usually fixes it)

### AI Tools Not Working
- Verify OPENAI_API_KEY is set correctly
- Verify OPENAI_BASE_URL is set correctly
- Check browser console for errors
- Try with different AI provider (Gemini is default)

### D1 Database Issues
- Verify binding variable name is exactly `DB`
- Verify migration SQL executed without errors
- Check Pages Functions logs
- Redeploy after binding changes

### Environment Variables Not Applied
- Go to Settings → Environment variables
- Verify both variables are present
- If missing, add them and redeploy
- Environment variables need redeploy to take effect

---

## 🌟 Post-Deployment

### Custom Domain (Optional)
1. Pages → fotober-rd-hub → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `rd.fotober.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (usually ~5 minutes)

### Analytics
- Cloudflare provides built-in analytics
- View in Pages → fotober-rd-hub → **Analytics**
- See page views, bandwidth, errors, etc.

### Monitoring
- Set up alerts in Cloudflare
- Monitor error rates
- Track performance metrics

---

## 📊 What You Get

### Production URLs
- **Primary**: `https://fotober-rd-hub.pages.dev`
- **Branch**: `https://main.fotober-rd-hub.pages.dev`
- **Custom**: `https://your-domain.com` (if configured)

### Features Available
✅ Homepage with stats dashboard  
✅ Analytics page with 4 charts  
✅ AI Tools with 4 analysis types  
✅ Multi-AI provider support (Gemini, GLM, OpenAI, Claude)  
✅ Document management foundation  
✅ Responsive design  
✅ SSL certificate (automatic)  
✅ Global CDN (automatic)  
✅ Automatic deployments (on git push)  

### Performance
- **Global Edge Network**: Deployed to 300+ cities
- **Fast Response**: <100ms globally
- **SSL/TLS**: Automatic HTTPS
- **DDoS Protection**: Included
- **Unlimited Bandwidth**: On free plan

---

## 🎯 Success Metrics

After deployment, verify:
- [ ] Homepage loads in <2 seconds
- [ ] All navigation links work
- [ ] AI Tools can analyze text
- [ ] Charts render correctly
- [ ] Mobile responsive works
- [ ] No console errors

---

## 📞 Support

If you encounter issues:
1. Check Cloudflare Pages build logs
2. Check browser console for errors
3. Verify environment variables are set
4. Try redeploying
5. Check GitHub repository is up to date

---

## 🎉 Congratulations!

Once deployed, you'll have:
- ✅ Production-ready web application
- ✅ AI-powered analysis tools
- ✅ Beautiful UI with orange gradient theme
- ✅ Global CDN distribution
- ✅ Automatic HTTPS
- ✅ Continuous deployment (git push = auto deploy)

**Estimated Total Time:** 10-15 minutes

**You're live! 🚀**
