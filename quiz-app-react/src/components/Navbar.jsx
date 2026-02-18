import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Safe user parsing
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser && storedUser !== 'undefined') {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error('Failed to parse user', e);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">🚀</span>
                    <span className="logo-text">QuizMaster</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link to="/quiz" className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}>Quizzes</Link>
                    {user?.username ? (
                        <div className="nav-user">
                            <span className="user-name">{user.username}</span>
                            <div className="user-avatar">{user.username[0]?.toUpperCase() || '?'}</div>
                        </div>
                    ) : (
                        <Link to="/auth" className="btn-premium btn-small">Sign In</Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
