import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const STATIC_PROJECTS = [
    {
        name: 'AI Dashboard',
        desc: 'Structural AI-powered dashboard for data visualization with predictive analytics and real-time monitoring capabilities.',
        tech: ['React', 'NodeJS', 'OpenAI', 'D3.js'],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        github: '#',
        live: '#'
    },
    {
        name: 'E-Comm System',
        desc: 'Scalable MERN stack architecture with mechanical integrity. Designed for high-throughput transaction processing.',
        tech: ['MongoDB', 'Express', 'React', 'Redis'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
        github: '#',
        live: '#'
    },
    {
        name: 'SaaS Platform',
        desc: 'Modern platform logic with structural animation systems and seamless user onboarding flows.',
        tech: ['GSAP', 'Vite', 'Tailwind', 'Framer'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        github: '#',
        live: '#'
    },
    {
        name: 'Neural Network UI',
        desc: 'Interactive interface for visualizing neural network training processes in real-time.',
        tech: ['Three.js', 'React', 'Python', 'WebGL'],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        github: '#',
        live: '#'
    },
    // Adding dummy data to simulate a large project list for the archive
    ...Array(8).fill(null).map((_, i) => ({
        name: `Archive Project 0${i + 1}`,
        desc: 'Legacy system component refactoring with focus on memory optimization and structural integrity.',
        tech: ['TypeScript', 'Express', 'Docker'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        github: '#',
        live: '#'
    }))
];

const Projects = () => {
    const [projects, setProjects] = useState(STATIC_PROJECTS);
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const archiveRef = useRef(null);

    // Split projects into featured (max 3) and detect if there are more
    const featuredProjects = projects.slice(0, 3);
    const hasMoreProjects = projects.length > 3;
    const remainingCount = projects.length - 3;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setProjects(data.map(p => ({
                            name: p.title,
                            desc: p.description,
                            tech: p.tags,
                            image: p.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
                            github: p.githubLink,
                            live: p.liveLink
                        })));
                    }
                }
            } catch (err) {
                console.error("Backend fetch failed, using static data");
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (!containerRef.current || !sliderRef.current || featuredProjects.length === 0) return;

        let ctx = gsap.context(() => {
            // Horizontal scroll logic for FEAURED projects + View All Card
            let panels = gsap.utils.toArray('.slide-item');
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                let scrollTween = gsap.to(panels, {
                    xPercent: -100 * (panels.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        pin: true,
                        scrub: 1,
                        // Make scrolling faster by using width / 1.5
                        end: () => "+=" + (sliderRef.current.offsetWidth / 1.5)
                    }
                });

                // Image parallax effect inside cards
                gsap.utils.toArray('.project-img').forEach((img, i) => {
                    gsap.to(img, {
                        xPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            scrub: true,
                            start: "top center",
                            end: () => "+=" + (sliderRef.current.offsetWidth / 1.5)
                        }
                    });
                });
            });

            // Mobile standard vertical fade in for featured
            mm.add("(max-width: 767px)", () => {
                panels.forEach((panel) => {
                    gsap.from(panel, {
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: panel,
                            start: "top 85%",
                        }
                    });
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [projects]);

    return (
        <React.Fragment>
            {/* FEATURED PROJECTS SECTION */}
            <section ref={containerRef} className="bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden h-auto md:h-screen flex flex-col justify-center">
                <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20 w-full pr-12 pointer-events-none">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 max-w-[1400px]">
                        <div>
                            <span className="mono-label text-white/40 mb-2 block font-mono text-sm tracking-widest">SELECTED WORKS — 03</span>
                            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-[900] tracking-tighter leading-none text-white overflow-hidden mix-blend-difference">
                                PROJECTS
                            </h2>
                        </div>
                        <div className="text-left md:text-right mix-blend-difference hidden md:block">
                            <span className="mono-label opacity-40 text-white font-mono text-sm">DRAG OR SCROLL TO EXPLORE FEATURED</span>
                        </div>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="flex flex-col md:flex-row h-full pt-48 md:pt-0"
                    style={{ width: `${(featuredProjects.length + (hasMoreProjects ? 1 : 0)) * 100}vw` }}
                >
                    {featuredProjects.map((project, index) => (
                        <div
                            key={`featured-${index}`}
                            className="slide-item project-card flex-shrink-0 w-full md:w-screen h-auto md:h-full flex items-center justify-center p-6 md:p-12 mb-24 md:mb-0 relative"
                        >
                            <div className="w-full max-w-6xl h-[60vh] md:h-[70vh] flex flex-col justify-center relative group mt-20 md:mt-0">
                                <div className="relative w-full h-full overflow-hidden bg-[#0F0F0F] border border-white/10 [transform-style:preserve-3d] transition-all duration-700 hover:border-white/30">

                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="project-img w-[115%] h-full object-cover origin-left opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                            style={{ transform: "translateX(-15%)" }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10" />

                                    <div className="absolute inset-0 z-20 p-6 md:p-12 flex flex-col justify-end">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

                                            <div className="flex-1 max-w-2xl bg-black/40 backdrop-blur-md p-8 border border-white/10">
                                                <h3 className="text-4xl md:text-5xl font-[800] tracking-tighter text-white uppercase leading-none mb-4">
                                                    {project.name}
                                                </h3>
                                                <p className="text-white/70 text-sm md:text-base leading-relaxed font-medium mb-6">
                                                    {project.desc}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map(t => (
                                                        <span key={t} className="text-[10px] font-bold font-mono text-white/50 border border-white/10 px-2 py-1 bg-black/40">
                                                            {t.toUpperCase()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 mt-4 md:mt-0">
                                                <a href={project.github} className="group/btn relative w-12 h-12 md:w-16 md:h-16 bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
                                                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                                                    <Github size={24} className="relative z-10" />
                                                </a>
                                                <a href={project.live} className="group/btn relative w-12 h-12 md:w-16 md:h-16 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white border border-transparent hover:border-white transition-all duration-500 overflow-hidden">
                                                    <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                                                    <ExternalLink size={24} className="relative z-10" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-6 left-6 mix-blend-difference text-[10px] font-mono text-white opacity-60 z-30 flex items-center gap-4">
                                        <span>[ {(index + 1).toString().padStart(2, '0')} ]</span>
                                        <div className="w-8 h-[1px] bg-white"></div>
                                        <span>P_REF_FEATURED</span>
                                    </div>

                                    <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
                                        <span className="text-[10px] border border-white/20 text-white px-2 py-1 font-mono uppercase bg-black/40 backdrop-blur-md">
                                            {project.tech[0]}
                                        </span>
                                        <span className="text-[10px] text-white/40 font-mono uppercase">
                                            STATUS: ONLINE
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    {hasMoreProjects && (
                        <div className="slide-item project-card flex-shrink-0 w-full md:w-screen h-auto md:h-full flex items-center justify-center p-6 md:p-12 mb-24 md:mb-0 relative">
                            <div className="w-full max-w-6xl h-[60vh] md:h-[70vh] flex flex-col items-center justify-center relative group mt-20 md:mt-0 bg-[#0F0F0F] border border-white/10 hover:border-white/30 transition-all duration-700">
                                <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
                                    <div className="w-64 h-64 border border-white rounded-full animate-[spin_10s_linear_infinite]"></div>
                                    <div className="absolute w-48 h-48 border border-white rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center p-8">
                                    <h3 className="text-4xl md:text-6xl font-[800] tracking-tighter text-white uppercase mb-4">
                                        End of Featured
                                    </h3>
                                    <p className="text-white/50 text-base md:text-xl font-medium mb-8 max-w-md">
                                        There are <span className="text-white bg-white/10 px-2 py-1 mx-1 font-mono">{remainingCount}</span> more projects available in the dataset.
                                    </p>

                                    <Link to="/archive" className="group/btn relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden hover:text-white transition-colors duration-500 inline-block pointer-events-auto">
                                        <div className="absolute inset-0 bg-black translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                                        <span className="relative z-10 flex items-center gap-3">
                                            VIEW ALL ARCHIVE <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                        </span>
                                    </Link>
                                </div>

                                <div className="absolute top-6 left-6 mix-blend-difference text-[10px] font-mono text-white opacity-60 z-30 flex items-center gap-4">
                                    <span>[ END ]</span>
                                    <div className="w-8 h-[1px] bg-white"></div>
                                    <span>SYS_QUERY</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </React.Fragment>
    );
};

export default Projects;
