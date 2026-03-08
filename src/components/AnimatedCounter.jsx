import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const AnimatedCounter = ({ from = 0, to = 100, duration = 2, delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10px" });
    const [count, setCount] = useState(from);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (!inView) return;
        let isMounted = true;

        const startAnimation = () => {
            if (!isMounted) return;
            setHighlight(true);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                setCount(Math.floor(progress * (to - from) + from));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    setTimeout(() => { if (isMounted) setHighlight(false) }, 500);
                }
            };
            window.requestAnimationFrame(step);
        };

        const timeoutId = setTimeout(startAnimation, delay * 1000);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [inView, to, from, duration, delay]);

    return <span ref={ref} className={`transition-all duration-500 ${highlight ? 'text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,1)]' : ''}`}>{count}</span>;
};
