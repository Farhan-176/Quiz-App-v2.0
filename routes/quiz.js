const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const quizzesFilePath = path.join(__dirname, '../data/quizzes.json');

const getQuizzes = () => {
    const data = fs.readFileSync(quizzesFilePath);
    return JSON.parse(data);
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

module.exports = router;
