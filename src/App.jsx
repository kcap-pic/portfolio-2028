import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicIsland } from './components/DynamicIsland';

const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const WorkPage = React.lazy(() => import('./pages/WorkPage').then(module => ({ default: module.WorkPage })));
const PhotographyIndex = React.lazy(() => import('./pages/Photography').then(module => ({ default: module.PhotographyIndex })));
const PhotographyGallery = React.lazy(() => import('./pages/Photography').then(module => ({ default: module.PhotographyGallery })));
const Videos = React.lazy(() => import('./pages/Videos').then(module => ({ default: module.Videos })));
const Projects = React.lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })));
const Experience = React.lazy(() => import('./pages/Experience').then(module => ({ default: module.Experience })));
const Awards = React.lazy(() => import('./pages/Awards').then(module => ({ default: module.Awards })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));


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
              <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <Home />
              </motion.div>
            )}
            {currentPath === '/work' && (
              <motion.div key="work" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <WorkPage />
              </motion.div>
            )}
            {currentPath === '/photography' && (
              <motion.div key="photography_index" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <PhotographyIndex />
              </motion.div>
            )}
            {currentPath.startsWith('/photography/') && (
              <motion.div key={`gallery-${currentPath}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
                <PhotographyGallery categoryId={currentPath.split('/')[2]} />
              </motion.div>
            )}
            {currentPath === '/videos' && (
              <motion.div key="videos" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.4 }}>
                <Videos />
              </motion.div>
            )}
            {currentPath === '/projects' && (
              <motion.div key="projects" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.4 }}>
                <Projects />
              </motion.div>
            )}
            {currentPath === '/experience' && (
              <motion.div key="experience" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.4 }}>
                <Experience />
              </motion.div>
            )}
            {currentPath === '/awards' && (
              <motion.div key="awards" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.4 }}>
                <Awards />
              </motion.div>
            )}
            {currentPath === '/contact' && (
              <motion.div key="contact" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.4 }}>
                <Contact />
              </motion.div>
            )}
            {currentPath === '/about' && (
              <motion.div key="about" initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.4 }}>
                <div className="pt-32 px-6 text-center"><h1 className="text-6xl font-ultra-thin">Coming <strong className="font-heavy">Soon</strong></h1></div>
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
