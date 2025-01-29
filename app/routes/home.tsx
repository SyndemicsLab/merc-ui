import { Link } from "react-router";
import InputsSection from "../components/home/inputsection";
import homecircle from "../images/homecircle.svg";
import About from "../components/home/about";
import ModelMaterials from "../components/home/modelmaterials";
import Publications from "../components/home/publications";
import ContactUs from "../components/home/contactus";
import Questionnaire from "../components/home/questionnaire";
import React from "react";

export default function Home() {
    return (
        <main className="main">
            <Questionnaire />
            <section className="home-section" id="home">
                <div className="home-content">
                    <h1 className="welcome-text">
                        <span>Welcome to</span>
                        <br />
                        <span className="respond-title">RESPOND!</span>
                    </h1>
                    <p className="home-description">
                        Good health is the state of mental, physical, and social well being and it does not just mean absence of diseases.
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
}
