import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const blockRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1,
            }
        });

        tl.fromTo(titleRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 0.05 })
            .fromTo(textRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
            .fromTo(blockRef.current, { scale: 0, rotate: -45 }, { scale: 1, rotate: 0, duration: 1 }, "-=0.8");
    }, []);

    return (
        <section ref={sectionRef} className="section-container bg-[#0A0A0A] py-32 overflow-hidden">
            <div className="max-w-[1400px] w-full px-6 relative">
                <h2 ref={titleRef} className="absolute -top-20 -left-10 text-[20vw] font-[900] tracking-tighter opacity-0 leading-none pointer-events-none select-none text-white">
                    EXPLORE
                </h2>

                <div className="flex flex-col md:flex-row items-end justify-between gap-12 z-10 relative">
                    <div ref={textRef} className="flex flex-col gap-6 max-w-2xl">
                        <span className="mono-label text-white/40">01 — DIRECTION</span>
                        <h3 className="text-5xl md:text-8xl font-[800] tracking-tight leading-[0.9] text-white italic">
                            CRAFTING <br />
                            <span className="text-white/20 not-italic">DIGITAL</span> MECHANICALS
                        </h3>
                        <p className="text-xl md:text-2xl font-medium text-white/60 leading-tight mt-4">
                            Bridging the gap between structural code and high-end visual aesthetics.
                        </p>
                    </div>

                    <div ref={blockRef} className="relative group">
                        <div className="w-48 h-48 md:w-72 md:h-72 bg-white flex items-center justify-center relative overflow-hidden transition-transform duration-700 group-hover:scale-105">
                            <div className="absolute inset-0 bg-[#0A0A0A] m-[20%] transition-transform duration-700 group-hover:rotate-90"></div>
                            <span className="text-white z-10 text-4xl font-mono p-4 bg-[#0A0A0A]">{'</>'}</span>
                        </div>
                        {/* Decorative Geometry */}
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-2 border-white"></div>
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/10"></div>
                    </div>
                </div>

                <div className="mt-32 flex flex-wrap gap-x-20 gap-y-10">
                    <div className="flex flex-col gap-2">
                        <span className="mono-label text-white/30">TYPE</span>
                        <span className="text-2xl font-bold text-white">FULLSTACK</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="mono-label text-white/30">EXPERIENCE</span>
                        <span className="text-2xl font-bold text-white">1+ YEARS</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="mono-label text-white/30">FOCUS</span>
                        <span className="text-2xl font-bold text-white">PREMIUM WEB</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Explore;
