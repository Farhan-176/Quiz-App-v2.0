import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Navbar from '../components/Navbar';
import './Result.css';

const victoryVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(20px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.23, 1, 0.32, 1], staggerChildren: 0.2 }
    }
};

const itemFade = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
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

        // Submit score to leaderboard
        const submitScore = async () => {
            try {
                await axios.post('http://localhost:5000/api/quiz/submit-score', {
                    username,
                    score,
                    total,
                    percentage
                });
            } catch (err) {
                console.error('Failed to submit score', err);
            }
        };
        submitScore();

        if (percentage >= 60 && remainingLives > 0) {
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
        if (remainingLives === 0) return { title: "System Failure", tag: "Critical", icon: "⚠️" };
        if (percentage >= 90) return { title: "Omniscient Master", tag: "Ascended", icon: "👁️" };
        if (percentage >= 75) return { title: "Grand Strategist", tag: "Elite", icon: "⚔️" };
        if (percentage >= 60) return { title: "Adept Scholar", tag: "Stable", icon: "📚" };
        return { title: "Novice Initiate", tag: "Learning", icon: "🌱" };
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
                        <span className={`reel-tag ${remainingLives === 0 ? 'critical' : ''}`}>
                            {remainingLives === 0 ? 'Forced Termination' : 'Assessment Concluded'}
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
                                    className={`progress ${remainingLives === 0 ? 'fail' : ''}`}
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
                                <span className="l">Sync Stability</span>
                            </div>
                            <div className="track-item acrylic">
                                <span className="v">{score}/{total}</span>
                                <span className="l">Nodes Resolved</span>
                            </div>
                            <div className="track-item achievement acrylic">
                                <span className="icon">{mastery.icon}</span>
                                <span className="l">Rank Status</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="victory-actions" variants={itemFade}>
                        <Link to="/quiz" className="btn-master outline">Re-Initialize Session</Link>
                        <Link to="/" className="btn-master ghost">Back to Terminal</Link>
                    </motion.div>
                </motion.section>

                <section className="analytical-review">
                    <h2 className="display-text xsmall centered">Data Node <span className="ethereal-gradient">Review</span></h2>

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
                                        <span className="node-code">NODE_0{i + 1}</span>
                                        <span className="node-status">
                                            {isCorrect ? 'STABLE' : isSkipped ? 'TIMED OUT' : 'ANOMALY'}
                                        </span>
                                    </div>
                                    <h3>{q.question}</h3>
                                    <div className="node-compare">
                                        <div className="input-block">
                                            <label>Your Input</label>
                                            <span className={isCorrect ? 'text-correct' : 'text-incorrect'}>
                                                {isSkipped ? 'NO SIGNAL' : q.options[userAnswers[i]]}
                                            </span>
                                        </div>
                                        <div className="target-block">
                                            <label>Correct Vector</label>
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
