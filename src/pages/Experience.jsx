import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';

const AnimatedCounter = ({ from, to, duration = 2, suffix = "", prefix = "" }) => {
    const ref = useRef(null);
    // Adjusted margin so it triggers only when significantly visible in the viewport
    const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
    const springValue = useSpring(from, { stiffness: 50, damping: 20, duration: duration * 1000 });
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
        if (inView) {
            springValue.set(to);
        }
    }, [inView, springValue, to]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    // Pre-calculate an approximate width based on the final target number to prevent layout shift
    // Roughly 1ch per digit, plus space for commas and prefix/suffix
    const finalString = `${prefix}${to.toLocaleString()}${suffix}`;
    const chWidth = finalString.length * 0.65; // Approximate ch width adjustment

    return (
        <span
            ref={ref}
            className="font-heavy text-rose-500 mx-1 inline-block drop-shadow-sm font-variant-numeric tabular-nums tracking-tighter text-center"
            style={{ minWidth: `${chWidth}em` }}
        >
            {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
    );
};

const experiences = [
    {
        title: "Assistant Digital Media Head",
        company: "ULM Office of Marketing and Communications",
        location: "Monroe, LA",
        date: "Jan 2026 - Present",
        description: (
            <>
                <p className="mb-4 text-slate-900 leading-relaxed font-medium">
                    Spearheading digital media initiatives to elevate the university's brand presence. I collaborate directly with university leadership, faculty, and department heads to architect comprehensive, multi-platform multimedia campaigns.
                </p>
                <p className="text-slate-900 leading-relaxed font-medium">
                    Acting as the technical lead, I manage the full lifecycle of major university media projects—translating broad institutional goals into precise visual narratives and executing final digital production workflows via Adobe Creative Suite to ultimately drive student recruitment and engagement.
                </p>
            </>
        ),
        skills: [
            ["Adobe Suite"],
            ["Visual Storytelling", "Recruitment Marketing", "Brand Presence"],
            ["Project Management", "Multimedia Campaigns"]
        ]
    },
    {
        title: "Visual Director",
        company: "The Hawkeye (ULM student publication)",
        location: "Monroe, LA",
        date: "July 2025 - Jan 2026",
        description: (
            <>
                <p className="mb-4 text-slate-900 leading-relaxed font-medium">
                    Revolutionized the publication's digital footprint by leading a comprehensive digital growth strategy. My technical optimizations and visual direction secured
                    <AnimatedCounter from={0} to={58475} /> total unique visitors and over
                    <AnimatedCounter from={0} to={52012} /> independent story reads, scaling to an incredible peak of
                    <AnimatedCounter from={0} to={3266} /> daily views in November 2025 alone.
                </p>
                <p className="text-slate-900 leading-relaxed font-medium">
                    Leveraged real-time website analytics to continually pinpoint the most engaging stories, completely overhauling and improving our social media linking strategies, which systematically resulted in a massive
                    <AnimatedCounter from={0} to={300} suffix="%" /> increase in overall digital traffic.
                </p>
            </>
        ),
        skills: [
            ["SEO / SEM"],
            ["Content Distribution", "Technical Solutions", "Digital Strategy"],
            ["Audience Growth", "Data Analytics"]
        ]
    },
    {
        title: "Digital Media Analyst Internship",
        company: "North Delta Ramble",
        location: "Monroe, LA",
        date: "June 2025 - Present",
        description: (
            <>
                <p className="mb-4 text-slate-900 leading-relaxed font-medium">
                    Directing content strategy and digital infrastructure. I manage the comprehensive company website architecture and deploy heavily targeted ad campaigns through Meta Business Suite to intentionally drive and sustain organic audience growth.
                </p>
                <p className="text-slate-900 leading-relaxed font-medium">
                    Serving as the primary point of contact for external clients, I specialize in translating highly complex digital metrics and advertising results into clear, actionable recommendations that dramatically improve their independent content strategies.
                </p>
            </>
        ),
        skills: [
            ["Ad Campaigns"],
            ["Digital Infrastructure", "Website Architecture", "Analytics"],
            ["Meta Business", "Client Reporting"]
        ]
    }
];

