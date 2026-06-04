// Package types
import type { Route } from "./+types/simulation";
import type { Inputs, Intervention } from "~/features/simulation/model";
import type { Point } from "@simulation/viz/line-plot";

// Node, React, and React Router imports
import { useFetcher, Await, useLoaderData, useNavigate } from "react-router";
import { useRef, useState, useEffect, Suspense } from "react";

// Component imports
import ScrollIndicator, {
    ScrollDirection,
} from "@components/ui/scroll-indicator";
import { InputProvider, useInputs } from "@components/input-contexts";
import Interventions, {
    validateInterventionNames,
    getInterventionNameErrors,
} from "@simulation/interventions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    // DialogFooter,
} from "@components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
// import EmailIntake from "@simulation/emailintake";
import LinePlot, { MultiLinePlot } from "@components/simulation/viz/line-plot";
import { LoadIndicator } from "@components/ui/mock/timed-loader";
import GeneralInputs from "@simulation/general-inputs";

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

interface SimulationSessionMeta {
    schemaVersion: number;
    lastUpdated: number;
}

type SimulationStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const DEFAULT_INPUTS_KEY = "default-inputs";
const SESSION_INPUTS_KEY = "simulation-session-inputs";
const SESSION_META_KEY = "simulation-session-meta";
const SESSION_SCHEMA_VERSION = 1;
const SESSION_WRITE_DEBOUNCE_MS = 200;

function cloneIntervention(intervention: Intervention): Intervention {
    return {
        ...intervention,
        transitions: intervention.transitions.map((transition) => ({
            ...transition,
        })),
        overdose: intervention.overdose.map((overdose) => ({ ...overdose })),
    };
}

function cloneInputs(inputs: Inputs): Inputs {
    return {
        ...inputs,
        interventions: inputs.interventions.map(cloneIntervention),
    };
}

function isTransitionLike(value: unknown): boolean {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value as {
        id?: unknown;
        name?: unknown;
        probability?: unknown;
    };
    return (
        typeof candidate.id === "number" &&
        typeof candidate.name === "string" &&
        typeof candidate.probability === "number"
    );
}

function isOverdoseLike(value: unknown): boolean {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value as { probability?: unknown; injection?: unknown };
    return (
        typeof candidate.probability === "number" &&
        typeof candidate.injection === "boolean"
    );
}

function isInterventionLike(value: unknown): boolean {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const candidate = value as {
        id?: unknown;
        name?: unknown;
        active?: unknown;
        population?: unknown;
        transitions?: unknown;
        overdose?: unknown;
    };

    if (
        typeof candidate.id !== "number" ||
        typeof candidate.name !== "string" ||
        typeof candidate.active !== "boolean" ||
        typeof candidate.population !== "number"
    ) {
        return false;
    }

    if (
        !Array.isArray(candidate.transitions) ||
        !Array.isArray(candidate.overdose)
    ) {
        return false;
    }

    return (
        candidate.transitions.every(isTransitionLike) &&
        candidate.overdose.every(isOverdoseLike)
    );
}

function isInputsLike(value: unknown): value is Inputs {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const candidate = value as {
        duration?: unknown;
        total_population?: unknown;
        changing_population?: unknown;
        fatal_overdoses?: unknown;
        interventions?: unknown;
    };

    if (
        typeof candidate.duration !== "number" ||
        typeof candidate.total_population !== "number" ||
        typeof candidate.changing_population !== "number" ||
        typeof candidate.fatal_overdoses !== "number" ||
        !Array.isArray(candidate.interventions)
    ) {
        return false;
    }

    return candidate.interventions.every(isInterventionLike);
}

function isSimulationLoaderDataLike(
    value: unknown,
): value is SimulationLoaderData {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const candidate = value as {
        initialInputs?: unknown;
        presets?: unknown;
    };

    if (
        !isInputsLike(candidate.initialInputs) ||
        !Array.isArray(candidate.presets)
    ) {
        return false;
    }

    return candidate.presets.every(isInterventionLike);
}

