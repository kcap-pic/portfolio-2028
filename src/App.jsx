import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIsland } from './components/DynamicIsland';

import { Home } from './pages/Home';
import { WorkPage } from './pages/WorkPage';
import { PhotographyIndex, PhotographyGallery } from './pages/Photography';
import { Videos } from './pages/Videos';
import { Discover } from './pages/Discover';
import { Awards } from './pages/Awards';
import { CaseStudies } from './pages/CaseStudies';
import { CaseStudySEJC } from './pages/CaseStudySEJC';
import { CaseStudyAI } from './pages/CaseStudyAI';

const Experience = Discover;
const Contact = Discover;
const About = Discover;


const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-transparent">
    <div className="w-8 h-8 rounded-full border-4 border-slate-900 border-t-transparent animate-spin"></div>
  </div>
);

const GlobalSwipeHandler = ({ currentPath }) => {
  const [swipeCue, setSwipeCue] = useState(null); // 'next' or 'prev'

  useEffect(() => {
    // Only activate on mobile screens
    if (window.innerWidth >= 768) return;

    const routes = ['/', '/photography', '/videos', '/discover', '/case-studies'];
    let currentIndex = routes.indexOf(currentPath);

    // Map sub-routes to main sequence
    if (currentPath.startsWith('/photography/')) currentIndex = 1;
    if (currentPath.startsWith('/case-studies/')) currentIndex = 4;
    if (['/about', '/experience', '/contact'].includes(currentPath)) currentIndex = 3;

    if (currentIndex === -1) currentIndex = 0;

    let touchStartY = 0;
    let isPulling = false;
    let lockSwipe = false;

    const handleTouchStart = (e) => {
      touchStartY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      isPulling = false;
      setSwipeCue(null);
    };

    const handleTouchMove = (e) => {
      // Ignore if user is selecting text or scrolling with multiple fingers
      if (lockSwipe) return;
      if (!e.type.includes('touch') && e.buttons !== 1) return;

      const touchCurrentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      const deltaY = touchStartY - touchCurrentY;

      // Check boundaries - use a slight buffer for different mobile behaviors
      const isAtTop = window.scrollY <= 10;
      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 10);

      // Swiping UP (pulling content up) => going NEXT route
      if (deltaY > 60 && isAtBottom && currentIndex < routes.length - 1) {
        setSwipeCue('next');
        isPulling = true;
      }
      // Swiping DOWN (pulling content down) => going PREV route
      else if (deltaY < -60 && isAtTop && currentIndex > 0) {
        setSwipeCue('prev');
        isPulling = true;
      } else {
        setSwipeCue(null);
        isPulling = false;
      }
    };

    const handleTouchEnd = (e) => {
      if (lockSwipe || !isPulling) {
        setSwipeCue(null);
        return;
      }

      const touchCurrentY = e.type.includes('touch') ? e.changedTouches[0].clientY : e.clientY;
      const deltaY = touchStartY - touchCurrentY;

      const isAtTop = window.scrollY <= 10;
      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 10);

      if (deltaY > 75 && isAtBottom && currentIndex < routes.length - 1) {
        lockSwipe = true;
        window.location.hash = routes[currentIndex + 1];
      } else if (deltaY < -75 && isAtTop && currentIndex > 0) {
        lockSwipe = true;
        window.location.hash = routes[currentIndex - 1];
      }

      setSwipeCue(null);
      setTimeout(() => { lockSwipe = false; }, 500);
    };

    // Mobile touch events
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Desktop mouse events (for dev emulation)
    window.addEventListener('mousedown', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousedown', handleTouchStart);
      window.removeEventListener('mousemove', handleTouchMove);
      window.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [currentPath]);

  return (
    <AnimatePresence>
      {swipeCue === 'prev' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-black/40 to-transparent z-[200] flex justify-center items-start pt-3 pointer-events-none drop-shadow-xl"
        >
          <div className="flex flex-col items-center opacity-90">
            <span className="text-[10px] font-heavy tracking-[0.2em] text-white uppercase">Previous</span>
            <svg className="w-5 h-5 text-white animate-bounce mt-1 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
          </div>
        </motion.div>
      )}
      {swipeCue === 'next' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent z-[200] flex justify-center items-end pb-3 pointer-events-none drop-shadow-xl"
        >
          <div className="flex flex-col items-center opacity-90">
            <svg className="w-5 h-5 text-white animate-bounce mb-1 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            <span className="text-[10px] font-heavy tracking-[0.2em] text-white uppercase">Next Page</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="w-full relative min-h-screen flex flex-col">
      <DynamicIsland currentPath={currentPath} />
      <GlobalSwipeHandler currentPath={currentPath} />
      <main className="w-full flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 15, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {currentPath === '/' && <Home />}
            {currentPath === '/work' && <WorkPage />}
            {currentPath === '/photography' && <PhotographyIndex />}
            {currentPath.startsWith('/photography/') && <PhotographyGallery categoryId={currentPath.split('/')[2]} />}
            {currentPath === '/videos' && <Videos />}
            {currentPath === '/discover' && <Discover />}
            {currentPath === '/about' && <About />}
            {currentPath === '/experience' && <Experience />}
            {currentPath === '/contact' && <Contact />}
            {currentPath === '/case-studies' && <CaseStudies />}
            {currentPath === '/case-studies/sejc-2026' && <CaseStudySEJC />}
            {currentPath === '/case-studies/ai-series' && <CaseStudyAI />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
