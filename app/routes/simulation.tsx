// Package types
import type { Route } from "./+types/simulation";

// Node, React, and React Router imports
import { useFetcher, Await } from "react-router";
import { useRef, useState, useEffect, Suspense } from "react";

// Component imports
import ScrollIndicator, {
    ScrollDirection,
} from "@components/ui/scroll-indicator";
import InfoButton from "@components/ui/info-button";
import Slider from "@components/ui/slider";
import { useInputsDispatch, useInputs } from "@components/input-contexts";
import Contents from "@simulation/interventions/contents";
import Tabs from "@simulation/interventions/tabs";

// Asset imports
import respond from "~/images/diagram/system.svg";

// Action and Loader Hooks
export async function loader({ request }: Route.LoaderArgs) {
    try {
        const response = await fetch(`${process.env.API_URL}/defaults`, {
            method: "GET",
        });

        console.log(response);

        if (!response.ok) {
            throw new Response("Failed to fetch data", {
                status: response.status,
            });
        }

        const inputs = await response.json();

        console.log(inputs);

        return inputs;
    } catch (error) {
        throw new Response({ message: "Error loading data"}, { status: 500 });
    }
}

export async function action({ request }: Route.ActionArgs) {
    const data = await request.json();

    // use the fetch api to send the json to the backend
    const response = await fetch(`${process.env.API_URL}/run`, {
        method: "POST",
        body: data,
    });

    return response;
}

export default function Simulation({ loaderData }: Route.ComponentProps) {
    // const { slider_defaults } = loaderData;
    const inputs = useInputs();
    const dispatch = useInputsDispatch();

    // assign inputs to the value of loaderData, but only if the inputs have not
    // already been assigned from data from the backend
    dispatch({
        type: "set inputs",
        value: loaderData,
    });

    const slider_defaults = [
        {
            inputVar: "duration",
            inputText: "Simulation Duration (Weeks)",
            min: 1,
            max: 2600,
            step: 1,
            defaultValue: inputs.duration,
            action: (value) =>
                dispatch({
                    type: "change duration",
                    value: value,
                }),
        },
        {
            inputVar: "total_population",
            inputText: "Initial Total Population",
            min: 0,
            max: 300000,
            step: 500,
            defaultValue: inputs.total_population,
            action: (value) =>
                dispatch({
                    type: "change total population",
                    value: value,
                }),
        },
        {
            inputVar: "changing_population",
            inputText: "Change in Population Per Week (Count)",
            min: -10000,
            max: 50000,
            step: 100,
            defaultValue: inputs.changing_population,
            action: (value) =>
                dispatch({
                    type: "change changing population",
                    value: value,
                }),
        },
        {
            inputVar: "fatal_overdoses",
            inputText: "Percent of Overdoses That Result in Death",
            min: 0,
            max: 100,
            step: 0.25,
            defaultValue: inputs.fatal_overdoses,
            action: (value) =>
                dispatch({
                    type: "change fatal overdose proportion",
                    value: value,
                }),
        },
    ];

    const fetcher = useFetcher();

    const handleSubmit = () => {
        fetcher.submit(inputs, {
            method: "post",
            encType: "application/json",
        });
    };

    // reference for the input section, used for checking intersection with the
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Await resolve={loaderData}>
                    {() =>
                        return(
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
                                        key={slider.inputVar}
                                        inputVar={slider.inputVar}
                                        inputText={slider.inputText}
                                        min={slider.min}
                                        max={slider.max}
                                        step={slider.step}
                                        managementFunction={slider.action}
                                        defaultValue={slider.defaultValue}
                                    />
                                ))}
                            </div>
                            <h1>Intervention Inputs</h1>
                            <div id="interventions">
                                <Tabs interventions={inputs.interventions} />
                                <Contents interventions={inputs.interventions} />
                            </div>
                            <button
                                className="run-text"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                RUN
                            </button>
                        );
                    }
                </Await>
                </Suspense>
            </div>
        </main>
    );
}
