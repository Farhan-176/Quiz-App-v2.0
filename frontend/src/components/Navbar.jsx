import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ quizCounter = null, timer = null }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);

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

        // Close dropdown when clicking outside
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        setUser(null);
        setDropdownOpen(false);
        window.location.href = '/';
    };

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon">Q</div>
                    <span className="logo-text">QuizMaster</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                    {user?.username && (
                        <>
                            <Link to="/quiz" className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`}>Quizzes</Link>
                        </>
                    )}
                    
                    {/* Quiz Counter and Timer - Fixed */}
                    {quizCounter && timer !== null && (
                        <div className="quiz-info-section">
                            <span className="quiz-counter">{quizCounter}</span>
                            <span className="quiz-timer">{timer}s</span>
                        </div>
                    )}
                    
                    {user?.username ? (
                        <div className="nav-user-wrapper" ref={dropdownRef}>
                            <div className="nav-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <span className="user-name">{user.username}</span>
                                <div className="user-avatar">{user.username[0]?.toUpperCase() || '?'}</div>
                                <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
                            </div>
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        className="nav-dropdown"
                                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                                    >
                                        <div className="dropdown-user-info">
                                            <div className="dropdown-avatar">{user.username[0]?.toUpperCase() || '?'}</div>
                                            <div>
                                                <div className="dropdown-username">{user.username}</div>
                                                <div className="dropdown-email">{user.email || 'Logged in'}</div>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item signout" onClick={handleSignOut}>
                                            <span>⏻</span> Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