function parseJson(raw: string): unknown {
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function parseSessionMeta(raw: string | null): SimulationSessionMeta | null {
    if (raw === null) {
        return null;
    }

    const parsed = parseJson(raw);
    if (typeof parsed !== "object" || parsed === null) {
        return null;
    }

    const candidate = parsed as {
        schemaVersion?: unknown;
        lastUpdated?: unknown;
    };

    if (
        typeof candidate.schemaVersion !== "number" ||
        typeof candidate.lastUpdated !== "number"
    ) {
        return null;
    }

    return {
        schemaVersion: candidate.schemaVersion,
        lastUpdated: candidate.lastUpdated,
    };
}

export function parseCachedDefaults(
    raw: string | null,
): SimulationLoaderData | null {
    if (raw === null) {
        return null;
    }

    const parsed = parseJson(raw);
    return normalizeLoaderData(parsed);
}

export function normalizeLoaderData(
    data: unknown,
): SimulationLoaderData | null {
    if (isSimulationLoaderDataLike(data)) {
        return {
            initialInputs: cloneInputs(data.initialInputs),
            presets: data.presets.map(cloneIntervention),
        };
    }

    // Backward compatibility for any previous payload that stored plain Inputs.
    if (isInputsLike(data)) {
        return makeLoaderData(data);
    }

    return null;
}

export function readSessionInputsFromStorage(
    storage: SimulationStorage = sessionStorage,
): Inputs | null {
    const rawMeta = storage.getItem(SESSION_META_KEY);
    const meta = parseSessionMeta(rawMeta);

    if (
        rawMeta !== null &&
        (meta === null || meta.schemaVersion !== SESSION_SCHEMA_VERSION)
    ) {
        storage.removeItem(SESSION_INPUTS_KEY);
        storage.removeItem(SESSION_META_KEY);
        return null;
    }

    const rawInputs = storage.getItem(SESSION_INPUTS_KEY);
    if (rawInputs === null) {
        return null;
    }

    const parsed = parseJson(rawInputs);
    if (!isInputsLike(parsed)) {
        storage.removeItem(SESSION_INPUTS_KEY);
        storage.removeItem(SESSION_META_KEY);
        return null;
    }

    return cloneInputs(parsed);
}

export function persistSessionInputsToStorage(
    inputs: Inputs,
    storage: SimulationStorage = sessionStorage,
    now: number = Date.now(),
): void {
    storage.setItem(SESSION_INPUTS_KEY, JSON.stringify(inputs));
    storage.setItem(
        SESSION_META_KEY,
        JSON.stringify({
            schemaVersion: SESSION_SCHEMA_VERSION,
            lastUpdated: now,
        }),
    );
}

export function clearSessionInputsFromStorage(
    storage: SimulationStorage = sessionStorage,
): void {
    storage.removeItem(SESSION_INPUTS_KEY);
    storage.removeItem(SESSION_META_KEY);
}

export function applySessionInputsToLoaderData(
    baseLoaderData: SimulationLoaderData,
    sessionInputs: Inputs | null,
): SimulationLoaderData {
    if (sessionInputs === null) {
        return baseLoaderData;
    }

    return {
        ...baseLoaderData,
        initialInputs: cloneInputs(sessionInputs),
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
    const response = await fetch(`${process.env.API_URL}/defaults`, {
        method: "GET",
        headers: {
            "x-api-key": `${process.env.API_KEY}`,
            operation: "get_default_inputs",
        },
    });

    if (!response.ok) {
        throw new Response("Failed to fetch simulation defaults.", {
            status: response.status,
            statusText: response.statusText,
        });
    }

    const rawData = (await response.json()) as unknown;
    const normalizedData = normalizeLoaderData(rawData);

    if (normalizedData === null) {
        throw new Response("Invalid simulation defaults payload.", {
            status: 500,
        });
    }

    return normalizedData;
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
    const sessionInputs = readSessionInputsFromStorage();

    // Return cached API defaults when available, then apply current session state.
    const cachedDefaults = parseCachedDefaults(
        sessionStorage.getItem(DEFAULT_INPUTS_KEY),
    );
    if (cachedDefaults !== null) {
        return applySessionInputsToLoaderData(cachedDefaults, sessionInputs);
    }

    const serverData = (await serverLoader()) as unknown;
    const loaderData = normalizeLoaderData(serverData);

    if (loaderData === null) {
        throw new Error("Invalid simulation loader data.");
    }

    sessionStorage.setItem(DEFAULT_INPUTS_KEY, JSON.stringify(loaderData));

    return applySessionInputsToLoaderData(loaderData, sessionInputs);
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
    try {
        const data = await request.json();

        // use the fetch api to send the json to the backend
        const response = await fetch(`${process.env.API_URL}/run`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "x-api-key": `${process.env.API_KEY}`,
                "content-type": "application/json",
                operation: "run_model",
            },
        });

        const result = await processResponse(response);
        if (!response.ok) {
            console.log(result);
        }
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
    reset,
    result,
}: {
    pending: boolean;
    reset: boolean;
    result?: SimulationRunResponse;
}) {
    if (pending || reset) {
        return <LoadIndicator />;
    }
    if (!result || !result.ok) {
        return (
            <p className="run-status" role="alert">
                An error happened while attempting to run the simulation. Please
                try again.
            </p>
        );
    }

    const accumulateTimesteps = (timestep: number[], index: number): Point => {
        return [index, timestep.reduce((acc: number, x: number) => acc + x, 0)];
    };
    const cumulativeState = (outcome: Point[]) => {
        const to_return: Point[] = outcome.map((x: number[]) => [x[0], x[1]]);
        for (let i = 1; i < to_return.length; i++) {
            to_return[i][1] = to_return[i][1] + to_return[i - 1][1];
        }
        return to_return;
    };

    // confirm there's a usable body. exit with warning if not.
    const resultBody: string =
        typeof result["result"] === "string" ? result["result"] : "";
    if (resultBody === "") {
        return <p>There was an issue with the simulation outcomes.</p>;
    }

    const modelOutcome = JSON.parse(resultBody)["result"][0];
    // background death
    const bgDeathData =
        modelOutcome["background_death"].map(accumulateTimesteps);
    const cumulativeBGDeathData = cumulativeState(bgDeathData);
    // overdose
    const totalOD = modelOutcome["total_overdose"].map(accumulateTimesteps);
    const cumulativeTotalOD = cumulativeState(totalOD);
    // fatal overdoses
    const fatalOD = modelOutcome["fatal_overdose"].map(accumulateTimesteps);
    const cumulativeFatalOD = cumulativeState(fatalOD);
    // state (total population) -- no cumulative because that doesn't make sense
    const population = modelOutcome["state"].map(accumulateTimesteps);
    // intervention admissions
    const moudAdmissions =
        modelOutcome["intervention_admission"].map(accumulateTimesteps);

    return (
        <div role="result-visualization">
            <MultiLinePlot
                data={[
                    { value: cumulativeBGDeathData, name: "Cumulative" },
                    { value: bgDeathData, name: "Timestep" },
                ]}
                title="Background Death Count Over Time"
                xTitle="Week"
                yTitle="Deaths"
            />
            <LinePlot
                data={bgDeathData}
                title="Background Death Count Over Time"
                xTitle="Week"
                yTitle="Deaths"
            />
            <LinePlot
                data={cumulativeBGDeathData}
                title="Cumulative Background Death Count Over Time"
                xTitle="Week"
                yTitle="Deaths"
            />
            <LinePlot
                data={totalOD}
                title="Total Overdose Count Over Time"
                xTitle="Week"
                yTitle="Overdoses"
            />
            <LinePlot
                data={cumulativeTotalOD}
                title="Cumulative Total Overdose Count Over Time"
                xTitle="Week"
                yTitle="Overdoses"
            />
            <LinePlot
                data={fatalOD}
                title="Fatal Overdose Count Over Time"
                xTitle="Week"
                yTitle="Overdose Deaths"
            />
            <LinePlot
                data={cumulativeFatalOD}
                title="Cumulative Fatal Overdose Count Over Time"
                xTitle="Week"
                yTitle="Overdose Deaths"
            />
            <LinePlot
                data={population}
                title="Population Count Over Time"
                xTitle="Week"
                yTitle="Population"
            />
            <LinePlot
                data={moudAdmissions}
                title="MOUD Admissions Per Timestep"
                xTitle="Week"
                yTitle="Admissions"
            />
        </div>
    );
}

