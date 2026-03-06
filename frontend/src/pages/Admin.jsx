import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);

    const [newProject, setNewProject] = useState({
        title: '', description: '', tags: '', image: '', githubLink: '', liveLink: ''
    });

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            fetchData();
        }
    }, [token]);

    const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        try {
            const [projRes, msgRes] = await Promise.all([
                fetch('https://portfolio-backend-p391.onrender.com/api/projects'),
                fetch('https://portfolio-backend-p391.onrender.com/api/messages', { headers })
            ]);
            if (projRes.ok) setProjects(await projRes.json());
            if (msgRes.ok) setMessages(await msgRes.json());
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://portfolio-backend-p391.onrender.com/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.token) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Login failed');
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        const projectData = {
            ...newProject,
            tags: newProject.tags.split(',').map(t => t.trim())
        };
        try {
            const res = await fetch('https://portfolio-backend-p391.onrender.com/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(projectData)
            });
            if (res.ok) {
                alert('Project added');
                setNewProject({ title: '', description: '', tags: '', image: '', githubLink: '', liveLink: '' });
                fetchData();
            }
        } catch (err) {
            alert('Failed to add project');
        }
    };

    const handleDeleteMessage = async (id) => {
        try {
            await fetch(`https://portfolio-backend-p391.onrender.com/api/messages/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            alert('Delete failed');
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            const res = await fetch(`https://portfolio-backend-p391.onrender.com/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('Project deleted');
                fetchData();
            }
        } catch (err) {
            alert('Delete failed');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-2xl w-full max-w-md border border-white/5">
                    <h2 className="text-3xl font-heading mb-8 text-white">ADMIN LOGIN</h2>
                    <input
                        type="text" placeholder="USERNAME"
                        className="w-full bg-black border border-white/10 p-4 mb-4 text-white"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password" placeholder="PASSWORD"
                        className="w-full bg-black border border-white/10 p-4 mb-8 text-white"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-accent text-white p-4 font-bold">LOGIN</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-body">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-5xl font-heading">DASHBOARD</h1>
                    <button onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); }} className="text-accent underline text-sm">LOGOUT</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Project Form */}
                    <section className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-heading mb-6 tracking-widest text-accent">ADD NEW PROJECT</h2>
                        <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                            <input type="text" placeholder="TITLE" className="bg-black p-3 border border-white/10 text-white" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                            <textarea placeholder="DESCRIPTION" className="bg-black p-3 border border-white/10 text-white" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required />
                            <input type="text" placeholder="TAGS (comma separated)" className="bg-black p-3 border border-white/10 text-white" value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })} />
                            <input type="text" placeholder="IMAGE URL" className="bg-black p-3 border border-white/10 text-white" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} />
                            <input type="text" placeholder="GITHUB LINK" className="bg-black p-3 border border-white/10 text-white" value={newProject.githubLink} onChange={e => setNewProject({ ...newProject, githubLink: e.target.value })} />
                            <input type="text" placeholder="LIVE LINK" className="bg-black p-3 border border-white/10 text-white" value={newProject.liveLink} onChange={e => setNewProject({ ...newProject, liveLink: e.target.value })} />
                            <button className="bg-white text-black p-4 font-bold mt-4">CREATE PROJECT</button>
                        </form>
                    </section>

                    {/* Messages List */}
                    <section className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-heading mb-6 tracking-widest text-accent">MESSAGES</h2>
                        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                            {messages.map(msg => (
                                <div key={msg._id} className="bg-black/50 p-4 border border-white/5 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-sm text-white/80">{msg.name} ({msg.email})</span>
                                        <button onClick={() => handleDeleteMessage(msg._id)} className="text-red-500 text-xs uppercase font-bold">Delete</button>
                                    </div>
                                    <p className="text-white/60 text-sm italic">"{msg.message}"</p>
                                    <span className="text-[10px] text-white/20 mt-2 block">{new Date(msg.createdAt).toLocaleString()}</span>
                                </div>
                            ))}
                            {messages.length === 0 && <p className="text-white/20 text-center py-10">No messages yet.</p>}
                        </div>
                    </section>
                    {/* Project Management List */}
                    <section className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 lg:col-span-2">
                        <h2 className="text-2xl font-heading mb-6 tracking-widest text-accent">PROJECT MANAGEMENT</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map(proj => (
                                <div key={proj._id} className="bg-black/50 p-4 border border-white/5 rounded-lg flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-white">{proj.title}</h3>
                                            <button onClick={() => handleDeleteProject(proj._id)} className="text-red-500 text-xs uppercase font-bold hover:underline">Delete</button>
                                        </div>
                                        <p className="text-white/40 text-xs line-clamp-2">{proj.description}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                                        {proj.githubLink && <span className="text-[10px] text-white/20">GH</span>}
                                        {proj.liveLink && <span className="text-[10px] text-white/20">LIVE</span>}
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && <p className="text-white/20 text-center py-10 col-span-full">No projects found.</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Admin;
