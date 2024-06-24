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
  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Simulation Model", link: "/simulationmodel" },
    { text: "About Us", link: "/about" },
    { text: "Model Materials", link: "/modelmaterials" },
    { text: "Publications", link: "/publications" },
    { text: "Contact Us", link: "/contactus" }
  ];

  const location = useLocation();

  return (
    <header className="header">
      <Link to="/">
        <img className="logo" src={respondlogo} alt="RESPOND Simulation" />
      </Link>
      <nav className="nav">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} className={`nav-button ${location.pathname === item.link ? 'active' : ''}`}>
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
