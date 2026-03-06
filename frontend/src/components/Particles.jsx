import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particles = () => {
    // Generate random particles
    const particles = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            size: Math.random() * 4 + 1, // px
            duration: Math.random() * 20 + 10, // seconds
            delay: Math.random() * 5,
        }));
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0
            }}
        >
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 0 10px rgba(255,255,255,0.1)'
                    }}
                    animate={{
                        y: [0, -100, -200, -300],
                        x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50, Math.random() * 50 - 25],
                        opacity: [0, 0.8, 0.8, 0],
                        scale: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;
