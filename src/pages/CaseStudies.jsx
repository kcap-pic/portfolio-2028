import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';

const CaseStudyCard = ({ id, title, category, summary, backgroundImage, href, isHovered, isOtherHovered, onHover, side }) => {
    return (
        <motion.div
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => window.location.hash = href}
            layout
            animate={{
                width: isHovered ? '66%' : isOtherHovered ? '28%' : '46%',
                zIndex: isHovered ? 50 : 10,
                opacity: isOtherHovered ? 0.4 : 1,
                filter: isOtherHovered ? 'blur(16px)' : 'blur(0px)',
                x: isHovered ? (side === 'left' ? '2%' : '-2%') : 0
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1 }}
            className={`relative overflow-hidden backdrop-blur-md border border-white/20 rounded-[2.5rem] cursor-pointer shadow-2xl bg-white/5 h-[350px] md:h-[550px] flex flex-col items-center justify-center p-8 transition-all duration-700`}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={backgroundImage} 
                    alt={title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
                <motion.p 
                    animate={{ opacity: isHovered ? 0.6 : 0.8 }}
                    className="text-[10px] md:text-xs font-heavy text-white uppercase tracking-[0.4em] mb-4"
                >
                    {category}
                </motion.p>
                
                <motion.h2 
                    animate={{ scale: isHovered ? 1.3 : 1 }}
                    className="text-4xl md:text-7xl font-heavy text-white tracking-tighter leading-none m-0 drop-shadow-2xl"
                >
                    {title}
                </motion.h2>

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center gap-6 mt-6 max-w-xl"
                        >
                            <p className="text-white/80 text-sm md:text-lg font-light leading-relaxed">
                                {summary}
                            </p>
                            <div className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-heavy uppercase tracking-widest">
                                View Case Study ↗
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export const CaseStudies = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="w-full min-h-screen bg-transparent relative overflow-hidden pt-32 md:pt-48 pb-64 px-6 md:px-12 flex flex-col items-center">
            <div className="fixed inset-0 bg-[#fafafa] -z-[2]" />
            <div 
                className="fixed inset-0 -z-[1] pointer-events-none transition-all duration-700" 
                style={{ 
                    backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', 
                    backgroundSize: '64px 64px', 
                    animation: 'moveDots 8s linear infinite',
                    filter: hoveredId ? 'blur(10px) opacity(0.3)' : 'blur(0px) opacity(1)'
                }}
            />

            <motion.div 
                animate={{ 
                    filter: hoveredId ? 'blur(8px)' : 'blur(0px)',
                    opacity: hoveredId ? 0.2 : 1
                }}
                className="w-full max-w-7xl flex flex-col items-start mb-16 md:mb-24 z-20"
            >
                <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 mb-6 text-sm font-ultra-thin tracking-widest uppercase">
                    <span>← Back</span>
                </a>
                <h1 className="text-6xl md:text-[10rem] font-ultra-thin tracking-tighter text-slate-900 leading-none m-0">
                    Case <strong className="font-heavy">Studies</strong>.
                </h1>
            </motion.div>

            {/* Coming Soon State (Requested by User) */}
            <div className="w-full max-w-7xl flex items-center justify-center relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full max-w-4xl overflow-hidden backdrop-blur-xl border border-slate-900/10 rounded-[3rem] shadow-2xl bg-white/40 h-[400px] md:h-[500px] flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    
                    <span className="text-[10px] md:text-xs font-heavy text-slate-400 uppercase tracking-[0.5em] mb-8">Professional Portfolio</span>
                    <h2 className="text-5xl md:text-8xl font-heavy text-slate-900 tracking-tighter leading-none mb-8">
                        Coming <br />
                        <span className="font-ultra-thin">Soon.</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                        I'm currently architecting detailed deep-dives into my major projects. Stay tuned.
                    </p>
                    
                    <div className="mt-12 flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-900 animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 rounded-full bg-slate-900 animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-slate-900 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
