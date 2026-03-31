import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';

// ── Icons & Data (Consolidated) ────────────────────────────────────────────────

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.1" fill="currentColor" strokeWidth="2" />
    </svg>
);

const PortfolioIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const EmailIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const LocationIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const AnimatedCounter = ({ from, to, duration = 2, suffix = "", prefix = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
    const springValue = useSpring(from, { stiffness: 50, damping: 20, duration: duration * 1000 });
    const [displayValue, setDisplayValue] = useState(from);
    useEffect(() => { if (inView) springValue.set(to); }, [inView, springValue, to]);
    useEffect(() => springValue.on("change", (latest) => setDisplayValue(Math.floor(latest))), [springValue]);
    const finalString = `${prefix}${to.toLocaleString()}${suffix}`;
    const chWidth = finalString.length * 0.65;
    return (
        <span ref={ref} className="font-heavy text-rose-500 mx-1 inline-block drop-shadow-sm font-variant-numeric tabular-nums tracking-tighter text-center" style={{ minWidth: `${chWidth}em` }}>
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
        skills: [["Adobe Suite"], ["Recruitment Marketing"], ["Visual Storytelling", "Brand Presence"], ["Project Management", "Multimedia Campaigns"]]
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
                    <AnimatedCounter from={0} to={52012} /> independent story reads.
                </p>
                <p className="text-slate-900 leading-relaxed font-medium">
                    Leveraged real-time website analytics to continually pinpoint the most engaging stories, completely overhauling and improving our social media linking strategies, which systematically resulted in a massive 
                    <AnimatedCounter from={0} to={300} suffix="%" /> increase in overall digital traffic.
                </p>
            </>
        ),
        skills: [["Media"], ["Content Distribution"], ["Data Analytics", "Audience Growth"], ["Digital Strategy", "Technical Solutions"]],
        awards: ["1st Place Sports Photography (Southeast Journalism Conf.)", "1st Place Feature Photography (Southeast Journalism Conf.)", "2nd Place A&E Multimedia (Southeast Journalism Conf.)"]
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
        skills: [["Analytics"], ["Website Architecture"], ["Ad Campaigns", "Client Reporting"], ["Meta Business", "Digital Infrastructure"]]
    }
];

// ── Components ───────────────────────────────────────────────────────────────

