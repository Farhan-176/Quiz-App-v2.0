import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const springTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    restDelta: 0.001
};

const bloomVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            staggerChildren: 0.1,
            ...springTransition
        }
    }
};

const textFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springTransition
    }
};

const RevealText = ({ children, delay = 0, className = "" }) => {
    return (
        <span style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: 'inline-block' }}
                className={className}
            >
                {children}
            </motion.span>
        </span>
    );
};

const BentoCard = ({ children, className, delay = 0 }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [shineX, setShineX] = useState(50);
    const [shineY, setShineY] = useState(50);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const degreeX = (mouseY - centerY) / 25;
        const degreeY = (mouseX - centerX) / -25;

        setRotateX(degreeX);
        setRotateY(degreeY);

        // Shine tracking
        const xPerc = ((mouseX - rect.left) / rect.width) * 100;
        const yPerc = ((mouseY - rect.top) / rect.height) * 100;
        setShineX(xPerc);
        setShineY(yPerc);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={className}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            style={{
                transformStyle: "preserve-3d",
                perspective: 1200
            }}
        >
            <div
                className="shine-layer"
                style={{
                    background: isHovered
                        ? `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
                        : 'transparent'
                }}
            />
            <div style={{ transform: "translateZ(30px)", height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </motion.div>
    );
};

function Home() {
    const featureRef = useRef(null);
    const [user, setUser] = useState(null);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser && storedUser !== 'undefined') {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error('Failed to parse user', e);
        }
    }, []);

    // High-precision parallax
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

    return (
        <div className="home-wrapper">
            <Navbar />

            <main className="home-main">
                {/* Masterclass Hero: Kinetic Reveal */}
                <motion.section
                    className="hero-master"
                    style={{ opacity: heroOpacity, y: heroY }}
                    initial="hidden"
                    animate="visible"
                    variants={bloomVariants}
                >
                    <div className="container">
                        <div className="hero-content">
                            <motion.div className="eyebrow" variants={textFade}>
                                <span className="tag">Next-Gen Platform</span>
                                <span className="tag">Professional Design</span>
                            </motion.div>

                            <motion.h1 className="display-text" variants={textFade}>
                                <RevealText>Learning</RevealText> <br />
                                <RevealText delay={0.2} className="ethereal-gradient">Perfected.</RevealText>
                            </motion.h1>

                            <motion.p className="lead-text" variants={textFade}>
                                Experience a focused and professional assessment platform. <br />
                                Optimized for clarity and performance.
                            </motion.p>

                            <motion.div className="cta-group" variants={textFade}>
                                {user ? (
                                    <Link to="/quiz" className="btn-master outline">
                                        View Quizzes
                                    </Link>
                                ) : (
                                    <Link to="/auth" className="btn-master outline">
                                        Get Started
                                    </Link>
                                )}
                                <Link to="/leaderboard" className="btn-master ghost">
                                    Global Rankings
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                </motion.section>

                {/* Modern Bento Grid Section */}
                <section className="editorial-section" ref={featureRef}>
                    <div className="container">
                        <header className="section-header">
                            <span className="tag">Platform Capabilities</span>
                            <h2 className="display-text small">Next-Gen <span className="ethereal-gradient">Tooling.</span></h2>
                        </header>

                        <div className="bento-grid">
                            {/* Feature 1: The Large Block */}
                            <BentoCard
                                className="bento-item item-main acrylic"
                                delay={0.1}
                            >
                                <span className="item-tag">Data-Driven</span>
                                <h2>20+ Subject <br /> Domains.</h2>
                                <p>Our curated quizzes cover the full spectrum of academic and professional fields.</p>
                                <div className="bento-visual">
                                    <div className="grid-pattern" />
                                </div>
                            </BentoCard>

                            {/* Feature 2: Fluid Logic */}
                            <BentoCard
                                className="bento-item item-side acrylic"
                                delay={0.2}
                            >
                                <div className="icon-box">⚡</div>
                                <h3>Fluid Logic.</h3>
                                <p>Adaptive testing algorithms that evolve with your pace.</p>
                            </BentoCard>

                            {/* Feature 3: Advanced Focus */}
                            <BentoCard
                                className="bento-item item-side acrylic"
                                delay={0.3}
                            >
                                <div className="icon-box">🎯</div>
                                <h3>Advanced Focus.</h3>
                                <p>Clean interfaces designed to maximize concentration.</p>
                            </BentoCard>

                            {/* Feature 4: Global Sync (Wide) */}
                            <BentoCard
                                className="bento-item item-wide acrylic"
                                delay={0.4}
                            >
                                <div className="wide-content">
                                    <div className="text-block">
                                        <h2>Global Sync.</h2>
                                        <p>Compare insights with top-tier minds across the planet.</p>
                                    </div>
                                    <div className="visual-block">
                                        <svg viewBox="0 0 200 200" className="floating-svg">
                                            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
                                            <path d="M100 20 L100 180 M20 100 L180 100" stroke="white" strokeWidth="0.5" opacity="0.1" />
                                        </svg>
                                    </div>
                                </div>
                            </BentoCard>
                        </div>
                    </div>
                </section>

                {/* The Stats: Data Atmosphere */}
                <section className="data-atmosphere">
                    <div className="container">
                        <div className="stats-editorial">
                            <div className="stat-unit">
                                <span className="label">Engaged Minds</span>
                                <span className="value">2.5K</span>
                            </div>
                            <div className="stat-unit">
                                <span className="label">Growth Index</span>
                                <span className="value">+84%</span>
                            </div>
                            <div className="stat-unit">
                                <span className="label">Total Insights</span>
                                <span className="value">1.2M</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Master CTA */}
                <section className="master-cta">
                    <div className="container">
                        <motion.div
                            className="cta-wrapper"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            <h2 className="display-text small">Start Your <br /> <span className="ethereal-gradient">Journey.</span></h2>
                            {user ? (
                                <Link to="/quiz" className="btn-master full-width">Take a Quiz</Link>
                            ) : (
                                <Link to="/auth" className="btn-master full-width">Join the Community</Link>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
