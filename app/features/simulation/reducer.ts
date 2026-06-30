import {
    type Intervention,
    type Transition,
    type Inputs,
    makeEmptyTransition,
} from "~/features/simulation/model";
import { PROPORTION_MAX } from "~/globals";

export type SimulationAction =
    | { type: "change duration"; value: number }
    | { type: "change total population"; value: number }
    | { type: "change changing population"; value: number }
    | { type: "change fatal overdose proportion"; value: number }
    | { type: "intervention select"; id: number }
    | { type: "intervention rename"; id: number; name: string }
    | {
          type: "intervention add";
          intervention: string;
          preset?: Intervention;
      }
    | { type: "intervention delete"; id: number }
    | {
          type: "intervention change population";
          interventionID: number;
          value: number;
      }
    | {
          type: "intervention change transition";
          interventionID: number;
          transitionID: number;
          value: number;
      }
    | {
          type: "intervention change overdose";
          interventionID: number;
          injection: boolean;
          value: number;
      };

// Internal utility helpers
function makeTransitionsFromExistingIntervention(
    newName: string,
    newID: number,
    reference: Intervention,
    currentInterventions: Intervention[],
) {
    let transitions: Transition[] = [
        {
            name: `Post-${newName}`,
            id: newID,
            probability: reference.transitions[0].probability,
        },
    ];
    const baseTransitionIDs: number[] = reference.transitions.map((t) => t.id);
    transitions = transitions.concat(
        currentInterventions.flatMap((intervention) => {
            if (
                intervention.id !== reference.id &&
                baseTransitionIDs.includes(intervention.id)
            ) {
                const transition = reference.transitions.find(
                    (t) => t.id === intervention.id,
                );
                return transition ? [transition] : [];
            }
            return [makeEmptyTransition(intervention.id, intervention.name)];
        }),
    );
    return transitions;
}

function getInterventionID(interventions: Intervention[]): number {
    return Math.max(...interventions.map((i: Intervention) => i.id)) + 1;
}

function getNewInterventionName(
    interventions: Intervention[],
    baseName: string = "Intervention",
): string {
    let num = 1;
    const used = interventions.map((intervention) => intervention.name);
    while (used.includes(`New ${baseName} ${num}`)) {
        num += 1;
    }
    return `New ${baseName} ${num}`;
}

export type SliderConstraintViolation = {
    hasViolation: boolean;
    field: string;
    message: string;
};

function constrainValues(
    values: number[],
    limit: number,
    comparison: string = "max",
): boolean {
    const sumValues: number = values.reduce(
        (accumulator: number, value: number) => accumulator + Number(value),
        0,
    );
    if (comparison === "max" && sumValues > limit) {
        return true;
    } else if (comparison === "min" && sumValues < limit) {
        return true;
    }
    return false;
}

export function getSliderConstraintError(
    simulationInputs: Inputs,
    field: string,
): SliderConstraintViolation {
    const treatedPopulation = simulationInputs.interventions
        .filter((i) => i.id !== 0)
        .reduce((accumulator, intervention) => {
            if (!intervention.postPopulation) {
                return accumulator + intervention.population;
            }
            return (
                accumulator +
                intervention.population +
                intervention.postPopulation
            );
        }, 0);

    if (
        field === "intervention_population" &&
        treatedPopulation > simulationInputs.total_population
    ) {
        return {
            hasViolation: true,
            field,
            message:
                "Intervention populations now exceed the total population.",
        };
    }

    if (
        field === "transition_probability" &&
        treatedPopulation > simulationInputs.total_population
    ) {
        return {
            hasViolation: true,
            field,
            message:
                "Transition probabilities push the intervention total above the total population.",
        };
    }

    return {
        hasViolation: false,
        field,
        message: "",
    };
}

// Domain helpers: intervention identity and structure
// Renames one intervention and updates transition labels that reference it.
export function renameIntervention(
    simulationInputs: Inputs,
    id: number,
    name: string,
): Inputs {
    const updatedName = name;
    return {
        ...simulationInputs,
        interventions: simulationInputs.interventions.map(
            (intervention: Intervention) => {
                const transitions = intervention.transitions.map((t) => {
                    if (t.id !== id) {
                        return t;
                    }
                    if (intervention.id === id) {
                        return {
                            ...t,
                            name: `Post-${updatedName}`,
                        };
                    }
                    return { ...t, name: updatedName };
                });
                if (intervention.id === id) {
                    return {
                        ...intervention,
                        name: updatedName,
                        transitions: transitions,
                    };
                }
                return {
                    ...intervention,
                    transitions: transitions,
                };
            },
        ),
    };
}

