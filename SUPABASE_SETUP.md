# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** (free, no credit card needed)
3. Sign in with GitHub
4. Click **"New project"**
5. Choose:
   - **Organization**: Create new or use existing
   - **Name**: quiz-app
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
6. Click **"Create new project"** (takes ~2 minutes to provision)

## Step 2: Get API Credentials

Once your project is ready:

1. Go to **Settings** (gear icon in sidebar)
2. Click **API** section
3. Copy these two values (you'll need them):
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (the long string starting with `eyJ...`)

## Step 3: Create Database Tables

1. Go to **SQL Editor** in the sidebar
2. Click **"New query"**
3. Copy and paste the SQL below
4. Click **"Run"**

```sql
-- Create users table (Supabase Auth handles this, but we'll add custom data)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  username TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_percentage ON leaderboard(percentage DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_created ON leaderboard(created_at DESC);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for quizzes (everyone can read)
CREATE POLICY "Quizzes are viewable by everyone" 
  ON quizzes FOR SELECT 
  USING (true);

-- Create policies for leaderboard (everyone can read, authenticated can insert)
CREATE POLICY "Leaderboard is viewable by everyone" 
  ON leaderboard FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert scores" 
  ON leaderboard FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');
```

## Step 4: Upload Quiz Questions

### Option A: Using the Migration Script (Recommended)

1. Open a terminal in the project root directory
2. Run the migration script:
   ```bash
   node scripts/migrate-quizzes.js
   ```
3. Copy the SQL output (the INSERT statements between the `═` lines)
4. Go to **SQL Editor** in Supabase
5. Click **"New query"**
6. Paste the SQL output
7. Click **"Run"** to insert all questions at once

### Option B: Manual Upload via Table Editor

1. Go to **Table Editor** in Supabase sidebar
2. Select **quizzes** table
3. Click **"Insert"** → **"Insert rows"**
4. Fill in each column:
   - **question**: The quiz question text
   - **options**: JSON array like `["Option A", "Option B", "Option C"]`
   - **correct_index**: Zero-based index of the correct answer
   - **category**: Optional category like "Programming" or "Geography"

### Option C: Insert Sample Questions Manually

Run this in SQL Editor to insert sample questions:

```sql
INSERT INTO quizzes (question, options, correct_index, category) VALUES
('Which language runs in a web browser?', '["Python", "Java", "JavaScript", "HTML"]', 2, 'Programming'),
('What is the capital of France?', '["Berlin", "Madrid", "Paris", "Rome"]', 2, 'Geography'),
('Which tag is used for creating a hyperlink?', '["<link>", "<a>", "<href>", "<h>"]', 1, 'Web Dev');
-- Add more questions...
```

## Step 5: Configure Environment Variables in Frontend

Create a `.env` file in the `frontend/` folder:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with your actual credentials from Step 2.

## Step 6: Test Authentication

1. Try signing up with a new email
2. Check **Authentication** → **Users** in Supabase dashboard
3. You should see your new user listed

## Done! 🎉

Your backend is now fully hosted on Supabase (free, no card needed).

Next step: Deploy your frontend to Vercel (also free).
