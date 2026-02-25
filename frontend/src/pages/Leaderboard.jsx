import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { quiz } from '../lib/supabase';
import Navbar from '../components/Navbar';
import './Leaderboard.css';

const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
            ...springTransition
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: springTransition
    }
};

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const data = await quiz.getLeaderboard();
                setLeaders(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to fetch leaderboard', err);
                setIsLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    return (
        <div className="leaderboard-wrapper">
            <Navbar />

            <main className="leaderboard-main container">
                <header className="leader-header">
                    <span className="tag">Global Rankings</span>
                    <h1 className="display-text small centered">Top <span className="ethereal-gradient">Performers</span></h1>
                </header>

                {isLoading ? (
                    <div className="zen-loader">Loading Leaderboard...</div>
                ) : (
                    <motion.div
                        className="leaderboard-table acrylic"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="table-header">
                            <span className="col-rank">Rank</span>
                            <span className="col-user">User</span>
                            <span className="col-score">Score</span>
                            <span className="col-percentage">Accuracy</span>
                        </div>

                        {leaders.length > 0 ? (
                            leaders.map((leader, index) => (
                                <motion.div
                                    className={`table-row ${index === 0 ? 'top-rank' : ''}`}
                                    key={leader.id}
                                    variants={itemVariants}
                                >
                                    <span className="col-rank">#{index + 1}</span>
                                    <span className="col-user">{leader.username}</span>
                                    <span className="col-score">{leader.score}/{leader.total}</span>
                                    <span className="col-percentage">{leader.percentage}%</span>
                                </motion.div>
                            ))
                        ) : (
                            <div className="empty-state">No records found.</div>
                        )}
                    </motion.div>
                )}
            </main>
        </div>
    );
}

export default Leaderboard;
