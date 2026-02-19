import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const bloomVariants = {
    hidden: { opacity: 0, scale: 1.1, filter: "blur(20px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.15
        }
    }
};

const textFade = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
    }
};

function Home() {
    const featureRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Smooth cinematic parallax
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const featureY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);

    return (
        <div className="home-wrapper">
            <Navbar />

            <main className="home-main">
                {/* Masterclass Hero: The Bloom Experience */}
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
                                <span className="tag">Masterclass 2.0</span>
                                <span className="tag">Neu-Atmospheric</span>
                            </motion.div>

                            <motion.h1 className="display-text" variants={textFade}>
                                Knowledge <br />
                                <span className="ethereal-gradient">Redefined.</span>
                            </motion.h1>

                            <motion.p className="lead-text" variants={textFade}>
                                Step into a cinematic learning environment. <br />
                                Designed for clarity, depth, and mastery.
                            </motion.p>

                            <motion.div className="cta-group" variants={textFade}>
                                <Link to="/auth" className="btn-master outline">
                                    Begin Integration
                                </Link>
                                <button className="btn-master ghost">
                                    Explore Philosophy
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        className="hero-scroll-indicator"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="mouse-wheel" />
                    </motion.div>
                </motion.section>

                {/* Editorial Features Section */}
                <section className="editorial-section" ref={featureRef}>
                    <div className="container">
                        <motion.div
                            className="editorial-grid"
                            style={{ y: featureY }}
                        >
                            {/* Large Feature 1 */}
                            <motion.div
                                className="item-large acrylic"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1 }}
                            >
                                <span className="item-tag">Precision</span>
                                <h2>20+ Cognitive <br /> Channels.</h2>
                                <p>Our curated data layers cover the full spectrum of human insight, from quantum theory to modern art.</p>
                                <div className="interactive-blob blur-primary" />
                            </motion.div>

                            {/* Small Items */}
                            <div className="item-column">
                                <motion.div
                                    className="item-small acrylic"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <h3>Fluid Logic.</h3>
                                    <p>Adaptive testing algorithms that evolve with your pace.</p>
                                </motion.div>
                                <motion.div
                                    className="item-small acrylic"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                >
                                    <h3>Zero Noise.</h3>
                                    <p>Pure interfaces designed to maximize your focus.</p>
                                </motion.div>
                            </div>

                            {/* Wide Feature */}
                            <motion.div
                                className="item-wide acrylic"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2 }}
                            >
                                <div className="wide-content">
                                    <div className="text">
                                        <h2>Global Sync.</h2>
                                        <p>Compare insights with top-tier minds across the planet.</p>
                                    </div>
                                    <div className="visual">
                                        <svg viewBox="0 0 200 200" className="floating-svg">
                                            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
                                            <path d="M100 20 L100 180 M20 100 L180 100" stroke="white" strokeWidth="0.5" opacity="0.1" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
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
                            <h2 className="display-text small">Become the <br /> <span className="ethereal-gradient">Master.</span></h2>
                            <Link to="/auth" className="btn-master full-width">Claim Your Digital Identity</Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
