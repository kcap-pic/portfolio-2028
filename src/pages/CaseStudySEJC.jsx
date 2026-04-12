import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const CaseStudySEJC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
            {/* Hero Section */}
            <header className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img 
                        src="/case-studies/titles/sejc-hero.webp" 
                        className="w-full h-full object-cover grayscale-[10%]" 
                        alt="SEJC 2026"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
                </motion.div>
                
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/70 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-4"
                    >
                        Case Study 2026
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-8xl font-heavy text-white tracking-tighter leading-none mb-6 drop-shadow-2xl"
                    >
                        SEJC 2026.
                    </motion.h1>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="w-24 h-1 bg-white mx-auto origin-center"
                    />
                </div>
            </header>

            {/* Content Body */}
            <article className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                {/* Intro Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-center">
                    <div className="md:col-span-12">
                        <h2 className="text-3xl md:text-5xl font-heavy tracking-tighter mb-12">
                            The Power of <span className="text-slate-400">Visual Journalism</span>.
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                            <p>
                                The Southeast Journalism Conference (SEJC) has always been a beacon for emerging storytellers, but for the 2026 event, our goal was to redefine what it means to <strong>experience journalism</strong> in a digital world. We wanted to move away from traditional print-based aesthetics and embrace a high-energy, motion-first identity.
                            </p>
                            <p>
                                As the lead creative for this campaign, I was tasked with building a bridge between <strong>classic reporting</strong> and <strong>modern digital distribution</strong>. This project explores the convergence of high-stills photography, dynamic video transitions, and a brand-new digital ecosystem tailored for the Gen-Z journalist.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Highlights / Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">01</div>
                        <h3 className="text-xl md:text-2xl font-heavy mb-4">Branding</h3>
                        <p className="text-slate-500 font-light leading-relaxed">
                            A minimalist, dark-themed brand kit that allows high-contrast photography to take center stage.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">02</div>
                        <h3 className="text-xl md:text-2xl font-heavy mb-4">UX Design</h3>
                        <p className="text-slate-500 font-light leading-relaxed">
                            A streamlined, interactive conference portal designed for rapid on-the-go scheduling and live updates.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">03</div>
                        <h3 className="text-xl md:text-2xl font-heavy mb-4">Motion</h3>
                        <p className="text-slate-500 font-light leading-relaxed">
                            Intentional camera movement and high-energy reel sequences that captured the hustle of the newsroom.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">04</div>
                        <h3 className="text-xl md:text-2xl font-heavy mb-4">Impact</h3>
                        <p className="text-slate-500 font-light leading-relaxed">
                            Achieved a 45% increase in digital engagement through localized социальная сеть storytelling.
                        </p>
                    </div>
                </div>

                {/* Final Image Box */}
                <div className="w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl mb-12 relative group bg-slate-100">
                    <img 
                        src="/case-studies/titles/sejc-hero.webp" 
                        className="w-full h-full object-cover" 
                        alt="Final Shot"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="text-center max-w-2xl mx-auto mb-24">
                     <p className="text-slate-400 italic text-sm">Shot during the SEJC 2026 Finals at University of Southern Mississippi.</p>
                </div>

                <div className="flex justify-center">
                    <a href="#/case-studies" className="text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em] text-sm flex items-center gap-2">
                        <span>← Back to Case Studies</span>
                    </a>
                </div>
            </article>
            
            {/* Footer Padding */}
            <div className="h-48" />
        </div>
    );
};
