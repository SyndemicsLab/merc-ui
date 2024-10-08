import { useState } from 'react';
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link, useLocation, useNavigate } from "@remix-run/react";
import appStylesHref from "./app.css?url";
import respondlogo from "./images/respondlogo.png";
import Footer from "./routes/footer"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "icon", sizes: "32x32", href: "/favicon.ico" }
];

export const meta: MetaFunction = () => {
  return [
    { rel: "icon", href: "/favicon.ico" },
    { title: "RESPOND Simulation" },
    { name: "description", content: "The Syndemics Lab at Boston Medical Center's RESPOND simulation as a web application." }
  ];
};

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Simulation Model", link: "/simulation" },
    { text: "About Us", link: "/#about" },
    { text: "Model Materials", link: "/#modelmaterials" },
    { text: "Publications", link: "/#publications" },
    { text: "Contact Us", link: "/#contactus" }
  ];

  return (
    <header className="header">
      <Link to="/">
        <img className="navbarlogo" src={respondlogo} alt="RESPOND Simulation" />
      </Link>
      <nav className="nav">
        <div className={`menu-icon ${isMenuOpen ? 'change' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'hidden' : ''}`}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`nav-button ${location.hash === item.link ? 'active' : ''}`}
            >
              {item.text}
            </Link>
          ))}
        </div>
        {isMenuOpen && (
          <div className="overlay open">
            <div className={`menu-icon ${isMenuOpen ? 'change' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <div className="overlay-content">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="overlay-link"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.link === "#about") {
                      handleAboutClick(e);
                    }
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavigationMenu />
        <Outlet />
		<Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
