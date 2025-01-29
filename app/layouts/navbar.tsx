import { useState } from "react";
import { Link, useLocation } from "react-router";

import respondlogo from "../images/respondlogo.png";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    return (
        <header className="header">
            <Link to="home">
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
                    <Link key="1" to="/simulation" className={`nav-button ${location.hash === "/simulation" ? 'active' : ''}`}>Simulation Model</Link>
                    <Link key="2" to="/#about" className={`nav-button ${location.hash === "/#about" ? 'active' : ''}`}>About Us</Link>
                    <Link key="3" to="/#modelmaterials" className={`nav-button ${location.hash === "/#modelmaterials" ? 'active' : ''}`}>Model Materials</Link>
                    <Link key="4" to="/#publications" className={`nav-button ${location.hash === "/#publications" ? 'active' : ''}`}>Publications</Link>
                    <Link key="5" to="/#contactus" className={`nav-button ${location.hash === "/#contactus" ? 'active' : ''}`}>Contact Us</Link>
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
                            <Link key="1" to="/simulation" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Simulation Model</Link>
                            <Link key="2" to="/#about" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>About Us</Link>
                            <Link key="3" to="/#modelmaterials" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Model Materials</Link>
                            <Link key="4" to="/#publications" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Publications</Link>
                            <Link key="5" to="/#contactus" className="overlay-link" onClick={(e) => { setMenuOpen(false); }}>Contact Us</Link>
                        </div>
                    </div>
                )}

            </nav>
        </header>

    );
};