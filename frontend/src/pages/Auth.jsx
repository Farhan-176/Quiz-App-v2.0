import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../lib/supabase';
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
            if (isLogin) {
                // Sign in
                const { user, session, profile } = await auth.signIn(formData.email, formData.password);
                
                localStorage.setItem('token', session.access_token);
                localStorage.setItem('currentUser', JSON.stringify({
                    username: profile?.username || formData.email.split('@')[0],
                    email: formData.email
                }));
            } else {
                // Sign up
                const { user, session } = await auth.signUp(formData.email, formData.password, formData.username);
                
                if (session) {
                    localStorage.setItem('token', session.access_token);
                    localStorage.setItem('currentUser', JSON.stringify({
                        username: formData.username,
                        email: formData.email
                    }));
                } else {
                    setError('Please check your email to confirm your account.');
                    setIsLoading(false);
                    return;
                }
            }

            navigate('/');
        } catch (err) {
            setError(err.message || 'Authentication failed');
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
                            <span className="vault-tag">{isLogin ? 'Welcome Back' : 'Get Started'}</span>
                            <h1 className="display-text small">
                                {isLogin ? 'Sign In to' : 'Create Your'} <br />
                                <span className="ethereal-gradient">{isLogin ? 'Your Account' : 'New Account'}</span>
                            </h1>
                        </div>

                        <form className="vault-form" onSubmit={handleSubmit}>
                            <div className="input-field">
                                <label>Email Address</label>
                                <motion.input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
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
                                        placeholder="Username"
                                        onChange={handleChange}
                                        variants={inputVariants}
                                        whileFocus="focus"
                                        required
                                    />
                                </div>
                            )}

                            <div className="input-field">
                                <label>Password</label>
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
                                {isLoading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>

                        <div className="vault-footer">
                            <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
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
