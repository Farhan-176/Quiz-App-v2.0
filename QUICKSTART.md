# 🚀 Quick Start: Deploy Your Quiz App (Free, No Credit Card)

## What Changed?
✅ Removed Express backend (no longer needed)  
✅ Using Supabase for auth, database, and API (100% free)  
✅ Frontend-only deployment to Vercel (also free)  

---

## Deploy in 4 Simple Steps

### 1️⃣ Set Up Supabase (5 minutes)
1. Go to [supabase.com](https://supabase.com)
2. Sign in with GitHub (free, no card)
3. Create new project → Wait 2 minutes
4. Copy **Project URL** and **anon key** from Settings → API
5. Follow detailed setup: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 2️⃣ Migrate Quiz Data (2 minutes)
```bash
# Generate SQL for your 100 questions
node scripts/migrate-quizzes.js

# Copy output → Supabase SQL Editor → Paste → Run
```

### 3️⃣ Configure Frontend (1 minute)
```bash
# Create .env file in frontend/
cd frontend
cp .env.example .env

# Edit .env with your Supabase credentials
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### 4️⃣ Deploy to Vercel (3 minutes)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repo
4. Root: `frontend`, Framework: Vite
5. Add environment variables (same as .env)
6. Click Deploy → Done! 🎉

**Total time: ~15 minutes**

---

## Test Locally First

```bash
cd frontend
npm install
npm run dev
```

1. Sign up with test email
2. Take a quiz
3. Check leaderboard

If everything works ✅ → Deploy!

---

## What You Get (Free Forever)

| Feature | Provider | Free Tier |
|---------|----------|-----------|
| Frontend Hosting | Vercel | 100GB bandwidth |
| Auth System | Supabase | 50,000 users |
| Database | Supabase | 500MB storage |
| API | Supabase | Auto-generated |
| SSL Certificate | Both | Included |

**Total cost: $0/month**

---

## Need Help?

- 📖 **Supabase Setup**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- 🚢 **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 **Issues**: Check console logs and Supabase dashboard

---

## Architecture

```
Before (needed backend server):
User → Vercel (React) → Your Express Server → JSON files

After (serverless):
User → Vercel (React) → Supabase (auth + DB + API)
```

Everything is in the cloud, no backend to manage! 🚀
