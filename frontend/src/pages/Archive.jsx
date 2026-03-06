import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Archive = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProjects = async () => {
            try {
                const res = await fetch('https://portfolio-backend-p391.onrender.com/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data.map(p => ({
                        name: p.title,
                        desc: p.description,
                        tech: p.tags,
                        image: p.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
                        github: p.githubLink,
                        live: p.liveLink
                    })));
                }
            } catch (err) {
                console.error("Backend fetch failed, using static data");
                // Fallback dummy data if backend fails
                setProjects(Array(15).fill(null).map((_, i) => ({
                    name: `Archive Project 0${i + 1}`,
                    desc: 'Legacy system component refactoring with focus on memory optimization and structural integrity.',
                    tech: ['React', 'NodeJS', 'MongoDB'],
                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
                    github: '#',
                    live: '#'
                })));
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            gsap.fromTo('.archive-item',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out"
                }
            );
        }
    }, [projects]);

    return (
        <main className="bg-[#050505] min-h-screen text-white pt-32 pb-24 relative selection:bg-white selection:text-black">
            <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 mb-16 gap-8">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-mono text-xs uppercase tracking-widest group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Main
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter uppercase leading-none">
                            Project Archive
                        </h1>
                        <p className="text-white/40 font-mono text-sm mt-6 max-w-xl">
                            A COMPLETE LIST OF ALL PAST WORK, OPEN SOURCE CONTRIBUTIONS, AND EXPERIMENTS. TOTAL ENTRIES: {projects.length}
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={`archive-${index}`}
                            className="archive-item opacity-0 group relative bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-colors duration-500 p-6 flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <Github size={20} className="text-white/30 group-hover:text-white transition-colors" />
                                <div className="flex gap-2">
                                    <a href={project.live} className="text-white/30 hover:text-white transition-colors cursor-pointer">
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                                {project.name}
                            </h4>

                            <p className="text-white/50 text-sm flex-1 mb-6 leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                {project.tech.map((t, idx) => (
                                    <span key={t} className="text-[10px] font-mono text-white/40 uppercase">
                                        {t}{idx < project.tech.length - 1 ? ' ,' : ''}
                                    </span>
                                ))}
                            </div>

                            {/* Structural markers */}
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 group-hover:border-white transition-colors duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 group-hover:border-white transition-colors duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Details */}
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-difference opacity-5">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>
        </main>
    );
};

export default Archive;
