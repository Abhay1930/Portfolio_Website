import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const titleRef = useRef(null);
    const subTextRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.2, ease: 'power2.out' }
        )
            .fromTo(textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
                '-=0.6'
            )
            .fromTo(subTextRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.6'
            );
    }, []);

    return (
        <section ref={containerRef} className="section-container bg-[#0A0A0A] min-h-screen flex items-center justify-center">
            {/* Header Nav */}
            <nav className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50">
                <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform text-white">
                    DEVXABHAY
                </button>

                <div className="flex items-center gap-2">
                    <button className="px-8 py-2 rounded-full border border-white/10 bg-white text-[10px] font-bold tracking-widest uppercase text-black">
                        WELCOME
                    </button>
                </div>
            </nav>

            <div className="flex flex-col items-center z-10">
                <p ref={textRef} className="mono-label text-white/40 mb-16 md:mb-24">
                    {'{_WEB_DEVELOPER}'}
                </p>

                <div className="relative flex items-center mb-16 md:mb-24">
                    <h1 ref={titleRef} className="text-[8vw] md:text-[10vw] font-[900] leading-tight tracking-[-0.04em] text-white text-center uppercase">
                        Abhay Singh<br />Tomar
                    </h1>
                </div>

                <p ref={subTextRef} className="mono-label text-white/40">
                    {'{_FULLSTACK_DEVELOPER}'}
                </p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <span className="mono-label text-[8px] opacity-30 text-white">SCROLL DOWN</span>
                <div className="w-[1px] h-10 bg-white/10 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll-hint_2s_infinite]" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scroll-hint {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
        </section>
    );
};

export default Hero;
