import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShortClip = ({ fileName }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const videoSrc = fileName.startsWith('http') ? fileName : `/videos/${fileName}?v=2`;

    return (
        <>
            {/* Thumbnail State */}
            <motion.div
                layoutId={`clip-container-${fileName}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="relative cursor-pointer overflow-hidden rounded-[2rem] border border-slate-900/15 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group shrink-0 w-[14rem] sm:w-[16rem] md:w-[20rem] aspect-[4/5] bg-black isolate z-10 inline-block"
                onClick={() => setIsExpanded(true)}
            >
                <motion.video
                    layoutId={`clip-video-${fileName}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    src={videoSrc}
                    muted
                    loop
                    autoPlay
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <span className="text-white text-xs font-heavy uppercase tracking-widest drop-shadow-md">Play Clip</span>
                </div>
            </motion.div>

            {/* Expanded Fullscreen State */}
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
                            onClick={() => setIsExpanded(false)}
                        />

                        <motion.div
                            layoutId={`clip-container-${fileName}`}
                            className="relative w-[95vw] md:w-[85vw] max-w-6xl aspect-[4/5] md:aspect-video rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-black flex flex-col items-center justify-center"
                        >
                            <motion.video
                                layoutId={`clip-video-${fileName}`}
                                src={videoSrc}
                                muted
                                loop
                                autoPlay
                                playsInline
                                controls={false}
                                className="w-full h-full object-cover md:object-contain bg-black"
                            />

                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/40 hover:bg-white/20 backdrop-blur-xl rounded-full w-12 h-12 flex items-center justify-center text-white border border-white/20 transition-all z-20 cursor-pointer shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
