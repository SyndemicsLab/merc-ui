import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { type Path } from "~/routes";

import syndemicslogo from "~/images/organization-logos/syndemics-logo-only.svg";

function NavMenuTrigger({
    menuState,
    onTrigger,
}: {
    menuState: boolean;
    onTrigger: (boolean) => void;
}) {
    return (
        <div
            className={`menu-icon ${menuState ? "change" : ""}`}
            onClick={() => onTrigger(!menuState)}
        >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}

function NavMenu({
    paths,
    menuState,
    closeMenu,
}: {
    paths: Path[];
    menuState: boolean;
    closeMenu: () => void;
}) {
    if (menuState) {
        return (
            <div className="overlay open">
                <div
                    className={`menu-icon ${menuState ? "change" : ""}`}
                    onClick={() => closeMenu()}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className="overlay-content">
                    {paths.map((path, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/${path.name}`}
                                className="overlay-link"
                                onClick={() => closeMenu()}
                            >
                                {path.displayName}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default function Navbar({ paths }: { paths: Path[] }) {
    // used to highlight the current page when the page is wide enough
    const location = useLocation();
    // used for controlling the navigation menu when on a smaller screen
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="header">
            <Link to="/">
                <img className="navbarlogo" src={respondlogo} alt="RESPOND Simulation" />
            </Link>
            <nav className="nav">
                <div className={`nav-links ${menuOpen ? "hidden" : ""}`}>
                    {paths.map((path, index) => {
                        return (
                            <Link
                                key={index}
                                to={`/${path.name}`}
                                className={`nav-button ${location.pathname === "/" + path.name ? "active" : ""}`}
                            >
                                {path.displayName}
                            </Link>
                        );
                    })}
                </div>
                <NavMenuTrigger menuState={menuOpen} onTrigger={setMenuOpen} />
                <NavMenu
                    paths={paths}
                    menuState={menuOpen}
                    closeMenu={() => setMenuOpen(false)}
                />
            </nav>
        </header>
    );
}
