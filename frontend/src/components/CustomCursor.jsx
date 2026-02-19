import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);

    const mouseX = useSpring(0, { damping: 20, stiffness: 250 });
    const mouseY = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorScale = useSpring(1, { damping: 20, stiffness: 300 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('.option-box') ||
                target.classList.contains('clickable');

            setIsPointer(isClickable);
            cursorScale.set(isClickable ? 1.5 : 1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, cursorScale]);

    return (
        <motion.div
            className={`custom-cursor ${isPointer ? 'pointer' : ''}`}
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
                scale: cursorScale
            }}
        >
            <div className="cursor-dot" />
            <div className="cursor-ring" />
        </motion.div>
    );
};

export default CustomCursor;
