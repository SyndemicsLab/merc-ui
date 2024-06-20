import { Link, useLocation } from "@remix-run/react";
import respondLogo from "../images/respondlogo.png";

interface MenuItemProps {
  text: string;
  link: string;
}

const NavigationMenu: React.FC = () => {
  const menuItems: MenuItemProps[] = [
    { text: 'Home', link: '/' },
    { text: 'Simulation Model', link: '/simulation' },
    { text: 'About us', link: '/about' },
    { text: 'Model Materials', link: '/modelmaterials' },
    { text: 'Publications', link: '/publications' },
    { text: 'Contact us', link: '/contact' },
  ];

  const location = useLocation();

  return (
    <header className="header">
      <img className="logo" loading="lazy" src={respondLogo} alt="RESPOND Simulation" />
      <nav className="nav">
        {menuItems.map((item, index) => (
          <NavItem key={index} text={item.text} link={item.link} isActive={location.pathname === item.link} />
        ))}
      </nav>
    </header>
  );
};

const NavItem: React.FC<{ text: string; link: string; isActive: boolean }> = ({ text, link, isActive }) => {
  return (
    <Link to={link} className={`nav-button ${isActive ? 'active' : ''}`} tabIndex={0}>
      {text}
    </Link>
  );
};

export default function Index() {
  return (
    <div>
      <NavigationMenu />
      <div id="welcome">
      </div>
    </div>
  );
}
