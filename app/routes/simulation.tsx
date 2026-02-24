// Package types
import type { Route } from "./+types/home";

// React Router imports
import { Outlet } from "react-router";

// React imports
import { useRef, useState, useEffect } from "react";

// Component imports
import ScrollIndicator, { ScrollDirection } from "@components/ui/scroll-indicator";
import InfoButton from "@components/ui/info-button";
import Slider from "@components/ui/slider";

// Asset imports
import respond from "~/images/diagram/system.svg";
import { PROPORTION_MIN, PROPORTION_STEP, PROPORTION_MAX } from "~/globals";

// Action and Loader Hooks
export async function loader({ request }: Route.LoaderArgs) {
    // This should load all the interventions and behaviors from the database as well as the sim.conf data containing the duration.
    const interventions = (await fetch('/api/interventions')).json();
    const behaviors = (await fetch('/api/behaviors')).json();
    const sim_conf = (await fetch('/api/config')).json(); // ini to json
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const formJson = Object.fromEntries(formData.entries());
}

// Main Layout for the simulation page, including the general inputs and the Outlet for the intervention specific inputs
export default function Simulation({ loaderData }: Route.ComponentProps) {
    const general_defaults = {
        duration: 52,
        population: 100000,
        entering: 0,
        fod: 0.0625
    };
    // reference for the input section, used for testing intersection with the
    // viewport
    const inputRef = useRef(null);
    const [inputsVisible, updateInputsVisible] = useState(false);
    const [direction, updateDirection] = useState(ScrollDirection.Down);
    useEffect(() => {
        // Safety check to ensure ref is not null
        if (!inputRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                // can select only the first entry because there is only one element
                // we're checking for intersection with
                const entry = entries[0];
                if (entry.boundingClientRect.top < 0) {
                    updateDirection(ScrollDirection.Up);
                } else {
                    updateDirection(ScrollDirection.Down);
                }
                updateInputsVisible(entry.isIntersecting);
            },
            { threshold: [0.05] },
        );
        observer.observe(inputRef.current);
    }, []);

    return (
        <main id="simulation">
            <img
                src={respond}
                alt="RESPOND model structure diagram"
                className="system-image"
            />
            <div id="inputs">
                <InfoButton
                    className="glossary-button"
                    text="Open Glossary"
                    destination="/glossary"
                />
                <ScrollIndicator
                    destination="/simulation#inputs"
                    options={{
                        visible: !inputsVisible,
                        direction: direction,
                    }}
                />
                <h1>General Inputs</h1>
                <div id="global-inputs">
                    <Slider
                        inputName={"Simulation Duration (Weeks)"}
                        min={1}
                        max={2600}
                        step={1}
                        defaultValue={general_defaults.duration}
                    />
                    <Slider
                        inputName={"Initial Total Population"}
                        min={0}
                        max={300000}
                        step={500}
                        defaultValue={general_defaults.population}
                    />
                    <Slider
                        inputName={"Change in Population Per Week (Count)"}
                        min={-10000}
                        max={50000}
                        step={100}
                        defaultValue={general_defaults.entering}
                    />
                    <Slider
                        inputName={"Percent of Overdoses That Result in Death"}
                        min={PROPORTION_MIN}
                        max={PROPORTION_MAX}
                        step={PROPORTION_STEP}
                        defaultValue={general_defaults.fod}
                    />
                </div>
                <h1>Intervention Inputs</h1>
                <Outlet />
            </div>
        </main>
    );
}
