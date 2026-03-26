import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components.css';
import profilePic from '../assets/profile.jpg';

const About = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ padding: '6rem 2rem', background: '#000' }}
        >
            <motion.h1
                className="giant-title"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                ABOUT ME
            </motion.h1>

            <div style={{
                maxWidth: '1200px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'center',
                marginTop: '4rem'
            }}>

                {/* ── Profile Image Column ── */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ position: 'relative' }}
                >
                    {/* REF label above */}
                    <div style={{
                        position: 'absolute',
                        top: '-28px',
                        left: '0',
                        fontFamily: 'monospace',
                        fontSize: '0.68rem',
                        letterSpacing: '0.18em',
                        color: '#00ff88',
                        opacity: 0.75,
                        zIndex: 3
                    }}>
                        REF_02.SYS
                    </div>

                    {/* Corner brackets */}
                    {[
                        { top: '-10px', left: '-10px', borderTop: '2px solid #00ff88', borderLeft: '2px solid #00ff88' },
                        { top: '-10px', right: '-10px', borderTop: '2px solid #00ff88', borderRight: '2px solid #00ff88' },
                        { bottom: '-10px', left: '-10px', borderBottom: '2px solid #00ff88', borderLeft: '2px solid #00ff88' },
                        { bottom: '-10px', right: '-10px', borderBottom: '2px solid #00ff88', borderRight: '2px solid #00ff88' },
                    ].map((s, i) => (
                        <span key={i} style={{
                            position: 'absolute',
                            width: '24px',
                            height: '24px',
                            zIndex: 3,
                            ...s
                        }} />
                    ))}

                    {/* Scan-line overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.018) 2px, rgba(0,255,136,0.018) 4px)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }} />

                    {/* Glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        boxShadow: '0 0 60px rgba(0,255,136,0.1), inset 0 0 40px rgba(0,0,0,0.5)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }} />

                    {/* Photo */}
                    <img
                        src={profilePic}
                        alt="Abhay Singh"
                        style={{
                            width: '100%',
                            height: '460px',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            borderRadius: '16px',
                            display: 'block',
                            border: '1px solid rgba(0,255,136,0.18)',
                        }}
                    />

                    {/* Identity bar */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)',
                        borderRadius: '0 0 16px 16px',
                        padding: '2.5rem 1.2rem 1.1rem',
                        zIndex: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: '0.6rem',
                                color: '#00ff88',
                                letterSpacing: '0.2em',
                                marginBottom: '5px',
                                opacity: 0.85
                            }}>
                                IDENTITY_CONFIRMED
                            </div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                color: '#fff',
                                letterSpacing: '0.14em'
                            }}>
                                ABHAY SINGH
                            </div>
                        </div>
                        <div style={{
                            fontFamily: 'monospace',
                            fontSize: '0.58rem',
                            color: 'rgba(255,255,255,0.4)',
                            textAlign: 'right',
                            lineHeight: 1.8
                        }}>
                            <div>STATUS: ACTIVE</div>
                            <div style={{ color: '#00ff88' }}>● ONLINE</div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Text Column ── */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{ textAlign: 'left' }}
                >
                    <div className="about-tag" style={{ marginBottom: '1rem' }}>
                        &lt; DEV /&gt;
                    </div>

                    <p className="section-text" style={{ fontSize: '1.6rem', color: 'white', fontWeight: 300 }}>
                        I'm <span
                            className="about-interactive-name"
                            onClick={() => setShowMore(!showMore)}
                            style={{ fontWeight: 700 }}
                        >
                            Abhay Singh Tomar
                        </span>.{' '}
                        A creator of digital experiences that live on the intersection of{' '}
                        <span className="about-pill">DESIGN</span> and{' '}
                        <span className="about-pill">LOGIC</span>.
                    </p>

                    <AnimatePresence>
                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ marginTop: '2rem' }}
                            >
                                <p className="section-text" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                                    I specialize in building high-performance, accessible, and delightful web applications.
                                    With 3 years of hands-on experience in fullstack development, I focus on creating
                                    products that don't just work, but feel <span className="about-pill">PREMIUM</span>.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                        <a href="https://github.com/Abhay1930" className="nav-pill">GITHUB</a>
                        <a href="https://www.linkedin.com/in/devabhay/" className="nav-pill">LINKEDIN</a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
