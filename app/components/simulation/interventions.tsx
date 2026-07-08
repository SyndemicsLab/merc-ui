import { useInputs } from "@components/input-contexts";
import { useInputsDispatch } from "@components/input-contexts";
// commented temporarily for alpha
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@components/ui/dropdown-menu";
import type {
    Intervention,
    Transition,
    Overdose,
} from "~/features/simulation/model";
import { useState } from "react";
import Slider from "~/components/ui/slider";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { PROPORTION_MIN, PROPORTION_STEP, PROPORTION_MAX } from "~/globals";

function normalizeInterventionName(name: string): string {
    return name.trim().replace(/\s+/g, " ");
}

export function validateInterventionNames(
    interventions: Intervention[],
): string | null {
    const seen = new Set<string>();

    for (const intervention of interventions) {
        const normalizedName = normalizeInterventionName(intervention.name);

        if (normalizedName === "") {
            return "Intervention names cannot be blank.";
        }

        if (seen.has(normalizedName)) {
            return "Intervention names must be unique.";
        }

        seen.add(normalizedName);
    }

    return null;
}

export function getInterventionNameErrors(
    interventions: Intervention[],
): Record<number, string> {
    const seenNames = new Map<string, number>();
    const errors: Record<number, string> = {};

    for (const intervention of interventions) {
        const normalizedName = normalizeInterventionName(intervention.name);

        if (normalizedName === "") {
            errors[intervention.id] = "Intervention names cannot be blank.";
            continue;
        }

        if (seenNames.has(normalizedName)) {
            errors[intervention.id] =
                "Intervention names must be unique. This name is duplicated.";
        } else {
            seenNames.set(normalizedName, intervention.id);
        }
    }

    return errors;
}

function Tab({
    intervention,
    nameError,
}: {
    intervention: Intervention;
    nameError?: string;
}) {
    // commented temporarily for alpha
    const dispatch = useInputsDispatch();
    return (
        <>
            <div
                className={`interventionTab${intervention.active ? " active" : ""}`}
                onClick={() =>
                    dispatch({
                        type: "intervention select",
                        id: intervention.id,
                    })
                }
            >
                {nameError ? (
                    <div className="intervention-name-error">!</div>
                ) : null}
                {intervention.name ? intervention.name : "<no name>"}
                {intervention.id > 0 && (
                    <button
                        className="delete-button"
                        onClick={(event) => {
                            dispatch({
                                type: "intervention delete",
                                id: intervention.id,
                            });
                            // avoid also selecting the tab underneath while
                            // closing (selection overrides deletion)
                            event.stopPropagation();
                        }}
                    >
                        ×
                    </button>
                )}
            </div>
        </>
    );
}

function Tabs({
    interventions,
    nameErrorsById,
    // commented temporarily for alpha
    // presets,
}: {
    interventions: Intervention[];
    nameErrorsById: Record<number, string>;
    // commented temporarily for alpha
    // presets: Intervention[];
}) {
    // commented temporarily for alpha
    // const dispatch = useInputsDispatch();
    return (
        <>
            <div className="interventionTabs">
                {interventions.map((intervention) => (
                    <Tab
                        key={intervention.id}
                        intervention={intervention}
                        nameError={nameErrorsById[intervention.id]}
                    />
                ))}
                {/* Remove this button and uncomment the dropdown menu after
                    alpha */}
                <button
                    className="interventionTab addTab disabled"
                    disabled={true}
                >
                    + New Intervention
                </button>
                {/* Temporarily commenting out this element for Alpha
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="interventionTab addTab disabled">
                            + New Intervention
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="add-intervention-dropdown">
                        <DropdownMenuItem
                            className="add-intervention-item"
                            onSelect={() =>
                                dispatch({
                                    type: "intervention add",
                                    intervention: "Intervention",
                                })
                            }
                        >
                            Blank Intervention
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="dropdown-separator" />
                        <DropdownMenuLabel className="dropdown-label">
                            Presets
                        </DropdownMenuLabel>
                        {presets.map((intervention) => (
                            <DropdownMenuItem
                                key={intervention.id}
                                className="add-intervention-item"
                                onSelect={() =>
                                    dispatch({
                                        type: "intervention add",
                                        intervention: `${intervention.name}`,
                                        preset: intervention,
                                    })
                                }
                            >
                                {intervention.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                 */}
            </div>
        </>
    );
}

function Transitions({
    transitions,
    onTransitionChange,
}: {
    transitions: Transition[];
    onTransitionChange: (value: number, transitionID: number) => void;
}) {
    const summer = (accumulator: number, transition: Transition): number => {
        const p =
            typeof transition.probability == "string"
                ? parseFloat(transition.probability)
                : transition.probability;
        return accumulator + p;
    };
    const sumProbs: number = transitions.reduce(summer, 0);

    return (
        <>
            {transitions.map((transition) => (
                <Slider
                    key={transition.id}
                    inputVar={`${transition.id}_transition`}
                    inputText={`Percent of Population Moving to ${transition.name} Per Week`}
                    min={PROPORTION_MIN}
                    max={PROPORTION_MAX}
                    step={PROPORTION_STEP}
                    defaultValue={transition.probability}
                    managementFunction={(value) =>
                        onTransitionChange(value, transition.id)
                    }
                />
            ))}
            <Slider
                inputVar="retention_rate"
                inputText="Retention Rate"
                min={PROPORTION_MIN}
                max={PROPORTION_MAX}
                step={PROPORTION_STEP}
                defaultValue={Math.max(PROPORTION_MAX - sumProbs, 0)}
                readOnly={true}
            />
        </>
    );
}

