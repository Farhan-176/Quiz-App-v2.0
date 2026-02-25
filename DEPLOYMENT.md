# Quiz App Deployment Guide (Vercel + Supabase)

## Prerequisites
✅ Supabase project set up (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))  
✅ Quiz data migrated to Supabase  
✅ GitHub repo with your code  

---

## Step 1: Migrate Quiz Data to Supabase

1. Run the migration script:
```bash
cd scripts
node migrate-quizzes.js
```

2. Copy the entire SQL output
3. Go to Supabase → **SQL Editor** → **New query**
4. Paste the SQL and click **Run**
5. Verify: Go to **Table Editor** → **quizzes** table → should see 100 questions

---

## Step 2: Set Up Environment Variables

Create `.env` file in `frontend/` folder:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxx...
```

Replace with your actual Supabase credentials from:
- Supabase Dashboard → Settings → API

---

## Step 3: Test Locally

```bash
# Stop old backend server (not needed anymore)
# Keep only frontend running

cd frontend
npm install
npm run dev
```

Try:
1. Sign up with a new account
2. Take a quiz
3. Submit score
4. Check leaderboard

If everything works, proceed to deployment! 🚀

---

## Step 4: Deploy Frontend to Vercel

### Option A: Vercel Dashboard (Easier)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repo
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add **Environment Variables**:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **"Deploy"**
7. Wait ~2 minutes for build to complete
8. Visit your live app! 🎉

### Option B: Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend folder
cd frontend
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Scope: your account
# - Link to existing project: N
# - Project name: quiz-app
# - Directory: ./
# - Override settings: N

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## Step 5: Verify Deployment

1. Visit your Vercel URL (e.g., `https://quiz-app-xxx.vercel.app`)
2. Test complete flow:
   - ✅ Sign up / Login
   - ✅ Take quiz
   - ✅ Submit score
   - ✅ View leaderboard
3. Check Supabase Dashboard:
   - **Authentication** → Users (should see new users)
   - **Table Editor** → leaderboard (should see scores)

---

## Step 6: Custom Domain (Optional)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (~10 minutes)

---

## Troubleshooting

### Build fails on Vercel
- Ensure `.env` variables are added in Vercel dashboard
- Check build logs for missing dependencies
- Verify `frontend/package.json` has all dependencies

### Login doesn't work
- Check Supabase URL and anon key are correct
- Verify Supabase tables and policies are created
- Check browser console for errors

### Questions don't load
- Verify quiz data was migrated (check Supabase table)
- Check Supabase Row Level Security policies allow SELECT on quizzes table

### Leaderboard empty
- Submit a test score
- Check leaderboard table in Supabase has INSERT policy for authenticated users

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  User Browser                                       │
│  (Vercel-hosted React app)                         │
│                                                     │
└────────────┬────────────────────────────────────────┘
             │
             │ HTTP/S
             │
             ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Supabase (Backend)                                 │
│  ├── Authentication (signup/login)                  │
│  ├── PostgreSQL Database                           │
│  │   ├── profiles                                   │
│  │   ├── quizzes (100 questions)                    │
│  │   └── leaderboard                               │
│  └── Auto-generated REST API                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Cost Breakdown

| Service   | Free Tier                          | Cost |
|-----------|------------------------------------|------|
| Vercel    | 100GB bandwidth, unlimited builds  | $0   |
| Supabase  | 500MB database, 50K users          | $0   |
| **Total** |                                    | **$0/month** |

---

## Next Steps

- ✨ Add more quiz categories
- 📊 Build admin dashboard (add/edit questions)
- 🎨 Customize themes
- 📱 Add PWA support for mobile
- 🔔 Add user notifications

---

## Support

Issues? Check:
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)

Built with ❤️ by Farhan-176
