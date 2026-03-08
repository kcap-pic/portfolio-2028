import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { videosData } from '../data/videos';

export const Videos = () => {
    useEffect(() => {
        document.documentElement.classList.add('snap-y', 'snap-mandatory');
        return () => document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    }, []);

    return (
        <div className="w-full min-h-[100svh] pt-16 md:pt-20 pb-48 px-6 max-w-7xl mx-auto relative z-10 pointer-events-auto">
            <span className="hidden snap-y snap-mandatory"></span>
            {/* Same background styling as Photography */}
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none"></div>
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>

            <StaggerContainer>
                {/* Header */}
                <div className="snap-start shrink-0">
                    <StaggerItem>
                        <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 mb-4 md:mb-6 text-sm font-ultra-thin tracking-widest uppercase">
                            <span>← Back to Home</span>
                        </a>
                        <h1 className="text-5xl md:text-7xl font-ultra-thin tracking-tighter mb-10 md:mb-12 text-slate-900 drop-shadow-sm">
                            Videos & <strong className="font-heavy">Reels</strong>.
                        </h1>
                    </StaggerItem>
                </div>

                {/* Videos List */}
                <div className="flex flex-col gap-16 md:gap-24 mb-24 max-w-5xl mx-auto">
                    {videosData.map((video, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={video.id} className="snap-center shrink-0 w-full">
                                <StaggerItem>
                                    <div className="flex flex-col w-full relative">
                                        <div className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative border border-slate-900/15 group-hover:border-slate-900/30 transition-all duration-500 z-0 bg-black">
                                            {/* HTML5 Video element */}
                                            <video
                                                src={`/videos/${video.src}`}
                                                controls
                                                className="w-full max-h-[70vh] object-contain block mx-auto"
                                                preload="metadata"
                                                playsInline
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>

                                        {/* Minimalistic Description below the video */}
                                        <div className="w-full mt-6 text-center md:text-left md:px-4">
                                            <h2 className="text-2xl md:text-3xl font-heavy text-slate-900 mb-2">{video.title}</h2>
                                            <p className="font-light text-slate-600 md:text-lg">{video.description}</p>
                                        </div>
                                    </div>
                                </StaggerItem>
                            </div>
                        );
                    })}

                    {videosData.length === 0 && (
                        <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200">
                            <p className="text-slate-500">No videos found. Add your videos to <code className="bg-slate-200 px-2 py-1 rounded">public/videos/</code> and update <code className="bg-slate-200 px-2 py-1 rounded">src/data/videos.js</code>.</p>
                        </div>
                    )}
                </div>
            </StaggerContainer>
        </div>
    );
};
