import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SneakPeekWidget } from '../components/SneakPeekWidget';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { MagneticCardFixed } from '../components/MagneticCardFixed';
import { MediaHubTile, ProfessionalTile, SocialsTile } from '../components/NavigationalBento';

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

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const isScrolling = useRef(false);
    const currentPageRef = useRef(0);
    const totalPagesRef = useRef(window.innerWidth >= 1024 ? 2 : 4);

    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    useEffect(() => {
        const handleResize = () => {
            const newTotal = window.innerWidth >= 1024 ? 2 : 4;
            totalPagesRef.current = newTotal;
            setCurrentPage(prev => Math.min(prev, newTotal - 1));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

                            <StaggerContainer className="w-full h-full flex flex-col justify-center items-end text-right relative z-10 pointer-events-none mt-8 lg:mt-0 lg:pr-8 xl:pr-12 min-w-0">
                                <StaggerItem className="w-full flex justify-end min-w-0">
                                    <div className="mb-4 md:mb-6 flex flex-col items-end w-full lg:max-w-[50rem] xl:max-w-[56rem] 2xl:max-w-[64rem]">
                                        <h1 className="text-[8vw] sm:text-4xl md:text-5xl lg:text-[2.25vw] xl:text-[2.75vw] 2xl:text-[3.25vw] font-heavy tracking-normal 2xl:tracking-tighter mb-2 md:mb-4 leading-[0.85] text-white/50 drop-shadow-2xl mix-blend-plus-lighter w-full">
                                            <div className="mb-1"><TypewriterText text="Award-" delay={0.2} /></div>
                                            <div><TypewriterText text="Winning" delay={0.6} /></div>
                                        </h1>
                                        <h2 className="text-[9.5vw] sm:text-[3.25rem] md:text-[4.5rem] lg:text-[3.5vw] xl:text-[4vw] 2xl:text-[4.25vw] font-heavy tracking-normal xl:tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] mt-1 md:mt-2 leading-[0.9] w-full break-words">
                                            <div className="mb-1"><TypewriterText text="Visual" delay={1.0} /></div>
                                            <div><TypewriterText text="Storyteller" delay={1.4} /></div>
                                        </h2>
                                        <div className="w-full block text-right whitespace-nowrap mt-3 text-white/70 font-ultra-thin uppercase tracking-[0.1em] xl:tracking-widest text-[9px] sm:text-[10px] lg:text-[8px] xl:text-[10px] 2xl:text-sm drop-shadow-md leading-[1.6]">
                                            <span className="inline-block"><TypewriterText text="TECHNICAL" delay={1.8} /></span>
                                            {" "}
                                            <span className="inline-block"><TypewriterText text="BACKGROUND" delay={1.9} /></span>
                                            {" "}
                                            <span className="inline-block"><TypewriterText text="IN" delay={2.0} /></span>
                                            {" "}
                                            <strong className="font-medium text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] inline-block"><TypewriterText text="COMPUTER SCIENCE" delay={2.1} /></strong>
                                            {" "}
                                            <span className="inline-block"><TypewriterText text="AND" delay={2.2} /></span>
                                            {" "}
                                            <strong className="font-medium text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] inline-block"><TypewriterText text="ANALYTICS" delay={2.3} /></strong>
                                        </div>
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="mb-4 md:mb-8 mt-4 md:mt-6 px-4 md:px-0 md:pr-4 border-r-4 md:border-r-8 border-white/20 w-full flex flex-col items-end">
                                        <p className="text-lg md:text-xl xl:text-2xl text-white/70 font-heavy uppercase tracking-normal xl:tracking-tighter leading-tight drop-shadow-md text-right">
                                            <span className="inline-block mr-1 md:mr-2"><TypewriterText text="Recognized" delay={2.5} /></span>
                                            <span className="inline-block"><TypewriterText text="with" delay={2.7} /></span>
                                            <br className="hidden md:block" />
                                            <strong className="text-[4rem] md:text-[4.5rem] lg:text-[3.5rem] xl:text-[4.5rem] 2xl:text-[5rem] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] block my-1">
                                                <AnimatedCounter to={6} duration={2.5} delay={2.5} />
                                            </strong>
                                            <span className="inline-block mr-1 md:mr-2"><TypewriterText text="Regional" delay={2.9} /></span>
                                            <span className="inline-block"><TypewriterText text="Awards" delay={3.1} /></span>
                                        </p>
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

                {/* Page 2: Desktop Bento Dashboard */}
                <section className="w-full h-screen relative hidden lg:flex flex-col justify-center py-24 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 z-10 px-6 pointer-events-auto shrink-0">
                    <div className="w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center">
                        <h2 className="text-4xl text-center font-ultra-thin mb-8 shrink-0">Discover <strong className="font-heavy">More</strong></h2>
                        <div className="grid grid-cols-3 grid-rows-2 gap-6 w-full h-[calc(100vh-14rem)] min-h-[400px]">
                            <MediaHubTile className="col-span-2 row-span-2" />
                            <ProfessionalTile className="col-span-1 row-span-1" />
                            <SocialsTile className="col-span-1 row-span-1" />
                        </div>
                    </div>
                </section>

                {/* Page 3: Mobile Bento 1 - Media Hub */}
                <section className="w-full h-[100svh] relative flex lg:hidden flex-col justify-center pt-24 pb-32 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 z-10 px-6 pointer-events-auto shrink-0 overflow-hidden">
                    <div className="w-full h-full flex flex-col">
                        <h2 className="text-3xl text-center font-ultra-thin mb-6 shrink-0 z-20">Media <strong className="font-heavy">Hub</strong></h2>
                        <MediaHubTile className="flex-grow min-h-0 w-full z-10" />
                    </div>
                </section>

                {/* Page 4: Mobile Bento 2 - Pro & Socials */}
                <section className="w-full h-[100svh] relative flex lg:hidden flex-col justify-center pt-24 pb-32 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 z-10 px-6 pointer-events-auto shrink-0 overflow-hidden">
                    <div className="w-full h-full flex flex-col gap-6 relative z-10">
                        <ProfessionalTile className="flex-[3] min-h-0 w-full" />
                        <SocialsTile className="flex-[2] min-h-0 w-full" />
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
