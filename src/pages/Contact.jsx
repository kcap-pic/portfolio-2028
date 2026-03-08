import React, { useEffect } from 'react';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';

export const Contact = () => {
    useEffect(() => {
        document.documentElement.classList.add('snap-y', 'snap-mandatory');
        return () => document.documentElement.classList.remove('snap-y', 'snap-mandatory');
    }, []);

    return (
        <div className="w-full min-h-[100svh] pt-16 md:pt-20 pb-48 px-6 max-w-7xl mx-auto relative z-10 pointer-events-auto">
            <span className="hidden snap-y snap-mandatory"></span>
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none"></div>
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>

            <StaggerContainer>
                <div className="snap-start shrink-0">
                    <StaggerItem>
                        <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 mb-4 md:mb-6 text-sm font-ultra-thin tracking-widest uppercase">
                            <span>← Back to Home</span>
                        </a>
                        <h1 className="text-5xl md:text-7xl font-ultra-thin tracking-tighter mb-10 md:mb-12 text-slate-900 drop-shadow-sm">
                            Get In <strong className="font-heavy">Touch</strong>.
                        </h1>
                    </StaggerItem>
                </div>

                <div className="flex flex-col gap-12 md:gap-16 mb-24 max-w-5xl mx-auto text-center">
                    <StaggerItem>
                        <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-12 border border-slate-200">
                            <h2 className="text-3xl font-heavy text-slate-900 mb-4">Let's Connect</h2>
                            <p className="text-slate-600 mb-6">Reach out to me for professional inquiries or collaborations.</p>
                            <a href="https://www.linkedin.com/in/apilkc08/" target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
                                View LinkedIn
                            </a>
                        </div>
                    </StaggerItem>
                </div>
            </StaggerContainer>
        </div>
    );
};
