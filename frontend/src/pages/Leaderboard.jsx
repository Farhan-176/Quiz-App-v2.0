import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Leaderboard.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
};

function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quiz/leaderboard');
                setLeaders(response.data);
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
                    <span className="tag">Global Ranking</span>
                    <h1 className="display-text small centered">Masterclass <span className="ethereal-gradient">Elite</span></h1>
                </header>

                {isLoading ? (
                    <div className="zen-loader">Deciphering Rank Records...</div>
                ) : (
                    <motion.div
                        className="leaderboard-table acrylic"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="table-header">
                            <span className="col-rank">Rank</span>
                            <span className="col-user">Identity</span>
                            <span className="col-score">Mastery</span>
                            <span className="col-percentage">Sync Index</span>
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
                            <div className="empty-state">No mastery records found in this sector.</div>
                        )}
                    </motion.div>
                )}
            </main>
        </div>
    );
}

export default Leaderboard;
