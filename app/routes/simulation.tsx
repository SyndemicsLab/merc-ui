// Package types
import type { Route } from "./+types/simulation";

// Node, React, and React Router imports
import { Outlet, redirect, NavLink } from "react-router";
import { useRef, useState, useEffect } from "react";

// Component imports
import ScrollIndicator, { ScrollDirection } from "@components/ui/scroll-indicator";
import InfoButton from "@components/ui/info-button";
import Slider from "@components/ui/slider";

// Asset imports
import respond from "~/images/diagram/system.svg";

// Action and Loader Hooks
export async function loader({ request }: Route.LoaderArgs) {
    // After ensuring the user has a session we can load from the user copy of the database and config file. This shouldn't be a fetch but rather just a getter from the filesystem.
    // const interventions = (await fetch('/api/interventions')).json();
    // const behaviors = (await fetch('/api/behaviors')).json();
    // const general_defaults = (await fetch('/api/config')).json(); // ini to json

    const interventions = (await fetch(`${process.env.BACKEND_API_URL}/data/interventions`)).json();

    const slider_defaults = (await fetch(`${process.env.BACKEND_API_URL}/data/defaults`)).json();

    return { slider_defaults, interventions };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const formJson = Object.fromEntries(formData.entries());
}

// Main Layout for the simulation page, including the general inputs and the Outlet for the intervention specific inputs
export default function Simulation({ loaderData }: Route.ComponentProps) {
    const { slider_defaults, interventions } = loaderData;

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
                    {slider_defaults.map((slider) => (
                        <Slider
                            inputName={slider.inputName}
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            defaultValue={slider.defaultValue}
                        />
                    ))}
                </div>
                <h1>Intervention Inputs</h1>
                <div id="interventions">
                    {interventions.map((intervention) => (

                        <NavLink
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "interventionTabactive"
                                    : isPending
                                        ? "interventionTabpending"
                                        : "interventionTab"}
                            to={`/routes/simulation/${intervention.name}`}
                        >
                            {intervention.name}
                        </NavLink>

                    ))}
                    <Outlet />
                </div>

            </div>
        </main>
    );
}
