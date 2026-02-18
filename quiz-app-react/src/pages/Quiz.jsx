import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Quiz.css';

const questionVariants = {
    initial: { opacity: 0, y: 20, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.5 } }
};

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes');
                const quizData = response.data[0];
                setQuestions(quizData.questions);
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to fetch quiz', err);
                navigate('/');
            }
        };
        fetchQuiz();
    }, [navigate]);

    useEffect(() => {
        if (timer > 0 && !isLoading) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            handleComplete();
        }
    }, [timer, isLoading]);

    const handleAnswer = (optionIdx) => {
        setAnswers({ ...answers, [currentIdx]: optionIdx });
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        const score = questions.reduce((acc, q, idx) => {
            return acc + (answers[idx] === q.correctIndex ? 1 : 0);
        }, 0);

        localStorage.setItem('quizQuestions', JSON.stringify(questions));
        localStorage.setItem('userAnswers', JSON.stringify(answers));
        localStorage.setItem('currentScore', score);
        localStorage.setItem('totalQuestions', questions.length);

        navigate('/result');
    };

    if (isLoading) return null;

    const currentQ = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
        <div className="quiz-zen-wrapper">
            <Navbar />

            {/* Atmospheric Timer: Glows and pulses color based on temperature */}
            <div className={`atmospheric-timer ${timer < 10 ? 'critical' : timer < 20 ? 'warning' : 'safe'}`} />

            <main className="zen-void container">
                <div className="zen-header">
                    <div className="zen-progress-bar">
                        <motion.div
                            className="progress-inner"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "circOut" }}
                        />
                    </div>
                    <div className="zen-meta">
                        <span className="q-count">Session Phase {currentIdx + 1} / {questions.length}</span>
                        <span className="time-display">{timer}s <span>Remaining</span></span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIdx}
                        className="question-module"
                        variants={questionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <h1 className="display-text small centered">{currentQ.question}</h1>

                        <div className="zen-options-grid">
                            {currentQ.options.map((option, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`zen-option ${answers[currentIdx] === idx ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(idx)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="opt-indicator">{String.fromCharCode(65 + idx)}</span>
                                    <span className="opt-text">{option}</span>
                                    {answers[currentIdx] === idx && (
                                        <motion.div
                                            className="selection-glow"
                                            layoutId="glow"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="zen-footer">
                    <button
                        className="btn-master ghost"
                        onClick={handleNext}
                        disabled={answers[currentIdx] === undefined}
                    >
                        {currentIdx === questions.length - 1 ? 'Finalize Session' : 'Proceed to Next Phase'}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Quiz;
