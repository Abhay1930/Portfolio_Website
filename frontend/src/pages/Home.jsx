import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Particles from '../components/Particles';
import '../styles/components.css';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        },
        exit: { opacity: 0, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
    };

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            className="page-container dark-section"
            style={{ width: '100vw', padding: 0, left: 0, marginLeft: 0, marginRight: 0 }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Particles />

            <div className="hero-content" style={{ zIndex: 10 }}>
                <motion.div className="developer-tag heavy-mono" variants={itemVariants} style={{ color: 'var(--accent-glow)', textShadow: '0 0 10px rgba(79, 172, 254, 0.4)' }}>
                    {`SYS.ADMIN // FULL_STACK_ENGINEER`}
                </motion.div>

                <motion.h1 className="giant-text" variants={itemVariants}>
                    ABHAY
                </motion.h1>

                <motion.div className="hero-tagline" variants={itemVariants} style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto', fontWeight: 300 }}>
                    Engineering mind-blowing digital experiences & scalable architectures from the void.
                </motion.div>

                <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                    <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="nav-pill glass" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                        VIEW PROJECTS
                    </a>
                    <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="nav-pill" style={{ backgroundColor: 'white', color: 'black', fontWeight: 600 }}>
                        CONTACT ME
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="hero-socials"
                variants={itemVariants}
                style={{ position: 'absolute', bottom: '3rem', left: '3rem', display: 'flex', gap: '1.5rem', zIndex: 10 }}
            >
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.7}>
                    <Github size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.7}>
                    <Linkedin size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0.7}>
                    <Twitter size={24} />
                </a>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ backgroundColor: 'white' }}
            />
        </motion.div>
    );
};

export default Home;
