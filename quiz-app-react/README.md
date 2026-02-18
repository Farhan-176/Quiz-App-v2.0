# QuizMaster - React Quiz Application

A modern, interactive quiz application built with React, featuring a beautiful UI with glassmorphism effects, smooth animations, and a comprehensive quiz experience.

## 🚀 Features

- **Modern UI/UX**: Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- **User Authentication**: Login and signup functionality with backend integration
- **Timed Quizzes**: 60-second countdown timer for each quiz attempt
- **Question Navigation**: Navigate between questions, skip questions, and review skipped ones
- **Progress Tracking**: Real-time progress bar and answered question counter
- **Detailed Results**: Comprehensive result page with score breakdown and answer review
- **Responsive Design**: Fully responsive layout that works on all devices
- **Category Support**: Questions organized by categories (Programming, Geography, Math, etc.)

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern CSS with animations and gradients
- **Font Awesome**: Icon library

## 📦 Installation

1. Navigate to the project directory:
```bash
cd quiz-app-react
```

2. Install dependencies:
```bash
npm install
```

3. Make sure the backend server is running on `http://localhost:5000`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## 🎮 How to Use

1. **Home Page**: Click "Get Started" to begin
2. **Authentication**: Login or create a new account
3. **Quiz Instructions**: Read the instructions and click "Start Quiz"
4. **Take Quiz**: 
   - Answer questions within the 60-second time limit
   - Navigate between questions using Back/Next buttons
   - Skip questions and return to them later
   - Submit when ready or when time runs out
5. **View Results**: See your score, review answers, and retake the quiz

## 📁 Project Structure

```
quiz-app-react/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Home.css
│   │   ├── Auth.jsx          # Login/Signup page
│   │   ├── Auth.css
│   │   ├── Quiz.jsx          # Main quiz page
│   │   ├── Quiz.css
│   │   ├── Result.jsx        # Results page
│   │   └── Result.css
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Global styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Base CSS reset
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-blue gradients throughout
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Fade-in, slide-in, and scale animations
- **Interactive Elements**: Hover effects and transitions on all interactive elements
- **Color-Coded Feedback**: Visual indicators for correct/incorrect answers
- **Responsive Layout**: Grid and flexbox layouts that adapt to screen size

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The app connects to a backend API at `http://localhost:5000/api` with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/quiz` - Fetch quiz questions

## 📝 Demo Credentials

- **Email**: demo@quiz.com
- **Password**: demo123

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ using React and Vite
