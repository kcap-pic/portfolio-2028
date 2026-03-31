import React from 'react';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { MagneticCardFixed } from '../components/MagneticCardFixed';

export const WorkPage = () => {
    const categories = [
        { title: "Projects", desc: "Digital platforms and campaigns." },
        { title: "Photography", desc: "A visual journey through my lens." },
        { title: "Awards", desc: "Industry recognition." }
    ];

    return (
        <div className="w-full min-h-[100svh] pt-32 pb-48 px-6 max-w-7xl mx-auto relative z-10 pointer-events-auto">
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none"></div>
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>
            <StaggerContainer>
                <StaggerItem>
                    <h1 className="text-6xl md:text-8xl font-ultra-thin tracking-tighter mb-16">
                        My <strong className="font-heavy">Work</strong>.
                    </h1>
                </StaggerItem>

                <div className="space-y-24">
                    {categories.map((cat, i) => (
                        <StaggerItem key={i}>
                            <div className="border-b border-slate-200 pb-8 mb-8">
                                <h2 className="text-4xl font-heavy mb-2">{cat.title}</h2>
                                <p className="text-xl text-slate-500 font-light">{cat.desc}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[400px]">
                                {[1, 2, 3].map((item) => (
                                    <MagneticCardFixed key={item} className="w-full h-full flex items-end">
                                        <span className="font-medium text-slate-600">{cat.title} 0{item}</span>
                                    </MagneticCardFixed>
                                ))}
                            </div>
                        </StaggerItem>
                    ))}
                </div>
            </StaggerContainer>
        </div>
    );
}
