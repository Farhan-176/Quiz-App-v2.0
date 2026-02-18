import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import './AuroraBackground.css';

const AuroraBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();

    // Parallax intensities
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="aurora-wrapper">
            <motion.div
                className="aurora-layers"
                style={{ scale }}
            >
                {/* Layer 1: The Base Void */}
                <div className="aurora-base" />

                {/* Layer 2: Electric Indigo Aurora */}
                <motion.div
                    className="aurora-light light-1"
                    animate={{
                        x: mousePos.x * 0.5,
                        y: mousePos.y * 0.5 + 50,
                        rotate: [0, 10, 0]
                    }}
                    transition={{ type: "spring", damping: 50, stiffness: 50 }}
                    style={{ y: y1 }}
                />

                {/* Layer 3: Phlox Purple Aurora */}
                <motion.div
                    className="aurora-light light-2"
                    animate={{
                        x: mousePos.x * -0.7,
                        y: mousePos.y * -0.7 - 50,
                        rotate: [0, -15, 0]
                    }}
                    transition={{ type: "spring", damping: 70, stiffness: 30 }}
                    style={{ y: y2 }}
                />

                {/* Layer 4: Cyan Drift */}
                <motion.div
                    className="aurora-light light-3"
                    animate={{
                        x: mousePos.x * 1,
                        y: mousePos.y * 0.4
                    }}
                    transition={{ type: "spring", damping: 60, stiffness: 40 }}
                />

                {/* Layer 5: Noise & Texture */}
                <div className="aurora-texture" />
            </motion.div>
        </div>
    );
};

export default AuroraBackground;
