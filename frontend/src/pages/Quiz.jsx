import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Quiz.css';

const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
};

const questionVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: springTransition },
    exit: { opacity: 0, scale: 0.98, filter: "blur(10px)", transition: { duration: 0.4 } }
};

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(15);
    const [isLoading, setIsLoading] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quiz');
                // The backend returns an array of questions directly
                if (Array.isArray(response.data)) {
                    setQuestions(response.data);
                } else if (response.data.questions) {
                    // Fallback for wrapped object structure
                    setQuestions(response.data.questions);
                }
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to fetch quiz', err);
                navigate('/');
            }
        };
        fetchQuiz();
    }, [navigate]);

    // Per-question timer logic
    useEffect(() => {
        if (timer > 0 && !isLoading && !isAnswered) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        } else if (timer === 0 && !isAnswered) {
            handleAnswer(-1); // Auto-fail on timeout
        }
    }, [timer, isLoading, isAnswered]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isAnswered || isLoading) return;

            if (e.key >= '1' && e.key <= '4') {
                const idx = parseInt(e.key) - 1;
                if (questions[currentIdx]?.options[idx]) {
                    handleAnswer(idx);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAnswered, isLoading, currentIdx, questions]);

    const handleAnswer = (optionIdx) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setFeedback(optionIdx);

        const currentQ = questions[currentIdx];
        const isCorrect = optionIdx === currentQ.correctIndex;

        if (!isCorrect) {
            setLives(prev => Math.max(0, prev - 1));
        }

        setAnswers({ ...answers, [currentIdx]: optionIdx });

        // Auto-advance after delay
        setTimeout(() => {
            handleNext();
        }, 1500);
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setTimer(15);
            setIsAnswered(false);
            setFeedback(null);
        } else {
            handleComplete();
        }
    };

    const handleComplete = (forcedLives) => {
        const finalLives = forcedLives !== undefined ? forcedLives : lives;
        const score = questions.reduce((acc, q, idx) => {
            return acc + (answers[idx] === q.correctIndex ? 1 : 0);
        }, 0);

        localStorage.setItem('quizQuestions', JSON.stringify(questions));
        localStorage.setItem('userAnswers', JSON.stringify(answers));
        localStorage.setItem('currentScore', score);
        localStorage.setItem('totalQuestions', questions.length);
        localStorage.setItem('remainingLives', finalLives);

        navigate('/result');
    };

    if (isLoading) return (
        <div className="quiz-zen-wrapper flex-center">
            <div className="zen-loader">Loading Quiz Questions...</div>
        </div>
    );

    const currentQ = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
        <div className="quiz-zen-wrapper">
            <Navbar />

            {/* Atmospheric Timer */}
            <div className={`atmospheric-timer ${timer < 5 ? 'critical' : timer < 10 ? 'warning' : 'safe'}`} />

            <main className="zen-void container">
                <div className="zen-header">
                    <div className="header-top">
                        <div className="lives-display">
                            {[...Array(3)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className={`heart ${i < lives ? 'active' : 'depleted'}`}
                                    animate={i === lives - 1 && isAnswered && feedback !== currentQ.correctIndex ? { scale: [1, 1.5, 1], opacity: [1, 0] } : {}}
                                >
                                    ♥
                                </motion.span>
                            ))}
                        </div>
                        <div className="zen-meta">
                            <span className="q-count">Question {currentIdx + 1} of {questions.length}</span>
                            <span className="time-display">{timer}s</span>
                        </div>
                    </div>

                    <div className="zen-progress-bar">
                        <motion.div
                            className="progress-inner"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "circOut" }}
                        />
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
                            {currentQ.options.map((option, idx) => {
                                const isCorrect = idx === currentQ.correctIndex;
                                const isSelected = feedback === idx;
                                let statusClass = '';

                                if (isAnswered) {
                                    if (isCorrect) statusClass = 'correct';
                                    else if (isSelected) statusClass = 'incorrect';
                                    else statusClass = 'dimmed';
                                }

                                return (
                                    <motion.div
                                        key={idx}
                                        className={`zen-option ${isSelected ? 'selected' : ''} ${statusClass}`}
                                        onClick={() => handleAnswer(idx)}
                                        whileHover={!isAnswered ? { scale: 1.01, backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
                                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                        transition={springTransition}
                                    >
                                        <span className="opt-indicator">{idx + 1}</span>
                                        <span className="opt-text">{option}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="zen-footer">
                    <div className="keyboard-hint">
                        Use keys <span className="key">1</span>-<span className="key">4</span> to select
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Quiz;
