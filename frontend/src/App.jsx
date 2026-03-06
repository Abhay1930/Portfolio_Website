import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

import Hero from './components/Hero';
import Explore from './components/Explore';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import IntroScreen from './components/IntroScreen';
import Admin from './pages/Admin';
import Archive from './pages/Archive';

gsap.registerPlugin(ScrollTrigger);

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

const Portfolio = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Hide intro after animations
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500); // 1.2s name + subtext delay + duration

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen key="intro" />}
      </AnimatePresence>
      <CustomCursor />
      {!showIntro && (
        <main>
          <Hero />
          <Explore />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
