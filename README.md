# Quiz App v2.0.0

A modern, fully functional quiz application with a sleek React frontend and a lightweight Express API. Built for smooth UX, fast loads, and easy local setup.

## Live Demo

TAKE QUIZ AT: https://quiz-app-176.netlify.app/

## Highlights

- React 19 + Vite frontend with animated UI
- Express API for auth and quiz data
- JWT-based authentication
- JSON file storage (no database required)
- Leaderboard support
- Responsive layout for mobile and desktop

## Tech Stack

Frontend:
- React
- Vite
- Framer Motion
- React Router DOM
- Axios

Backend:
- Node.js
- Express
- JSON storage
- JWT
- Bcryptjs
- CORS

## Quick Start

Prerequisites:
- Node.js 14+

1) Clone
```bash
git clone https://github.com/Farhan-176/Quiz-App-v2.0.git
cd quiz app
```

2) Install
```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

3) Configure (backend/.env)
```
JWT_SECRET=your_jwt_secret
PORT=5000
```

4) Run
```bash
# Terminal 1
cd backend
npm start

# Terminal 2
cd frontend
npm run dev
```

## Project Structure

```
quiz app/
├── backend/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

## Version History

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
