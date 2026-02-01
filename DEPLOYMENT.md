# Deployment Guide - Next.js on Vercel

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Vercel account (free tier is fine)
- Git repository (optional but recommended)

## Step-by-Step Deployment

### 1. Install Dependencies

**Important**: Due to PowerShell execution policy on Windows, you may need to use Command Prompt or enable scripts.

**Option A: Using Command Prompt (cmd.exe)**
```cmd
npm install
```

**Option B: Enable PowerShell Scripts (Run PowerShell as Administrator)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
```

### 2. Install Vercel CLI

```bash
npm install -g vercel
```

### 3. Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account.

### 4. Deploy to Vercel

```bash
# Deploy to preview
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? fotober-rd-hub (or your preferred name)
# - Directory? ./ (current directory)
# - Override settings? No
```

This will deploy your app to a preview URL (e.g., `fotober-rd-hub-xxx.vercel.app`).

### 5. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `fotober-rd-db`)
7. Select region (choose closest to your users)
8. Click **Create**

The database will be automatically connected to your project and environment variables will be added.

### 6. Initialize Database Schema

1. In Vercel Dashboard → Storage → Your Postgres Database
2. Click on **Query** tab
3. Copy the entire content from `lib/db/schema.sql`
4. Paste into the query editor
5. Click **Run Query**

This will create all necessary tables and indexes.

### 7. Deploy to Production

```bash
vercel --prod
```

Your app is now live at `fotober-rd-hub.vercel.app` (or your custom domain).

## Verifying Deployment

### Test the Application

1. Visit your production URL
2. Navigate to `/documents`
3. Try creating a new document
4. View document details
5. Test delete functionality

### Test API Endpoints

```bash
# Replace with your actual URL
export VERCEL_URL="https://fotober-rd-hub.vercel.app"

# Health check
curl $VERCEL_URL/api/health

# Get documents
curl $VERCEL_URL/api/documents

# Get statistics
curl $VERCEL_URL/api/analysis/statistics
```

## Local Development with Vercel Postgres

To develop locally with the Vercel Postgres database:

### 1. Link Local Project

```bash
vercel link
```

### 2. Pull Environment Variables

```bash
vercel env pull .env.local
```

This will download all environment variables (including `POSTGRES_URL`) to `.env.local`.

### 3. Run Development Server

```bash
npm run dev
```

Your local app will now connect to the Vercel Postgres database.

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 5-10 minutes)

## Environment Variables

Vercel automatically provides these when you connect Postgres:

- `POSTGRES_URL` - Main connection string
- `POSTGRES_PRISMA_URL` - For Prisma (with connection pooling)
- `POSTGRES_URL_NO_SSL` - Without SSL
- `POSTGRES_URL_NON_POOLING` - Direct connection
- `POSTGRES_USER` - Database user
- `POSTGRES_HOST` - Database host
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DATABASE` - Database name

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Error

1. Check Vercel Dashboard → Storage → Postgres → Settings
2. Verify database is running
3. Check environment variables in Vercel Dashboard → Settings → Environment Variables

### PowerShell Script Error

```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use (Local Dev)

```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

## Monitoring & Logs

### View Deployment Logs

1. Vercel Dashboard → Your Project → Deployments
2. Click on a deployment
3. View **Build Logs** and **Function Logs**

### View Database Logs

1. Vercel Dashboard → Storage → Your Postgres Database
2. Click on **Logs** tab

## Updating Your App

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push

# Or deploy directly
vercel --prod
```

Vercel will automatically deploy on every push to your main branch if connected to Git.

## Performance Optimization

### Enable Edge Runtime (Optional)

For faster response times, you can enable Edge Runtime for API routes:

```typescript
// app/api/documents/route.ts
export const runtime = 'edge';
```

### Add Caching

```typescript
// app/documents/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds
```

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use environment variables** for all secrets
3. **Enable HTTPS** - Automatic on Vercel
4. **Add rate limiting** - Consider Vercel Edge Middleware
5. **Validate inputs** - Already implemented in API routes

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Setup Postgres database
3. ✅ Initialize schema
4. ⏳ Add sample data
5. ⏳ Implement Analytics page
6. ⏳ Implement History page
7. ⏳ Add authentication (NextAuth.js)
8. ⏳ Setup custom domain
9. ⏳ Configure CI/CD with GitHub Actions

## Support

If you encounter any issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Next.js Documentation](https://nextjs.org/docs)
3. Check [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
4. Contact Fotober support: info@fotober.com

---

**Happy Deploying! 🚀**
