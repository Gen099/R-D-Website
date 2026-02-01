# Fotober R&D Specialist Website

Website quản lý và trình bày thông tin R&D Specialist cho Fotober AI Video.

## 🚀 Features

- ✅ **9 Modules hoàn chỉnh:** Dashboard, Feedback Analysis, AI Problems, Effects Catalog, Competition, Job Description, Operations, Platform, Resources
- ✅ **Responsive Design:** Mobile, tablet, desktop
- ✅ **Design System:** CSS Variables, consistent styling
- ✅ **Data Visualization:** Tables, cards, progress bars, metrics
- ✅ **Navigation:** Fixed sidebar với active states

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 18 + TypeScript
- **Styling:** CSS Modules + CSS Variables
- **Data:** JSON files (static)
- **Deployment:** Vercel

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/FotoberRnD.git
cd FotoberRnD

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
FotoberRnD/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── feedback/          # Feedback Analysis
│   ├── ai-problems/       # AI Problems
│   ├── effects/           # Effects Catalog
│   ├── competition/       # Competition Analysis
│   ├── job-description/   # Job Description
│   ├── operations/        # Operations Manual
│   ├── platform/          # Platform Design
│   └── resources/         # Resources Library
├── components/            # React components
│   └── layout/           # Layout components
├── data/                 # JSON data files
│   ├── feedback.json
│   ├── effects.json
│   ├── prompts.json
│   └── competition.json
└── public/               # Static assets
```

## 📊 Modules

### 1. Dashboard
- Key metrics overview
- Module navigation
- Quick insights

### 2. Feedback Analysis
- Error tracking (Groups A/B/C/D)
- Root cause analysis
- Action items

### 3. AI Problems
- Agent Replacement workflow
- Image-to-Video workflow
- Prompt examples

### 4. Effects Catalog
- Motion Graphics
- Special Effects
- Transitions
- AI Pricing Tiers

### 5. Competition
- Vietnam & Global competitors
- Feature comparison
- Top 10 ranking
- SWOT analysis

### 6. Job Description
- R&D Specialist role
- Responsibilities
- Deliverables
- Tools

### 7. Operations
- Workflow (6 steps)
- QC Checklist (3 levels)
- Metrics tracking
- Scoring system

### 8. Platform
- System architecture
- API endpoints
- Development roadmap
- Tech stack

### 9. Resources
- AI Video tools
- Image generation tools
- Learning resources
- Internal documents

## 🎨 Design System

### Colors
- **Primary:** Blue (`hsl(220, 90%, 56%)`)
- **Error Groups:** Red, Orange, Blue, Purple
- **Semantic:** Success, Warning, Error, Info

### Typography
- **Font:** Inter (Google Fonts)
- **Sizes:** xs (0.75rem) → 4xl (2.25rem)

### Spacing
- **Scale:** 1 (0.25rem) → 20 (5rem)

## 📝 Data Files

All data stored in `/data` directory as JSON:
- `feedback.json` - 23 jobs, 4 error groups
- `effects.json` - Motion graphics, special effects, pricing
- `prompts.json` - 5 prompt templates
- `competition.json` - Competitors, SWOT analysis

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Manual Build

```bash
npm run build
npm start
```

## 📖 Documentation

- **Quick Start:** See `QUICK_START_RND.md`
- **Walkthrough:** See artifacts in `.gemini/antigravity/brain/`

## 🔧 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

Private - Fotober Internal Use Only

## 👥 Author

R&D Specialist - Fotober AI Video

---

**Version:** 2.0  
**Last Updated:** 01/02/2026  
**Status:** ✅ Production Ready
