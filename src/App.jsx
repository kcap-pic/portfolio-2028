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
