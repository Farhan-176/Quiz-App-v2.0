import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Auth.css';

const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
};

const vaultVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(20px)", y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        transition: springTransition
    },
    exit: {
        opacity: 0,
        scale: 1.02,
        filter: "blur(10px)",
        transition: { duration: 0.4 }
    }
};

const inputVariants = {
    focus: { scale: 1, borderColor: "var(--aurora-1)", boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" },
    blur: { scale: 1, borderColor: "var(--acrylic-border)", boxShadow: "none" }
};

function Auth() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsername(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!username.trim()) {
            setError('Please enter a username');
            setIsLoading(false);
            return;
        }

        // Save username to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('currentUser', JSON.stringify({
            username: username,
        }));

        setIsLoading(false);
        navigate('/quiz');
    };

    return (
        <div className="auth-master-wrapper">
            <Navbar />

            <main className="auth-void">
                <AnimatePresence mode="wait">
                    <motion.div
                        className="auth-vault acrylic"
                        variants={vaultVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="vault-header">
                            <span className="vault-tag">Welcome</span>
                            <h1 className="display-text small">
                                Enter Your <br />
                                <span className="ethereal-gradient">Username</span>
                            </h1>
                        </div>

                        <form className="vault-form" onSubmit={handleSubmit}>
                            <div className="input-field">
                                <label>Username</label>
                                <motion.input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={handleChange}
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <motion.div
                                    className="auth-error-chip"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button className="btn-master full-width" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Start Quiz'}
                            </button>
                        </form>

                        <div className="vault-footer">
                            <p>No login required! Just enter your name to begin the quiz.</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

export default Auth;
