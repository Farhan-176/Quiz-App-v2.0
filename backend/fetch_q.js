const fs = require('fs');
// No axios needed
const path = require('path');

const quizzesFilePath = path.join(__dirname, 'data', 'quizzes.json');

async function fetchQuestions() {
    try {
        let existingQuestions = JSON.parse(fs.readFileSync(quizzesFilePath, 'utf8'));
        const existingCount = existingQuestions.length;
        const required = 100 - existingCount;

        if (required <= 0) {
            console.log('Already have 100 or more questions');
            return;
        }

        console.log(`Fetching ${required} questions...`);

        // Free OpenTDB API, maximum 50 per request
        let fetchedQuestions = [];
        let remaining = required;
        while (remaining > 0) {
            const amount = Math.min(50, remaining);
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
            const data = await response.json();

            if (data.response_code === 0) {
                fetchedQuestions = fetchedQuestions.concat(data.results);
                remaining -= amount;
                await new Promise(res => setTimeout(res, 2000)); // Respect rate limit
            } else {
                console.log('API error or rate limited, code: ', data.response_code);
                break;
            }
        }

        // Decode HTML entities
        const decode = (str) => {
            return str.replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&ouml;/g, 'ö');
        };

        const currentMaxId = existingQuestions.reduce((max, q) => Math.max(max, parseInt(q.id)), 0);

        const newQuestionsFormatted = fetchedQuestions.map((q, idx) => {
            // Randomly insert correct answer
            const options = [...q.incorrect_answers.map(decode)];
            const correctIndex = Math.floor(Math.random() * (options.length + 1));
            options.splice(correctIndex, 0, decode(q.correct_answer));

            return {
                id: (currentMaxId + idx + 1).toString(),
                question: decode(q.question),
                options: options,
                correctIndex: correctIndex,
                category: decode(q.category)
            };
        });

        existingQuestions = existingQuestions.concat(newQuestionsFormatted);

        fs.writeFileSync(quizzesFilePath, JSON.stringify(existingQuestions, null, 4));
        console.log(`Successfully added ${newQuestionsFormatted.length} questions. Total is now ${existingQuestions.length}.`);
    } catch (err) {
        console.error(err);
    }
}

fetchQuestions();
