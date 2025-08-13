import { Link, redirect } from "react-router";
import InputsSection from "@components/home/inputsection";
import homecircle from "~/images/homecircle.svg";
import AboutTool from "@components/home/abouttool";
import Questionnaire from "@components/home/questionnaire";
import type { Route } from "./+types/home";

import { userPrefs } from "~/cookies";

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

    const formJson = Object.fromEntries(bodyParams.entries());
    for (var x in formJson) {
	if (formJson[x] === "on") {
	    formJson[x] = true;
	}
	if (formJson[x] === "") {
	    formJson[x] = null;
	}
    }

    delete formJson.questionnaireVisibility;

    const response = await fetch(
	`${process.env.API_URL}/submit-questionnaire`,
	{
	    method: "POST",
	    mode: "cors",
	    body: JSON.stringify(formJson),
	    headers: {
		"Content-Type": "application/json",
	    }
	}
    );

    if (bodyParams.get("questionnaireVisibility") === "hidden") {
        cookie.showQuestionnaire = false;
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

function HomeCircle({ image }: { image: HTMLImageElement }) {
    return(
        <div className="home-circle">
            <img src={image} alt="RESPOND at the Syndemics Lab" />
        </div>
    );
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <main className="main">
            {loaderData.showQuestionnaire ? (
		<Questionnaire />
	    ) : null}
            <section className="home-section" id="home">
                <div className="home-content">
                    <h1 className="welcome-text">
                        <span>
                            Welcome to <br />
                            RESPOND!
                        </span>
                    </h1>
                    <p className="home-description">
			RESPOND is a model that simulates a population with high-risk opioid use and movement on and off medication for opioid use disorder, providing values describing outcomes such as overdoses and costs. This online tool is intended to allow users to explore the impact of various policies on these outcomes with a simplified, customizable interface.
                    </p>
		    <div className="home-nav">
			<Link to="/simulation" className="simulation-button">Go to Simulation</Link>
			<Link to="/respond" className="about-button">More on RESPOND</Link>
		    </div>
                </div>
                <HomeCircle image={homecircle} />
            </section>
	    <AboutTool />
        </main>
    );
}
