import React from 'react';
import '../styles/components.css';

const Navbar = () => {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="nav-pill" style={{ border: 'none', fontWeight: 800, fontSize: '1.2rem', padding: '0.5rem 0' }}>
                    DEVXABHAY
                </a>
            </div>

            <div className="nav-right nav-links">
                {/* Navigation links removed as per user request */}
            </div>
        </nav>
    );
};

export default Navbar;
