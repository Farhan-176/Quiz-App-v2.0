# Quick Start Guide

Get the Quiz App running locally in under 5 minutes!

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Farhan-176/Quiz-App-v2.0.git
cd quiz-app
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Configure Environment

**Backend:** Create `backend/.env` file:

```env
JWT_SECRET=masterclass_secret_2024_zen_vision
PORT=5000
```

**Frontend:** Already configured for offline mode! No additional setup needed.

### 4. Run the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:5173` (or the URL shown in Terminal 2)

## Ready to Use!

✅ **Backend API:** Running on `http://localhost:5000`  
✅ **Frontend App:** Running on `http://localhost:5173`

## Features Available

- 🎯 100+ quiz questions across multiple categories
- 👤 Simple username-based authentication
- ⏱️ 15-second timer per question
- ❤️ 3-lives system
- 🏆 Score tracking and results page
- 📊 Leaderboard support
- 📱 Responsive design (mobile & desktop)
- ✨ Smooth animations and transitions

## What's Next?

- **Deploy:** Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- **Customize:** Add your own quiz questions in `frontend/src/lib/quizzesData.js`

## Offline Mode

The app currently runs in **100% offline mode** with hardcoded quiz data. This means:
- No database required for basic functionality
- Quizzes load instantly from local data
- Perfect for local development and testing

## Troubleshooting

**Backend won't start:**
- Make sure port 5000 is not already in use
- Check that `.env` file exists in `backend/` directory

**Frontend won't start:**
- Delete `node_modules` and run `npm install` again
- Make sure you're using Node.js 14 or higher

**Questions not loading:**
- Check browser console for errors
- Verify `frontend/src/lib/quizzesData.js` exists

## Development Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm start` - Start backend server

## Project Structure

```
quiz-app/
├── backend/
│   ├── data/          # JSON data files
│   ├── routes/        # API routes
│   ├── server.js      # Express server
│   └── .env           # Environment variables
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── lib/         # Quiz data & utilities
    │   └── App.jsx      # Main app component
    ├── dist/            # Production build
    └── .env             # Frontend config
```

## Need Help?

- Full documentation: [README.md](README.md)
- Deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Enjoy building with Quiz App! 🚀**
