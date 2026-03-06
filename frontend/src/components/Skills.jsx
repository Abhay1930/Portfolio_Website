import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const skills = [
    'HTML', 'CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'Express', 'MongoDB',
    'Git', 'GitHub', 'SQL', 'PostgreSQL', 'Redux', 'AWS', 'Docker', 'Vite', 'Tailwind', 'GSAP', 'Framer Motion'
];

const Skills = () => {
    const containerRef = useRef(null);
    const badgesRef = useRef([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        badgesRef.current.filter(Boolean).forEach((badge, index) => {
            const badgeRect = badge.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const badgeX = badgeRect.left - containerRect.left + badgeRect.width / 2;
            const badgeY = badgeRect.top - containerRect.top + badgeRect.height / 2;

            const dx = badgeX - mousePos.x;
            const dy = badgeY - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const repelRadius = 150;
            const repelStrength = 40;

            if (distance < repelRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (repelRadius - distance) / repelRadius;
                const tx = Math.cos(angle) * force * repelStrength;
                const ty = Math.sin(angle) * force * repelStrength;

                gsap.to(badge, {
                    x: tx,
                    y: ty,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(badge, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    }, [mousePos]);

    return (
        <section ref={containerRef} className="section-container bg-[#0A0A0A] min-h-screen relative py-40 overflow-hidden flex flex-col items-center justify-center border-b border-white/5">
            {/* Background Structural Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(#FFFFFF10 1px, transparent 1px), linear-gradient(90base #FFFFFF10 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
            </div>

            <div className="z-10 text-center relative pointer-events-none">
                <span className="mono-label italic opacity-30 mb-8 block text-white tracking-[0.5em]">CAPABILITIES — 04</span>
                <h2 className="text-[15vw] md:text-[20vw] font-[900] tracking-tighter leading-none text-white opacity-[0.02] select-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap">
                    ENGINEERING
                </h2>
                <h2 className="text-7xl md:text-[10rem] font-[800] tracking-tight leading-none text-white relative">
                    TECH <br /> <span className="text-white/20 italic">STACK.</span>
                </h2>
            </div>

            <div className="max-w-[1200px] w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 mt-24 px-6 relative z-20">
                {skills.map((skill, index) => (
                    <div
                        key={skill}
                        ref={el => badgesRef.current[index] = el}
                        className="relative group p-6 bg-[#0F0F0F] border border-white/10 hover:border-white/40 transition-all duration-300 flex flex-col gap-4 shadow-2xl overflow-hidden"
                    >
                        {/* Technical Spec Mark */}
                        <div className="flex justify-between items-start">
                            <span className="text-[8px] font-mono text-white/20">REF_{index.toString().padStart(2, '0')}</span>
                            <div className="w-1.5 h-1.5 bg-white/10 group-hover:bg-white transition-colors" />
                        </div>

                        <h3 className="mono-label text-xs md:text-sm text-white/80 group-hover:text-white transition-colors">
                            {skill}
                        </h3>

                        {/* Animated Gradient Border */}
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700" />
                    </div>
                ))}
            </div>

            {/* Bottom Marquee Style Labels */}
            <div className="absolute bottom-10 left-0 w-full flex justify-between px-10 pointer-events-none opacity-20">
                <span className="mono-label text-[10px] text-white tracking-widest">ARCHITECTURE — MERN</span>
                <span className="mono-label text-[10px] text-white tracking-widest">LOGIC — SCALABLE</span>
                <span className="mono-label text-[10px] text-white tracking-widest">DEPLOYMENT — STABLE</span>
            </div>
        </section>
    );
};

export default Skills;
