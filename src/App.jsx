import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIsland } from './components/DynamicIsland';

const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const WorkPage = React.lazy(() => import('./pages/WorkPage').then(module => ({ default: module.WorkPage })));
const PhotographyIndex = React.lazy(() => import('./pages/Photography').then(module => ({ default: module.PhotographyIndex })));
const PhotographyGallery = React.lazy(() => import('./pages/Photography').then(module => ({ default: module.PhotographyGallery })));
const Videos = React.lazy(() => import('./pages/Videos').then(module => ({ default: module.Videos })));
const Experience = React.lazy(() => import('./pages/Discover').then(module => ({ default: module.Discover })));
const Awards = React.lazy(() => import('./pages/Awards').then(module => ({ default: module.Awards })));
const Contact = React.lazy(() => import('./pages/Discover').then(module => ({ default: module.Discover })));
const About = React.lazy(() => import('./pages/Discover').then(module => ({ default: module.Discover })));
const Discover = React.lazy(() => import('./pages/Discover').then(module => ({ default: module.Discover })));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies').then(module => ({ default: module.CaseStudies })));
const CaseStudySEJC = React.lazy(() => import('./pages/CaseStudySEJC').then(module => ({ default: module.CaseStudySEJC })));
const CaseStudyAI = React.lazy(() => import('./pages/CaseStudyAI').then(module => ({ default: module.CaseStudyAI })));


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
      touchStartY = e.clientY;
      isPulling = false;
      setSwipeCue(null);
    };

    const handleTouchMove = (e) => {
      // Ignore if user is selecting text or scrolling with multiple fingers
      if (lockSwipe || e.buttons !== 1 && e.pointerType === 'mouse') return;
      
      const touchCurrentY = e.clientY;
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
      
      const touchCurrentY = e.clientY;
      const deltaY = touchStartY - touchCurrentY;

      const isAtTop = window.scrollY <= 10;
      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 10);

      if (deltaY > 100 && isAtBottom && currentIndex < routes.length - 1) {
          lockSwipe = true;
          window.location.hash = routes[currentIndex + 1];
      } else if (deltaY < -100 && isAtTop && currentIndex > 0) {
          lockSwipe = true;
          window.location.hash = routes[currentIndex - 1];
      }
      
      setSwipeCue(null);
      setTimeout(() => { lockSwipe = false; }, 800);
    };

    window.addEventListener('pointerdown', handleTouchStart, { passive: true });
    window.addEventListener('pointermove', handleTouchMove, { passive: true });
    window.addEventListener('pointerup', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleTouchStart);
      window.removeEventListener('pointermove', handleTouchMove);
      window.removeEventListener('pointerup', handleTouchEnd);
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
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            {currentPath === '/' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Home />
              </motion.div>
            )}
            {currentPath === '/work' && (
              <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <WorkPage />
              </motion.div>
            )}
            {currentPath === '/photography' && (
              <motion.div key="photography_index" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <PhotographyIndex />
              </motion.div>
            )}
            {currentPath.startsWith('/photography/') && (
              <motion.div key={`gallery-${currentPath}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
                <PhotographyGallery categoryId={currentPath.split('/')[2]} />
              </motion.div>
            )}
            {currentPath === '/videos' && (
              <motion.div key="videos" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
                <Videos />
              </motion.div>
            )}

            {currentPath === '/discover' && (
              <motion.div key="discover" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
                <Discover />
              </motion.div>
            )}
            {currentPath === '/about' && (
              <motion.div key="about" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
                <About />
              </motion.div>
            )}
            {currentPath === '/experience' && (
              <motion.div key="experience" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
                <Experience />
              </motion.div>
            )}
            {currentPath === '/contact' && (
              <motion.div key="contact" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
                <Contact />
              </motion.div>
            )}
            {currentPath === '/case-studies' && (
              <motion.div key="case-studies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <CaseStudies />
              </motion.div>
            )}
            {currentPath === '/case-studies/sejc-2026' && (
              <motion.div key="sejc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <CaseStudySEJC />
              </motion.div>
            )}
            {currentPath === '/case-studies/ai-series' && (
              <motion.div key="ai-series" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <CaseStudyAI />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
