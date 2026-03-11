import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mini Previews ---

const PhotographyMiniPreview = () => (
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#fafafa] border border-slate-200 p-2.5 flex flex-col gap-1.5 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
        <div className="flex-[2] flex gap-1.5 w-full min-h-0">
            <div className="flex-[3] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Sports/Soccer/IMG_7559.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-[2] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Sports/Basketball/206-IMG_0057.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            </div>
        </div>
        <div className="flex-[2] flex gap-1.5 w-full min-h-0">
            <div className="flex-[2] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Sports/Football/75-IMG_0074.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-[3] bg-white border border-white/40 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/Events/Cover.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
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
                <img src="/thumbnails/01.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="" />
                <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div></div></div>
            </div>
            <div className="flex-[3] bg-slate-800 border border-white/10 rounded-lg overflow-hidden relative shadow-sm">
                <img src="/thumbnails/02.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="" />
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
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #38bdf8 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2 shadow-lg z-10">
            <span className="text-white font-heavy text-lg">&lt;/&gt;</span>
        </div>
        <h3 className="text-sm font-heavy tracking-tight text-white z-10">Projects</h3>
        <p className="text-[8px] font-medium text-slate-400 uppercase tracking-widest mt-0.5 z-10">Development Portfolio</p>
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
    <div className="w-[18rem] h-[12rem] rounded-[1.2rem] bg-[#f1f5f9] border border-slate-200 p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2 shadow-lg">
            <span className="text-white font-heavy text-lg">@</span>
        </div>
        <h3 className="text-sm font-heavy tracking-tight text-slate-900 z-10">About Me</h3>
        <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5 z-10">Personal Journey</p>
    </div>
);

// --- Dynamic Island Main Component ---

export const DynamicIsland = ({ currentPath }) => {
    const [phase, setPhase] = useState('links');
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isShining, setIsShining] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);
    const hideTimer = useRef(null);
    const phaseTimer = useRef(null);
    const hoverTimer = useRef(null);

    // Initial and periodic shine effect
    useEffect(() => {
        const triggerShine = () => {
            setIsShining(true);
            setTimeout(() => setIsShining(false), 1500);
        };

        const initialTimer = setTimeout(triggerShine, 800);
        const intervalTimer = setInterval(triggerShine, 15000); // Shine every 15s

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
                    triggerBounce(); // initial bounce
                    bounceInterval = setInterval(triggerBounce, 4000); // repeating bounce
                }, 8000); // start bouncing after 8s of idle
            }
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('touchstart', handleActivity);
        handleActivity(); // init

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
        { id: 'experience', label: 'Experience', href: '#/experience' },
        { id: 'project', label: 'Project', href: '#/projects' },
        { id: 'contact', label: 'Contact', href: '#/contact' },
        { id: 'about', label: 'About me', href: '#/about' },
    ];

    const isActive = (href) => {
        const path = href.replace('#', '') || '/';
        return currentPath === path;
    };

    // On mount: show links for 5s → collapse to logo → hide after another 2.5s (except on home)
    useEffect(() => {
        phaseTimer.current = setTimeout(() => {
            if (!hoveredLink) {
                setPhase('logo');
                if (currentPath !== '/') {
                    hideTimer.current = setTimeout(() => setPhase('hidden'), 2500);
                }
            }
        }, 5000);
        return () => {
            clearTimeout(phaseTimer.current);
            clearTimeout(hideTimer.current);
        };
    }, [hoveredLink, currentPath]);

    // Mouse proximity: re-show as logo when near top
    useEffect(() => {
        const onMove = (e) => {
            if (e.clientY < 150) {
                clearTimeout(hideTimer.current);
                if (phase === 'hidden') setPhase('logo');
            } else {
                if (!hoveredLink && currentPath !== '/') {
                    clearTimeout(hideTimer.current);
                    hideTimer.current = setTimeout(() => setPhase('hidden'), 1500);
                }
            }
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [phase, hoveredLink, currentPath]);

    const showLinks = phase === 'links';
    const visible = phase !== 'hidden';

    // Home and Videos are dark pages. Photography prefix (gallery) might be dark. 
    // Experience, Awards, Projects, Contact, About, and Photo Index are light pages.
    const darkPages = ['/', '/videos'];
    const isLightPage = !darkPages.includes(currentPath) && !currentPath.startsWith('/photography/');

    const glassStyle = isLightPage ? {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(200%)',
        WebkitBackdropFilter: 'blur(20px) saturate(200%)',
        border: '1px solid rgba(148, 163, 184, 0.4)', // slate-400 slightly transparent
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

    const renderHoverPreview = () => {
        switch (hoveredLink) {
            case 'photo': return <PhotographyMiniPreview />;
            case 'video': return <VideosMiniPreview />;
            case 'experience': return <ExperienceMiniPreview />;
            case 'awards': return <AwardsMiniPreview />;
            case 'project': return <ProjectsMiniPreview />;
            case 'contact': return <ContactMiniPreview />;
            case 'about': return <AboutMiniPreview />;
            default: return null;
        }
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
                        transition={{
                            duration: isBouncing ? 0.8 : 0.3,
                            ease: 'easeOut'
                        }}
                        style={{ willChange: 'transform, opacity' }}
                        className="relative"
                    >
                        {/* Single pill — width transitions via CSS, no re-mount */}
                        <div
                            className="pointer-events-auto relative flex items-center justify-center rounded-full min-h-[44px]"
                            style={{
                                ...glassStyle,
                                // Responsive width for the links depending on state
                                width: showLinks ? '680px' : '140px',
                                transition: 'width 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
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
                                            initial={{ x: '-150%' }}
                                            animate={{ x: '500%' }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Nav links row */}
                            <div
                                className="absolute inset-0 flex items-center justify-center gap-1 px-3"
                                style={{
                                    opacity: showLinks ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                    pointerEvents: showLinks ? 'auto' : 'none',
                                }}
                            >
                                {links.map((link) => (
                                    <div key={link.id} className="relative">
                                        <a
                                            href={link.href}
                                            onMouseEnter={() => handleMouseEnter(link.id)}
                                            onMouseLeave={handleMouseLeave}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 block ${isActive(link.href)
                                                ? isLightPage ? 'bg-slate-900/10 text-slate-900' : 'bg-white/20 text-white'
                                                : isLightPage ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-900/5' : 'text-white/60 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {link.label}
                                        </a>

                                        <AnimatePresence>
                                            {hoveredLink === link.id && link.id !== 'home' && showLinks && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 pointer-events-auto"
                                                    onMouseEnter={() => { clearTimeout(hoverTimer.current); }}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#fafafa] border-t border-l border-slate-200"></div>
                                                    <div className="relative z-10 drop-shadow-2xl">
                                                        {renderHoverPreview()}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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
                            >
                                <span className="w-1.5 h-1.5 rounded-full block" style={{ background: isLightPage ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }} />
                                <span className={`text-xs font-medium tracking-widest uppercase ${isLightPage ? 'text-slate-600' : 'text-white/70'}`}>apilkc</span>
                                <span className="w-1.5 h-1.5 rounded-full block" style={{ background: isLightPage ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
