# Quiz App v2.0.0

A modern, fully functional quiz application built with React, featuring enhanced UI/UX, smooth animations, and a robust backend.

## 🚀 Live Demo

**TAKE QUIZ AT** https://quiz-app-176.netlify.app/

## 📋 Features

- ✨ Modern React 19 with Vite
- 🎨 Beautiful UI with Framer Motion animations
- 🎭 Aurora and particle background effects
- 🔐 User authentication with JWT
- 📊 Quiz management system
- 💾 MongoDB database integration
- 🔄 Express.js backend API
- 📱 Responsive design

## 🛠 Tech Stack

**Frontend:**
- React 19
- Vite
- Framer Motion
- React Router DOM
- Axios

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT authentication
- Bcryptjs
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Farhan-176/Quiz-App-v2.0.git
cd quiz-app
```

2. **Install dependencies**
```bash
# Root dependencies
npm install

# React app dependencies
cd quiz-app-react
npm install
cd ..
```

3. **Create .env file**
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Run the application**
```bash
# Terminal 1: Backend server
node server.js

# Terminal 2: Frontend dev server
cd quiz-app-react
npm run dev
```

## 📂 Project Structure

```
quiz-app/
├── quiz-app-react/          # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── routes/                 # Express API routes
├── models/                 # MongoDB schemas
├── server.js              # Express server
└── package.json
```

## 📝 Version History

- **v2.0.0** - Current version with React rewrite, enhanced animations, and modern tooling
- **v1.0.0** - Legacy version (see [v1 repo](https://github.com/Farhan-176/Quiz-App))

## 🎯 Next Steps / Roadmap

- [ ] Add admin panel
- [ ] Quiz analytics
- [ ] Leaderboard system
- [ ] Mobile app version

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

ISC

## 👤 Author

Farhan-176
