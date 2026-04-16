import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/StaggerAnimations';
import { photographyCategories } from '../data/photography';
import photoMetadata from '../data/photo-metadata.json';

// Helper to shuffle an array (Fisher-Yates)
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const LightboxOverlay = ({ currentPhoto, allPhotos, onClose, onNext, onPrev }) => {
    if (!currentPhoto) return null;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#fafafa] flex flex-col items-center justify-center p-4 md:p-12 border-box" style={{ backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
            <div className="absolute top-0 bottom-0 left-0 w-1/2 z-10 cursor-w-resize" onClick={onPrev}></div>
            <div className="absolute top-0 bottom-0 right-0 w-1/2 z-10 cursor-e-resize" onClick={onNext}></div>

            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                <img src={`/${currentPhoto}`} className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl rounded-sm" />
            </div>

            <div className="absolute bottom-6 left-6 md:left-12 flex flex-col z-20 pointer-events-none">
                {(() => {
                    // Strip extension to match JSON keys (e.g. "Portrait/IMG_7234.webp" -> "Portrait/IMG_7234")
                    const metaKey = currentPhoto.replace(/\.[^/.]+$/, "");
                    const meta = photoMetadata[metaKey];
                    
                    if (!meta) return null;
                    
                    return (
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }} 
                            animate={{ y: 0, opacity: 1 }} 
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-1"
                        >
                            <div className="flex items-center gap-3 text-slate-900 font-medium tracking-tight">
                                <span className="text-lg opacity-80">📷</span>
                                <span className="text-sm md:text-base uppercase tracking-tighter">{meta.model || meta.make || 'Camera'}</span>
                            </div>
                            <div className="flex items-center gap-4 pl-8 text-[11px] md:text-xs font-medium text-slate-500 uppercase tracking-widest whitespace-nowrap overflow-x-auto no-scrollbar">
                                {meta.shutter && <span className="flex items-center gap-1.5"><span className="opacity-40">EXP</span> {meta.shutter}</span>}
                                {meta.aperture && <span className="flex items-center gap-1.5"><span className="opacity-40">APT</span> {meta.aperture}</span>}
                                {meta.iso && <span className="flex items-center gap-1.5"><span className="opacity-40">ISO</span> {meta.iso.replace('ISO ', '')}</span>}
                                {meta.focal && <span className="flex items-center gap-1.5"><span className="opacity-40">FOC</span> {meta.focal}</span>}
                            </div>
                        </motion.div>
                    );
                })()}
            </div>

            <div className="absolute bottom-6 right-6 md:right-12 z-20">
                <button onClick={onClose} className="text-sm font-heavy tracking-widest uppercase text-slate-800 hover:text-red-500 transition-colors cursor-pointer bg-white px-6 py-2 rounded-full border border-slate-200 shadow-sm pointer-events-auto">Close X</button>
            </div>
        </motion.div>
    );
};

