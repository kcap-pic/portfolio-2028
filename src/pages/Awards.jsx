import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';

const awardsData = [
    {
        title: "First Place - Multimedia Campaign",
        organization: "Public Relations Association of Louisiana (PRAL)",
        date: "2025",
        description: "Awarded first place for the comprehensive university recruitment multimedia campaign."
    },
    {
        title: "Best Visual Storytelling",
        organization: "College Media Association (CMA)",
        date: "2024",
        description: "Recognized for excellence in visual storytelling and photojournalism at The Hawkeye."
    },
    {
        title: "Gold Award - Digital Strategy",
        organization: "American Advertising Federation (ADDY)",
        date: "2024",
        description: "Received for regional digital strategy implementation that drove significant local engagement."
    }
];

export const Awards = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.classList.add('snap-y', 'snap-mandatory', 'scroll-smooth');
        return () => document.documentElement.classList.remove('snap-y', 'snap-mandatory', 'scroll-smooth');
    }, []);

    return (
        <div className="w-full min-h-[100svh] pt-8 md:pt-12 pb-48 px-6 max-w-7xl mx-auto relative z-10 pointer-events-auto">
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none"></div>
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>

            <StaggerContainer>
                <div className="snap-start shrink-0 min-h-[30svh] flex flex-col justify-center mb-12 text-center md:text-left">
                    <StaggerItem>
                        <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2 mb-2 md:mb-4 text-sm font-ultra-thin tracking-widest uppercase">
                            <span>← Back to Home</span>
                        </a>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-ultra-thin tracking-tighter mb-4 text-slate-900 drop-shadow-sm">
                            Honors & <strong className="font-heavy">Awards</strong>.
                        </h1>
                        <p className="text-slate-500 font-light text-lg md:text-xl max-w-2xl">
                            Recognition for creative marketing, visual storytelling, and digital strategy.
                        </p>
                    </StaggerItem>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {awardsData.map((award, idx) => (
                        <StaggerItem key={idx}>
                            <motion.div
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="h-full bg-transparent backdrop-blur-none rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-slate-900/15 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_2px_2px_6px_rgba(255,255,255,0.7),inset_-1px_-1px_4px_rgba(0,0,0,0.1),0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_8px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500 overflow-hidden hover:border-slate-900/30 flex flex-col"
                            >
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1.5 bg-slate-900/5 text-slate-900 text-[10px] font-heavy uppercase tracking-widest rounded-full border border-slate-900/10 mb-4">
                                        {award.date}
                                    </span>
                                    <h3 className="text-xl font-heavy text-slate-900 tracking-tight leading-tight mb-2">{award.title}</h3>
                                    <p className="text-sm font-medium text-slate-500 mb-4">{award.organization}</p>
                                </div>
                                <div className="text-sm text-slate-800 font-medium leading-relaxed mt-auto">
                                    {award.description}
                                </div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </div>
            </StaggerContainer>
        </div>
    );
};
