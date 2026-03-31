import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photographyCategories } from '../data/photography';
import { videosData } from '../data/videos';

// ── Exact glass style from Experience.jsx cards ───────────────────────────────
const GLASS_CLASS =
    'bg-transparent backdrop-blur-none rounded-[2rem] border border-slate-900/15 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_8px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-slate-900/30';

// ── Swipe helpers ─────────────────────────────────────────────────────────────
function useSwipe(onLeft, onRight) {
    const startX = useRef(null);
    return {
        onTouchStart: (e) => { startX.current = e.touches[0].clientX; },
        onTouchEnd: (e) => {
            if (startX.current === null) return;
            const d = startX.current - e.changedTouches[0].clientX;
            if (Math.abs(d) > 40) { d > 0 ? onRight() : onLeft(); }
            startX.current = null;
        },
        onMouseDown: (e) => { startX.current = e.clientX; },
        onMouseUp: (e) => {
            if (startX.current === null) return;
            const d = startX.current - e.clientX;
            if (Math.abs(d) > 40) { d > 0 ? onRight() : onLeft(); }
            startX.current = null;
        },
    };
}

// ── Dot/Arrow nav strip ───────────────────────────────────────────────────────
const NavStrip = ({ count, idx, setIdx, goLeft, goRight }) => (
    <div className="flex items-center gap-2">
        <button onClick={goLeft} className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center hover:border-slate-600 hover:bg-slate-100 transition-all">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M5 6.5L2.5 4 5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        {Array.from({ length: count }).map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'bg-slate-800 w-5' : 'bg-slate-300 w-1.5'}`} />
        ))}
        <button onClick={goRight} className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center hover:border-slate-600 hover:bg-slate-100 transition-all">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M3 1.5L5.5 4 3 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
    </div>
);