// Adds a new intervention, either blank or based on a preset template.
export function addIntervention(
    simulationInputs: Inputs,
    intervention: string,
    preset?: Intervention,
): Inputs {
    const id: number = getInterventionID(simulationInputs.interventions);
    const name: string = getNewInterventionName(
        simulationInputs.interventions,
        intervention,
    );
    const newInterventions: Intervention[] = simulationInputs.interventions.map(
        (i: Intervention) => {
            return {
                ...i,
                transitions: [...i.transitions, makeEmptyTransition(id, name)],
                active: false,
            };
        },
    );

    let newIntervention: Intervention;
    if (intervention !== "Intervention") {
        if (preset === undefined) {
            throw Error(`Unknown intervention: ${intervention}`);
        }
        newIntervention = {
            ...preset,
            id: id,
            name: name,
            active: true,
            population: 0,
            postPopulation: 0,
            transitions: makeTransitionsFromExistingIntervention(
                name,
                id,
                preset,
                newInterventions,
            ),
        };
    } else {
        newIntervention = {
            id: id,
            name: name,
            active: true,
            population: 0,
            postPopulation: 0,
            transitions: [
                makeEmptyTransition(id, `Post-${name}`),
                ...newInterventions.map((i) => {
                    return makeEmptyTransition(i.id, i.name);
                }),
            ],
            overdose: [
                {
                    probability: 0,
                    injection: true,
                },
                {
                    probability: 0,
                    injection: false,
                },
            ],
        };
    }
    return {
        ...simulationInputs,
        interventions: [...newInterventions, newIntervention],
    };
}

// Deletes an intervention, removes inbound references, and rebalances No Treatment.
export function deleteIntervention(
    simulationInputs: Inputs,
    id: number,
): Inputs {
    const toDelete = simulationInputs.interventions.find(
        (i: Intervention) => i.id === id,
    );
    if (toDelete === undefined) {
        return simulationInputs;
    }
    const deletingActive: boolean = toDelete.active;
    let newInterventions: Intervention[] = simulationInputs.interventions.map(
        (intervention: Intervention) => {
            const newIntervention: Intervention = {
                ...intervention,
                transitions: intervention.transitions.filter(
                    (t) => t.id !== id,
                ),
            };
            if (newIntervention.id !== 0) {
                return newIntervention;
            }
            if (!toDelete.postPopulation) {
                return intervention;
            }
            return {
                ...newIntervention,
                active: intervention.active || deletingActive,
                population:
                    intervention.population +
                    toDelete.population +
                    toDelete.postPopulation,
            };
        },
    );

    newInterventions = newInterventions.filter(
        (i: Intervention) => i.id !== id,
    );
    return {
        ...simulationInputs,
        interventions: newInterventions,
    };
}

// Domain helpers: top-level scalar inputs
// Updates simulation duration.
export function changeDuration(
    simulationInputs: Inputs,
    value: number,
): Inputs {
    return {
        ...simulationInputs,
        duration: value,
    };
}

// Updates total population and keeps No Treatment aligned with treated totals.
export function changeTotalPopulation(
    simulationInputs: Inputs,
    value: number,
): Inputs {
    const currentMinPopulation: number = simulationInputs.interventions
        .filter((i) => i.id !== 0)
        .reduce((accumulator, intervention) => {
            if (!intervention.postPopulation) {
                return accumulator + intervention.population;
            }
            return (
                accumulator +
                intervention.population +
                intervention.postPopulation
            );
        }, 0);

    const newInterventions: Intervention[] = simulationInputs.interventions.map(
        (i) => {
            if (i.id !== 0) {
                return i;
            }
            return {
                ...i,
                population: Math.max(value - currentMinPopulation, 0),
            };
        },
    );

    return {
        ...simulationInputs,
        total_population: value,
        interventions: newInterventions,
    };
}

// Updates weekly net population change.
export function changeChangingPopulation(
    simulationInputs: Inputs,
    value: number,
): Inputs {
    return {
        ...simulationInputs,
        changing_population: value,
    };
}

// Updates the fatal overdose proportion scalar input.
export function changeFatalOverdoseProportion(
    simulationInputs: Inputs,
    value: number,
): Inputs {
    return {
        ...simulationInputs,
        fatal_overdoses: value,
    };
}