function Input({
    handleSubmit,
    nameValidationError,
    interventionNameErrors,
    // temporarily commenting for Alpha
    // presets,
    pending,
    runResult,
}: {
    handleSubmit: () => boolean;
    nameValidationError: string | null;
    interventionNameErrors: Record<number, string>;
    // temporarily commenting for Alpha
    // presets: Intervention[];
    pending: boolean;
    runResult?: SimulationRunResponse;
}) {
    const [resultsOpen, setResultsOpen] = useState(false);

    // prevents the last set of results from flashing in before a new simulation
    // starts running
    const [resultsReset, setResultsReset] = useState(false);
    function resetResults(open: boolean) {
        const wait = () => new Promise((resolve) => setTimeout(resolve, 100));
        if (!open) {
            setResultsReset(true);
        } else {
            wait().then(() => setResultsReset(false));
        }
        setResultsOpen(open);
    }

    return (
        <>
            <h1>General Inputs</h1>
            <GeneralInputs />
            <h1>Intervention Inputs</h1>
            <Interventions />
            <Dialog open={resultsOpen} onOpenChange={resetResults}>
                <DialogTrigger asChild>
                    <button
                        className="run-text"
                        type="submit"
                        onClick={(event) => {
                            if (!handleSubmit()) {
                                event.preventDefault();
                            }
                        }}
                        disabled={pending || nameValidationError !== null}
                    >
                        {pending ? "Running..." : "Run"}
                    </button>
                </DialogTrigger>
                {nameValidationError ? (
                    <>
                        <p
                            className="run-status"
                            role="alert"
                            aria-live="polite"
                        >
                            There is at least one error. Resolve all errors to
                            run the simulation:
                        </p>
                        {Object.keys(interventionNameErrors).length ? (
                            <div className="run-error-list">
                                <ol>
                                    {Object.entries(interventionNameErrors).map(
                                        (value: [string, string]) => {
                                            return (
                                                <li key={value[0]}>
                                                    {`${value[1]}`}
                                                </li>
                                            );
                                        },
                                    )}
                                </ol>
                            </div>
                        ) : null}
                    </>
                ) : null}
                <DialogContent className="rounded-2xl bg-white">
                    <DialogHeader>
                        <DialogTitle>Simulation Results</DialogTitle>
                        <DialogDescription>
                            It may take several minutes for the model to execute
                            and for results to populate. This tool is a
                            simulation model. The accuracy of the numbers is
                            reflective of the provided data and the assumptions
                            made in the model structure. These results should
                            not be considered guaranteed outcomes.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="results-main flex flex-col">
                        <RunStatus
                            pending={pending}
                            reset={resultsReset}
                            result={runResult}
                        />
                    </div>
                    {/*
                       Commenting out the email intake until it's functional
                        <DialogFooter>
                            <EmailIntake />
                        </DialogFooter>
                    */}
                </DialogContent>
            </Dialog>
        </>
    );
}

