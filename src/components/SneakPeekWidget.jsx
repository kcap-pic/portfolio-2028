import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable mini preview for Photography
export const PhotographyMiniPreview = ({ scale = 1 }) => (
    <div className="w-full h-full rounded-[1.5rem] bg-[#fafafa] border border-slate-200 p-3 flex flex-col gap-2 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
        <div className="h-2 w-1/2 bg-slate-300 rounded-full mb-1 mx-auto shrink-0"></div>
        <div className="flex-[2] flex gap-2 w-full min-h-0">
            <div className="flex-[3] bg-white border border-white/40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/Sports/Soccer/IMG_7559.jpg" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="flex-[2] bg-white border border-white/40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/Sports/Basketball/206-IMG_0057.jpg" className="absolute inset-0 w-full h-full object-cover" />
            </div>
        </div>
        <div className="flex-[2] flex gap-2 w-full min-h-0">
            <div className="flex-[2] bg-white border border-white/40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/Sports/Football/75-IMG_0074.jpg" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="flex-[3] bg-white border border-white/40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/Events/Cover.jpg" className="absolute inset-0 w-full h-full object-cover" />
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-white/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-base font-heavy tracking-tight text-slate-900">Photography</h3>
            <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Category Index</p>
        </div>
    </div>
);

// Reusable mini preview for Videos
export const VideosMiniPreview = () => (
    <div className="w-full h-full rounded-[1.5rem] bg-[#fafafa] border border-slate-200 p-3 flex flex-col gap-2 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
        <div className="h-2 w-1/3 bg-slate-300 rounded-full mb-1 mx-auto shrink-0"></div>
        <div className="flex-[3] flex gap-2 w-full min-h-0">
            <div className="flex-[2] bg-slate-800 border border-white/10 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/thumbnails/01.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div></div></div>
            </div>
            <div className="flex-[3] bg-slate-800 border border-white/10 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/thumbnails/02.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"><div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div></div></div>
            </div>
        </div>
        <div className="flex-[2] flex gap-2 w-full min-h-0">
            <div className="flex-[3] bg-slate-800 border border-white/10 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/thumbnails/03.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div></div></div>
            </div>
            <div className="flex-[2] bg-slate-800 border border-white/10 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/thumbnails/04.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div></div></div>
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-white/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-base font-heavy tracking-tight text-slate-900">Videos & Reels</h3>
            <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Cinematic Showcase</p>
        </div>
    </div>
);

// Reusable mini preview for Experience
export const ExperienceMiniPreview = () => (
    <div className="w-full h-full rounded-[1.5rem] bg-[#f8fafc] border border-slate-200 p-4 flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-300 -translate-x-1/2"></div>
        <div className="relative w-full flex items-center justify-between">
            <div className="w-[45%] bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm">
                <div className="h-1.5 w-1/2 bg-slate-800 rounded-full mb-1"></div>
                <div className="h-1 w-full bg-slate-200 rounded-full mb-0.5"></div>
                <div className="h-1 w-3/4 bg-slate-200 rounded-full"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400 ring-2 ring-[#f8fafc]"></div>
            <div className="w-[45%] flex flex-col items-start px-1"><div className="h-1 w-1/3 bg-slate-300 rounded-full"></div></div>
        </div>
        <div className="relative w-full flex items-center justify-between flex-row-reverse mt-1">
            <div className="w-[45%] bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm">
                <div className="h-1.5 w-2/3 bg-slate-600 rounded-full mb-1"></div>
                <div className="h-1 w-1/2 bg-slate-200 rounded-full"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400 ring-2 ring-[#f8fafc]"></div>
            <div className="w-[45%] flex flex-col items-end px-1"><div className="h-1 w-1/2 bg-slate-300 rounded-full"></div></div>
        </div>
        <div className="relative w-full flex items-center justify-between mt-auto">
            <div className="w-[45%] bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm">
                <div className="h-1.5 w-full bg-slate-400 rounded-full"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400 ring-2 ring-[#f8fafc]"></div>
            <div className="w-[45%]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-base font-heavy tracking-tight text-slate-900">Experience</h3>
            <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Professional Timeline</p>
        </div>
    </div>
);

// ── Main Widget ──────────────────────────────────────────────────────────────

export const SneakPeekWidget = () => {
    const pages = [
        { id: "photography", url: "#/photography" },
        { id: "videos", url: "#/videos" },
        { id: "experience", url: "#/experience" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const autoTimer = useRef(null);

    const resetAuto = () => {
        clearInterval(autoTimer.current);
        autoTimer.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % pages.length);
        }, 4500);
    };

    useEffect(() => {
        resetAuto();
        return () => clearInterval(autoTimer.current);
    }, []);

    const goLeft = () => { setCurrentIndex(prev => (prev - 1 + pages.length) % pages.length); resetAuto(); };
    const goRight = () => { setCurrentIndex(prev => (prev + 1) % pages.length); resetAuto(); };

    const dragStartX = useRef(null);

    const handleTouchStart = (e) => { dragStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (dragStartX.current === null) return;
        const delta = dragStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) { delta > 0 ? goRight() : goLeft(); }
        dragStartX.current = null;
    };

    const mouseStartX = useRef(null);
    const handleMouseDown = (e) => { mouseStartX.current = e.clientX; };
    const handleMouseUp = (e) => {
        if (mouseStartX.current === null) return;
        const delta = mouseStartX.current - e.clientX;
        if (Math.abs(delta) > 40) { delta > 0 ? goRight() : goLeft(); }
        mouseStartX.current = null;
    };

    const renderPreview = (id) => {
        if (id === 'photography') return <PhotographyMiniPreview />;
        if (id === 'videos') return <VideosMiniPreview />;
        if (id === 'experience') return <ExperienceMiniPreview />;
        return null;
    };

    return (
        <div
            className="w-full lg:w-[20rem] xl:w-[24rem] 2xl:w-[26rem] aspect-[22/28] min-h-[24rem] max-h-[32rem] relative mx-auto lg:mx-0 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {/* Prev arrow */}
            <button
                onClick={goLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/40 hover:text-white transition-all shadow-md"
                aria-label="Previous"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            {/* Next arrow */}
            <button
                onClick={goRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/40 hover:text-white transition-all shadow-md"
                aria-label="Next"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            {/* Card */}
            <AnimatePresence mode="popLayout">
                <motion.a
                    key={currentIndex}
                    href={pages[currentIndex].url}
                    initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    className="absolute inset-0 block w-full h-full group hover:scale-[1.02] transition-transform duration-500"
                    style={{ willChange: 'transform' }}
                    draggable={false}
                >
                    {renderPreview(pages[currentIndex].id)}
                </motion.a>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1.5">
                {pages.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.preventDefault(); setCurrentIndex(i); resetAuto(); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};
