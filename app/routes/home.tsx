// module imports
import { Link, redirect } from "react-router";
import type { Route } from "./+types/home";

// component imports
import AboutTool from "@components/home/abouttool";
import Questionnaire from "@components/home/questionnaire";
import { userPrefs } from "~/cookies";

// asset imports
import homecircle from "~/images/homecircle.svg";

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

    const raw_json: Record<string, string | boolean> = {
        purpose_personal_research: false,
        purpose_policy_development: false,
        purpose_academic_research: false,
        purpose_program_development: false,
        purpose_other_text: "N/A",
        us_state: "N/A",
        occupation_healthcare: false,
        occupation_public_health: false,
        occupation_research: false,
        occupation_policy: false,
        occupation_government: false,
        occupation_education: false,
        occupation_non_profit: false,
        occupation_media: false,
        occupation_other_text: "N/A",
    };

    const formJson = Object.fromEntries(bodyParams.entries()) as Record<
        string,
        string | boolean | null
    >;
    for (const x in formJson) {
        if (!(x in raw_json)) {
            continue;
        }
        const value = formJson[x];
        if (value === "on") {
            raw_json[x] = true;
        } else if (value === "") {
            raw_json[x] = false;
        } else if (typeof value === "string") {
            raw_json[x] = value;
        }
    }

    delete formJson.questionnaireVisibility;

    // send the questionnaire to the backend
    if (typeof process.env.API_URL !== "undefined") {
        await fetch(`${process.env.API_URL}/questionnaire_response`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(raw_json),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.API_KEY}`,
            },
        });
    }

    if (bodyParams.get("questionnaireVisibility") === "hidden") {
        cookie.showQuestionnaire = false;
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

function HomeImage({ image }: { image: string }) {
    return (
        <div className="home-image">
            <img src={image} alt="RESPOND at the Syndemics Lab" />
        </div>
    );
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <main className="home">
            {loaderData.showQuestionnaire ? <Questionnaire /> : null}
            <section className="home-section" id="home">
                <div className="home-content">
                    <h1 className="welcome-text">
                        <span>
                            Welcome to <br />
                            RESPOND!
                        </span>
                    </h1>
                    <p className="home-description">
                        RESPOND is a model that simulates a population with
                        high-risk opioid use that experiences movement on and
                        off medication for opioid use disorder. The model
                        provides values describing outcomes such as the number
                        of overdoses and the costs accrued by the population.
                        This online tool is intended to allow users to explore
                        the impact of various policies on these outcomes with a
                        simplified, customizable interface.
                    </p>
                    <div className="home-nav">
                        <Link to="/simulation" className="simulation-button">
                            Go to Simulation
                        </Link>
                        <Link to="/respond" className="about-button">
                            More on RESPOND
                        </Link>
                    </div>
                </div>
                <HomeImage image={homecircle} />
            </section>
            <AboutTool />
        </main>
    );
}
