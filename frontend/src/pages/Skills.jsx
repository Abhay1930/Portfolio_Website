import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import '../styles/components.css';

const allSkills = [
    'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js',
    'Node.js', 'Express.js', 'RESTful APIs', 'GraphQL',
    'MongoDB', 'PostgreSQL', 'Redis', 'Mongoose',
    'Git', 'Docker', 'AWS', 'Vercel', 'Render', 'JavaScript', 'TypeScript', 'Python', 'Django'
];

const SkillItem = ({ skill, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 200, damping: 20 };
    const dx = useSpring(x, springConfig);
    const dy = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Larger influence area for better "run away" feel
        const influenceRadius = 250;

        if (distance < influenceRadius) {
            const angle = Math.atan2(distanceY, distanceX);
            // Non-linear force for more "panic" movement when close
            const force = Math.pow((influenceRadius - distance) / influenceRadius, 1.5);
            const moveX = -Math.cos(angle) * force * 150;
            const moveY = -Math.sin(angle) * force * 150;
            x.set(moveX);
            y.set(moveY);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // More dispersed initial positions
    const initialX = (Math.random() - 0.5) * 1200;
    const initialY = (Math.random() - 0.5) * 600;

    return (
        <motion.div
            ref={ref}
            className="skill-capsule"
            style={{
                x: dx,
                y: dy,
                left: `calc(50% + ${initialX}px)`,
                top: `calc(50% + ${initialY}px)`,
                position: 'absolute'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
            whileHover={{ scale: 1.2, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
        >
            {skill}
        </motion.div>
    );
};

const Skills = () => {
    return (
        <div className="page-container" style={{ minHeight: '120vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
            <motion.h1
                className="giant-title"
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                style={{ position: 'absolute', top: '10%' }}
            >
                SKILLS
            </motion.h1>

            <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
                {allSkills.map((skill, index) => (
                    <SkillItem key={skill} skill={skill} index={index} />
                ))}
            </div>

            {/* Subtle light effects for depth */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export default Skills;
