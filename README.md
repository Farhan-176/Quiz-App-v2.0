# Quiz App v2.0.0

A modern, fully functional quiz application with a sleek React frontend and Supabase backend. Built for smooth UX, fast loads, and **free deployment** (no credit card needed). 🚀

## Live Demo

TAKE QUIZ AT: https://quiz-app-176.netlify.app/

## ✨ Latest Update (Supabase Integration)

**What's New:**
- ✅ Replaced Express backend with Supabase (free, no credit card)
- ✅ Serverless architecture - deploy frontend only
- ✅ PostgreSQL database instead of JSON files
- ✅ Built-in authentication and real-time updates
- ✅ Deploy to Vercel in minutes

**Quick Deploy:** See [QUICKSTART.md](./QUICKSTART.md) for 15-minute setup guide.

## Highlights

- React 19 + Vite frontend with animated UI
- Supabase backend (auth, database, API)
- JWT-based authentication
- PostgreSQL database with 100+ quiz questions
- Real-time leaderboard
- Responsive layout for mobile and desktop
- **100% free hosting** (Vercel + Supabase)

## Tech Stack

Frontend:
- React 19
- Vite
- Framer Motion
- React Router DOM
- Supabase JS Client

Backend:
- Supabase (PostgreSQL database)
- Supabase Auth (JWT authentication)
- Supabase API (auto-generated REST API)

Hosting:
- Vercel (frontend)
- Supabase (backend - free tier)

## Quick Start

### Option 1: Deploy (Recommended - 15 minutes)
See [QUICKSTART.md](./QUICKSTART.md) for step-by-step deployment guide.

### Option 2: Local Development

Prerequisites:
- Node.js 14+
- Supabase account (free, no card)

1) Clone
```bash
git clone https://github.com/Farhan-176/Quiz-App-v2.0.git
cd quiz app
```

2) Set up Supabase
- Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to create your project
- Run migration script: `node scripts/migrate-quizzes.js`
- Copy SQL output to Supabase SQL Editor and run

3) Configure Frontend
```bash
cd frontend
cp .env.example .env
# Edit .env with your Supabase credentials
```

4) Install & Run
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5174 and start quizzing! 🎯

## Project Structure

```
quiz app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages (Auth, Quiz, Result, etc.)
│   │   ├── lib/
│   │   │   └── supabase.js # Supabase client & helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                # Supabase credentials (not in git)
│   ├── .env.example        # Template for .env
│   └── package.json
├── backend/                # Legacy (keeping for reference/migration)
│   └── data/
│       └── quizzes.json    # Source data for migration
├── scripts/
│   └── migrate-quizzes.js  # SQL generator for Supabase
├── QUICKSTART.md           # 15-min deployment guide
├── SUPABASE_SETUP.md       # Detailed Supabase setup
└── DEPLOYMENT.md           # Full deployment docs
```

## Documentation

- 🚀 **[QUICKSTART.md](./QUICKSTART.md)** - Deploy in 15 minutes
- 📖 **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Database setup guide
- 🚢 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment reference

## Version History

- v2.1.0 - Supabase integration, serverless architecture
- v2.0.0 - React rewrite, modern animations, backend split
- v1.0.0 - Legacy version (see https://github.com/Farhan-176/Quiz-App)

## Roadmap

- Admin panel
- Quiz analytics
- Mobile app

## License

ISC

## Author

Farhan-176