// Domain helpers: intervention parameter updates
// Updates one intervention population while preserving total population constraints.
export function changeInterventionPopulation(
    simulationInputs: Inputs,
    interventionID: number,
    value: number,
): Inputs {
    // can safely change postPopulation here because NT population is read only
    const newInterventions = simulationInputs.interventions.map(
        (i: Intervention) => {
            if (i.id === interventionID) {
                return {
                    ...i,
                    population: value,
                    // initial population in post-treatment is the initial
                    // population times the transition proportion
                    postPopulation: Math.round(
                        (value *
                            i.transitions.filter((t) => t.id === i.id)[0]
                                .probability) /
                            100,
                    ),
                };
            }
            return i;
        },
    );

    const treatedPopulation: number = newInterventions
        .filter((i) => i.id !== 0)
        .reduce((accumulator, intervention) => {
            if (!intervention.postPopulation) {
                return accumulator + intervention.population;
            }
            return (
                accumulator +
                intervention.population +
                intervention.postPopulation
            );
        }, 0);
    newInterventions[0] = {
        ...newInterventions[0],
        population: Math.max(
            simulationInputs.total_population - treatedPopulation,
            0,
        ),
    };
    return {
        ...simulationInputs,
        interventions: newInterventions,
    };
}

// Updates one transition probability and rejects totals above the allowed bound.
export function changeInterventionTransition(
    simulationInputs: Inputs,
    interventionID: number,
    transitionID: number,
    value: number,
): Inputs {
    const newInterventions = simulationInputs.interventions.map((i) => {
        if (i.id !== interventionID) {
            return i;
        }
        const newTransition = Number(Number(value).toFixed(4));
        const postPopulation =
            transitionID === i.id
                ? {
                      postPopulation: Math.round(
                          (i.population * newTransition) / 100,
                      ),
                  }
                : {};
        return {
            ...i,
            ...postPopulation,
            transitions: i.transitions.map((t) => {
                if (t.id === transitionID) {
                    return {
                        ...t,
                        probability: newTransition,
                    };
                }
                return t;
            }),
        };
    });

    const activeIntervention = newInterventions.find(
        (i) => i.id === interventionID,
    );
    if (activeIntervention === undefined) {
        return simulationInputs;
    }
    const newTransitionProbabilities: number[] =
        activeIntervention.transitions.map((t) => t.probability);

    const treatedPopulation = newInterventions
        .filter((i) => i.id !== 0)
        .map((i) =>
            i.postPopulation ? i.population + i.postPopulation : i.population,
        );

    const noTreatment: Intervention | undefined = newInterventions.find(
        (i) => i.id === 0,
    );
    if (noTreatment) {
        noTreatment.population = Math.max(
            simulationInputs.total_population -
                treatedPopulation.reduce((accumulator, value) => {
                    return accumulator + value;
                }, 0),
            0,
        );
    }

    return {
        ...simulationInputs,
        interventions: newInterventions,
    };
}

// Updates one overdose probability entry for an intervention.
export function changeInterventionOverdose(
    simulationInputs: Inputs,
    interventionID: number,
    injection: boolean,
    value: number,
): Inputs {
    const newInterventions = simulationInputs.interventions.map((i) => {
        if (i.id !== interventionID) {
            return i;
        }
        return {
            ...i,
            overdose: i.overdose.map((od) => {
                if (od.injection === injection) {
                    return { ...od, probability: value };
                }
                return od;
            }),
        };
    });
    return {
        ...simulationInputs,
        interventions: newInterventions,
    };
}

// Reducer orchestration
export function inputsReducer(
    simulationInputs: Inputs,
    action: SimulationAction,
): Inputs {
    switch (action.type) {
        case "change duration":
            return changeDuration(simulationInputs, action.value);
        case "change total population":
            return changeTotalPopulation(simulationInputs, action.value);
        case "change changing population":
            return changeChangingPopulation(simulationInputs, action.value);
        case "change fatal overdose proportion":
            return changeFatalOverdoseProportion(
                simulationInputs,
                action.value,
            );
        case "intervention select": {
            return {
                ...simulationInputs,
                interventions: simulationInputs.interventions.map(
                    (i: Intervention) => {
                        return {
                            ...i,
                            active: i.id === action.id,
                        };
                    },
                ),
            };
        }
        case "intervention rename":
            return renameIntervention(simulationInputs, action.id, action.name);
        case "intervention add":
            return addIntervention(
                simulationInputs,
                action.intervention,
                action.preset,
            );
        case "intervention delete":
            return deleteIntervention(simulationInputs, action.id);
        case "intervention change population":
            return changeInterventionPopulation(
                simulationInputs,
                action.interventionID,
                action.value,
            );
        case "intervention change transition":
            return changeInterventionTransition(
                simulationInputs,
                action.interventionID,
                action.transitionID,
                action.value,
            );
        case "intervention change overdose":
            return changeInterventionOverdose(
                simulationInputs,
                action.interventionID,
                action.injection,
                action.value,
            );
        default: {
            const exhaustiveAction: never = action;
            throw Error(`Unknown action: ${String(exhaustiveAction)}`);
        }
    }
}