function Overdoses({
    overdoses,
    onOverdoseChange,
}: {
    overdoses: Overdose[];
    onOverdoseChange: (value: number, injection: boolean) => void;
}) {
    return (
        <>
            {overdoses.map((overdose) => (
                <Slider
                    key={overdose.injection ? 1 : 0}
                    inputVar={`overdose_${overdose.injection ? "injector" : "non_injector"}`}
                    inputText={`Percent of Active ${overdose.injection ? "Injector" : "Non-injector"} Population that Overdoses Per Week`}
                    min={PROPORTION_MIN}
                    max={PROPORTION_MAX}
                    step={PROPORTION_STEP}
                    defaultValue={overdose.probability}
                    managementFunction={(value) =>
                        onOverdoseChange(value, overdose.injection)
                    }
                />
            ))}
        </>
    );
}

function InterventionInfo({
    intervention,
    nameError,
}: {
    intervention: Intervention;
    nameError?: string;
}) {
    const dispatch = useInputsDispatch();
    const [name] = useState(intervention.name);
    return (
        <>
            <h2 className="inputName">Intervention Name</h2>
            {intervention.id == 0 ? (
                <input type="text" value={intervention.name} readOnly={true} />
            ) : (
                <input
                    type="text"
                    value={intervention.name}
                    className={nameError ? "intervention-name-input-error" : ""}
                    aria-invalid={nameError ? true : undefined}
                    onChange={(event) =>
                        dispatch({
                            type: "intervention rename",
                            name: event.target.value,
                            id: intervention.id,
                        })
                    }
                />
            )}
            {nameError && !intervention.info ? (
                <p className="intervention-name-error" role="alert">
                    {nameError} The simulation cannot run until this is
                    resolved.
                </p>
            ) : null}
            {intervention.description && !intervention.info ? (
                <p className="intervention-description">
                    {intervention.description}
                </p>
            ) : null}
            {intervention.description && intervention.info ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="intervention-info">
                            <FontAwesomeIcon icon={faInfo} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white lg:max-w-[1000px] max-w-[425px] p-9">
                        <DialogHeader>
                            <DialogTitle>{name}</DialogTitle>
                            <DialogDescription>
                                {`More information about ${name}.`}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {intervention.description}
                        </div>
                    </DialogContent>
                </Dialog>
            ) : null}
            {nameError && intervention.info ? (
                <p className="intervention-name-error" role="alert">
                    {nameError} The simulation cannot run until this is
                    resolved.
                </p>
            ) : null}
        </>
    );
}

function Content({
    intervention,
    transitions,
    nameError,
}: {
    intervention: Intervention;
    transitions: Transition[];
    nameError?: string;
}) {
    const dispatch = useInputsDispatch();
    return (
        <>
            <div
                className={`interventionContent${intervention.active ? " active" : ""}`}
            >
                <InterventionInfo
                    intervention={intervention}
                    nameError={nameError}
                />
                <Slider
                    inputText="Intervention Population Size"
                    inputVar={`${intervention.name}_population`}
                    min={0}
                    max={200000}
                    step={1000}
                    defaultValue={intervention.population}
                    managementFunction={(value) =>
                        dispatch({
                            type: "intervention change population",
                            interventionID: intervention.id,
                            value: value,
                        })
                    }
                    readOnly={intervention.id === 0 ? true : false}
                />
                {intervention.id !== 0 ? (
                    <Slider
                        inputText="Post-Treatment Population Size"
                        inputVar={`post_${intervention.name}_population`}
                        min={0}
                        max={200000}
                        step={1000}
                        defaultValue={intervention.postPopulation ?? 0}
                        readOnly={true}
                    />
                ) : null}
                {/* Intervention transitions default to open for No Treatment */}
                <Collapsible
                    className="block-trans-root"
                    defaultOpen={intervention.id === 0 ? true : false}
                >
                    <CollapsibleTrigger asChild>
                        <h3>Transitions Between Interventions</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="block-trans-collapsible">
                        <Transitions
                            transitions={transitions}
                            onTransitionChange={(value, transition) =>
                                dispatch({
                                    type: "intervention change transition",
                                    transitionID: transition,
                                    interventionID: intervention.id,
                                    value: value,
                                })
                            }
                        />
                    </CollapsibleContent>
                </Collapsible>
                <hr
                    style={{ margin: "1em 0", color: "var(--tertiary-color)" }}
                />
                <Overdoses
                    overdoses={intervention.overdose}
                    onOverdoseChange={(value, injection) =>
                        dispatch({
                            type: "intervention change overdose",
                            injection: injection,
                            interventionID: intervention.id,
                            value: value,
                        })
                    }
                />
            </div>
        </>
    );
}

function Contents({
    interventions,
    nameErrorsById,
}: {
    interventions: Intervention[];
    nameErrorsById: Record<number, string>;
}) {
    return (
        <>
            <div className="interventionContents">
                {interventions.map((intervention) => (
                    <Content
                        key={intervention.id}
                        intervention={intervention}
                        transitions={intervention.transitions}
                        nameError={nameErrorsById[intervention.id]}
                    />
                ))}
            </div>
        </>
    );
}

export default function Interventions() {
    const inputs = useInputs();
    const interventions: Intervention[] = inputs.interventions;
    const nameErrorsById: Record<number, string> = getInterventionNameErrors(
        inputs.interventions,
    );

    return (
        <div id="interventions">
            {/*
               Temporarily commenting for Alpha - replace the element below with
               <Tabs
               interventions={interventions}
               nameErrorsById={nameErrorsById}
               presets={interventions} />
             */}
            <Tabs
                interventions={interventions}
                nameErrorsById={nameErrorsById}
            />
            <Contents
                interventions={interventions}
                nameErrorsById={nameErrorsById}
            />
        </div>
    );
}
