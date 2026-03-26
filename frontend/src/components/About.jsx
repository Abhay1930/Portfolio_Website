import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const bioCardRef = useRef(null);
    const bioTextRef = useRef(null);
    const headingRef = useRef(null);
    const narrativeRef = useRef(null);
    const lineRefs = useRef([]);
    const metaRefs = useRef([]);
    const gridRef = useRef(null);
    const floatersRef = useRef([]);

    useEffect(() => {
        // Line border drawing effect
        const lineTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
            }
        });

        lineTl.fromTo(lineRefs.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'expo.inOut' }
        );

        // Main Reveal Timeline
        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
            }
        });

        mainTl.fromTo(bioCardRef.current,
            { clipPath: 'inset(100% 0% 0% 0%)', y: 150, rotateY: -10 },
            { clipPath: 'inset(0% 0% 0% 0%)', y: 0, rotateY: 0, duration: 2, ease: 'expo.out' }
        ).fromTo(headingRef.current.querySelectorAll('.char-reveal'),
            { y: '120%', opacity: 0, rotateX: -90 },
            { y: '0%', opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: 'power4.out' },
            '-=1.5'
        ).fromTo(narrativeRef.current,
            { y: 80, opacity: 0, skewY: 2 },
            { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power3.out' },
            '-=0.8'
        ).fromTo(metaRefs.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
            '-=0.8'
        );

        // --- DEEP SCROLL DYNAMICS ---


        // 3D Card Scroll Tilt
        gsap.to(bioCardRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
            rotateX: 10,
            rotateY: -5,
            ease: 'none'
        });

        // Grid parallax
        gsap.to(gridRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
            },
            y: -150,
            ease: 'none'
        });

        // Floating Technical Markers
        floatersRef.current.forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: i * 0.8 + 1,
                },
                y: -180 * (i + 1),
                opacity: 0.2,
                ease: 'none'
            });
        });

        // Velocity-Based Skew (Simulated via scrub)
        gsap.to(narrativeRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
            },
            skewX: -3,
            ease: 'power1.inOut'
        });
    }, []);

    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char-reveal inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section ref={sectionRef} className="section-container bg-[#0A0A0A] py-40 relative overflow-hidden">
            {/* Background Structural Detail - Animated Grid */}
            <div ref={gridRef} className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-[130%] -top-[15%]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
            </div>

            {/* Floating Technical Markers */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div ref={el => floatersRef.current[0] = el} className="absolute top-[15%] left-[5%] mono-label text-[8px] opacity-0 text-white select-none">DATA_PULSE // 0x2A</div>
                <div ref={el => floatersRef.current[1] = el} className="absolute top-[50%] right-[10%] mono-label text-[8px] opacity-0 text-white select-none">COORD_SYS // [28.44.0.1]</div>
                <div ref={el => floatersRef.current[2] = el} className="absolute bottom-[10%] left-[20%] mono-label text-[8px] opacity-0 text-white select-none">RENDER_STRAT // METAL</div>
                <div ref={el => floatersRef.current[3] = el} className="absolute top-[30%] right-[30%] mono-label text-[8px] opacity-0 text-white select-none">PHYSICS_ENGINE // 60FPS</div>
            </div>

            <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center px-6 relative z-10">

                {/* Left: Bio Card (Col 1-5) */}
                <div ref={bioCardRef} className="lg:col-span-5 relative group perspective-[1000px]">
                    {/* Scan Line Animation */}
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden bg-gradient-to-b from-transparent via-white/[0.08] to-transparent h-24 -translate-y-full animate-[scan_5s_ease-in-out_infinite]"></div>

                    <div className="relative p-12 aspect-square flex items-center justify-center bg-[#0F0F0F] border border-white/5 shadow-2xl transition-all duration-700 hover:border-white/20 overflow-hidden rounded-sm">
                        {/* Profile Image Background */}
                        <img
                            src={profileImg}
                            alt="Abhay Singh"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                        />

                        {/* Corner Accents - Animated */}
                        <div ref={el => lineRefs.current[0] = el} className="absolute top-6 left-6 w-10 h-[2px] bg-white/40 origin-left"></div>
                        <div ref={el => lineRefs.current[1] = el} className="absolute top-6 left-6 h-10 w-[2px] bg-white/40 origin-top"></div>

                        <div ref={el => lineRefs.current[2] = el} className="absolute bottom-6 right-6 w-10 h-[2px] bg-white/40 origin-right"></div>
                        <div ref={el => lineRefs.current[3] = el} className="absolute bottom-6 right-6 h-10 w-[2px] bg-white/40 origin-bottom"></div>
                    </div>
                </div>

                {/* Right: Narrative (Col 6-12) */}
                <div className="lg:col-span-7 flex flex-col gap-12">
                    <div ref={headingRef}>
                        <span className="mono-label text-white/40 mb-4 block underline decoration-white/10 underline-offset-8 overflow-hidden">
                            <span className="inline-block translate-y-full italic">{splitText('ABOUT ME — 02')}</span>
                        </span>
                        <h2 className="text-6xl md:text-8xl font-[800] mt-4 leading-[0.85] tracking-tight text-white flex flex-col items-start">
                            <span className="overflow-hidden block">{splitText('ENGINEERING')}</span>
                            <span className="overflow-hidden block">{splitText('VISUAL')}</span>
                            <span className="overflow-hidden block"><span className="text-white/20 italic">{splitText('LOGIC.')}</span></span>
                        </h2>
                    </div>

                    <div ref={narrativeRef} className="space-y-8">
                        <div className="flex items-start gap-8 border-l border-white/5 pl-8">
                            <p className="text-xl md:text-2xl text-white/80 leading-snug font-medium">
                                I am a <span className="px-2 py-0.5 bg-white text-black font-mono text-xs font-bold leading-none inline-block">FULLSTACK DEVELOPER</span> focused on <br className="hidden lg:block" />
                                <span className="text-white text-3xl md:text-4xl font-bold mt-2 block tracking-tight">high-performance digital architectures.</span>
                            </p>
                        </div>

                        <p className="text-lg md:text-xl text-white/50 leading-relaxed font-normal italic max-w-2xl">
                            Based in India, I specialize in the MERN stack, crafting interfaces that are as mechanical as they are beautiful. My methodology ensures structural code that doesn't just work—it scales.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-8 border-t border-white/5">
                            <a href="https://www.linkedin.com/in/devabhay/" className="btn-welcome border-white/10 hover:bg-white hover:text-black min-w-[160px] text-center">LINKEDIN</a>
                            <a href="https://github.com/Abhay1930" className="btn-welcome border-white/20 hover:bg-white hover:text-black min-w-[160px] text-center">GITHUB REPO</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Metadata Layer for space volume */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-32 opacity-[0.05] pointer-events-none hidden lg:flex">
                <span ref={el => metaRefs.current[0] = el} className="text-[10px] font-mono text-white tracking-[1em]">SYSTEM_STABLE</span>
                <span ref={el => metaRefs.current[1] = el} className="text-[10px] font-mono text-white tracking-[1em]">CODE_ARCHITECTURE</span>
                <span ref={el => metaRefs.current[2] = el} className="text-[10px] font-mono text-white tracking-[1em]">VISUAL_INTEGRITY</span>
            </div>
        </section>
    );
};

export default About;
