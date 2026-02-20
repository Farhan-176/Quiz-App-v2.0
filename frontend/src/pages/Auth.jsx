import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Auth.css';

const vaultVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(40px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
    },
    exit: {
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 0.8 }
    }
};

const inputVariants = {
    focus: { scale: 1.02, borderColor: "var(--aurora-1)", boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)" },
    blur: { scale: 1, borderColor: "var(--acrylic-border)", boxShadow: "none" }
};

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const response = await axios.post(`http://localhost:5000${endpoint}`, formData);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('currentUser', JSON.stringify({
                username: response.data.user.username,
                email: response.data.user.email
            }));

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || err.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-master-wrapper">
            <Navbar />

            <main className="auth-void">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'register'}
                        className="auth-vault acrylic"
                        variants={vaultVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="vault-header">
                            <span className="vault-tag">{isLogin ? 'Secure Access' : 'New Identity'}</span>
                            <h1 className="display-text small">
                                {isLogin ? 'Identity' : 'Creation'} <br />
                                <span className="ethereal-gradient">{isLogin ? 'Vault' : 'Gateway'}</span>
                            </h1>
                        </div>

                        <form className="vault-form" onSubmit={handleSubmit}>
                            <div className="input-field">
                                <label>Email Address</label>
                                <motion.input
                                    type="email"
                                    name="email"
                                    placeholder="user@network.com"
                                    onChange={handleChange}
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <div className="input-field">
                                    <label>Username</label>
                                    <motion.input
                                        type="text"
                                        name="username"
                                        placeholder="DESIGNATOR"
                                        onChange={handleChange}
                                        variants={inputVariants}
                                        whileFocus="focus"
                                        required
                                    />
                                </div>
                            )}

                            <div className="input-field">
                                <label>Access Key</label>
                                <motion.input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    variants={inputVariants}
                                    whileFocus="focus"
                                    required
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
                                {isLoading ? 'Authenticating...' : (isLogin ? 'Establish Connection' : 'Register Identity')}
                            </button>
                        </form>

                        <div className="vault-footer">
                            <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Need a new designator? Create ID" : "Already registered? Login"}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {isLogin && (
                    <motion.div
                        className="demo-vault-info"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <p>Guest Credentials: <span>demo@quiz.com / demo123</span></p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

export default Auth;
