import { useState } from "react";
import { Link, useLocation } from "react-router";

import respondlogo from "~/images/respondlogo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    return (
        <header className="header">
            <Link to="/">
                <img className="navbarlogo" src={respondlogo} alt="RESPOND Simulation" />
            </Link>
            <nav className="nav">
                <div className={`menu-icon ${menuOpen ? 'change' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className={`nav-links ${menuOpen ? 'hidden' : ''}`}>
                    <Link key="0" to="/" className={`nav-button ${location.hash === "/" ? 'active' : ''}`}>Home</Link>
                    <Link key="1" to="/simulation" className={`nav-button ${location.hash === "/simulation" ? 'active' : ''}`}>Simulation</Link>
                    <Link key="2" to="/respond" className={`nav-button ${location.hash === "/respond" ? 'active' : ''}`}>About RESPOND</Link>
                    <Link key="3" to="/glossary" className={`nav-button ${location.hash === "/glossary" ? 'active' : ''}`}>Glossary</Link>
                    <Link key="4" to="/contact" className={`nav-button ${location.hash === "/contact" ? 'active' : ''}`}>Contact</Link>
                </div>
                {menuOpen && (
                    <div className="overlay open">
                        <div className={`menu-icon ${menuOpen ? 'change' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                        <div className="overlay-content">
                            <Link key="0" to="/" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Home</Link>
                            <Link key="1" to="/simulation" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Simulation</Link>
                            <Link key="2" to="/respond" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>About RESPOND</Link>
                            <Link key="3" to="/glossary" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Glossary</Link>
                            <Link key="4" to="/contact" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Contact</Link>
                        </div>
                    </div>
                )}

            </nav>
        </header>

    );
};
