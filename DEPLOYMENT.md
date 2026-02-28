# Quiz App - Deployment Guide

This guide covers deploying the Quiz App to various platforms.

## Table of Contents

1. [Production Build](#production-build)
2. [Frontend Deployment](#frontend-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Environment Variables](#environment-variables)
5. [Platform-Specific Guides](#platform-specific-guides)

---

## Production Build

### Prerequisites
- Node.js 14 or higher
- npm or yarn

### Build Frontend for Production

```bash
cd frontend
npm install
npm run build
```

This creates an optimized production build in `frontend/dist/`.

### Prepare Backend for Production

```bash
cd backend
npm install
```

Ensure your `.env` file is properly configured (see [Environment Variables](#environment-variables)).

---

## Frontend Deployment

The frontend is a static Single Page Application (SPA) that can be deployed to any static hosting service.

### Recommended Platforms

#### Netlify

1. **Connect Repository to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub/GitLab repository

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`

3. **Add `_redirects` file:**
   Create `frontend/public/_redirects` with:
   ```
   /*    /index.html   200
   ```
   This ensures React Router works properly.

4. **Deploy:**
   Netlify will automatically build and deploy your app.

#### Vercel (Recommended - Currently Deployed)

**Live at:** https://quiz-app-v2-0.vercel.app

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

3. Configure build settings in `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

#### GitHub Pages

1. Update `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   cd dist
   git init
   git add -A
   git commit -m 'deploy'
   git push -f git@github.com:username/repo.git main:gh-pages
   ```

---

## Backend Deployment

The backend is an Express.js API that needs a Node.js hosting environment.

### Recommended Platforms

#### Render

1. **Create New Web Service:**
   - Go to [Render](https://render.com)
   - Click "New" → "Web Service"
   - Connect your repository

2. **Configure Service:**
   - Name: `quiz-app-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

3. **Add Environment Variables:**
   - `JWT_SECRET`: Your secret key
   - `PORT`: 5000 (or leave blank - Render sets this automatically)
   - `NODE_ENV`: production

4. **Update CORS in backend:**
   In `backend/server.js`, update CORS to allow your frontend domain:
   ```javascript
   app.use(cors({
     origin: 'https://quiz-app-v2-0.vercel.app'
   }));
   ```

#### Railway

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Deploy:
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

3. Add environment variables through Railway dashboard.

#### Heroku

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create app:
   ```bash
   cd backend
   heroku create quiz-app-backend
   ```

3. Set environment variables:
   ```bash
   heroku config:set JWT_SECRET=your_secret_here
   ```

4. Deploy:
   ```bash
   git push heroku main
   ```

---

## Environment Variables

### Frontend

Create `frontend/.env` (if using backend):
```env
VITE_API_URL=https://your-backend-url.com
```

**Note:** The current version runs in offline mode with hardcoded quiz data, so this is optional.

### Backend

Create `backend/.env`:
```env
JWT_SECRET=your_very_secure_random_string_here
PORT=5000
NODE_ENV=production
```

**Important Security Notes:**
- Never commit `.env` files to version control
- Use strong, randomly generated JWT_SECRET in production
- Consider using services like Doppler or AWS Secrets Manager for production secrets

---

## Platform-Specific Guides

### Full Stack Deployment (Frontend + Backend)

#### Option 1: Separate Deployments (Recommended)
- Frontend on Netlify/Vercel
- Backend on Render/Railway
- Update frontend API calls to point to deployed backend

#### Option 2: Single Platform Deployment

**Render (Monorepo Setup):**

1. Create `render.yaml` in project root:
```yaml
services:
  - type: web
    name: quiz-app-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production

  - type: web
    name: quiz-app-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

2. Push to GitHub and connect to Render.

---

## Post-Deployment Checklist

- [ ] Frontend builds successfully
- [ ] All routes work correctly (test navigation)
- [ ] API calls work from deployed frontend to deployed backend
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] SSL/HTTPS is enabled
- [ ] Custom domain configured (optional)
- [ ] Error monitoring set up (Sentry, LogRocket, etc.) (optional)
- [ ] Analytics added (Google Analytics, Plausible, etc.) (optional)

---

## Troubleshooting

### Common Issues

**Frontend shows blank page:**
- Check browser console for errors
- Verify `base` URL in `vite.config.js` is correct
- Make sure all routes have proper redirects configured

**API calls fail:**
- Verify CORS settings in backend
- Check API URL is correct in frontend
- Verify backend is running and accessible

**404 on page refresh:**
- Add `_redirects` file for Netlify
- Add rewrites configuration for Vercel
- Configure web server to serve `index.html` for all routes

---

## Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Quiz App

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Build Frontend
        run: |
          cd frontend
          npm ci
          npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=frontend/dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

## Monitoring & Maintenance

### Recommended Tools

- **Error Tracking:** Sentry
- **Analytics:** Google Analytics, Plausible
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Performance:** Lighthouse CI, WebPageTest

---

## Support

For issues or questions:
- Check the [README.md](README.md) file
- Open an issue on the GitHub repository

---

**Last Updated:** February 2026
