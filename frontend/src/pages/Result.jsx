import { useEffect, useState } from 'react';
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

        if (!questions || !userAnswers) {
            navigate('/quiz');
            return;
        }

        setResultData({ questions, userAnswers, username, score, total });

        const percentage = Math.round((score / total) * 100);
        if (percentage >= 60) {
            const duration = 5 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#6366f1', '#ffffff']
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#a855f7', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }, [navigate]);

    if (!resultData) return null;

    const { questions, userAnswers, username, score, total } = resultData;
    const percentage = Math.round((score / total) * 100);

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
                        <span className="reel-tag">{percentage >= 60 ? 'Mastery Confirmed' : 'Assessment Concluded'}</span>
                        <h1 className="display-text small centered">
                            Analysis of <br />
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
                                <span className="lab">Global Rank</span>
                            </div>
                        </div>

                        <div className="metrics-track">
                            <div className="track-item acrylic">
                                <span className="v">0{score}</span>
                                <span className="l">Resolved</span>
                            </div>
                            <div className="track-item acrylic">
                                <span className="v">0{total - score}</span>
                                <span className="l">Mismatched</span>
                            </div>
                            <div className="track-item acrylic">
                                <span className="v">{total}</span>
                                <span className="l">Total Nodes</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="victory-actions" variants={itemFade}>
                        <Link to="/quiz" className="btn-master outline">Re-Initialize Session</Link>
                        <Link to="/" className="btn-master ghost">Exit to Terminal</Link>
                    </motion.div>
                </motion.section>

                <section className="analytical-review">
                    <h2 className="display-text xsmall centered">Data Node <span className="ethereal-gradient">Review</span></h2>

                    <div className="review-stream">
                        {questions.map((q, i) => (
                            <motion.div
                                key={i}
                                className={`review-node acrylic ${userAnswers[i] === q.correctIndex ? 'valid' : 'invalid'}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="node-header">
                                    <span className="node-code">PHA_0{i + 1}</span>
                                    <span className="node-status">{userAnswers[i] === q.correctIndex ? 'STABLE' : 'ANOMALY'}</span>
                                </div>
                                <h3>{q.question}</h3>
                                <div className="node-compare">
                                    <div className="input-block">
                                        <label>Input</label>
                                        <span>{q.options[userAnswers[i]] || 'VOID'}</span>
                                    </div>
                                    <div className="target-block">
                                        <label>Target</label>
                                        <span>{q.options[q.correctIndex]}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Result;
