import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticCardFixed } from './MagneticCardFixed';

export const SneakPeekWidget = () => {
    const pages = [
        { title: "Photography Portfolio", subtitle: "Category Index", url: "#/photography", isMiniLayout: true },
        { title: "Videos & Reels", subtitle: "Cinematic Showcase", url: "#/videos", color: "from-purple-500/20 to-pink-500/20" },
        { title: "Selected Projects", subtitle: "Technical & Visual", url: "#/projects", color: "from-blue-500/20 to-cyan-500/20" },
        { title: "Experience & Awards", subtitle: "Professional Timeline", url: "#/experience", color: "from-yellow-500/20 to-orange-500/20" },
        { title: "Contact", subtitle: "Let's Connect", url: "#/contact", color: "from-emerald-500/20 to-teal-500/20" }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % pages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [pages.length]);

    const swipeLeft = () => {
        setCurrentIndex((prev) => (prev - 1 + pages.length) % pages.length);
    };

    const swipeRight = () => {
        setCurrentIndex((prev) => (prev + 1) % pages.length);
    };

    return (
        <MagneticCardFixed className="w-full lg:w-[20rem] xl:w-[24rem] 2xl:w-[26rem] aspect-[4/3] sm:aspect-[22/28] min-h-[16rem] sm:min-h-[24rem] max-h-[24rem] sm:max-h-[32rem] glass rounded-[2.5rem] p-4 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between group mx-auto lg:mx-0">
            <div className="relative flex-1 flex items-center justify-center mt-4">
                {/* Interactive Click Zones: Left and Right Edges only (fixed width) */}
                <div className="absolute top-0 left-0 w-16 md:w-20 h-full z-20 cursor-w-resize" onClick={swipeLeft}></div>
                <div className="absolute top-0 right-0 w-16 md:w-20 h-full z-20 cursor-e-resize" onClick={swipeRight}></div>

                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipeConfidenceThreshold = 10000;
                            const swipePower = Math.abs(offset.x) * velocity.x;

                            if (swipePower < -swipeConfidenceThreshold) {
                                swipeRight();
                            } else if (swipePower > swipeConfidenceThreshold) {
                                swipeLeft();
                            }
                        }}
                        className={`absolute inset-0 flex flex-col items-center justify-center text-center w-full ${pages[currentIndex].url ? 'pointer-events-auto z-30' : 'pointer-events-none'}`}
                    >
                        <div className={`w-48 h-48 rounded-full bg-gradient-to-tr ${pages[currentIndex].color} blur-3xl absolute -z-10`} />

                        {pages[currentIndex].isMiniLayout ? (
                            <a href={pages[currentIndex].url} className="group/link flex flex-col items-center z-10 w-full h-full justify-center">
                                <div className="w-[85%] sm:w-[75%] aspect-[5/6] sm:aspect-[4/5] rounded-[1.5rem] bg-[#fafafa] border border-slate-200 p-3 flex flex-col gap-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden group-hover/link:scale-105 transition-transform duration-500" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
                                    <div className="h-2 w-1/2 bg-slate-300 rounded-full mb-1 shadow-sm"></div>
                                    <div className="flex-[2] flex gap-2 w-full">
                                        <div className="flex-[3] bg-white border border-white/40 rounded-xl overflow-hidden relative shadow-sm"><img src="/Sports/IMG_7559.jpg" className="absolute inset-0 w-full h-full object-cover" /></div>
                                        <div className="flex-[2] bg-transparent backdrop-blur-none border border-slate-900/15 rounded-xl flex flex-col items-center justify-center gap-1 shadow-[inset_5px_5px_10px_rgba(255,255,255,1),inset_-5px_-5px_12px_rgba(0,0,0,0.15),0_16px_32px_rgba(0,0,0,0.25)]"><div className="w-1/2 h-1 bg-slate-400 rounded-full"></div><div className="w-1/3 h-1 bg-slate-300 rounded-full"></div></div>
                                    </div>
                                    <div className="flex-[2] flex gap-2 w-full">
                                        <div className="flex-[2] bg-transparent backdrop-blur-none border border-slate-900/15 rounded-xl flex flex-col items-center justify-center gap-1 shadow-[inset_5px_5px_10px_rgba(255,255,255,1),inset_-5px_-5px_12px_rgba(0,0,0,0.15),0_16px_32px_rgba(0,0,0,0.25)]"><div className="w-1/2 h-1 bg-slate-400 rounded-full"></div><div className="w-1/3 h-1 bg-slate-300 rounded-full"></div></div>
                                        <div className="flex-[3] bg-white border border-white/40 rounded-xl overflow-hidden relative shadow-sm"><img src="/Events/Cover.jpg" className="absolute inset-0 w-full h-full object-cover" /></div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-white/40 to-transparent pointer-events-none"></div>
                                    <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center pointer-events-none">
                                        <h3 className="text-lg font-heavy tracking-tight text-slate-900 drop-shadow-sm">Photography</h3>
                                    </div>
                                </div>
                            </a>
                        ) : pages[currentIndex].url ? (
                            <a href={pages[currentIndex].url} className="group/link flex flex-col items-center z-10 w-[90%]">
                                {pages[currentIndex].img && (
                                    <img src={pages[currentIndex].img} alt={pages[currentIndex].title} className="w-full max-w-[15rem] aspect-square object-contain rounded-[1.5rem] mb-3 shadow-2xl group-hover/link:scale-105 transition-transform" />
                                )}
                                <h3 className="text-xl md:text-2xl font-heavy mb-1 tracking-tight text-slate-900 drop-shadow-sm group-hover/link:text-red-600 transition-colors leading-tight">{pages[currentIndex].title}</h3>
                                <p className="text-xs font-light text-slate-600 group-hover/link:text-slate-900 transition-colors">{pages[currentIndex].subtitle}</p>
                            </a>
                        ) : (
                            <div className="flex flex-col items-center z-10 w-[90%]">
                                {pages[currentIndex].img && (
                                    <img src={pages[currentIndex].img} alt={pages[currentIndex].title} className="w-full max-w-[15rem] aspect-square rounded-[1.5rem] mb-3 shadow-2xl object-cover" />
                                )}
                                <h3 className="text-xl md:text-2xl font-heavy mb-1 tracking-tight text-slate-900 drop-shadow-sm leading-tight">{pages[currentIndex].title}</h3>
                                <p className="text-xs font-light text-slate-600">{pages[currentIndex].subtitle}</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="text-center z-10 text-xs font-heavy text-slate-400 mt-4 tracking-widest uppercase flex items-center justify-center gap-2 relative pointer-events-none">
                <span>Tap Edges to Swipe</span>
                <motion.span
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    ↔
                </motion.span>
            </div>
        </MagneticCardFixed>
    );
};
