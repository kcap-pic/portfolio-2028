import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// All images used in previews — preloaded on mount so they're cached before hover
const PRELOAD_IMAGES = [
    '/Sports/Soccer/IMG_7559.jpg',
    '/Sports/Basketball/206-IMG_0057.jpg',
    '/Sports/Football/75-IMG_0074.jpg',
    '/Events/Cover.jpg',
    '/thumbnails/01.webp',
    '/thumbnails/02.webp',
    '/apil-cutout.png',
    '/case-studies/titles/sejc-hero.webp',
    '/case-studies/titles/ai-series-hero.png',
];

// --- Mini Previews ---

const PhotographyMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#fafafa] border border-slate-200 p-2.5 flex flex-col gap-1.5 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
        <div className="flex-[2] flex gap-1.5 w-full min-h-0">
            <div className="flex-[3] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Sports/Soccer/IMG_7559.jpg" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="sync" alt="" />
            </div>
            <div className="flex-[2] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Sports/Basketball/206-IMG_0057.jpg" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="sync" alt="" />
            </div>
        </div>
        <div className="flex-[2] flex gap-1.5 w-full min-h-0">
            <div className="flex-[2] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Sports/Football/75-IMG_0074.jpg" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="sync" alt="" />
            </div>
            <div className="flex-[3] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Events/Cover.jpg" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="sync" alt="" />
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-white/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-sm font-heavy tracking-tight text-slate-900">Photography</h3>
            <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Visual Portfolio</p>
        </div>
    </div>
);

const VideosMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#fafafa] border border-slate-200 p-2.5 flex flex-col gap-1.5 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
        <div className="flex-[3] flex gap-1.5 w-full min-h-0">
            <div className="flex-[2] bg-slate-800 border border-white/10 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/thumbnails/01.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" loading="eager" decoding="sync" alt="" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div></div></div>
            </div>
            <div className="flex-[3] bg-slate-800 border border-white/10 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/thumbnails/02.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" loading="eager" decoding="sync" alt="" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center"><div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div></div></div>
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-sm font-heavy tracking-tight text-slate-900">Videos & Reels</h3>
            <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Cinematic Showcase</p>
        </div>
    </div>
);

const ExperienceMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#f8fafc] border border-slate-200 p-3 flex flex-col gap-2.5 relative overflow-hidden">
        <div className="absolute left-1/2 top-3 bottom-3 w-px bg-slate-300 -translate-x-1/2"></div>
        <div className="relative w-full flex items-center justify-between">
            <div className="w-[45%] bg-white border border-slate-200 rounded-md p-1.5 shadow-sm">
                <div className="h-1 w-1/2 bg-slate-800 rounded-full mb-1"></div>
                <div className="h-0.5 w-full bg-slate-200 rounded-full mb-0.5"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400 ring-2 ring-[#f8fafc]"></div>
            <div className="w-[45%]"></div>
        </div>
        <div className="relative w-full flex items-center justify-between flex-row-reverse mt-1">
            <div className="w-[45%] bg-white border border-slate-200 rounded-md p-1.5 shadow-sm">
                <div className="h-1 w-2/3 bg-slate-600 rounded-full mb-1"></div>
                <div className="h-0.5 w-1/2 bg-slate-200 rounded-full"></div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400 ring-2 ring-[#f8fafc]"></div>
            <div className="w-[45%]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-sm font-heavy tracking-tight text-slate-900">Experience</h3>
            <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Professional Timeline</p>
        </div>
    </div>
);

const AwardsMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] border border-amber-200/50 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2 shadow-sm border border-amber-200">
            <span className="text-xl">🏆</span>
        </div>
        <h3 className="text-sm font-heavy tracking-tight text-amber-900 z-10">Honors & Awards</h3>
        <p className="text-[8px] font-bold text-amber-700/80 uppercase tracking-widest mt-0.5 z-10">Recognition</p>
    </div>
);

const ProjectsMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#fafafa] border border-slate-200 p-2.5 flex flex-col gap-1.5 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
        <div className="flex-[3] flex gap-1.5 w-full min-h-0">
            <div className="flex-[1] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/case-studies/titles/sejc-hero.webp" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="sync" alt="" />
            </div>
            <div className="flex-[1] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/case-studies/titles/ai-series-hero.png" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="sync" alt="" />
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center pointer-events-none">
            <h3 className="text-sm font-heavy tracking-tight text-slate-900">Case Studies</h3>
            <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Interactive Projects</p>
        </div>
    </div>
);

const ContactMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-slate-100 border border-slate-200 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm border border-slate-200 text-slate-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <h3 className="text-sm font-heavy tracking-tight text-slate-900 z-10">Contact</h3>
        <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5 z-10">Get in touch</p>
    </div>
);

const AboutMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#fafafa] border border-slate-200 p-0 flex flex-col items-center justify-end relative overflow-hidden shadow-inner" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
        <div className="absolute inset-0 flex items-center justify-center pt-4">
            <img 
                src="/apil-cutout.png" 
                className="h-[120%] w-auto object-contain drop-shadow-2xl" 
                style={{ filter: 'saturate(1.1) contrast(1.05)' }}
                alt="" 
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 py-3 flex flex-col items-center bg-white/40 backdrop-blur-md w-full border-t border-white/20">
            <h3 className="text-sm font-heavy tracking-tight text-slate-900">About Me</h3>
            <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Discover My Story</p>
        </div>
    </div>
);

// Map linkId → preview component (rendered once per link in the DOM, shown/hidden via CSS)
const PREVIEW_MAP = {
    photo: <PhotographyMiniPreview />,
    video: <VideosMiniPreview />,
    discover: <AboutMiniPreview />,
    experience: <ExperienceMiniPreview />,
    contact: <ContactMiniPreview />,
    project: <ProjectsMiniPreview />,
};

// --- Dynamic Island Main Component ---

