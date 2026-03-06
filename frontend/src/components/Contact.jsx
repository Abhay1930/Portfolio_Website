import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [localTime, setLocalTime] = useState('');
    const [systemStatus, setSystemStatus] = useState({
        latency: '24MS',
        protocol: 'WS/TLS 1.3',
        encryption: 'AES-256'
    });

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setLocalTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);

        const statusInterval = setInterval(() => {
            setSystemStatus(prev => ({
                ...prev,
                latency: `${Math.floor(Math.random() * (30 - 18) + 18)}MS`
            }));
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(statusInterval);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            }
        });

        tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' })
            .fromTo(formRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING...');
        try {
            const response = await fetch('https://portfolio-backend-p391.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setStatus('SENT SUCCESSFULLY');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('ERROR SENDING');
            }
        } catch (err) {
            setStatus('SERVER ERROR');
        }
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section ref={sectionRef} className="section-container bg-[#0A0A0A] py-32 border-t border-white/5 relative overflow-hidden">
            {/* Subtle Technical Grid Overlay (Simulated) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Minimalist Signal Path */}
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none opacity-10">
                <svg className="w-full h-full" viewBox="0 0 1400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50C350 50 350 10 700 10C1050 10 1050 50 1400 50" stroke="white" strokeWidth="0.5" strokeDasharray="1 10">
                        <animate attributeName="stroke-dashoffset" from="0" to="11" dur="2s" repeatCount="indefinite" />
                    </path>
                </svg>
            </div>
            <div className="max-w-[1400px] w-full px-6 flex flex-col items-center">
                <div className="mb-32 text-center relative w-full">
                    <span className="mono-label italic opacity-30 mb-8 block text-white">REACH OUT — 05</span>
                    <h2 ref={titleRef} className="text-8xl md:text-[18rem] font-[900] tracking-tighter leading-[0.7] text-white italic">
                        TALK <br /> <span className="not-italic text-white/10">TO ME.</span>
                    </h2>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    <div className="flex flex-col gap-12">
                        <div className="space-y-6 relative">
                            <div className="flex items-center gap-4">
                                <span className="mono-label text-white/40">CONTACT DETAILS</span>
                                <div className="h-[1px] flex-1 bg-white/5"></div>
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                            </div>
                            <div className="group relative">
                                <div className="absolute -inset-4 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10"></div>
                                <a
                                    href="mailto:thakurabhay975@gmail.com"
                                    className="text-2xl md:text-4xl lg:text-5xl font-[800] tracking-tight hover:italic transition-all duration-300 text-white block font-heading"
                                >
                                    thakurabhay975@gmail.com
                                </a>
                                <div className="mt-2 flex gap-2">
                                    <div className="h-1 w-12 bg-white/10 group-hover:w-24 transition-all duration-500"></div>
                                    <div className="h-1 w-1 bg-white/20"></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5 relative">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10"></div>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-4 bg-white/20"></div>
                                    <span className="mono-label text-white/40">SOCIALS</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/devabhay' },
                                        { name: 'GITHUB', url: 'https://github.com/Abhay1930' }
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group/link"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-white/0 group-hover/link:bg-white transition-all"></span>
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-4 bg-white/20"></div>
                                    <span className="mono-label text-white/40">LOCATION</span>
                                </div>
                                <div className="relative">
                                    <span className="text-sm font-bold text-white leading-relaxed tracking-wider">
                                        MATHURA, UTTAR PRADESH<br />
                                        <span className="text-white/40">INDIA [27.4924° N]</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="bg-[#0F0F0F] border border-white/10 p-12 shadow-2xl space-y-12 relative overflow-hidden text-white md:translate-x-20 md:-translate-y-64">
                        {/* Structural Frame */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 skew-x-12 translate-x-12 -translate-y-12"></div>

                        <div className="space-y-2">
                            <label className="mono-label text-white/40">01. FULL NAME</label>
                            <input
                                type="text"
                                placeholder="Abhay Singh Tomar"
                                className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-2xl focus:border-white outline-none transition-all placeholder:text-white/20"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="mono-label text-white/40">02. EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="thakurabhay975@gmail.com"
                                className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-2xl focus:border-white outline-none transition-all placeholder:text-white/20"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="mono-label text-white/40">03. YOUR MESSAGE</label>
                            <textarea
                                placeholder="Let's build something structural..."
                                rows="3"
                                className="w-full bg-transparent border-b-2 border-white/10 py-4 font-heading text-2xl focus:border-white outline-none transition-all resize-none placeholder:text-white/20"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>

                        <button className="w-full py-6 bg-white text-black font-[800] tracking-widest hover:bg-black hover:text-white border-2 border-white transition-all duration-500 text-sm uppercase group">
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-black group-hover:bg-white animate-pulse"></div>
                                {status || 'SEND MECHANICAL MESSAGE'}
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Ultra-Compact Minimalist Footer */}
            <footer className="mt-20 w-full py-8 border-t border-white/10 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Compact Status Strip */}
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-2 opacity-40">
                        <div className="flex items-center gap-2">
                            <span className="mono-label text-[8px] tracking-[0.3em] opacity-30">LATENCY /</span>
                            <span className="mono-label text-[8px] tracking-[0.3em] tabular-nums font-bold">{systemStatus.latency}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="mono-label text-[8px] tracking-[0.3em] opacity-30">SYNC /</span>
                            <span className="mono-label text-[8px] tracking-[0.3em] tabular-nums font-bold">{localTime || '--:--:--'}</span>
                        </div>
                    </div>

                    {/* Compact Navigation & Legal */}
                    <div className="flex items-center gap-10">
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-3 py-1 text-white/30 hover:text-white transition-all duration-500"
                        >
                            <span className="mono-label text-[8px] font-bold tracking-[0.4em]">INIT_REENTRY</span>
                            <div className="overflow-hidden h-3 w-3">
                                <svg viewBox="0 0 12 12" fill="none" className="w-full h-full group-hover:-translate-y-full transition-transform duration-500">
                                    <path d="M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg viewBox="0 0 12 12" fill="none" className="w-full h-full group-hover:-translate-y-full transition-transform duration-500">
                                    <path d="M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>
                        <div className="h-3 w-[1px] bg-white/10"></div>
                        <span className="mono-label opacity-40 text-[8px] tracking-[0.5em] uppercase">
                            @ALL RIGHT RESERVED TO <a href="https://www.instagram.com/codeafe/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">CODEAFE</a>
                        </span>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
