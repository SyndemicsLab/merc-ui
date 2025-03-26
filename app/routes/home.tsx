import { Link, redirect } from "react-router";
import InputsSection from "@components/home/inputsection";
import homecircle from "~/images/homecircle.svg";
import About from "@components/home/about";
import AboutTool from "@components/home/abouttool";
import ModelMaterials from "@components/home/modelmaterials";
import Publications from "@components/home/publications";
import ContactUs from "@components/home/contactus";
import Questionnaire from "@components/home/questionnaire";
import type { Route } from "./+types/home";

import { userPrefs } from "~/cookies.server";

export async function loader({ request }: Route.LoaderArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    if (cookie.showQuestionnaire === undefined) {
        cookie.showQuestionnaire = true;
    }
    return { showQuestionnaire: cookie.showQuestionnaire };
}

export async function action({ request }: Route.ActionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    const bodyParams = await request.formData();

    if (bodyParams.get("questionnaireVisibility") === "hidden") {
        cookie.showQuestionnaire = false;
    }
    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <main className="main">
            {loaderData.showQuestionnaire ? (<Questionnaire />) : null}
            <section className="home-section" id="home">
                <div className="home-content">
                    <h1 className="welcome-text">
                        <span>Welcome to</span>
                        <br />
                        <span className="respond-title">RESPOND!</span>
                    </h1>
                    <p className="home-description">
			RESPOND is a model that simulates a population with high-risk opioid use and movement on and off medication for opioid use disorder, providing outcomes such as overdose and cost. This online tool is intended to allow users to explore the impact of various policies on these outcomes with a simplified, customizable interface.
                        {/* Good health is the state of mental, physical, and social well being and it does not just mean absence of diseases. */}
                    </p>
                    <Link to="/simulation" className="simulation-button">Run Simulation Model</Link>
                    <img className="home-circle" src={homecircle} alt="home-circle" />
                </div>
            </section>
            {/* <InputsSection /> */}
            <section id="about">
                <About />
            </section>
	    <AboutTool />
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
