# Quiz App v2.0.0 🎯

A modern, feature-rich quiz application with stunning animations, smooth interactions, and a beautiful UI. Built with React 19, Vite, and Express, this app delivers an exceptional quiz-taking experience with 100+ questions across multiple categories.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://quiz-app-v2-0.vercel.app/)
[![Vercel](https://img.shields.io/badge/vercel-deployed-black)](https://quiz-app-v2-0.vercel.app/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/Farhan-176/Quiz-App-v2.0)
[![License](https://img.shields.io/badge/license-ISC-green)](LICENSE)

## 🚀 Live Demo

**[TAKE THE QUIZ NOW →](https://quiz-app-v2-0.vercel.app/)**

Test your knowledge with 100+ questions across Programming, Science, History, Geography, and more!

## ✨ Features

### Core Functionality
- 🎯 **100+ Quiz Questions** - Diverse categories including Programming, Science, History, Geography, Entertainment
- ⏱️ **Smart Timer System** - 15 seconds per question with visual countdown
- ❤️ **3-Lives Gameplay** - Challenging gameplay with instant feedback
- 📊 **Score Tracking** - Comprehensive results with detailed breakdown
- 🏆 **Leaderboard Support** - Compare scores with other players (API-ready)
- ⌨️ **Keyboard Shortcuts** - Press 1-4 to answer questions quickly

### User Experience
- ✨ **Stunning Animations** - Smooth transitions powered by Framer Motion
- 🌈 **Aurora Background** - Dynamic gradient effects
- 🎨 **Acrylic UI Design** - Modern glassmorphism aesthetics
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🎉 **Confetti Celebrations** - Rewarding animations for high scores
- 🌙 **Clean Interface** - Distraction-free quiz experience

### Technical Highlights
- ⚡ **Lightning Fast** - Vite build system for instant HMR
- 🔐 **Secure Authentication** - JWT-based user system
- 💾 **No Database Required** - JSON file storage for easy setup
- 🎮 **Offline Mode** - Works completely in the browser
- 📦 **Production Ready** - Optimized build with code splitting

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Next-generation frontend tooling
- **Framer Motion** - Production-ready animation library
- **React Router DOM** - Client-side routing
- **Canvas Confetti** - Celebration effects
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Fast, minimalist web framework
- **JSON Storage** - Simple file-based data persistence
- **JWT** - Secure token-based authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and quality
- **Vite DevTools** - Enhanced development experience
- **Git** - Version control

##  Quick Start

### Prerequisites
- **Node.js** 14 or higher
- **npm** or **yarn**

### Installation

**1. Clone the Repository**
```bash
git clone https://github.com/Farhan-176/Quiz-App-v2.0.git
cd "quiz app"
```

**2. Install Dependencies**
```bash
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..
```

**3. Configure Environment**

Create `backend/.env`:
```env
JWT_SECRET=your_very_secure_random_secret_key_here
PORT=5000
```

**4. Start the Application**

Open two terminal windows:

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

**5. Open in Browser**

Navigate to `http://localhost:5173` and start taking quizzes!


## 📁 Project Structure

```
quiz-app/
├── backend/                      # Express API server
│   ├── data/                     # JSON data storage
│   │   ├── leaderboard.json     # Leaderboard data
│   │   ├── quizzes.json         # Quiz questions
│   │   └── users.json           # User accounts
│   ├── routes/                   # API route handlers
│   │   ├── auth.js              # Authentication routes
│   │   └── quiz.js              # Quiz routes
│   ├── server.js                 # Express server entry
│   ├── .env                      # Environment variables
│   └── package.json              # Backend dependencies
│
├── frontend/                     # React application
│   ├── public/                   # Static assets
│   │   ├── _redirects           # Netlify SPA routing
│   │   └── vite.svg             # Favicon
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── AuroraBackground.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Auth.jsx         # Login/Register
│   │   │   ├── Quiz.jsx         # Quiz interface
│   │   │   ├── Result.jsx       # Results page
│   │   │   └── Leaderboard.jsx  # Leaderboard
│   │   ├── lib/                 # Utilities & data
│   │   │   └── quizzesData.js   # 100+ quiz questions
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── dist/                     # Production build
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies
│
├── LICENSE                       # ISC License
├── vercel.json                  # Vercel config
└── README.md                    # This file
```

## 🎮 How to Use

### Taking a Quiz

1. **Enter Username** - Simple login on the Auth page
2. **Start Quiz** - Begin with 15 randomized questions
3. **Answer Questions** - Click options or press 1-4 keys
4. **Beat the Timer** - 15 seconds per question
5. **Manage Lives** - You have 3 lives (wrong answers cost 1 life)
6. **View Results** - See your score, accuracy, and answers

### Keyboard Shortcuts

- **1, 2, 3, 4** - Select answer option
- **Enter** - Submit/Continue
- **Escape** - Return to home (when available)

## 🌐 Deployment

The app is production-ready and can be deployed to various platforms:

### Recommended Platforms

**Frontend:**
- ✅ **Vercel** (Recommended - Currently deployed)
- ✅ **Netlify**
- ✅ **GitHub Pages**
- ✅ **Cloudflare Pages**

**Backend:**
- ✅ **Render**
- ✅ **Railway**
- ✅ **Heroku**
- ✅ **Fly.io**

### Quick Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will auto-detect Vite and configure build settings
4. Deploy!

### Alternative Platforms

**Netlify:** Connect GitHub repo, set build command to `npm run build` and publish directory to `dist`  
**GitHub Pages:** Build locally and push `dist` folder to gh-pages branch  
**Cloudflare Pages:** Connect repo and deploy with automatic Vite detection

## 🏗️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

**Backend:**
```bash
npm start         # Start Express server
```

### Building for Production

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`.

### Adding Quiz Questions

Edit `frontend/src/lib/quizzesData.js`:

```javascript
{
  "id": "101",
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,  // Index of correct answer (0-3)
  "category": "Category Name"
}
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding Quiz Questions

## 📊 Version History

### v2.0.0 (Current) - February 2026
Complete rewrite with modern stack and enhanced features:
- ✨ React 19 with Vite for blazing-fast development
- 🎨 Beautiful animations with Framer Motion
- 🎯 100+ quiz questions across multiple categories
- ⏱️ Timer system with 15 seconds per question
- ❤️ 3-lives gameplay mechanism
- 🏆 Leaderboard and score tracking
- 📱 Fully responsive design
- 🔐 JWT-based authentication
- 📚 Comprehensive documentation

### v1.0.0 - Legacy Version
- Basic quiz functionality
- Simple user interface
- Question randomization
- Score calculation


**Legacy Version:** [Quiz App v1.0](https://github.com/Farhan-176/Quiz-App)

## 🗺️ Roadmap

### Planned for v2.1.0
- [ ] Admin panel for quiz management
- [ ] User profile pages with statistics
- [ ] Quiz category filters
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Timed challenge mode

### Planned for v2.2.0
- [ ] Social sharing integration
- [ ] Achievement badges system
- [ ] Custom quiz creator
- [ ] Theme customization
- [ ] Advanced leaderboard filters

### Future (v3.0.0+)
- [ ] Mobile app (React Native)
- [ ] Real-time multiplayer mode
- [ ] Video/image-based questions
- [ ] AI-generated quiz questions
- [ ] Analytics dashboard
- [ ] Internationalization (i18n)


## � Version History

**v2.0.0** (February 2026) - Complete React 19 rewrite with modern animations, 100+ quiz questions, timer system, responsive design, and production deployment.

**v1.0.0** - Legacy version with basic quiz functionality ([View here](https://github.com/Farhan-176/Quiz-App))

## �🔒 Security

- JWT-based authentication for secure user sessions
- Bcrypt password hashing
- Environment variable protection
- CORS configuration for API security
- Input validation and sanitization

**Security Best Practices:**
- Never commit `.env` files
- Use strong, unique `JWT_SECRET` in production
- Keep dependencies updated
- Enable HTTPS in production

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Farhan-176**

- GitHub: [@Farhan-176](https://github.com/Farhan-176)
- Project: [Quiz App v2.0](https://github.com/Farhan-176/Quiz-App-v2.0)
- Live Demo: [quiz-app-v2-0.vercel.app](https://quiz-app-v2-0.vercel.app/)

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Vite** - For the lightning-fast build tool
- **Framer** - For the smooth animation library

---

<div align="center">

**[Live Demo](https://quiz-app-v2-0.vercel.app/)** • **[Report Bug](https://github.com/Farhan-176/Quiz-App-v2.0/issues)** • **[Request Feature](https://github.com/Farhan-176/Quiz-App-v2.0/issues)**

Made with ❤️ by [Farhan-176](https://github.com/Farhan-176)

**Quiz App v2.0.0** - Test Your Knowledge! 🎯

</div>