// temporarily commenting out for Alpha
// function SimulationContent({ presets }: { presets: Intervention[] }) {
function SimulationContent() {
    const inputs = useInputs();
    const fetcher = useFetcher<SimulationRunResponse>();
    const navigate = useNavigate();
    const nameValidationError = validateInterventionNames(inputs.interventions);
    const interventionNameErrors = getInterventionNameErrors(
        inputs.interventions,
    );

    const handleSubmit = (): boolean => {
        if (nameValidationError !== null) {
            return false;
        }

        const submission = mapRunRequest(inputs);
        fetcher.submit(submission as never, {
            method: "POST",
            encType: "application/json",
        });
        return true;
    };

    const handleReset = () => {
        clearSessionInputsFromStorage();
        window.location.reload();
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

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            persistSessionInputsToStorage(inputs);
        }, SESSION_WRITE_DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [inputs]);

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="input-menu">More</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="more-inputs" align="end">
                        <DropdownMenuLabel className="dropdown-label">
                            Input Settings
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            className="reset-data"
                            onSelect={handleReset}
                        >
                            Reset Data
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="dropdown-label">
                            Information
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            className="to-glossary"
                            onSelect={() => {
                                navigate("/glossary");
                            }}
                        >
                            Glossary
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ScrollIndicator
                    destination="/simulation#inputs"
                    options={{
                        visible: !inputsVisible,
                        direction: direction,
                    }}
                />
                {/*
                   Temporarily commenting out for Alpha
                   <Input
                   handleSubmit={handleSubmit}
                   presets={presets}
                   pending={pending}
                   runResult={fetcher.data}
                   />
                 */}
                <Input
                    handleSubmit={handleSubmit}
                    nameValidationError={nameValidationError}
                    interventionNameErrors={interventionNameErrors}
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
                        {/*
                           Temporarily commenting out for Alpha
                        <SimulationContent
                                presets={resolvedLoaderData.presets}
                        />
                         */}
                        <SimulationContent />
                    </InputProvider>
                )}
            </Await>
        </Suspense>
    );
}