const HoverScrollRow = ({ rowData, rowIndex, onOpenLightbox }) => {
    // Repeat photos just enough for a seamless marquee loop (need at least 2× for the -50% trick)
    const displayPhotos = Array(3).fill(rowData.photos).flat();
    const dynamicDuration = rowData.photos.length * 40;

    return (
        <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] relative select-none flex flex-col justify-center overflow-hidden">
            <style>{`
                @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
            `}</style>
            <div
                className="marquee-track flex items-center gap-0 w-max h-full"
                style={{ animation: `${rowIndex % 2 === 0 ? 'scrollLeft' : 'scrollRight'} ${dynamicDuration}s linear infinite` }}
            >
                {displayPhotos.map((src, idx) => {
                    return (
                        <div key={idx} onClick={() => onOpenLightbox(src, rowData.photos)} className={`shrink-0 h-[80px] sm:h-[120px] md:h-[150px] lg:h-[180px] hover:h-[120px] sm:hover:h-[160px] md:hover:h-[200px] lg:hover:h-[240px] rounded-none group hover:z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer bg-slate-200 min-w-[40px] flex items-center justify-center hover:mx-1 md:hover:mx-2`}>
                            <img src={`/${src}`} className="h-full w-auto max-w-none object-contain transition-all duration-700 pointer-events-none" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const PhotographyIndex = () => {
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
                        <h1 className="text-4xl xs:text-5xl md:text-7xl font-ultra-thin tracking-tighter mb-8 md:mb-12 text-slate-900 drop-shadow-sm">
                            Photography <strong className="font-heavy">Portfolio</strong>.
                        </h1>
                    </StaggerItem>
                </div>

                <div className="flex flex-col gap-12 md:gap-16 mb-24 max-w-5xl mx-auto">
                    {photographyCategories.map((cat, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={cat.id} className="snap-center shrink-0">
                                <StaggerItem>
                                    <a href={`#/photography/${cat.id}`} className="group block cursor-pointer">
                                        <div className={`flex flex-col md:flex-row items-center md:items-end relative w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                            <div className="w-full md:w-[70%] aspect-[3/2] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative border border-slate-900/15 group-hover:border-slate-900/30 transition-all duration-500 z-0">
                                                <img src={`/${cat.cover}`} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                            </div>
                                            <div className={`w-[85%] md:w-[45%] z-10 relative -mt-8 md:mt-0 md:-mb-8 ${isEven ? 'md:-ml-[15%]' : 'md:-mr-[15%]'}`}>
                                                <div className="bg-white/80 backdrop-blur-3xl p-5 sm:p-6 md:p-8 w-full flex flex-col justify-center border border-slate-900/15 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_8px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group-hover:border-slate-900/30 transition-all duration-500">
                                                    <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} p-3 md:p-6 opacity-20 group-hover:opacity-100 transition-opacity text-slate-900 text-sm md:text-base leading-none`}>↗</div>
                                                    <h2 className="text-2xl md:text-5xl border-b border-slate-300/50 pb-2 md:pb-4 mb-2 md:mb-4 font-heavy text-slate-900 drop-shadow-sm leading-tight tracking-tight">{cat.title}</h2>
                                                    <p className="mt-2 text-slate-500 text-xs md:text-sm font-medium italic leading-snug">
                                                        {cat.rows.reduce((sum, r) => sum + r.photos.length, 0)} {cat.rows.reduce((sum, r) => sum + r.photos.length, 0) === 1 ? 'Photo' : 'Photos'} <span className="hidden md:inline">in collection</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </StaggerItem>
                            </div>
                        );
                    })}
                </div>
            </StaggerContainer>
        </div>
    );
};

export const PhotographyGallery = ({ categoryId }) => {
    const [shuffledCategories, setShuffledCategories] = useState([]);

    useEffect(() => {
        // Find the starting category index
        const startIndex = photographyCategories.findIndex(c => c.id === categoryId);
        
        // Rebuild the category list starting with the chosen one
        const reordered = startIndex !== -1
            ? [...photographyCategories.slice(startIndex), ...photographyCategories.slice(0, startIndex)]
            : [...photographyCategories];

        // Randomize photos within each row of every category
        const finalized = reordered.map(cat => ({
            ...cat,
            rows: cat.rows.map(row => ({
                ...row,
                photos: shuffleArray(row.photos)
            }))
        }));

        setShuffledCategories(finalized);
    }, [categoryId]);

    const [lightboxInfo, setLightboxInfo] = useState({
        isOpen: false,
        currentPhoto: null,
        contextPhotos: []
    });

    const openLightbox = (photo, contextPhotos) => {
        setLightboxInfo({ isOpen: true, currentPhoto: photo, contextPhotos });
    };

    const closeLightbox = () => {
        setLightboxInfo({ isOpen: false, currentPhoto: null, contextPhotos: [] });
    };

    const nextPhoto = () => {
        setLightboxInfo(prev => {
            const currentIndex = prev.contextPhotos.indexOf(prev.currentPhoto);
            const nextIndex = (currentIndex + 1) % prev.contextPhotos.length;
            return { ...prev, currentPhoto: prev.contextPhotos[nextIndex] };
        });
    };

    const prevPhoto = () => {
        setLightboxInfo(prev => {
            const currentIndex = prev.contextPhotos.indexOf(prev.currentPhoto);
            const prevIndex = (currentIndex - 1 + prev.contextPhotos.length) % prev.contextPhotos.length;
            return { ...prev, currentPhoto: prev.contextPhotos[prevIndex] };
        });
    };

    const contentRef = useRef(null);

    return (
        <div className="w-full min-h-[100svh] relative bg-[#fafafa] z-10 pointer-events-auto">
            <div className="fixed inset-0 bg-[#fafafa] -z-[2] pointer-events-none"></div>
            <div className="fixed inset-0 -z-[1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 2px, transparent 2px)', backgroundSize: '64px 64px', animation: 'moveDots 8s linear infinite' }}></div>

            <div className="fixed top-24 left-6 md:left-12 z-50">
                <a href="#/photography" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-ultra-thin tracking-widest uppercase bg-[#fafafa]/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm pointer-events-auto">
                    <span>← Back to Categories</span>
                </a>
            </div>

            <div
                ref={contentRef}
                className="flex flex-col gap-2 w-full pt-36 pb-24"
            >
                {(() => {
                    let globalRowIndex = 0;
                    return shuffledCategories.map((cat, catIdx) => (
                        <div key={`${cat.id}-${catIdx}`} className="w-full flex flex-col relative pt-0 mb-4">
                            <StaggerContainer className="px-6 md:px-12 w-full flex flex-col relative z-10">
                                <StaggerItem>
                                    <h2 className="text-2xl md:text-4xl font-heavy tracking-tighter text-slate-900">{cat.title}</h2>
                                </StaggerItem>
                            </StaggerContainer>
                            <div className="w-full pt-0 flex flex-col">
                                {cat.rows.map((row, idx) => {
                                    const currentIndex = globalRowIndex++;
                                    return <HoverScrollRow key={`${cat.id}-${catIdx}-${idx}`} rowIndex={currentIndex} rowData={row} onOpenLightbox={openLightbox} />;
                                })}
                            </div>
                        </div>
                    ));
                })()}
            </div>

            <AnimatePresence>
                {lightboxInfo.isOpen && (
                    <LightboxOverlay
                        currentPhoto={lightboxInfo.currentPhoto}
                        allPhotos={lightboxInfo.contextPhotos}
                        onClose={closeLightbox}
                        onNext={nextPhoto}
                        onPrev={prevPhoto}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
