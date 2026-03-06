import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components.css';

const experienceData = [
    {
        id: 1,
        role: 'Tiny ML Intern',
        company: 'IIT Patna',
        period: 'Recent',
        description: 'Completed an intensive internship focused on Tiny Machine Learning constraints and model optimization for edge devices, gaining hands-on experience in deploying AI on microcontrollers.'
    },
    {
        id: 2,
        role: 'B.Tech Computer Science (4th Year)',
        company: 'GLA University, Mathura',
        period: 'Present',
        description: 'Currently in the final year of my Bachelor of Technology in Computer Science. Specialized in software engineering, advanced data structures, and full-stack web technologies.'
    }
];

const Experience = () => {
    return (
        <div className="page-container" style={{ minHeight: '100vh', padding: '6rem 2rem', backgroundColor: 'var(--bg-primary)' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">EXPERIENCE & EDUCATION.</h2>
                    <p className="section-text" style={{ marginBottom: '4rem' }}>
                        My professional journey and academic timeline.
                    </p>
                </motion.div>

                <div style={{ position: 'relative', borderLeft: '2px solid var(--accent)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {experienceData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            style={{ position: 'relative' }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div style={{
                                position: 'absolute',
                                left: '-2.4rem',
                                top: '0',
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--bg-primary)',
                                border: '4px solid var(--text-primary)'
                            }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{item.role}</h3>
                                <span className="heavy-mono" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.period}</span>
                            </div>

                            <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-glow)', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                                {item.company}
                            </h4>

                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
