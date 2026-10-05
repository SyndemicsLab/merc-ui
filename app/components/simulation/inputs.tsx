// Package types
import type {
    SimulationRunResponse,
} from "@components/simulation/types";

// Node, React, and React Router imports
import { useState } from "react";

// Component imports
import GeneralInputs from "@simulation/general-inputs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    // DialogFooter,
} from "@components/ui/dialog";
import Interventions, {
    validateInterventionNames,
    getInterventionNameErrors,
} from "@simulation/interventions";
import { LoadIndicator } from "@components/ui/mock/timed-loader";
import LinePlot, { MultiLinePlot } from "@simulation/viz/line-plot";
// import EmailIntake from "@simulation/emailintake";

export function RunStatus({
    pending,
    reset,
    result,
}: {
    pending: boolean;
    reset: boolean;
    result?: SimulationRunResponse;
}) {
    const [isExpanded, setIsExpanded] = useState(true);

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
    function sumResults(a: [number, number][], b: [number, number][]): Point[] {
        // let `a` always be the longer array if relevant
        const [x, y] = a.length >= b.length ? [a, b] : [b, a];
        return x.map((v, i) => [v[0], v[1] + (y[i][1] ?? 0)]);
    }

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

    const simulationSections = [
        {
            id: "population-count-over-time",
            label: "Population Count Over Time",
        },
        {
            id: "total-overdose-count-over-time",
            label: "Total Overdose Count Over Time",
        },
        {
            id: "cumulative-total-overdose-count-over-time",
            label: "Cumulative Total Overdose Count Over Time",
        },
        {
            id: "moud-admissions-per-timestep",
            label: "MOUD Admissions Per Timestep",
        },
        {
            id: "death-by-simulation-timestep",
            label: "Death by Simulation Timestep",
        },
        {
            id: "cumulative-death-by-simulation-timestep",
            label: "Cumulative Death by Simulation Timestep",
        },
    ] as const;

    let tocExpanded = isExpanded ? "Collapse" : "Expand";
    const navClass = isExpanded ? "expanded" : "collapsed";
    tocExpanded += " table of contents";

    return (
        <>
            <nav
                aria-label="Table of contents"
                className={`simulation-toc ${navClass}`}
            >
                <h3 className="toc-title">Jump To A Graph</h3>
                {isExpanded ? (
                    <>
                        <ul className="simulation-toc-list">
                            {simulationSections.map((section) => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`}>
                                        {section.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : null}
                <button
                    className={`${navClass}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={tocExpanded}
                >
                    {isExpanded ? "‹" : "›"}
                </button>
            </nav>

            <LinePlot
                data={population}
                perTimestep={false}
                title="Population Count Over Time"
                id={simulationSections[0].id}
                xTitle="Week"
                yTitle="Population"
            />
            <LinePlot
                data={totalOD}
                perTimestep={true}
                title="Total Overdose Count Over Time"
                id={simulationSections[1].id}
                xTitle="Week"
                yTitle="Overdoses"
            />
            <LinePlot
                data={cumulativeTotalOD}
                perTimestep={false}
                title="Cumulative Total Overdose Count Over Time"
                id={simulationSections[2].id}
                xTitle="Week"
                yTitle="Overdoses"
            />
            <LinePlot
                data={moudAdmissions}
                perTimestep={true}
                title="MOUD Admissions Per Timestep"
                id={simulationSections[3].id}
                xTitle="Week"
                yTitle="Admissions"
            />
            <MultiLinePlot
                data={[
                    {
                        value: bgDeathData,
                        name: "Per-Timestep Background Death",
                    },
                    {
                        value: fatalOD,
                        name: "Per-Timestep Fatal Overdose Death",
                    },
                    {
                        value: sumResults(bgDeathData, fatalOD),
                        name: "Per-Timestep Total Death",
                    },
                ]}
                perTimestep={true}
                title="Death by Simulation Timestep"
                id={simulationSections[4].id}
                xTitle="Week"
                yTitle="Deaths"
            />
            <MultiLinePlot
                data={[
                    {
                        value: cumulativeBGDeathData,
                        name: "Cumulative Background Death",
                    },
                    {
                        value: cumulativeFatalOD,
                        name: "Cumulative Fatal Overdose Death",
                    },
                    {
                        value: sumResults(
                            cumulativeBGDeathData,
                            cumulativeFatalOD,
                        ),
                        name: "Cumulative Total Death",
                    },
                ]}
                perTimestep={false}
                title="Cumulative Death by Simulation Timestep"
                id={simulationSections[5].id}
                xTitle="Week"
                yTitle="Deaths"
            />
        </>
    );
}


export default function Input({
    handleSubmit,
    nameValidationError,
    interventionNameErrors,
    populationConstraintError,
    // temporarily commenting for Alpha
    // presets,
    pending,
    runResult,
}: {
    handleSubmit: () => boolean;
    nameValidationError: string | null;
    interventionNameErrors: Record<number, string>;
    populationConstraintError: string | null;
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
                        disabled={
                            pending ||
                            nameValidationError !== null ||
                            populationConstraintError !== null
                        }
                    >
                        {pending ? "Running..." : "Run"}
                    </button>
                </DialogTrigger>
                {nameValidationError || populationConstraintError ? (
                    <>
                        <p
                            className="run-status"
                            role="alert"
                            aria-live="polite"
                        >
                            There is at least one error. Resolve all errors to
                            run the simulation:
                        </p>
                        {Object.keys(interventionNameErrors).length ||
                        populationConstraintError ? (
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
                                    {populationConstraintError ? (
                                        <li>{populationConstraintError}</li>
                                    ) : null}
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
