// Package types
import type { Route } from "./+types/simulation";
import type { Inputs, Intervention } from "~/features/simulation/model";

// Node, React, and React Router imports
import { useFetcher, Await, useLoaderData } from "react-router";
import { useRef, useState, useEffect, Suspense } from "react";

// Component imports
import ScrollIndicator, {
    ScrollDirection,
} from "@components/ui/scroll-indicator";
import InfoButton from "@components/ui/info-button";
import Slider from "@components/ui/slider";
import {
    InputProvider,
    useInputsDispatch,
    useInputs,
} from "@components/input-contexts";
import Contents from "@simulation/interventions/contents";
import Tabs from "@simulation/interventions/tabs";

// Asset imports
import respond from "~/images/diagram/system.svg";

export interface SimulationLoaderData {
    initialInputs: Inputs;
    presets: Intervention[];
}

export interface SimulationRunResponse {
    ok: boolean;
    status: number;
    result?: string;
    error?: string;
}

function cloneIntervention(intervention: Intervention): Intervention {
    return {
        ...intervention,
        transitions: intervention.transitions.map((transition) => ({
            ...transition,
        })),
        overdose: intervention.overdose.map((overdose) => ({ ...overdose })),
    };
}

export function makeLoaderData(inputs: Inputs): SimulationLoaderData {
    return {
        initialInputs: {
            ...inputs,
            interventions: inputs.interventions.map(cloneIntervention),
        },
        presets: inputs.interventions.map(cloneIntervention),
    };
}

export function mapRunRequest(inputs: Inputs): unknown {
    // Enforce a plain JSON payload shape before sending to the action.
    return JSON.parse(JSON.stringify(inputs));
}

export function mapRunResponse(
    response: Response,
    result: string,
): SimulationRunResponse {
    if (!response.ok) {
        return {
            ok: false,
            status: response.status,
            error:
                result ||
                `Simulation run failed with status ${response.status}.`,
        };
    }

    return {
        ok: true,
        status: response.status,
        result,
    };
}

// Action and Loader Hooks
export async function loader() {
    const response = fetch(`${process.env.API_URL}/defaults`, {
        method: "GET",
        headers: {
            "x-api-key": `${process.env.API_KEY}`,
        },
    });

    return response;
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
    // return the data from the cache, if it exists
    const cachedData = sessionStorage.getItem("default-inputs");
    if (cachedData) {
        return JSON.parse(cachedData) as SimulationLoaderData;
    }

    const serverData = (await serverLoader()) as Inputs;
    const loaderData = makeLoaderData(serverData);
    sessionStorage.setItem("default-inputs", JSON.stringify(loaderData));
    return loaderData;
}
clientLoader.hydrate = true;

async function processResponse(response: Response) {
    if (response.body === null) {
        return "";
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // Decode raw bytes to string
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
    }

    // Final flush
    result += decoder.decode();

    return result;
}

export async function action({ request }: Route.ActionArgs) {
    const data = await request.json();

    try {
        // use the fetch api to send the json to the backend
        const response = await fetch(`${process.env.API_URL}/run`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "x-api-key": `${process.env.API_KEY}`,
                "content-type": "application/json",
            },
        });

        const result = await processResponse(response);
        return mapRunResponse(response, result);
    } catch (error) {
        return {
            ok: false,
            status: 500,
            error: error instanceof Error ? error.message : "Unexpected error.",
        } as SimulationRunResponse;
    }
}

export function RunStatus({
    pending,
    result,
}: {
    pending: boolean;
    result?: SimulationRunResponse;
}) {
    if (pending) {
        return <p className="run-status">Running simulation...</p>;
    }
    if (!result) {
        return null;
    }
    if (!result.ok) {
        return (
            <p className="run-status" role="alert">
                {result.error}
            </p>
        );
    }
    return <p className="run-status">Simulation complete.</p>;
}

function InputWrapper({
    handleSubmit,
    presets,
    pending,
    runResult,
}: {
    handleSubmit: () => void;
    presets: Intervention[];
    pending: boolean;
    runResult?: SimulationRunResponse;
}) {
    const inputs = useInputs();
    return (
        <>
            <Input
                inputs={inputs}
                handleSubmit={handleSubmit}
                presets={presets}
                pending={pending}
                runResult={runResult}
            />
        </>
    );
}

function Input({
    inputs,
    handleSubmit,
    presets,
    pending,
    runResult,
}: {
    inputs: Inputs;
    handleSubmit: () => void;
    presets: Intervention[];
    pending: boolean;
    runResult?: SimulationRunResponse;
}) {
    const dispatch = useInputsDispatch();

    const slider_defaults = [
        {
            inputVar: "duration",
            inputText: "Simulation Duration (Weeks)",
            min: 1,
            max: 2600,
            step: 1,
            defaultValue: inputs.duration,
            action: (value: number) =>
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
            action: (value: number) =>
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
            action: (value: number) =>
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
            action: (value: number) =>
                dispatch({
                    type: "change fatal overdose proportion",
                    value: value,
                }),
        },
    ];

    return (
        <>
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
                <Tabs interventions={inputs.interventions} presets={presets} />
                <Contents interventions={inputs.interventions} />
            </div>
            <button
                className="run-text"
                type="submit"
                onClick={handleSubmit}
                disabled={pending}
            >
                {pending ? "RUNNING..." : "RUN"}
            </button>
            <RunStatus pending={pending} result={runResult} />
        </>
    );
}

function SimulationContent({ presets }: { presets: Intervention[] }) {
    const inputs = useInputs();
    const fetcher = useFetcher<SimulationRunResponse>();

    const handleSubmit = () => {
        const submission = mapRunRequest(inputs);
        fetcher.submit(submission as never, {
            method: "POST",
            encType: "application/json",
        });
    };
    const pending = fetcher.state !== "idle";

    // reference for the input section, used for checking intersection with the
    // viewport
    const inputRef = useRef<HTMLDivElement | null>(null);
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
        if (inputRef.current !== null) {
            observer.observe(inputRef.current);
        }
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
                    destination="/simulation#inputs"
                    options={{
                        visible: !inputsVisible,
                        direction: direction,
                    }}
                />
                <InputWrapper
                    handleSubmit={handleSubmit}
                    presets={presets}
                    pending={pending}
                    runResult={fetcher.data}
                />
            </div>
        </main>
    );
}

export default function Simulation() {
    const loaderData = useLoaderData<typeof clientLoader>();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={loaderData}>
                {(resolvedLoaderData: SimulationLoaderData) => (
                    <InputProvider
                        initialState={resolvedLoaderData.initialInputs}
                    >
                        <SimulationContent
                            presets={resolvedLoaderData.presets}
                        />
                    </InputProvider>
                )}
            </Await>
        </Suspense>
    );
}
