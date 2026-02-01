# Fotober R&D Intelligence Hub - Next.js

**Next.js 15 App Router** version deployed on **Vercel** with **Vercel Postgres** database.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Vercel account

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
# Copy .env.local and fill in your Vercel Postgres credentials
# Or link with Vercel project: vercel link && vercel env pull

# Run development server
npm run dev

# Open http://localhost:3000
```

### Deployment to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

After deployment:
1. Go to Vercel Dashboard → Storage → Create Postgres Database
2. Connect database to your project
3. Run the SQL schema from `lib/db/schema.sql` in the Vercel Postgres Query editor

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── documents/         # Documents page
│   ├── document/[id]/     # Document detail
│   ├── analytics/         # Analytics page
│   └── history/           # History page
├── components/            # React components
├── lib/                   # Libraries & utilities
│   ├── api/              # API client
│   ├── db/               # Database connection
│   └── services/         # Business logic
└── public/               # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres
- **Deployment**: Vercel
- **UI**: React 19

## 📖 Features

- ✅ Document management (CRUD)
- ✅ Document viewer with iframe embed
- ✅ Statistics dashboard
- ✅ Category filtering
- ✅ Responsive design
- ✅ PostgreSQL database
- ⏳ Analytics (coming soon)
- ⏳ History tracking (coming soon)

## 🔧 Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 📝 Environment Variables

Required environment variables (auto-provided by Vercel):
- `POSTGRES_URL` - Postgres connection string
- `POSTGRES_PRISMA_URL` - Postgres pooling URL
- `POSTGRES_URL_NON_POOLING` - Direct connection URL

## 📄 License

© 2026 Fotober Media Company Limited. All rights reserved.

## 🤝 Contact

- Website: fotober.com
- Email: info@fotober.com
- WhatsApp: +84 942 110 297
