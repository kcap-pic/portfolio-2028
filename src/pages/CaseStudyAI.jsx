import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const CaseStudyAI = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
            {/* Hero Section */}
            <header className="relative w-full h-[60vh] md:h-screen overflow-hidden flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <img 
                        src="/case-studies/titles/ai-series-hero.png" 
                        className="w-full h-full object-cover" 
                        alt="AI Series"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                </motion.div>
                
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                         <h1 className="text-6xl md:text-[12rem] font-heavy tracking-tighter leading-none mb-4 mix-blend-difference">
                            AI SERIES.
                        </h1>
                        <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] md:text-xs font-heavy">
                            The Edge of Motion & Technology
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Project Overview */}
            <article className="max-w-5xl mx-auto px-6 py-24 md:py-48">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
                    <div className="md:col-span-8">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-heavy tracking-tight mb-12 leading-tight"
                        >
                            Exploring the <span className="text-slate-500">Uncharted</span> Frontier of Animation.
                        </motion.h2>
                        <div className="space-y-10 text-lg md:text-2xl text-slate-400 leading-relaxed font-light">
                            <p>
                                What happens when the precision of <strong>generative AI</strong> meets the soul of <strong>character animation</strong>? The AI Series is an experimental investigation into the workflows of the future.
                            </p>
                            <p>
                                Every frame in this project was co-authored by human and machine. By training custom models on my own hand-drawn sketches, we achieved a visual language that feels organic yet distinctly futuristic—a "Digital Noir" aesthetic that traditional tools alone couldn't capture.
                            </p>
                        </div>
                    </div>
                    
                    <aside className="md:col-span-4 border-l border-white/10 pl-8 flex flex-col justify-center">
                        <div className="mb-12">
                            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-heavy mb-2">Role</h4>
                            <p className="text-sm">Director / Technical Artist</p>
                        </div>
                        <div className="mb-12">
                            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-heavy mb-2">Tech Stack</h4>
                            <p className="text-sm">Stable Diffusion, Premiere Pro, After Effects, ComfyUI</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-heavy mb-2">Release</h4>
                            <p className="text-sm">Q4 2026</p>
                        </div>
                    </aside>
                </div>

                {/* Impact / Creative Direction */}
                <div className="mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900">
                         <img src="/case-studies/titles/ai-series-hero.png" className="w-full h-full object-cover opacity-60" />
                    </div>
                    <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-2xl flex flex-col justify-center">
                        <h3 className="text-2xl font-heavy mb-6">Technological Symbiosis</h3>
                        <p className="text-slate-400 font-light leading-relaxed mb-8">
                            We developed a novel pipeline that uses <strong>Depth-to-Image</strong> translation, allowing us to maintain architectural consistency in every shot while the AI generates atmospheric details and practical lighting effects.
                        </p>
                        <div className="w-full h-px bg-white/10 my-8" />
                        <div className="flex items-center gap-4">
                             <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                             <span className="text-[10px] font-heavy tracking-widest text-white/50 uppercase">R&D PHASE COMPLETE</span>
                        </div>
                    </div>
                </div>

                {/* Full Width Visual */}
                <section className="mt-24 md:mt-32">
                    <div className="w-full h-[60vh] md:h-[80vh] rounded-[2rem] md:rounded-[4rem] overflow-hidden relative shadow-2xl">
                         <img src="/case-studies/titles/ai-series-hero.png" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                         <div className="absolute bottom-12 left-12">
                             <h4 className="text-2xl font-heavy">The Workshop of the Future</h4>
                             <p className="text-sm text-white/60">A concept still exploring the intersection of human spirit and artificial logic.</p>
                         </div>
                    </div>
                </section>

                <div className="flex flex-col items-center gap-12 mt-32 md:mt-48 pt-12 border-t border-white/10">
                    <h5 className="text-slate-600 uppercase tracking-widest text-[10px] font-heavy">End of Case Study</h5>
                    <a href="#/case-studies" className="bg-white text-black px-12 py-4 rounded-full text-xs font-heavy tracking-tighter uppercase hover:scale-105 transition-transform">
                        Explore more work
                    </a>
                </div>
            </article>

            {/* Footer Padding */}
            <div className="h-48" />
        </div>
    );
};
