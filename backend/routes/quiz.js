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

// Get all quiz questions
router.get('/', (req, res) => {
    try {
        const questions = getQuizzes();
        res.json(questions);
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
