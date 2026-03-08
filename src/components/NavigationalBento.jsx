import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticCardFixed } from './MagneticCardFixed';
import { videosData } from '../data/videos';
import { photographyCategories } from '../data/photography';

// Minimalist Icons
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-800 group-hover:text-pink-600 transition-colors">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-800 group-hover:text-blue-600 transition-colors">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const ExternalLinkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-800 group-hover:text-emerald-600 transition-colors">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

export const MediaHubTile = ({ className }) => {
    const [mediaTab, setMediaTab] = useState(0);

    const toggleMedia = (e) => {
        e.preventDefault();
        setMediaTab(prev => prev === 0 ? 1 : 0);
    };

    const firstPhotoCat = photographyCategories[0];
    const firstVideo = videosData[0];

    return (
        <div className={`relative group cursor-pointer ${className || ''}`} onClick={toggleMedia}>
            <MagneticCardFixed className="w-full h-full flex flex-col justify-end p-0 overflow-hidden relative glass rounded-[2.5rem]">
                <AnimatePresence mode="popLayout">
                    {mediaTab === 0 ? (
                        <motion.div
                            key="photos"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                if (Math.abs(offset.x) > 50) setMediaTab(1);
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 pointer-events-none"></div>
                            <img src={`/${firstPhotoCat?.cover || 'default.jpg'}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 blur-[2px] group-hover:blur-0" />
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white/70 uppercase tracking-widest text-sm mb-2 font-medium">Media Hub</p>
                                        <h3 className="text-4xl md:text-5xl text-white font-heavy mb-2 leading-none">Photography</h3>
                                        <p className="text-white/80 max-w-md line-clamp-2 md:line-clamp-none">View the curated visual portfolio ranging across multiple categories.</p>
                                    </div>
                                    <a href="#/photography" onClick={(e) => e.stopPropagation()} className="px-5 py-2 md:px-6 md:py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-xl shrink-0 text-sm md:text-base">
                                        View Photos
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="videos"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                if (Math.abs(offset.x) > 50) setMediaTab(0);
                            }}
                            className="absolute inset-0 w-full h-full bg-black"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>
                            {firstVideo && (
                                <video
                                    src={`/videos/${firstVideo.src}`}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                />
                            )}
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-white/70 uppercase tracking-widest text-sm mb-2 font-medium">Media Hub</p>
                                        <h3 className="text-4xl md:text-5xl text-white font-heavy mb-2 leading-none">Videos & Reels</h3>
                                        <p className="text-white/80 max-w-md line-clamp-2 md:line-clamp-none">{firstVideo ? firstVideo.description : "Cinematic video projects."}</p>
                                    </div>
                                    <a href="#/videos" onClick={(e) => e.stopPropagation()} className="px-5 py-2 md:px-6 md:py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors shadow-xl shrink-0 text-sm md:text-base">
                                        Watch Videos
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute top-6 right-6 z-30 flex gap-2">
                    <div className={`w-3 h-3 rounded-full ${mediaTab === 0 ? 'bg-white' : 'bg-white/30 border border-white/50'}`}></div>
                    <div className={`w-3 h-3 rounded-full ${mediaTab === 1 ? 'bg-white' : 'bg-white/30 border border-white/50'}`}></div>
                </div>
            </MagneticCardFixed>
        </div>
    );
};

export const ProfessionalTile = ({ className }) => {
    const [proTab, setProTab] = useState(0);

    const togglePro = (e) => {
        e.preventDefault();
        setProTab(prev => prev === 0 ? 1 : 0);
    };

    return (
        <div className={`relative group cursor-pointer ${className || ''}`} onClick={togglePro}>
            <MagneticCardFixed className="w-full h-full flex flex-col justify-end p-0 overflow-hidden glass rounded-[2.5rem]">
                <AnimatePresence mode="popLayout">
                    {proTab === 0 ? (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                if (Math.abs(offset.x) > 50) setProTab(1);
                            }}
                            className="absolute inset-0 w-full h-full flex flex-col"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 z-0"></div>
                            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                                <div className="text-right flex justify-end">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-slate-700">💼</div>
                                </div>
                                <div>
                                    <p className="text-slate-500 uppercase tracking-widest text-xs mb-1 font-medium">Professional</p>
                                    <h3 className="text-2xl md:text-3xl text-slate-900 font-heavy mb-3 md:mb-4">Experience</h3>
                                    <a href="#/experience" onClick={(e) => e.stopPropagation()} className="px-5 py-2 glass rounded-full font-medium text-sm text-slate-800 hover:bg-white/50 transition-colors">
                                        View Timeline →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                if (Math.abs(offset.x) > 50) setProTab(0);
                            }}
                            className="absolute inset-0 w-full h-full flex flex-col"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 z-0"></div>
                            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                                <div className="text-right flex justify-end">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-slate-700">🚀</div>
                                </div>
                                <div>
                                    <p className="text-slate-500 uppercase tracking-widest text-xs mb-1 font-medium">Professional</p>
                                    <h3 className="text-2xl md:text-3xl text-slate-900 font-heavy mb-3 md:mb-4">Projects</h3>
                                    <a href="#/projects" onClick={(e) => e.stopPropagation()} className="px-5 py-2 glass rounded-full font-medium text-sm text-slate-800 hover:bg-white/50 transition-colors">
                                        View Case Studies →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
                    <div className={`w-2 h-2 rounded-full ${proTab === 0 ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${proTab === 1 ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                </div>
            </MagneticCardFixed>
        </div>
    );
};

export const SocialsTile = ({ className }) => {
    return (
        <div className={`${className || ''}`}>
            <MagneticCardFixed className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8 glass rounded-[2.5rem] bg-gradient-to-br from-slate-100 to-slate-200">
                <h3 className="text-lg md:text-xl text-slate-900 font-heavy mb-6 md:mb-8 uppercase tracking-widest shadow-sm">Connect</h3>
                <div className="flex gap-4 md:gap-6">
                    <a href="https://www.instagram.com/apil_kc8/" target="_blank" rel="noreferrer" className="group glass p-3 md:p-4 rounded-xl md:rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <InstagramIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/apilkc08/" target="_blank" rel="noreferrer" className="group glass p-3 md:p-4 rounded-xl md:rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <LinkedInIcon />
                    </a>
                    <a href="https://ulmhawkeyeonline.com/staff_name/apil-kc/" target="_blank" rel="noreferrer" className="group glass p-3 md:p-4 rounded-xl md:rounded-2xl hover:-translate-y-2 transition-transform duration-300">
                        <ExternalLinkIcon />
                    </a>
                </div>
            </MagneticCardFixed>
        </div>
    );
};
