import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SneakPeekWidget } from '../components/SneakPeekWidget';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { Helmet } from 'react-helmet-async';
import { MagneticCardFixed } from '../components/MagneticCardFixed';
import { MediaSection, ProfessionalSection, ConnectSection } from '../components/NavigationalBento';

const TypewriterText = ({ text, delay = 0 }) => {
    return (
        <span className="inline-block whitespace-nowrap">
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.1,
                        delay: delay + index * 0.05,
                        ease: "linear"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

const TypewriterLoop = ({ words, prefix = "", delayStart = 0, typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setHasStarted(true), delayStart * 1000);
        return () => clearTimeout(startTimer);
    }, [delayStart]);

    useEffect(() => {
        if (!hasStarted) return;

        const fullWord = words[currentWordIndex];
        let timer;

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText(fullWord.substring(0, currentText.length - 1));
                if (currentText.length === 0) {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText(fullWord.substring(0, currentText.length + 1));
                if (currentText.length === fullWord.length) {
                    timer = setTimeout(() => setIsDeleting(true), pauseDelay);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDelay, hasStarted]);

    const longestWord = [...words].sort((a, b) => b.length - a.length)[0];

    return (
        <span className="inline-flex relative font-bold drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
            {/* The hidden text creates the full width */}
            <span className="whitespace-nowrap opacity-0 pointer-events-none select-none block px-1">
                <motion.span 
                    animate={{ opacity: hasStarted ? 0.4 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[0.45em] md:text-[0.45em] mr-4 uppercase font-normal tracking-[0.2em] text-white inline-block relative"
                >
                    {prefix}
                </motion.span>
                {longestWord}
            </span>
            {/* Right-aligned absolute positioning so the prefix travels with the text as it grows to the LEFT */}
            <span className="absolute right-0 top-0 whitespace-nowrap flex items-baseline text-transparent bg-clip-text bg-gradient-to-l from-white via-white/90 to-white/60">
                <motion.span 
                    animate={{ opacity: hasStarted ? 0.4 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[0.45em] md:text-[0.45em] mr-4 uppercase font-normal tracking-[0.2em] text-white inline-block relative"
                >
                    {prefix}
                </motion.span>
                {currentText}
                <span className="animate-[pulse_1s_ease-in-out_infinite] font-light text-white/50 text-[1.1em] align-baseline ml-1 mb-1 relative top-[1px]">|</span>
            </span>
        </span>
    );
};

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const currentPageRef = useRef(0);
    const totalPagesRef = useRef(1); // hero only

    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    useEffect(() => {
        // Register ONCE — uses ref so it never needs to be re-registered
        const handleWheel = (e) => {
            e.preventDefault();
            if (isScrolling.current) return;
            if (Math.abs(e.deltaY) < 30) return;

            isScrolling.current = true;
            const page = currentPageRef.current;

            if (e.deltaY > 0 && page < totalPagesRef.current - 1) {
                setCurrentPage(page + 1);
            } else if (e.deltaY < 0 && page > 0) {
                setCurrentPage(page - 1);
            }

            setTimeout(() => { isScrolling.current = false; }, 700);
        };

        let touchStartY = 0;
        const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
        const handleTouchMove = (e) => {
            if (isScrolling.current) return;
            const deltaY = touchStartY - e.touches[0].clientY;
            if (Math.abs(deltaY) > 50) {
                isScrolling.current = true;
                const page = currentPageRef.current;
                if (deltaY > 0 && page < totalPagesRef.current - 1) setCurrentPage(page + 1);
                else if (deltaY < 0 && page > 0) setCurrentPage(page - 1);
                setTimeout(() => { isScrolling.current = false; }, 700);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []); // Empty deps — register once only

    return (
        <div className="w-full h-screen overflow-hidden relative">
            <Helmet>
                <title>Apil KC | Digital Media Strategist & Photographer</title>
            </Helmet>
            <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-photo h-full w-full origin-center"
                />
            </div>

            <motion.div
                className="w-full h-full flex flex-col will-change-transform"
                animate={{ y: `-${currentPage * 100}vh` }}
                transition={{
                    type: "tween",
                    ease: [0.76, 0, 0.24, 1],
                    duration: 0.65
                }}
            >
                {/* Page 1: Hero Landing */}
                <section className="w-full h-screen relative overflow-hidden flex flex-col justify-center shrink-0">

                    {/* Hero Widget Hidden for now */}
                    {/* 
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                            opacity: 1, 
                            x: 0,
                            y: [0, -10, 0]
                        }}
                        transition={{ 
                            opacity: { duration: 1, delay: 0.5 },
                            x: { duration: 1, delay: 0.5 },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute top-20 left-6 xl:left-12 hidden lg:block z-10"
                    >
                        <div
                            className="relative p-4 rounded-[2rem] w-fit -ml-4 xl:-ml-8"
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(18px) saturate(160%)',
                                WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                boxShadow: '0 12px 48px -8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
                            }}
                        >
                            <SneakPeekWidget />
                        </div>
                    </motion.div>
                    */}

                    {/* Consolidated Hero Stack — Right Aligned */}
                    <div className="absolute top-[65%] md:top-[55%] right-6 md:right-12 xl:right-20 z-20 flex flex-col items-end max-w-[90vw] md:max-w-4xl pointer-events-none">
                        
                        {/* Primary Hero: APIL KC */}
                        <motion.h1 className="flex mb-2 justify-end" aria-label="Apil KC">
                            {"APIL KC".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        duration: 1.5, 
                                        delay: 0.5 + i * 0.1, 
                                        ease: [0.22, 1, 0.36, 1] 
                                    }}
                                    className="text-[10vw] sm:text-[12vw] md:text-[10vw] xl:text-[9vw] font-normal tracking-[-0.05em] leading-none text-white/30 mix-blend-plus-lighter select-none uppercase whitespace-nowrap drop-shadow-2xl text-right"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Secondary Hero: Typewriter Roles */}
                        <div className="flex flex-col items-end mt-1">
                            <h3 className="text-[1.8rem] xs:text-[2.2rem] md:text-[2.8rem] xl:text-[3.2rem] font-heavy tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mix-blend-plus-lighter leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] text-right">
                                <TypewriterLoop 
                                    prefix="I AM A"
                                    words={['DIGITAL STRATEGIST', 'STORYTELLER', 'CREATIVE', 'MEDIA ANALYST', 'WEB DESIGNER']} 
                                    delayStart={3.0} 
                                />
                            </h3>
                        </div>

                        {/* Tagline — aligned with the stack */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 2, delay: 3.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-4 mt-6 flex-row w-full origin-right justify-end"
                        >
                            <div className="h-0.5 bg-gradient-to-l from-white/60 to-transparent flex-1 max-w-[15rem] md:max-w-[28rem]" />
                            <p className="text-[9px] md:text-[12px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-white/60 font-normal text-right">
                                <span className="opacity-70">Integrating Creative Media with</span>{" "}
                                <strong className="font-heavy text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">Analytical Thinking</strong>
                            </p>
                        </motion.div>
                    </div>

                    {/* Mobile widget hidden */}
                    {/*
                    <div className="flex lg:hidden items-center justify-center w-full h-full px-6 pt-20">
                        <div
                            className="relative p-5 rounded-[2rem] w-fit"
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(18px) saturate(160%)',
                                WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                boxShadow: '0 12px 48px -8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
                            }}
                        >
                            <SneakPeekWidget />
                        </div>
                    </div>
                    */}

                </section>

            </motion.div>
        </div>
    );
}
