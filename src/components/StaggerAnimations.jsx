import React from 'react';
import { motion } from 'framer-motion';

export const StaggerContainer = ({ children, className }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 80, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 12, mass: 0.8 } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
