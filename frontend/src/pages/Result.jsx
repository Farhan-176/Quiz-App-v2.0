import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Navbar from '../components/Navbar';
import './Result.css';

const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
};

const victoryVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(15px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            staggerChildren: 0.1,
            ...springTransition
        }
    }
};

const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springTransition
    }
};

function Result() {
    const navigate = useNavigate();
    const [resultData, setResultData] = useState(null);

    useEffect(() => {
        const questions = JSON.parse(localStorage.getItem('quizQuestions'));
        const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
        const username = localStorage.getItem('username') || 'Elite Member';
        const score = parseInt(localStorage.getItem('currentScore'));
        const total = parseInt(localStorage.getItem('totalQuestions'));
        const remainingLives = parseInt(localStorage.getItem('remainingLives'));

        if (!questions || !userAnswers) {
            navigate('/quiz');
            return;
        }

        setResultData({ questions, userAnswers, username, score, total, remainingLives });

        const percentage = Math.round((score / total) * 100);

        if (percentage >= 60) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#ffffff']
            });
        }
    }, [navigate]);

    if (!resultData) return null;

    const { questions, userAnswers, username, score, total, remainingLives } = resultData;
    const percentage = Math.round((score / total) * 100);

    const getMasteryLevel = () => {
        if (percentage >= 90) return { title: "Outstanding Performance", tag: "Expert", icon: "🏆" };
        if (percentage >= 75) return { title: "Excellent Work", tag: "Advanced", icon: "⭐" };
        if (percentage >= 60) return { title: "Good Progress", tag: "Proficient", icon: "✅" };
        return { title: "Keep Learning", tag: "Beginner", icon: "📖" };
    };

    const mastery = getMasteryLevel();

    return (
        <div className="victory-master-wrapper">
            <Navbar />

            <main className="victory-main container">
                <motion.section
                    className="victory-reel"
                    variants={victoryVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="reel-header" variants={itemFade}>
                        <span className="reel-tag">
                            Results Summary
                        </span>
                        <h1 className="display-text small centered">
                            {mastery.title} <br />
                            <span className="ethereal-gradient">{username}</span>
                        </h1>
                    </motion.div>

                    <motion.div className="performance-hub" variants={itemFade}>
                        <div className="radial-visual">
                            <svg viewBox="0 0 100 100">
                                <circle className="bg" cx="50" cy="50" r="45" />
                                <motion.circle
                                    className="progress"
                                    cx="50" cy="50" r="45"
                                    initial={{ strokeDasharray: "0 283" }}
                                    animate={{ strokeDasharray: `${(percentage / 100) * 283} 283` }}
                                    transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                                />
                            </svg>
                            <div className="radial-content">
                                <span className="val">{percentage}%</span>
                                <span className="lab">{mastery.tag}</span>
                            </div>
                        </div>

                        <div className="metrics-track">
                            <div className="track-item acrylic">
                                <span className="v">{remainingLives}/3</span>
                                <span className="l">Remaining Hearts</span>
                            </div>
                            <div className="track-item acrylic">
                                <span className="v">{score}/{total}</span>
                                <span className="l">Correct Answers</span>
                            </div>
                            <div className="track-item achievement acrylic">
                                <span className="icon">{mastery.icon}</span>
                                <span className="l">Rank Status</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="victory-actions" variants={itemFade}>
                        <Link to="/quiz" className="btn-master outline">Try Again</Link>
                        <Link to="/" className="btn-master ghost">Home Dashboard</Link>
                    </motion.div>
                </motion.section>

                <section className="analytical-review">
                    <h2 className="display-text xsmall centered">Question <span className="ethereal-gradient">Analysis</span></h2>

                    <div className="review-stream">
                        {questions.map((q, i) => {
                            const isCorrect = userAnswers[i] === q.correctIndex;
                            const isSkipped = userAnswers[i] === -1 || userAnswers[i] === undefined;

                            return (
                                <motion.div
                                    key={i}
                                    className={`review-node acrylic ${isCorrect ? 'valid' : 'invalid'} ${isSkipped ? 'skipped' : ''}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="node-header">
                                        <span className="node-code">Question {i + 1}</span>
                                        <span className="node-status">
                                            {isCorrect ? 'CORRECT' : isSkipped ? 'TIMED OUT' : 'INCORRECT'}
                                        </span>
                                    </div>
                                    <h3>{q.question}</h3>
                                    <div className="node-compare">
                                        <div className="input-block">
                                            <label>Your Choice</label>
                                            <span className={isCorrect ? 'text-correct' : 'text-incorrect'}>
                                                {isSkipped ? 'NO ANSWER' : q.options[userAnswers[i]]}
                                            </span>
                                        </div>
                                        <div className="target-block">
                                            <label>Correct Answer</label>
                                            <span>{q.options[q.correctIndex]}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Result;
