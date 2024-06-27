import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link, useLocation } from "@remix-run/react";
import appStylesHref from "./app.css?url";
import respondlogo from "./images/respondlogo.png"

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
  const location = useLocation();

  const menuItems = [
	{ text: "Home", link: "/" },
	{ text: "Simulation Model", link: "/simulation" },
	{ text: "About Us", link: "#about" }, // stuck with this routing, wondering how to use scrollIntoView
	{ text: "Model Materials", link: "/modelmaterials" },
	{ text: "Publications", link: "/publications" },
	{ text: "Contact Us", link: "/contact" }
	];

  return (
    <header className="header">
      <Link to="/">
        <img className="navbarlogo" src={respondlogo} alt="RESPOND Simulation" />
      </Link>
      <nav className="nav">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`nav-button ${location.hash === item.link ? 'active' : ''}`}
            onClick={e => {
              if (item.link.startsWith('#')) {
                e.preventDefault();
                document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {item.text}
          </Link>
        ))}
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
