import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { videosData } from '../data/videos';

const VideoCard = ({ video, index, onClick, hoveredId, setHoveredId }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Hardcoded vertical video IDs per your dataset
    const isVertical = ['01', '04', '07', '10', '12', '13'].includes(video.id);

    const isHovered = hoveredId === video.id;
    const isDimmed = hoveredId !== null && hoveredId !== video.id;

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.currentTime = 0;

                const playPromise1 = videoRef.current.play();

                if (playPromise1 !== undefined) {
                    playPromise1.then(() => setIsPlaying(true)).catch(e => console.log('Playback failed:', e));
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }
    }, [isHovered]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleMouseEnter = () => setHoveredId(video.id);
    const handleMouseLeave = () => {
        setHoveredId(null);
        setIsMuted(true);
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    // Parallax Momentum - Disable on mobile, reduce on tablet, full on desktop
    const { scrollY } = useScroll();
    const colIndex = index % 3;

    // We use a window size check to determine if mobile parallax should be disabled/reduced.
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // If mobile, zero out the speed so it just scrolls natively without parallax stagger
    const speed = isMobile ? 0 : (colIndex === 0 ? 0.015 : colIndex === 1 ? -0.01 : 0.02);
    const rawY = useTransform(scrollY, [0, 3000], [0, speed * 3000]);
    const springY = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <StaggerItem>
            <motion.div style={{ y: springY }} className="w-full h-full flex items-center justify-center">
                <motion.div
                    animate={{ y: isMobile ? 0 : [0, -4, 0] }} // Disable floating on mobile
                    transition={{ duration: 4 + colIndex, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <motion.div
                        layoutId={`video-container-${video.id}`}
                        onClick={() => onClick(video)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        // Determine width appropriately 
                        className={`relative group cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${isVertical ? 'w-[80%] md:w-[70%] mx-auto aspect-[9/16]' : 'w-full aspect-video'} rounded-2xl md:rounded-[1rem] overflow-hidden bg-black/5 shadow-2xl border border-slate-900/5`}
                        style={{
                            scale: isMobile ? 1 : (isHovered ? 1.05 : isDimmed ? 0.98 : 1), // Disable hover scale on mobile
                            opacity: isMobile ? 1 : (isDimmed ? 0.7 : 1),
                            filter: isMobile ? 'blur(0px)' : (isDimmed ? 'blur(2px)' : 'blur(0px)'),
                            zIndex: isHovered ? 40 : 10,
                        }}
                    >
                    {/* Size Container forcing exact aspect ratios to eliminate black bars via object-cover. */}
                    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">

                        {/* Cross-Dissolve Blur Placeholder Image */}
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className={`absolute inset-0 w-full h-full object-cover z-20 pointer-events-none transition-all duration-[600ms] ease-in-out ${isPlaying ? 'opacity-0 scale-102 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
                        />

                        {/* Foreground Video Layer */}
                        <video
                            ref={videoRef}
                            src={video.src.startsWith('http') ? video.src : `/videos/${video.src}`}
                            muted={isMuted}
                            playsInline
                            className={`w-full h-full object-cover relative z-10 transition-opacity duration-[600ms] ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

                        {/* Preview Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none z-30">
                            <div className={`transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${isHovered ? 'opacity-0 scale-150' : 'opacity-100 scale-100'} bg-black/20 backdrop-blur-md rounded-full p-4 border border-white/10`}>
                                <svg className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Mute Toggle Button */}
                        <div className={`absolute bottom-4 right-4 z-40 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <button
                                onClick={toggleMute}
                                className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full p-3 border border-white/20 transition-all shadow-lg"
                            >
                                {isMuted ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </StaggerItem>
    );
};

export const Videos = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedVideo]);

    const quarticOut = [0.165, 0.84, 0.44, 1];

    return (
        <div className="w-full min-h-[100svh] pt-16 md:pt-20 pb-48 px-6 max-w-7xl mx-auto relative z-10 pointer-events-auto">
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none"></div>
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>

            <StaggerContainer>
                <div className="mb-12 md:mb-16 text-center md:text-left">
                    <StaggerItem>
                        <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2 mb-4 md:mb-6 text-sm font-ultra-thin tracking-widest uppercase">
                            <span>← Back to Home</span>
                        </a>
                        <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-ultra-thin tracking-tighter mb-10 md:mb-12 text-slate-900 drop-shadow-sm">
                            Videos & <strong className="font-heavy">Reels</strong>.
                        </h1>
                    </StaggerItem>
                </div>

                {/* Grid changed: 1 col mobile, 2 col tablet (md), 3 col desktop (lg). Gap adjusted for mobile. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-24 items-end">
                    {videosData.map((video, idx) => (
                        <VideoCard
                            key={video.id}
                            index={idx}
                            video={video}
                            onClick={setSelectedVideo}
                            hoveredId={hoveredId}
                            setHoveredId={setHoveredId}
                        />
                    ))}

                    {videosData.length === 0 && (
                        <div className="col-span-full py-24 text-center bg-white/40 backdrop-blur-xl border border-slate-200/50 rounded-[3rem] shadow-xl">
                            <p className="text-slate-500 text-lg font-light">No videos found. Added videos will appear here.</p>
                        </div>
                    )}
                </div>
            </StaggerContainer>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        key="reels-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#fafafa] overflow-y-auto snap-y snap-mandatory"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setSelectedVideo(null);
                        }}
                    >
                        <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>
                        {videosData.map((video, index) => (
                            <VideoSlide 
                                key={video.id} 
                                video={video} 
                                index={index}
                                isInitial={video.id === selectedVideo.id}
                                onClose={() => setSelectedVideo(null)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const VideoSlide = ({ video, index, isInitial, onClose }) => {
    const slideRef = useRef(null);
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [showScrollCue, setShowScrollCue] = useState(index === 0 || isInitial);
    const isVertical = ['01', '04', '07', '10', '12', '13'].includes(video.id);

    useEffect(() => {
        if (isInitial && slideRef.current) {
            slideRef.current.scrollIntoView({ block: 'start' });
        }
    }, [isInitial]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.pause();
                }
            },
            { threshold: 0.6 }
        );

        if (slideRef.current) observer.observe(slideRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [isInView]);

    return (
        <section 
            ref={slideRef}
            className="w-full h-[100svh] snap-start flex flex-col md:flex-row relative overflow-hidden"
        >
            {/* Close Button Top Right */}
            <button
                className="absolute top-6 right-6 z-[150] text-slate-500 hover:text-slate-900 bg-white/60 hover:bg-white rounded-full p-2 transition-all duration-300 backdrop-blur-md shadow-sm border border-slate-200"
                onClick={onClose}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Left/Main Section: Video Floating */}
            <div className="h-[55vh] md:h-full md:flex-grow flex items-end md:items-center justify-center p-6 md:p-8 z-10 flex-shrink-0 relative">
                <div className={`relative pointer-events-auto rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-black ${isVertical ? 'h-full w-auto aspect-[9/16]' : 'w-full h-auto max-w-[850px] aspect-video'} mx-auto border border-slate-800`}>
                    <video
                        ref={videoRef}
                        src={video.src.startsWith('http') ? video.src : `/videos/${video.src}`}
                        poster={video.thumbnail}
                        controls
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Right Sidebar / Bottom Caption: Glassmorphic Floating Card */}
            <div className="flex-grow min-h-0 w-full md:w-[450px] lg:w-[500px] p-6 pb-12 md:p-12 flex flex-col relative z-20 justify-start md:justify-center items-center md:items-start">
                <div className="w-full max-w-lg bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-heavy tracking-tighter text-slate-900 mb-4 md:mb-6 leading-tight">
                            {video.title}
                        </h2>
                        <div className="w-12 md:w-16 h-[2px] bg-slate-900/10 mb-6 md:mb-8" />
                        <div className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                            <div className="inline">
                                {video.story ? video.story : "This caption is a placeholder captions are updating."}
                                {video.behindTheScenes && (
                                    <>
                                        {" "}
                                        {video.behindTheScenes}
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};