// ── Media Section: Photography + Videos (large left card) ─────────────────────
export const MediaSection = ({ className }) => {
    const [idx, setIdx] = useState(0);

    const photoCover = photographyCategories[0]?.cover;
    const slides = [
        {
            id: 'photography',
            label: 'Visual Portfolio',
            title: 'Photography',
            count: photographyCategories.reduce((s, c) => s + c.rows.reduce((r, row) => r + row.photos.length, 0), 0),
            img: photoCover ? `/${photoCover}` : '/Sports/Soccer/IMG_7559.jpg',
            url: '#/photography',
            cta: 'View Photos',
        },
        {
            id: 'videos',
            label: 'Cinematic Work',
            title: 'Videos & Reels',
            count: videosData?.length ?? 0,
            img: '/thumbnails/01.webp',
            url: '#/videos',
            cta: 'Watch Videos',
        },
    ];

    const goLeft = () => setIdx(p => (p - 1 + slides.length) % slides.length);
    const goRight = () => setIdx(p => (p + 1) % slides.length);
    const swipe = useSwipe(goLeft, goRight);

    const s = slides[idx];

    return (
        /* Outer section — fills the container, centers the glass card with padding */
        <div className={`w-full h-full flex items-center justify-center p-6 ${className || ''}`} {...swipe}>
            <div className={`w-full h-full ${GLASS_CLASS} overflow-hidden flex flex-col`}>
                {/* Image — fills most of the card */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 min-h-0 overflow-hidden"
                    >
                        <a href={s.url} className="block w-full h-full">
                            <img
                                src={s.img}
                                alt={s.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </a>
                    </motion.div>
                </AnimatePresence>

                {/* Text strip below image — no overlap */}
                <div className="shrink-0 px-7 py-5 flex items-center justify-between gap-4 border-t border-slate-900/8">
                    <div>
                        <p className="text-slate-400 uppercase tracking-[0.15em] text-[10px] font-medium mb-0.5">{s.label}</p>
                        <h3 className="text-xl font-heavy text-slate-900 tracking-tight leading-tight">{s.title}</h3>
                        {s.count > 0 && <p className="text-slate-400 text-xs font-light mt-0.5">{s.count} items in collection</p>}
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <NavStrip count={slides.length} idx={idx} setIdx={setIdx} goLeft={goLeft} goRight={goRight} />
                        <a
                            href={s.url}
                            onClick={e => e.stopPropagation()}
                            className="px-5 py-2 border border-slate-900/20 text-slate-700 text-xs font-medium rounded-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
                        >
                            {s.cta} →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Professional Section: Experience + Projects (small right card) ─────────────
export const ProfessionalSection = ({ className }) => {
    const [idx, setIdx] = useState(0);

    const slides = [
        {
            id: 'experience',
            label: 'Professional',
            title: 'Experience & Awards',
            sub: '3 roles · 6 regional awards',
            // Simple gradient bg strip since there's no single cover image
            img: null,
            gradientFrom: '#1e293b',
            gradientTo: '#334155',
            url: '#/experience',
            cta: 'View Timeline',
        },
        {
            id: 'projects',
            label: 'Development',
            title: 'Projects',
            sub: 'Portfolio · Case studies',
            img: null,
            gradientFrom: '#1e3a5f',
            gradientTo: '#0f172a',
            url: undefined,
            cta: 'Coming Soon',
        },
    ];

    const goLeft = () => setIdx(p => (p - 1 + slides.length) % slides.length);
    const goRight = () => setIdx(p => (p + 1) % slides.length);
    const swipe = useSwipe(goLeft, goRight);

    const s = slides[idx];

    return (
        <div className={`w-full h-full flex items-center justify-center p-4 pb-3 ${className || ''}`} {...swipe}>
            <div className={`w-full h-full ${GLASS_CLASS} overflow-hidden flex flex-col`}>
                {/* Visual fill area — subtle branded gradient with dot texture */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1 min-h-0 relative"
                        style={{ background: `linear-gradient(135deg, ${s.gradientFrom}, ${s.gradientTo})` }}
                    >
                        {/* Dot texture */}
                        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        {/* Subtle label in the background */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-white/10 text-7xl font-heavy tracking-tighter select-none">
                                {s.id === 'experience' ? '∞' : '</>'}
                            </span>
                        </div>
                        <a href={s.url || undefined} onClick={e => !s.url && e.preventDefault()} className={`absolute inset-0 ${!s.url ? 'cursor-not-allowed' : ''}`} />
                    </motion.div>
                </AnimatePresence>

                {/* Text strip */}
                <div className="shrink-0 px-5 py-4 flex items-center justify-between gap-3 border-t border-slate-900/8">
                    <div>
                        <p className="text-slate-400 uppercase tracking-[0.15em] text-[9px] font-medium mb-0.5">{s.label}</p>
                        <h3 className="text-base font-heavy text-slate-900 tracking-tight leading-tight">{s.title}</h3>
                        <p className="text-slate-400 text-[10px] font-light mt-0.5">{s.sub}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <NavStrip count={slides.length} idx={idx} setIdx={setIdx} goLeft={goLeft} goRight={goRight} />
                        <a
                            href={s.url || undefined}
                            onClick={e => {
                                e.stopPropagation();
                                if (!s.url) e.preventDefault();
                            }}
                            className={`px-3 py-1.5 border items-center justify-center flex ${s.url ? 'border-slate-900/20 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900' : 'border-slate-200 text-slate-400 cursor-not-allowed'} text-[10px] font-medium rounded-full transition-all duration-300`}
                        >
                            {s.cta} {s.url && '→'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Connect Section: About + Contact (small right card) ───────────────────────
export const ConnectSection = ({ className }) => (
    <div className={`w-full h-full flex items-center justify-center p-4 pt-3 ${className || ''}`}>
        <div className={`w-full h-full ${GLASS_CLASS} overflow-hidden flex flex-col`}>
            {/* Visual area */}
            <div className="flex-1 min-h-0 relative" style={{ background: 'linear-gradient(135deg, #475569, #64748b)' }}>
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white/10 text-7xl font-heavy tracking-tighter select-none">@</span>
                </div>
            </div>

            {/* Text strip */}
            <div className="shrink-0 px-5 py-4 border-t border-slate-900/8">
                <p className="text-slate-400 uppercase tracking-[0.15em] text-[9px] font-medium mb-1">About & Contact</p>
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <h3 className="text-base font-heavy text-slate-900 tracking-tight leading-tight">Apil KC</h3>
                        <p className="text-slate-400 text-[10px] font-light mt-0.5">Visual storyteller · CS & Analytics · Iowa</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Social icons */}
                        {[
                            { href: 'https://www.instagram.com/apil_kc8/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                            { href: 'https://www.linkedin.com/in/apilkc08/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
                            { href: 'https://ulmhawkeyeonline.com/staff_name/apil-kc/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> },
                        ].map(({ href, icon }, i) => (
                            <a key={i} href={href} target="_blank" rel="noreferrer"
                                className="w-7 h-7 rounded-full border border-slate-900/15 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                                {icon}
                            </a>
                        ))}
                        <a href="#/contact" className="px-3 py-1.5 border border-slate-900/20 text-slate-700 text-[10px] font-medium rounded-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300">
                            Get In Touch →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Legacy exports
export const MediaHubTile = ({ className }) => <MediaSection className={className} />;
export const ProfessionalTile = () => null;
export const SocialsTile = () => null;
