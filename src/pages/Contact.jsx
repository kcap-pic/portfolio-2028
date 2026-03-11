import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';

export const Contact = () => {
    useEffect(() => {
        document.documentElement.classList.add('no-scrollbar');
        return () => document.documentElement.classList.remove('no-scrollbar');
    }, []);

    return (
        <div className="w-full min-h-[100svh] relative z-10 font-sans flex flex-col justify-center items-center py-20 px-6 md:px-12 xl:px-24">
            
            {/* Background globally matching Photography/Experience */}
            <div className="fixed inset-0 bg-[#fafafa] z-[-2] pointer-events-none"></div>
            <div className="fixed inset-0 z-[-1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>

            <StaggerContainer className="w-full max-w-7xl mx-auto flex flex-col items-center mt-12 md:mt-16">
                
                {/* Header */}
                <StaggerItem className="w-full flex justify-center lg:justify-start mb-12 md:mb-20">
                    <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[7vw] font-heavy tracking-tighter text-slate-900 drop-shadow-sm text-center lg:text-left leading-none uppercase">
                        GET IN TOUCH.
                    </h1>
                </StaggerItem>

                {/* Main Content Grid */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    
                    {/* Left Column: Info */}
                    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto lg:max-w-none">
                        <StaggerItem>
                            <a href="mailto:apilkc0808@gmail.com" className="flex flex-col p-6 md:p-8 rounded-[2rem] bg-white/50 backdrop-blur-3xl border border-slate-200 hover:bg-white/80 hover:border-slate-300 transition-all duration-300 group shadow-sm">
                                <span className="text-slate-500 text-sm font-semibold tracking-widest uppercase mb-2 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/polygons/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    Email
                                </span>
                                <span className="text-xl md:text-2xl text-slate-800 font-medium group-hover:text-slate-900 transition-colors break-all">
                                    apilkc0808@gmail.com
                                </span>
                            </a>
                        </StaggerItem>

                        <StaggerItem>
                            <a href="https://linkedin.com/in/apilkc08/" target="_blank" rel="noreferrer" className="flex flex-col p-6 md:p-8 rounded-[2rem] bg-white/50 backdrop-blur-3xl border border-slate-200 hover:bg-white/80 hover:border-slate-300 transition-all duration-300 group shadow-sm">
                                <span className="text-slate-500 text-sm font-semibold tracking-widest uppercase mb-2 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                    LinkedIn
                                </span>
                                <span className="text-xl md:text-2xl text-slate-800 font-medium group-hover:text-slate-900 transition-colors">
                                    linkedin.com/in/apilkc08
                                </span>
                            </a>
                        </StaggerItem>

                        <StaggerItem>
                            <div className="flex flex-col p-6 md:p-8 rounded-[2rem] bg-white/50 backdrop-blur-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-bl-full pointer-events-none"></div>
                                <span className="text-slate-500 text-sm font-semibold tracking-widest uppercase mb-2 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Location
                                </span>
                                <span className="text-xl md:text-2xl text-slate-800 font-medium">
                                    Monroe, Louisiana
                                </span>
                            </div>
                        </StaggerItem>
                    </div>

                    {/* Right Column: Form */}
                    <div className="flex flex-col w-full max-w-2xl mx-auto lg:max-w-none">
                        <StaggerItem className="h-full">
                            <div className="w-full h-full flex flex-col p-8 md:p-10 lg:p-12 rounded-[2rem] bg-white/70 backdrop-blur-2xl border border-slate-200 shadow-xl relative overflow-hidden">
                                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-2">Send a Message</h2>
                                <p className="text-slate-500 mb-8 font-medium">Have a project in mind? Let's discuss.</p>
                                
                                <form className="flex flex-col gap-6 flex-grow" action="https://formsubmit.co/apilkc0808@gmail.com" method="POST">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 px-2">Name</label>
                                        <input type="text" name="name" required className="w-full bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 focus:border-slate-400 text-slate-900 px-5 py-4 rounded-t-xl border-b-2 border-slate-300 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Your Name" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 px-2">Email</label>
                                        <input type="email" name="email" required className="w-full bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 focus:border-slate-400 text-slate-900 px-5 py-4 rounded-t-xl border-b-2 border-slate-300 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="your@email.com" />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 px-2">Subject</label>
                                        <input type="text" name="subject" required className="w-full bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 focus:border-slate-400 text-slate-900 px-5 py-4 rounded-t-xl border-b-2 border-slate-300 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="What is this regarding?" />
                                    </div>

                                    <div className="flex flex-col gap-2 flex-grow">
                                        <label className="text-xs font-semibold tracking-widest uppercase text-slate-500 px-2">Message</label>
                                        <textarea name="message" required className="w-full h-full min-h-[140px] bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 focus:border-slate-400 text-slate-900 border border-slate-300 px-5 py-4 rounded-xl outline-none transition-all placeholder:text-slate-400 font-medium resize-none shadow-inner" placeholder="Hello..." />
                                    </div>

                                    <button className="w-full mt-4 py-4 rounded-full bg-slate-900 text-white font-bold tracking-widest uppercase text-sm flex justify-center items-center gap-2 hover:bg-slate-800 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-[0.98] group">
                                        Send Message
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </StaggerItem>
                    </div>

                </div>
            </StaggerContainer>
        </div>
    );
};
