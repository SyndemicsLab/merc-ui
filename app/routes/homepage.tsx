import { Link } from "@remix-run/react";
import InputsSection from "./inputsection";
import homecircle from "../images/homecircle.svg";
import About from "./about";
import ModelMaterials from "./modelmaterials";
import Publications from "./publications";
import ContactUs from "./contactus";

const Homepage = () => (
  <main className="main">
    <section className="home-section" id="home">
      <div className="home-content">
        <h1 className="welcome-text">
          <span>Welcome to</span>
          <br />
          <span className="respond-title">RESPOND!</span>
        </h1>
        <p className="home-description">
          Good health is the state of mental, physical and social well being and it does not just mean absence of diseases.
        </p>
        <Link to="/simulation" className="simulation-button">Run Simulation Model</Link>
        <img className="home-circle" src={homecircle} alt="home-circle" />
      </div>
    </section>
    <InputsSection />
    <section id="about">
      <About />
    </section>
    <section id="modelmaterials">
      <ModelMaterials />
    </section>
    <section id="publications">
      <Publications />
    </section>
    <section id="contactus">
      <ContactUs />
    </section>
  </main>
);

export default Homepage;