const TimelineItem = ({ exp, index, isLast }) => {
    return (
        <StaggerItem>
            <div className="relative pl-8 md:pl-0 group/item snap-center shrink-0 min-h-[50svh] flex items-center py-12 md:py-24">

                {/* Mobile Vertical Line */}
                {!isLast && <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-slate-200 group-hover/item:bg-slate-800 transition-colors duration-500"></div>}
                {isLast && <div className="md:hidden absolute left-3 top-0 h-[50%] w-px bg-gradient-to-b from-slate-200 to-transparent"></div>}

                {/* Desktop Vertical Line */}
                {!isLast && <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 group-hover/item:bg-slate-800 transition-colors duration-500"></div>}
                {isLast && <div className="hidden md:block absolute left-1/2 top-0 h-[50%] w-px bg-gradient-to-b from-slate-200 to-transparent -translate-x-1/2"></div>}

                <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Alternate Side - Skills Display */}
                    <div className="hidden md:flex flex-col w-5/12 max-w-[400px] justify-center px-8">
                        <div className={`flex flex-col gap-2 ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                            {exp.skills?.map((skillRow, rowIdx) => (
                                <div key={rowIdx} className={`flex flex-row flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                    {skillRow.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="px-4 py-2 bg-slate-900/5 text-slate-600 text-[11px] font-heavy tracking-wider uppercase rounded-full border border-slate-900/10 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 cursor-default shadow-sm w-fit text-center"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center Dot */}
                    <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 md:bg-slate-200 ring-8 ring-[#fafafa] z-10 group-hover/item:bg-slate-500 transition-all duration-500"></div>

                    {/* Content Card - Photography Theme Glass */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-full md:w-5/12 bg-transparent backdrop-blur-none rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-slate-900/15 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),inset_2px_2px_6px_rgba(255,255,255,0.7),inset_-1px_-1px_4px_rgba(0,0,0,0.1),0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_8px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500 overflow-hidden group-hover/item:border-slate-900/30"
                    >

                        <div className="flex flex-col gap-1 mb-6">
                            <h3 className="text-2xl font-heavy text-slate-900 tracking-tight leading-tight mb-2">{exp.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm font-medium text-slate-500">
                                <span className="text-slate-800 font-bold">{exp.company}</span>
                                <span className="hidden sm:inline text-slate-300">•</span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {exp.location}
                                </span>
                            </div>
                            <span className="inline-block mt-3 px-3 py-1.5 bg-slate-900/5 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-full w-fit border border-slate-900/10">
                                {exp.date}
                            </span>
                        </div>
                        <div className="text-base text-slate-800 font-medium leading-relaxed">
                            {exp.description}
                        </div>

                        {/* Mobile Skills Display */}
                        <div className="md:hidden flex flex-wrap gap-2 mt-6">
                            {exp.skills?.flat().map((skill, sIdx) => (
                                <span
                                    key={sIdx}
                                    className="px-3 py-1.5 bg-slate-900/5 text-slate-600 text-[10px] font-heavy tracking-wider uppercase rounded-full border border-slate-900/10 text-center shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </StaggerItem>
    );
};

export const Experience = () => {
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
                <div className="snap-start shrink-0 min-h-[40svh] flex flex-col justify-center mb-0 text-center md:text-left">
                    <StaggerItem>
                        <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2 mb-2 md:mb-4 text-sm font-ultra-thin tracking-widest uppercase">
                            <span>← Back to Home</span>
                        </a>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-ultra-thin tracking-tighter mb-4 text-slate-900 drop-shadow-sm">
                            Professional <strong className="font-heavy">Experience</strong>.
                        </h1>
                        <p className="text-slate-500 font-light text-lg md:text-xl max-w-2xl">
                            A timeline of my roles driving digital growth, strategy, and media production.
                        </p>
                    </StaggerItem>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {experiences.map((exp, idx) => (
                        <TimelineItem
                            key={idx}
                            exp={exp}
                            index={idx}
                            isLast={idx === experiences.length - 1}
                        />
                    ))}
                </div>
            </StaggerContainer>
        </div>
    );
};
