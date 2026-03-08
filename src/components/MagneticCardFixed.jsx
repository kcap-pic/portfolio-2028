import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const MagneticCardFixed = ({ children, className }) => {
    const ref = useRef(null);

    const x = useSpring(0, { stiffness: 300, damping: 30 });
    const y = useSpring(0, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouse(event) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 1000,
            }}
            className={`glass rounded-3xl p-8 relative overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow duration-500 ${className}`}
        >
            {children}
        </motion.div>
    );
};
