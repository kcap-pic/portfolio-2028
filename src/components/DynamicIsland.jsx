import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DynamicIsland = ({ currentPath }) => {
    // Phase: 'links' (show nav links) | 'logo' (collapsed) | 'hidden' (out of view)
    const [phase, setPhase] = useState('links');
    const hideTimer = useRef(null);
    const phaseTimer = useRef(null);

    const links = [
        { label: 'Home', href: '#/' },
        { label: 'Work', href: '#/work' },
        { label: 'Videos', href: '#/videos' },
        { label: 'Contact', href: '#/about' },
    ];

    const isActive = (href) => {
        const path = href.replace('#', '') || '/';
        return currentPath === path;
    };

    // On mount: show links for 5s → collapse to logo → hide after another 2.5s
    useEffect(() => {
        phaseTimer.current = setTimeout(() => {
            setPhase('logo');
            hideTimer.current = setTimeout(() => setPhase('hidden'), 2500);
        }, 5000);
        return () => {
            clearTimeout(phaseTimer.current);
            clearTimeout(hideTimer.current);
        };
    }, []);

    // Mouse proximity: re-show as logo when near top
    useEffect(() => {
        const onMove = (e) => {
            if (e.clientY < 80) {
                clearTimeout(hideTimer.current);
                if (phase === 'hidden') setPhase('logo');
            } else {
                clearTimeout(hideTimer.current);
                hideTimer.current = setTimeout(() => setPhase('hidden'), 1500);
            }
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [phase]);

    const showLinks = phase === 'links';
    const visible = phase !== 'hidden';

    // Light pages need dark nav; hero + video pages are dark
    const isLightPage = ['/', '/about'].indexOf(currentPath) === -1 && !currentPath.startsWith('/photography');

    // Glass style adapts per page type
    const glassStyle = isLightPage ? {
        background: 'rgba(248, 250, 252, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
    } : {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
    };

    return (
        <div className="fixed top-4 left-0 right-0 flex justify-center z-[100] pointer-events-none">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key="island-wrapper"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        {/* Single pill — width transitions via CSS, no re-mount */}
                        <div
                            className="pointer-events-auto relative flex items-center justify-center overflow-hidden rounded-full"
                            style={{
                                ...glassStyle,
                                // CSS transition on width — GPU handles this, no JS
                                width: showLinks ? '350px' : '140px',
                                transition: 'width 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
                            }}
                            onMouseEnter={() => {
                                clearTimeout(hideTimer.current);
                                if (phase === 'logo') setPhase('links');
                            }}
                            onMouseLeave={() => {
                                if (phase === 'links') {
                                    hideTimer.current = setTimeout(() => setPhase('logo'), 400);
                                }
                            }}
                        >
                            {/* Nav links row — opacity-only transition, no layout shift */}
                            <div
                                className="absolute inset-0 flex items-center justify-center gap-1 px-3"
                                style={{
                                    opacity: showLinks ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                    pointerEvents: showLinks ? 'auto' : 'none',
                                }}
                            >
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${isActive(link.href)
                                                ? isLightPage ? 'bg-slate-900/10 text-slate-900' : 'bg-white/20 text-white'
                                                : isLightPage ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-900/5' : 'text-white/60 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            {/* Logo pill — opacity-only transition */}
                            <div
                                className="flex items-center gap-2 px-5 py-2.5"
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