const TimelineItem = ({ exp, index, isLast }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    return (
        <StaggerItem>
            <div ref={ref} className="relative pl-8 md:pl-0 group/item min-h-[50svh] flex items-center py-12 md:py-24">
                {/* Vertical Line with "Light Up" Effect */}
                <div className="absolute left-[8px] md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 overflow-hidden">
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: inView ? '100%' : '0%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-full bg-slate-900"
                    />
                </div>

                <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Alternate Side - Skills & Awards */}
                    <div className={`hidden md:flex flex-col w-1/2 justify-center ${index % 2 === 0 ? 'pl-5 md:pl-8' : 'pr-5 md:pr-8'}`}>
                        <div className={`flex flex-col gap-6 w-full ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                            <div className={`flex flex-col gap-2 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                                {exp.skills?.map((skillRow, rowIdx) => (
                                    <div key={rowIdx} className={`flex flex-row flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                        {skillRow.map((skill, sIdx) => (
                                            <span key={sIdx} className="px-4 py-2 bg-slate-900/5 text-slate-600 text-[11px] font-heavy tracking-wider uppercase rounded-full border border-slate-900/10 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 cursor-default shadow-sm w-fit text-center">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            {exp.awards && (
                                <div className={`flex flex-col gap-2 w-full mt-2 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                                    <span className={`text-[10px] font-heavy tracking-widest text-[#facc15] uppercase mb-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)] ${index % 2 === 0 ? 'ml-1 text-left' : 'mr-1 text-right'}`}>Awards</span>
                                    {exp.awards.map((award, aIdx) => (
                                        <div key={aIdx} className={`relative px-4 py-[6px] rounded-full overflow-hidden group cursor-default shadow-[0_4px_20px_-4px_rgba(250,204,21,0.2)] hover:shadow-[0_4px_25px_-4px_rgba(250,204,21,0.4)] transition-all duration-500 w-fit ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-400/10 to-amber-500/10 backdrop-blur-md rounded-full border border-yellow-400/20 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all duration-500 z-0 text-[11px]"></div>
                                            <span className="relative z-20 flex items-center gap-2 text-[10px] md:text-[11px] font-heavy tracking-wider uppercase text-slate-800 mix-blend-plus-darker drop-shadow-sm leading-normal">
                                                <span className="text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)] group-hover:scale-110 transition-transform duration-300">🏆</span> {award}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center Dot */}
                    <div className={`absolute left-[8px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10 transition-all duration-500 ${inView ? 'bg-slate-900 scale-125 shadow-lg' : 'bg-slate-300 scale-100'}`}></div>

                    {/* Content Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-5/12 bg-white/40 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-slate-900/15 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_8px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.1)] relative z-20 transition-all duration-500 hover:border-slate-900/30"
                    >
                        <div className="flex flex-col gap-1 mb-6">
                            <h3 className="text-xl sm:text-2xl font-heavy text-slate-900 tracking-tight leading-tight mb-2">{exp.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm font-medium text-slate-500">
                                <span className="text-slate-800 font-bold">{exp.company}</span>
                                <span className="hidden sm:inline text-slate-300">•</span>
                                <span className="flex items-center gap-1">
                                    <LocationIcon /> {exp.location}
                                </span>
                            </div>
                            <span className="inline-block mt-3 px-3 py-1.5 bg-slate-900/5 text-slate-900 text-xs font-bold uppercase tracking-widest rounded-full w-fit border border-slate-900/10">
                                {exp.date}
                            </span>
                        </div>
                        <div className="text-base text-slate-800 font-medium leading-relaxed">
                            {exp.description}
                        </div>
                        <div className="md:hidden flex flex-wrap gap-2 mt-6">
                            {exp.skills?.flat().map((skill, sIdx) => (
                                <span key={sIdx} className="px-3 py-1.5 bg-slate-900/5 text-slate-600 text-[10px] font-heavy tracking-wider uppercase rounded-full border border-slate-900/10 text-center shadow-sm">
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

// ── Discover Component ───────────────────────────────────────────────────────

export const Discover = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.classList.add('scroll-smooth');
        return () => document.documentElement.classList.remove('scroll-smooth');
    }, []);

    return (
        <div className="w-full relative min-h-screen">
            {/* Background Texture */}
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none" />
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }} />

            {/* Scroll Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-900/10 z-[100] origin-left">
                <motion.div className="h-full bg-slate-900" style={{ scaleX }} />
            </motion.div>

            {/* Section Indicators (Desktop Only) */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-[90]">
                {['About', 'Path', 'Connect'].map((name, i) => (
                    <a key={name} href={`#${name.toLowerCase()}`} className="group flex items-center justify-end gap-3 text-right group">
                        <span className="text-[10px] font-heavy tracking-widest uppercase text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">{name}</span>
                        <div className="w-2 h-2 rounded-full border-2 border-slate-300 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300" />
                    </a>
                ))}
            </div>

            <main className="max-w-7xl mx-auto px-6 relative z-10 overflow-x-hidden">
                <StaggerContainer>
                    
                    {/* SECTION 1: IDENTITY */}
                    <section id="about" className="min-h-screen pt-32 pb-20 flex flex-col justify-center snap-start">
                        <StaggerItem>
                            <a href="#/" className="text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2 mb-8 text-sm font-ultra-thin tracking-widest uppercase">
                                <span>← Back to Home</span>
                            </a>
                            <div className="relative">
                                <h1 className="text-5xl xs:text-6xl md:text-8xl lg:text-[10vw] font-ultra-thin tracking-tighter text-slate-900 drop-shadow-sm leading-[0.85] select-none pointer-events-none mb-12">
                                    About <strong className="font-heavy">Me</strong>.
                                </h1>
                            </div>
                        </StaggerItem>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                            <StaggerItem className="lg:col-span-5 flex flex-col items-center lg:items-start group">
                                <div className="relative w-full max-w-[400px]">
                                    <motion.img 
                                        src="/apil-cutout.png" 
                                        alt="Apil KC" 
                                        className="w-full object-contain select-none transition-transform duration-700 group-hover:scale-[1.02]"
                                        style={{ 
                                            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.2)) saturate(1.1)',
                                            imageRendering: 'auto',
                                            // Reduced mask intensity to keep more detail
                                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                        }}
                                    />
                                    <div className="mt-8 flex flex-col items-center lg:items-start gap-1">
                                        <span className="text-sm font-heavy tracking-widest uppercase text-slate-400">Apil KC</span>
                                        <span className="text-xs text-slate-400/80 font-medium tracking-wide">Monroe, Louisiana</span>
                                    </div>
                                </div>
                            </StaggerItem>

                            <StaggerItem className="lg:col-span-7 flex flex-col gap-8">
                                <motion.div 
                                    whileHover={{ y: -5 }}
                                    className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-slate-900/10 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),0_30px_60px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
                                >
                                    <span className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-heavy uppercase tracking-widest rounded-full mb-8">Who I Am</span>
                                    <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-6">
                                        I'm <strong className="font-heavy text-slate-900 text-[1.1em]">Apil KC</strong>. figuring out life and discovering myself as I go, with my main goal being successful and making my parents proud while embracing as much happiness as possible. 
                                    </p>
                                    <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                                        I'm a visual storyteller blending technical skills in Computer Science and Analytics with a passion for high-end digital production.
                                    </p>
                                </motion.div>
                            </StaggerItem>
                        </div>
                    </section>

                    {/* SECTION 2: PROFESSIONAL */}
                    <section id="path" className="min-h-screen py-32 snap-start">
                        <StaggerItem className="mb-20">
                            <h2 className="text-4xl xs:text-5xl md:text-7xl font-ultra-thin tracking-tighter text-slate-900 mb-6">
                                My <strong className="font-heavy">Journey</strong>.
                            </h2>
                            <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-light">
                                A timeline of roles and achievements driving digital growth and creative solutions.
                            </p>
                        </StaggerItem>

                        <div className="relative max-w-5xl mx-auto">
                            {experiences.map((exp, idx) => (
                                <TimelineItem key={idx} exp={exp} index={idx} isLast={idx === experiences.length - 1} />
                            ))}
                        </div>
                    </section>

                    {/* SECTION 3: CONNECTION */}
                    <section id="connect" className="min-h-screen py-32 flex flex-col justify-center snap-start">
                        <StaggerItem className="mb-16">
                            <h2 className="text-5xl xs:text-6xl md:text-8xl font-heavy tracking-tighter text-slate-900 uppercase leading-[0.9]">
                                Get in <br />
                                <span className="font-ultra-thin">Touch.</span>
                            </h2>
                        </StaggerItem>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            <StaggerItem className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <motion.a 
                                        href="mailto:apilkc0808@gmail.com" 
                                        whileHover={{ scale: 1.02 }}
                                        className="p-8 rounded-3xl bg-white/50 border border-slate-200 shadow-sm flex flex-col gap-3 group transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                            <EmailIcon />
                                        </div>
                                        <span className="text-[10px] font-heavy tracking-widest uppercase text-slate-400">Email</span>
                                        <span className="text-base font-bold text-slate-900 truncate">apilkc0808@gmail.com</span>
                                    </motion.a>
                                    
                                    <motion.a 
                                        href="https://linkedin.com/in/apilkc08/" target="_blank" rel="noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        className="p-8 rounded-3xl bg-white/50 border border-slate-200 shadow-sm flex flex-col gap-3 group transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                                            <LinkedInIcon />
                                        </div>
                                        <span className="text-[10px] font-heavy tracking-widest uppercase text-slate-400">LinkedIn</span>
                                        <span className="text-base font-bold text-slate-900 truncate">apilkc08</span>
                                    </motion.a>

                                    <motion.a 
                                        href="https://www.instagram.com/apil_kc8/" target="_blank" rel="noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        className="p-8 rounded-3xl bg-white/50 border border-slate-200 shadow-sm flex flex-col gap-3 group transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white transition-colors">
                                            <InstagramIcon />
                                        </div>
                                        <span className="text-[10px] font-heavy tracking-widest uppercase text-slate-400">Instagram</span>
                                        <span className="text-base font-bold text-slate-900 truncate">@apil_kc8</span>
                                    </motion.a>

                                    <div className="p-8 rounded-3xl bg-white/50 border border-slate-200 shadow-sm flex flex-col gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                                            <LocationIcon />
                                        </div>
                                        <span className="text-[10px] font-heavy tracking-widest uppercase text-slate-400">Base</span>
                                        <span className="text-base font-bold text-slate-900">Louisiana, US</span>
                                    </div>
                                </div>
                                <motion.a 
                                    href="https://ulmhawkeyeonline.com/staff_name/apil-kc/" target="_blank" rel="noreferrer"
                                    whileHover={{ scale: 1.01 }}
                                    className="p-6 rounded-2xl bg-slate-900 text-white flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <PortfolioIcon />
                                        <span className="text-sm font-heavy tracking-widest uppercase">Hawkeye Portfolio</span>
                                    </div>
                                    <span className="text-lg">↗</span>
                                </motion.a>
                            </StaggerItem>

                            <StaggerItem>
                                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-bl-full -z-1" />
                                    <h3 className="text-2xl font-heavy text-slate-900 mb-2">Send a Message</h3>
                                    <p className="text-slate-500 mb-8 font-medium">Have a project or collaboration in mind? let's talk.</p>
                                    
                                    <form className="flex flex-col gap-5" action="https://formsubmit.co/apilkc0808@gmail.com" method="POST">
                                        <input type="text" name="name" required className="w-full bg-slate-50 focus:bg-white border-b border-slate-200 focus:border-slate-900 px-4 py-4 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Name" />
                                        <input type="email" name="email" required className="w-full bg-slate-50 focus:bg-white border-b border-slate-200 focus:border-slate-900 px-4 py-4 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Email" />
                                        <textarea name="message" required className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-slate-900 px-4 py-4 rounded-xl outline-none transition-all placeholder:text-slate-400 font-medium h-32 resize-none" placeholder="How can I help you?" />
                                        <button className="w-full py-4 bg-slate-900 text-white rounded-full font-heavy tracking-widest uppercase text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                                            Send Message
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </form>
                                </div>
                            </StaggerItem>
                        </div>
                    </section>

                </StaggerContainer>
            </main>
        </div>
    );
};