export const DynamicIsland = ({ currentPath }) => {
    const [phase, setPhase] = useState(currentPath === '/' ? 'links' : 'logo');
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isShining, setIsShining] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const hideTimer = useRef(null);
    const phaseTimer = useRef(null);
    const hoverTimer = useRef(null);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Preload all preview images on mount so they're cached before first hover
    useEffect(() => {
        PRELOAD_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // Initial and periodic shine effect
    useEffect(() => {
        const triggerShine = () => {
            setIsShining(true);
            setTimeout(() => setIsShining(false), 1500);
        };

        const initialTimer = setTimeout(triggerShine, 800);
        const intervalTimer = setInterval(triggerShine, 15000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalTimer);
        };
    }, []);

    // Idle bounce effect for home page
    useEffect(() => {
        let idleTimeout;
        let bounceInterval;

        const handleActivity = () => {
            clearTimeout(idleTimeout);
            clearInterval(bounceInterval);
            setIsBouncing(false);

            if (currentPath === '/') {
                idleTimeout = setTimeout(() => {
                    const triggerBounce = () => {
                        setIsBouncing(true);
                        setTimeout(() => setIsBouncing(false), 800);
                    };
                    triggerBounce();
                    bounceInterval = setInterval(triggerBounce, 4000);
                }, 8000);
            }
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('touchstart', handleActivity);
        handleActivity();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
            clearTimeout(idleTimeout);
            clearInterval(bounceInterval);
        };
    }, [currentPath]);

    const links = [
        { id: 'home', label: 'Home', href: '#/' },
        { id: 'photo', label: 'Photo', href: '#/photography' },
        { id: 'video', label: 'Video', href: '#/videos' },
        { id: 'discover', label: 'About', href: '#/discover' },
        { id: 'project', label: 'Case Studies', href: '#/case-studies' },
    ];

    const isActive = (href) => {
        if (!href) return false;
        const path = href.replace('#', '') || '/';
        return currentPath === path;
    };

    // On mount: show links for 5s → collapse to logo → hide after another 2.5s (except on home)
    // On mount: logic depends on path
    useEffect(() => {
        if (currentPath === '/') {
            // Homepage: show links for 5s → collapse to logo → hide after another 2.5s
            phaseTimer.current = setTimeout(() => {
                if (!hoveredLink) {
                    setPhase('logo');
                    hideTimer.current = setTimeout(() => setPhase('hidden'), 2500);
                }
            }, 5000);
        } else {
            // Subpages: start as logo, never auto-hide.
            if (phase === 'hidden') setPhase('logo');

            // If it was links (e.g. from nav), collapse to logo after 5s
            if (phase === 'links') {
                phaseTimer.current = setTimeout(() => {
                    if (!hoveredLink) setPhase('logo');
                }, 5000);
            }
        }
        return () => {
            clearTimeout(phaseTimer.current);
            clearTimeout(hideTimer.current);
        };
    }, [hoveredLink, currentPath, phase]);

    // Mouse proximity: re-show as logo when near top
    useEffect(() => {
        const handleProximity = (clientY) => {
            if (clientY < 100) {
                clearTimeout(hideTimer.current);
                if (phase === 'hidden') setPhase('logo');
            } else if (clientY > 200) {
                if (!hoveredLink && currentPath === '/') {
                    clearTimeout(hideTimer.current);
                    hideTimer.current = setTimeout(() => setPhase('hidden'), 1500);
                }
            }
        };

        const onMove = (e) => handleProximity(e.clientY);
        const onTouch = (e) => handleProximity(e.touches[0].clientY);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchstart', onTouch);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchstart', onTouch);
        };
    }, [phase, hoveredLink, currentPath]);

    const showLinks = phase === 'links';
    const visible = phase !== 'hidden';

    const darkPages = ['/'];
    const isLightPage = currentPath !== '/';

    const glassStyle = isLightPage ? {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(200%)',
        WebkitBackdropFilter: 'blur(20px) saturate(200%)',
        border: '1px solid rgba(148, 163, 184, 0.4)',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)',
    } : {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
    };

    const handleMouseEnter = (linkId) => {
        clearTimeout(hoverTimer.current);
        setHoveredLink(linkId);
    };

    const handleMouseLeave = () => {
        hoverTimer.current = setTimeout(() => {
            setHoveredLink(null);
        }, 150);
    };

    return (
        <div className="fixed top-4 left-0 right-0 flex flex-col items-center z-[100] pointer-events-none">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key="island-wrapper"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{
                            opacity: 1,
                            y: isBouncing ? [0, -14, 0, -6, 0] : 0
                        }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={
                            isBouncing
                                ? { duration: 0.8, ease: 'easeOut' }
                                : { type: 'spring', stiffness: 400, damping: 30 }
                        }
                        style={{ willChange: 'transform, opacity' }}
                        className="relative"
                    >
                        {/* Single pill — width transitions via CSS, no re-mount */}
                        <div
                            className="pointer-events-auto relative flex items-center justify-center rounded-[2rem] min-h-[44px] sm:rounded-full"
                            style={{
                                ...glassStyle,
                                width: showLinks 
                                    ? (isMobile ? '180px' : '480px') 
                                    : (isMobile ? '120px' : '140px'),
                                height: showLinks && isMobile ? 'auto' : '44px',
                                minHeight: '44px',
                                transition: 'width 0.45s cubic-bezier(0.76, 0, 0.24, 1), height 0.3s ease, border-radius 0.3s ease',
                                padding: showLinks && isMobile ? '16px 8px' : '0 8px',
                            }}
                            onMouseEnter={() => {
                                clearTimeout(hideTimer.current);
                                if (phase === 'logo') setPhase('links');
                            }}
                            onMouseLeave={() => {
                                if (phase === 'links') {
                                    hideTimer.current = setTimeout(() => {
                                        if (!hoveredLink) {
                                            setPhase('logo');
                                            if (currentPath !== '/') {
                                                hideTimer.current = setTimeout(() => setPhase('hidden'), 2500);
                                            }
                                        }
                                    }, 1000);
                                }
                            }}
                        >
                            {/* Shine overlay (clipped to the pill) */}
                            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-30">
                                <AnimatePresence>
                                    {isShining && visible && (
                                        <motion.div
                                            initial={{ x: '-120px' }}
                                            animate={{ x: '820px' }}
                                            transition={{ duration: 1.3, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Nav links row */}
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobile ? 'flex-col gap-0 relative h-auto py-2' : 'gap-1 px-3'}`}
                                style={{
                                    opacity: showLinks ? 1 : 0,
                                    pointerEvents: showLinks ? 'auto' : 'none',
                                    position: isMobile && showLinks ? 'relative' : 'absolute',
                                }}
                            >
                                {links.map((link) => (
                                    <div key={link.id} className="relative">
                                        <a
                                            href={link.href || undefined}
                                            onMouseEnter={() => handleMouseEnter(link.id)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={(e) => {
                                                if (link.disabled) {
                                                    e.preventDefault();
                                                    return;
                                                }
                                                if (isMobile) {
                                                    setPhase('hidden');
                                                    clearTimeout(hideTimer.current);
                                                    clearTimeout(phaseTimer.current);
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 block ${
                                                link.disabled
                                                    ? isLightPage ? 'text-slate-400 cursor-not-allowed' : 'text-white/30 cursor-not-allowed'
                                                    : isActive(link.href)
                        ? isLightPage ? 'bg-slate-900/10 text-slate-900 cursor-pointer' : 'bg-white/20 text-white cursor-pointer'
                        : isLightPage ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 cursor-pointer' : 'text-white/60 hover:text-white hover:bg-white/10 cursor-pointer'
                    } ${isMobile ? 'w-full text-center py-2 px-4' : 'px-3 py-1.5'}`}
                                    >
                                            {link.label}
                                        </a>

                                        {/* Preview card: always in DOM, shown/hidden via CSS to avoid remount flicker. Disabled on mobile for layout safety. */}
                                        {!isMobile && link.id !== 'home' && PREVIEW_MAP[link.id] && (
                                            <div
                                                className="absolute top-full pt-4 pointer-events-auto"
                                                style={{
                                                    width: '18rem',
                                                    left: '50%',
                                                    opacity: hoveredLink === link.id && showLinks ? 1 : 0,
                                                    transform: `translateX(-50%) translateY(${hoveredLink === link.id && showLinks ? '0px' : '8px'})`,
                                                    transition: 'opacity 0.18s ease, transform 0.18s ease',
                                                    pointerEvents: hoveredLink === link.id && showLinks ? 'auto' : 'none',
                                                    willChange: 'opacity, transform',
                                                }}
                                                onMouseEnter={() => { clearTimeout(hoverTimer.current); setHoveredLink(link.id); }}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {/* Clean SVG triangle pointer */}
                                                <svg
                                                    width="20" height="10"
                                                    viewBox="0 0 20 10"
                                                    className="absolute left-[50%] -translate-x-1/2 z-20"
                                                    style={{
                                                        top: '6px',
                                                        opacity: hoveredLink === link.id && showLinks ? 1 : 0,
                                                        transition: 'opacity 0.18s ease',
                                                        filter: 'drop-shadow(0 -1px 0px rgba(148,163,184,0.5))',
                                                    }}
                                                >
                                                    <path d="M0 10 L10 0 L20 10 Z" fill="#fafafa" />
                                                </svg>
                                                <div className="relative z-10 drop-shadow-2xl">
                                                    {PREVIEW_MAP[link.id]}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Logo pill — opacity-only transition */}
                            <div
                                className="absolute inset-0 flex items-center justify-center gap-2 px-5 py-2.5"
                                style={{
                                    opacity: showLinks ? 0 : 1,
                                    transition: 'opacity 0.2s ease',
                                    pointerEvents: showLinks ? 'none' : 'auto',
                                }}
                                onMouseEnter={() => setPhase('links')}
                            >
                                 <span className="w-1.5 h-1.5 rounded-full block" style={{ background: isLightPage ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }} />
                                <span className={`relative z-10 transition-transform duration-300 hover:scale-110 cursor-pointer ${isLightPage ? 'text-slate-900' : 'text-white'} font-bold whitespace-nowrap ${isMobile ? 'text-xs' : 'text-sm'} ${isShining ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : ''}`}>MENU</span>
                                <span className="w-1.5 h-1.5 rounded-full block" style={{ background: isLightPage ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
