import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/components.css';
import '../styles/projects.css';

const Projects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/projects');
                const data = await res.json();
                setProjectsData(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="page-container" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
            <div style={{ maxWidth: '1000px', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">SELECTED WORKS.</h2>
                    <p className="section-text" style={{ maxWidth: '800px' }}>
                        A collection of my recent projects, showcasing full-stack capabilities,
                        premium UI/UX design, and complex problem-solving.
                    </p>
                </motion.div>

                {loading ? (
                    <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>Loading projects...</div>
                ) : projectsData.length === 0 ? (
                    <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>No projects available yet. Log in to the Admin Dashboard to add some!</div>
                ) : (
                    <div className="projects-grid">
                        {projectsData.map((project, index) => (
                            <motion.div
                                key={project._id}
                                className="project-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <img src={project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80'} alt={project.title} className="project-image" />
                                <div className="project-overlay">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1rem', transform: 'translateY(20px)', transition: 'transform 0.2s', className: 'hover-show' }}>
                                        {project.description}
                                    </p>
                                    <div className="project-tags">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="project-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
