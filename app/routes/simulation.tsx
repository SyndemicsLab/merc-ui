// Package types
import type { Route } from "./+types/simulation";

// Node, React, and React Router imports
import { Outlet, redirect, NavLink } from "react-router";
import { useRef, useState, useEffect } from "react";
import { exec } from 'child_process';

// Component imports
import ScrollIndicator, { ScrollDirection } from "@components/ui/scroll-indicator";
import InfoButton from "@components/ui/info-button";
import Slider from "@components/ui/slider";
import { getSession, commitSession } from "~/sessions.server";

// Asset imports
import respond from "~/images/diagram/system.svg";
import { PROPORTION_MIN, PROPORTION_STEP, PROPORTION_MAX } from "~/globals";

// Action and Loader Hooks
export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("uuid")) {
        // Hi Dimitri :) 
        // UUID = Universally Unique Identifier. It prevents collisions between users without requiring a login system.
        const uuid = crypto.randomUUID();

        // Node.js allowing us to run the AWS CLI S3 sync command to copy the data folder to the tmp folder. Now all new sessions generate a new copy of the data folder to work with. We should schedule a cron job to clean up the tmp folder periodically to prevent it from filling up with old data folders
        exec('aws s3 sync s3://respond-db/data /tmp/${uuid}/data', (error, stdout, stderr) => {
            if (error) {
                console.error('Error syncing database:', error);
                return;
            }
        })

        session.set("uuid", uuid);
        throw redirect("/simulation/input", {
            headers: { "Set-Cookie": await commitSession(session) }
        })
    }

    // After ensuring the user has a session we can load from the user copy of the database and config file. This shouldn't be a fetch but rather just a getter from the filesystem.
    // const interventions = (await fetch('/api/interventions')).json();
    // const behaviors = (await fetch('/api/behaviors')).json();
    // const general_defaults = (await fetch('/api/config')).json(); // ini to json

    // Temporary testing data until we pull from the /tmp database and establish how we want defaults to work
    const interventions = [
        { id: 1, name: "no_treatment" },
        { id: 2, name: "early_buprenorphine" },
        { id: 3, name: "early_methadone" },
        { id: 4, name: "early_naltrexone" },
        { id: 5, name: "buprenorphine" },
        { id: 6, name: "methadone" },
        { id: 7, name: "naltrexone" },
        { id: 8, name: "detox" },
        { id: 9, name: "corrections" },
        { id: 10, name: "residential" },
        { id: 11, name: "post_buprenorphine" },
        { id: 12, name: "post_methadone" },
        { id: 13, name: "post_naltrexone" },
        { id: 14, name: "post_detox" },
        { id: 15, name: "post_corrections" },
        { id: 16, name: "post_residential" }
    ]

    const slider_defaults = [
        {
            inputName: "Simulation Duration (Weeks)",
            min: 1,
            max: 2600,
            step: 1,
            defaultValue: 52
        },
        {
            inputName: "Initial Total Population",
            min: 0,
            max: 300000,
            step: 500,
            defaultValue: 100000
        },
        {
            inputName: "Change in Population Per Week (Count)",
            min: -10000,
            max: 50000,
            step: 100,
            defaultValue: 0
        },
        {
            inputName: "Percent of Overdoses That Result in Death",
            min: PROPORTION_MIN,
            max: PROPORTION_MAX,
            step: PROPORTION_STEP,
            defaultValue: 0.0625
        }
    ]

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
