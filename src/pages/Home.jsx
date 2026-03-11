import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SneakPeekWidget } from '../components/SneakPeekWidget';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
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

const TypewriterLoop = ({ words, delayStart = 0, typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000 }) => {
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
            <span className="whitespace-nowrap opacity-0 pointer-events-none select-none block px-1">{longestWord}</span>
            {/* Right-aligned absolute positioning so text grows out to the LEFT */}
            <span className="absolute right-0 top-0 whitespace-nowrap flex items-center text-transparent bg-clip-text bg-gradient-to-l from-white via-white/90 to-white/60">
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
    const totalPagesRef = useRef(2); // hero + discover

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
            <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.15 }}
                    transition={{ duration: 25, ease: "easeOut" }}
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
                    <div className="pt-12 pb-6 md:pt-24 md:pb-16 px-6 max-w-7xl xl:max-w-[85vw] 2xl:max-w-[80vw] w-full mx-auto min-h-[100svh] md:min-h-[90vh] flex flex-col items-start justify-start md:justify-center relative">
                        <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 md:gap-8 items-center lg:items-stretch pt-6 md:pt-12">
                            <StaggerContainer className="w-full h-full hidden lg:flex flex-col items-start justify-center perspective-[1000px] xl:pl-12">
                                <StaggerItem className="w-full lg:max-w-none">
                                    <SneakPeekWidget />
                                </StaggerItem>
                            </StaggerContainer>

                            <StaggerContainer className="w-full h-full flex flex-col justify-center items-end text-right relative z-10 pointer-events-none mt-0 lg:mt-[-5vh] xl:mt-[-10vh] lg:pr-8 xl:pr-12 min-w-0">
                                <StaggerItem className="w-full flex justify-end min-w-0">
                                    <div className="mb-4 md:mb-6 flex flex-col items-end w-full lg:max-w-[50rem] xl:max-w-[56rem] 2xl:max-w-[64rem]">
                                        <h1 className="text-[10vw] sm:text-[4rem] md:text-[5.5rem] lg:text-[4.5vw] xl:text-[5vw] 2xl:text-[5.5vw] font-heavy tracking-normal 2xl:tracking-tighter mb-1 md:mb-2 leading-[0.85] text-white/60 drop-shadow-2xl mix-blend-plus-lighter w-full">
                                            <div className="mb-0.5 md:mb-1"><TypewriterText text="APIL KC |" delay={0.2} /></div>
                                        </h1>

                                        <div className="w-full flex flex-col items-end text-right">
                                            <h2 className="text-[6vw] sm:text-[2.5rem] md:text-[3rem] lg:text-[2.5vw] xl:text-[3vw] 2xl:text-[3.5vw] font-heavy tracking-normal xl:tracking-tighter uppercase text-white/40 mb-1 lg:mb-2 leading-none mix-blend-plus-lighter drop-shadow-md pr-[0.3em] md:pr-[0.4em]">
                                                <TypewriterText text="I AM A" delay={0.8} />
                                            </h2>

                                            <h3 className="text-[9.5vw] sm:text-[3.25rem] md:text-[4.5rem] lg:text-[3.5vw] xl:text-[4vw] 2xl:text-[4.25vw] font-heavy tracking-normal xl:tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] leading-[0.9] mt-1">
                                                <TypewriterLoop words={['STORYTELLER', 'PHOTOGRAPHER', 'MEDIA ANALYST', 'WEB DESIGNER', 'DIGITAL STRATEGIST']} delayStart={1.4} />
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-end w-full mt-6 md:mt-12 lg:mt-16 gap-4 md:gap-6 w-full opacity-80 mix-blend-plus-lighter">
                                            <motion.div
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "min(30vw, 200px)", opacity: 1 }}
                                                transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
                                                className="h-[1px] bg-gradient-to-l from-white/70 to-transparent"
                                            />
                                            <div className="text-right whitespace-nowrap text-white/70 font-light uppercase tracking-[0.1em] lg:tracking-[0.15em] text-[8px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] 2xl:text-sm drop-shadow-lg leading-none">
                                                <span className="inline-block"><TypewriterText text="INTEGRATING CREATIVE MEDIA WITH" delay={1.8} /></span>
                                                {" "}
                                                <strong className="font-semibold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] inline-block"><TypewriterText text="ANALYTICAL THINKING." delay={2.2} /></strong>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>


                            </StaggerContainer>
                        </div>
                    </div>
                </section>

                {/* Page 1.5: Interactive Widget (Mobile Only) */}
                <section className="w-full h-[100svh] relative flex lg:hidden flex-col items-center justify-center shrink-0 px-6 pt-12">
                    <StaggerContainer className="w-full flex flex-col items-center justify-center perspective-[1000px]">
                        <StaggerItem className="w-full max-w-[26rem]">
                            <SneakPeekWidget />
                        </StaggerItem>
                    </StaggerContainer>
                </section>

                {/* Page 2: Discover Section — glassmorphic widgets on dotted bg */}
                <section className="w-full h-screen relative flex z-10 shrink-0 overflow-hidden pointer-events-auto" style={{ background: '#fafafa', backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                    {/* "Discover" label top-right */}
                    <div className="absolute top-5 right-8 z-20 pointer-events-none">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">Discover</p>
                    </div>

                    {/* Left: large media widget */}
                    <div className="flex-[6] min-w-0 p-6 pr-3 flex items-stretch">
                        <div className="w-full h-full rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
                            style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}>
                            <MediaSection className="w-full h-full" />
                        </div>
                    </div>

                    {/* Right: two stacked glass widgets */}
                    <div className="flex-[4] min-w-0 p-6 pl-3 flex flex-col gap-4">
                        {/* Top-right: About & Contact */}
                        <div className="flex-1 min-h-0 rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                            style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}>
                            <ConnectSection className="w-full h-full" />
                        </div>
                        {/* Bottom-right: Experience & Projects */}
                        <div className="flex-1 min-h-0 rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                            style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)' }}>
                            <ProfessionalSection className="w-full h-full" />
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
