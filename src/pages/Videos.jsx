import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { videosData } from '../data/videos';

const VideoCard = ({ video, index, onClick, hoveredId, setHoveredId }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isLandscape, setIsLandscape] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

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
                        // Changed width sizing: on mobile let it be full width with some margin, on tablet/desktop keep the custom width sizing
                        className={`relative group cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] ${isLandscape ? 'w-full md:w-[95%] lg:w-[105%] xl:w-[110%]' : 'w-[90%] md:w-[85%] mx-auto'} rounded-2xl md:rounded-[1rem] overflow-hidden bg-black/5 shadow-2xl border border-slate-900/5`}
                        style={{
                            scale: isMobile ? 1 : (isHovered ? 1.05 : isDimmed ? 0.98 : 1), // Disable hover scale on mobile
                            opacity: isMobile ? 1 : (isDimmed ? 0.7 : 1),
                            filter: isMobile ? 'blur(0px)' : (isDimmed ? 'blur(2px)' : 'blur(0px)'),
                            zIndex: isHovered ? 40 : 10,
                        }}
                    >
                    {/* Size Container forcing exact aspect ratios to eliminate black bars via object-cover. */}
                    <div className="relative w-full h-auto bg-black flex items-center justify-center overflow-hidden">

                        {/* Cross-Dissolve Blur Placeholder Image */}
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className={`absolute inset-0 w-full h-full object-contain z-20 pointer-events-none transition-all duration-[600ms] ease-in-out ${isPlaying ? 'opacity-0 scale-102 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
                        />

                        {/* Foreground Video Layer */}
                        <video
                            ref={videoRef}
                            src={video.src.startsWith('http') ? video.src : `/videos/${video.src}`}
                            muted={isMuted}
                            playsInline
                            onLoadedMetadata={(e) => {
                                const isVerticalId = ['01', '04', '07', '10', '12', '13'].includes(video.id);
                                setIsLandscape(!isVerticalId);
                            }}
                            className={`w-full h-full object-contain relative z-10 transition-opacity duration-[600ms] ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
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
                        key="narrative-modal"
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(8px)', pointerEvents: 'auto' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)', pointerEvents: 'none' }}
                        transition={{ duration: 0.6, ease: quarticOut }}
                        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/10"
                        onClick={() => setSelectedVideo(null)}
                    >
                        {/* Right Section: White Frosted Glass Panel */}
                        <motion.div
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
                            className="absolute right-0 top-0 bottom-0 w-full md:w-[40%] max-w-xl bg-white/50 backdrop-blur-xl border-l border-white/50 shadow-2xl p-8 md:p-12 z-[105] flex flex-col justify-center overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 bg-white/50 hover:bg-white/80 rounded-full p-3 transition-all duration-300 z-10 hover:scale-110 shadow-sm border border-slate-200"
                                onClick={() => setSelectedVideo(null)}
                                title="Close"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="mt-8">
                                <motion.h2 
                                    initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.3, duration: 0.5}} 
                                    className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-6 leading-tight"
                                >
                                    {selectedVideo.title}
                                </motion.h2>

                                <motion.div 
                                    initial={{scaleX: 0}} animate={{scaleX: 1}} transition={{delay: 0.4, duration: 0.7, ease: quarticOut}}
                                    className="w-12 h-[1px] bg-slate-300 mb-8 origin-left"
                                />
                                
                                <motion.div 
                                    initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.5, duration: 0.5}} 
                                    className="space-y-6 text-slate-800 text-[15px] md:text-base leading-8 font-medium [&_strong]:font-bold [&_strong]:text-black"
                                >
                                    {selectedVideo.story && <div>{selectedVideo.story}</div>}
                                    {selectedVideo.behindTheScenes && <div>{selectedVideo.behindTheScenes}</div>}
                                    {!selectedVideo.story && !selectedVideo.behindTheScenes && (
                                        <div>A visual exploration pushing creative boundaries and storytelling through movement. Shot locally with a small crew. Emphasized practical lighting and fast-paced editing.</div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Left Section: Video Container */}
                        {/* We use pointer-events-none so clicking outside the video still hits the main backdrop to close */}
                        <div className="absolute left-0 top-0 bottom-0 right-0 md:right-[40%] p-4 md:p-8 z-[110] flex items-center justify-center pointer-events-none">
                            <motion.div
                                layoutId={`video-container-${selectedVideo.id}`}
                                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                                // Calculate aspect ratio classes dynamically based on the hardcoded vertical list, just like in VideoCard
                                className={`relative group pointer-events-auto rounded-2xl md:rounded-[1rem] overflow-hidden shadow-2xl bg-black ${['01', '04', '07', '10', '12', '13'].includes(selectedVideo.id) ? 'w-auto h-[85vh] aspect-[9/16]' : 'w-[90%] md:w-[85%] lg:w-[75%] h-auto aspect-video'}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video
                                    src={selectedVideo.src.startsWith('http') ? selectedVideo.src : `/videos/${selectedVideo.src}`}
                                    poster={selectedVideo.thumbnail}
                                    controls
                                    autoPlay
                                    loop
                                    playsInline
                                    className="w-full h-full object-contain"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                
                                {/* Extra Fullscreen Button overriding standard controls */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const videoEl = e.currentTarget.parentElement.querySelector('video');
                                        if (videoEl.requestFullscreen) {
                                            videoEl.requestFullscreen();
                                        } else if (videoEl.webkitRequestFullscreen) { /* Safari */
                                            videoEl.webkitRequestFullscreen();
                                        } else if (videoEl.msRequestFullscreen) { /* IE11 */
                                            videoEl.msRequestFullscreen();
                                        }
                                    }}
                                    className="absolute top-4 left-4 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white rounded-full p-2.5 border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg z-[120]"
                                    title="Fullscreen"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
