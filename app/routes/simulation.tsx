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
    // After ensuring the user has a session we can load from the user copy of
    // the database and config file. This shouldn't be a fetch but rather just a
    // getter from the filesystem.

    // const interventions = (await fetch('/api/interventions')).json();
    // const behaviors = (await fetch('/api/behaviors')).json();
    // const general_defaults = (await fetch('/api/config')).json(); // ini to json

    // const interventions = (await fetch(`${process.env.BACKEND_API_URL}/data/interventions`)).json();

    // const slider_defaults = (await fetch(`${process.env.BACKEND_API_URL}/data/defaults`)).json();

    let slider_defaults = [
        {
            "inputName": "Simulation Duration (Weeks)",
            "min": "1",
            "max": "2600",
            "step": "1",
            "defaultValue": "52"
        },
        {
            "inputName": "Initial Total Population",
            "min": "0",
            "max": "300000",
            "step": "500",
            "defaultValue": "100000"
        },
        {
            "inputName": "Change in Population Per Week (Count)",
            "min": "-10000",
            "max": "50000",
            "step": "100",
            "defaultValue": "0"
        },
        {
            "inputName": "Percent of Overdoses That Result in Death",
            "min": "0",
            "max": "100",
            "step": "1",
            "defaultValue": "0.0625"
        }
    ];
    let interventions = [{
        1: "no_treatment",
        2:  "early_buprenorphine",
        3:  "early_methadone",
        4:  "early_naltrexone",
        5:  "buprenorphine",
        6:  "methadone",
        7:  "naltrexone",
        8:  "detox",
        9:  "corrections",
        10: "residential",
        11: "post_buprenorphine",
        12: "post_methadone",
        13: "post_naltrexone",
        14: "post_detox",
        15: "post_corrections",
        16: "post_residential"
    }];

    return { slider_defaults, interventions };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const formJson = Object.fromEntries(formData.entries());
}

// Main Layout for the simulation page, including the general inputs and the
// Outlet for the intervention specific inputs
export default function Simulation({ loaderData }: Route.ComponentProps) {
    const { slider_defaults, interventions } = loaderData;

    // reference for the input section, used for testing intersection with the
    // viewport
    const inputRef = useRef(null);
    const [inputsVisible, updateInputsVisible] = useState(false);
    const [direction, updateDirection] = useState(ScrollDirection.Down);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // can select only the first entry because there is only one
                // element we're checking for intersection with
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
            {/*
               `ref={inputRef}` is necessary here so that the
               IntersectionObserver API functions to hide the scroll indicator
               when this section is visible.
              */}
            <div id="inputs" ref={inputRef}>
                <InfoButton
                    className="glossary-button"
                    text="Open Glossary"
                    destination="/glossary"
                />
                <ScrollIndicator
                    destination="/simulation/1#inputs"
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
