const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const quizzesFilePath = path.join(__dirname, '../data/quizzes.json');
const leaderboardFilePath = path.join(__dirname, '../data/leaderboard.json');

const getQuizzes = () => {
    const data = fs.readFileSync(quizzesFilePath);
    return JSON.parse(data);
};

const getLeaderboard = () => {
    if (!fs.existsSync(leaderboardFilePath)) return [];
    const data = fs.readFileSync(leaderboardFilePath);
    return JSON.parse(data);
};

const saveLeaderboard = (data) => {
    fs.writeFileSync(leaderboardFilePath, JSON.stringify(data, null, 2));
};

// Get randomized 15 quiz questions
router.get('/', (req, res) => {
    try {
        let questions = getQuizzes();

        // Shuffle questions using Fisher-Yates algorithm
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        // Return up to 15 questions
        res.json(questions.slice(0, 15));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get leaderboard
router.get('/leaderboard', (req, res) => {
    try {
        const leaderboard = getLeaderboard();
        res.json(leaderboard.sort((a, b) => b.score - a.score).slice(0, 10));
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Submit score
router.post('/submit-score', (req, res) => {
    try {
        const { username, score, total, percentage } = req.body;
        const leaderboard = getLeaderboard();

        leaderboard.push({
            id: Date.now().toString(),
            username,
            score,
            total,
            percentage,
            date: new Date().toISOString()
        });

        saveLeaderboard(leaderboard);
        res.json({ msg: 'Score submitted successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
