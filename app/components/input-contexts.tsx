import {
    createContext,
    useContext,
    useReducer,
    type ReactNode
} from "react";
import {
    type Intervention,
    type Transition,
    type Inputs,
    inputs,
    makeEmptyTransition
} from "~/data";
import {
    PROPORTION_MAX
} from "~/globals";

interface Action {
    type: string;
    value?: number;
    id?: number;
    name?: string;
    intervention?: string;
}

// used to avoid "prop drilling" through objects to access state for simulation
// inputs
export const InputsContext = createContext(null);
export const InputsDispatchContext = createContext(null);

export function InputProvider({ children }: { children: ReactNode }) {
    const [simulationInputs, dispatch] = useReducer(
        inputsReducer,
        inputs
    );
    return(
        <InputsContext.Provider value={simulationInputs}>
            <InputsDispatchContext.Provider value={dispatch}>
                {children}
            </InputsDispatchContext.Provider>
        </InputsContext.Provider>
    );
}

function makeTransitionsFromExistingIntervention(
    newName: string,
    newID: number,
    reference: Intervention,
    currentInterventions: Intervention[],
) {
    let transitions: Transition[] = [{
        name: `Post-${newName}`,
        id: newID,
        probability: reference.transitions[0].probability
    }];
    const baseTransitionIDs: number[] = reference.transitions.map(t => t.id);
    transitions = transitions.concat(currentInterventions.map(intervention => {
        if (intervention.id !== reference.id &&
            baseTransitionIDs.includes(intervention.id)) {
            return reference.transitions.find(t => t.id === intervention.id);
        }
        return makeEmptyTransition(intervention.id, intervention.name);
    }));
    return transitions;
}

export function useInputs() {
    return useContext(InputsContext);
}

export function useInputsDispatch() {
    return useContext(InputsDispatchContext);
}

function getInterventionID(interventions: Intervention[]): number {
    return(Math.max(...interventions.map((i: Intervention) => i.id)) + 1);
}

// generate a name for a new intervention
function getNewInterventionName(
    interventions: Intervention[],
    baseName: string = "Intervention"
): string {
    let num = 1;
    let used = interventions.map((intervention) => intervention.name);
    while (used.includes(`New ${baseName} ${num}`)) {
        num += 1;
    }
    return(`New ${baseName} ${num}`);
}

function constrainValues(
    values: number[],
    limit: number,
    comparison: string = "max",
): boolean {
    let sumValues: number = values.reduce(
        (accumulator: number, value: number) => accumulator + Number(value),
        0
    );
    if (comparison === "max" && sumValues > limit) {
        return(true);
    } else if (comparison === "min" && sumValues < limit) {
        return(true);
    }
    return(false);
}

function inputsReducer(simulationInputs: Inputs, action: Action) {
    switch(action.type) {
    case 'change duration': {
        return({
            ...simulationInputs,
            duration: action.value
        });
    }
    case 'change total population': {
        const value: number = parseInt(action.value);
        // calculate the sum of populations in MOUDs
        const currentMinPopulation: number = simulationInputs.interventions
              .filter((i) => i.id !== 0)
              .reduce(
                  (accumulator, intervention) => {
                      return accumulator + parseInt(intervention.population);
                  },
                  0
              );

        // determine if the new total population is at least the minimum,
        // otherwise reject the input change
        if (constrainValues([value], currentMinPopulation, "min")) {
            return simulationInputs;
        }

        // set the No Treatment population to the remainder of the population
        const newInterventions: Intervention[] = simulationInputs.interventions
              .map((i) => {
                  if (i.id !== 0) {
                      return i;
                  }
                  return {...i, population: value - currentMinPopulation};
              });

        return({
            ...simulationInputs,
            population: value,
            interventions: newInterventions
        });
    }
    case 'change entering cohort': {
        return({
            ...simulationInputs,
            entering: action.value
        });
    }
    case 'change fatal overdose proportion':
        return ({
            ...simulationInputs,
            fod: action.value
        });
    case 'intervention select': {
        return({
            ...simulationInputs,
            interventions: simulationInputs.interventions.map((i: Intervention) => {
                i.active = (i.id === action.id) ? true : false;
                return i;
            })
        });
    }
    case 'intervention rename': {
        // insert a placeholder for the intervention if the user leaves the name
        // blank
        let updatedName = action.name === "" ? "<no name>" : action.name;
        return {
            ...simulationInputs,
            interventions: simulationInputs.interventions.map(
                (intervention: Intervention) => {
                    let transitions = intervention.transitions.map(t => {
                        if (t.id !== action.id) {
                            return t;
                        }
                        if (intervention.id === action.id) {
                            return {...t, name: `Post-${updatedName}`};
                        }
                        return {...t, name: updatedName};
                    });
                    if (intervention.id === action.id) {
                        return {
                            ...intervention,
                            name: updatedName,
                            transitions: transitions
                        };
                    }
                    return {
                        ...intervention,
                        transitions: transitions
                    };
                })
        };
    }
    case 'intervention add': {
        let id: number = getInterventionID(simulationInputs.interventions);
        let name: string = getNewInterventionName(
            simulationInputs.interventions,
            action.intervention
        );
        let newInterventions: Intervention[] =
            simulationInputs.interventions.map(
                (i: Intervention) => {
                    return(
                        {...i, transitions: [
                            ...i.transitions, makeEmptyTransition(id, name)
                        ], active: false}
                    );
                });

        let newIntervention;
        if (action.intervention !== "Intervention") {
            let temp = inputs.interventions.find(
                (i: Intervention) => i.name === action.intervention);
            if (temp === undefined) {
                throw Error(`Unknown intervention: ${action.intervention}`);
            }
            newIntervention = {
                ...temp,
                id: id,
                name: name,
                active: true,
                population: 0,
                transitions: makeTransitionsFromExistingIntervention(
                    name, id, temp, newInterventions,
                )
            };
        } else {
            newIntervention = {
                id: id,
                name: name,
                active: true,
                population: 0,
                transitions: [
                    makeEmptyTransition(id, `Post-${name}`),
                    ...newInterventions.map(i => {
                        return makeEmptyTransition(i.id, i.name);
                    })
                ],
                overdose: [
                    { probability: Math.random().toPrecision(2), injection: true },
                    { probability: Math.random().toPrecision(2), injection: false }
                ]
            };
        }
        return({
            ...simulationInputs,
            interventions: [
                ...newInterventions,
                newIntervention
            ]
        });
    }
    case 'intervention delete': {
        let toDelete: Intervention =
            {...simulationInputs.interventions.find(
                (i: Intervention) => i.id === action.id)};
        let deletingActive: boolean = toDelete.active;
        let newInterventions: Intervention[] =
            simulationInputs.interventions.map(
                (intervention: Intervention) => {
                    // remove the transition associated with the intervention
                    // being deleted
                    let newIntervention: Intervention = {
                        ...intervention,
                        transitions: intervention.transitions.filter(t => t.id !== action.id)
                    };
                    // open no treatment when deleting the active intervention
                    // tab
                    if (deletingActive && newIntervention.id === 0) {
                        return {...newIntervention, active: true };
                    }
                    return newIntervention;
                }
            );
        newInterventions = newInterventions.filter(
            (i: Intervention) => i.id !== action.id);
        return {
            ...simulationInputs,
            interventions: newInterventions
        };
    }
    case 'intervention change population': {
        // copy the interventions, changing the population size of the chosen
        // intervention
        let newInterventions = simulationInputs.interventions.map(
            (i: Intervention) => {
                if (i.id === action.interventionID) {
                    return {...i, population: parseFloat(action.value)};
                }
                return i;
            });

        // test that the change in population size doesn't cause the system to
        // have too many people; if it does, reject the change
        if (constrainValues(newInterventions
                            .filter(i => i.id !== 0)
                            .map(i => i.population),
                            simulationInputs.population)) {
            return simulationInputs;
        }

        // adjust the population in No Treatment based on the new value
        const treatedPopulation: number = newInterventions
              .filter(i => i.id !== 0)
              .reduce(
                  (accumulator, intervention) => {
                      return accumulator + parseInt(intervention.population);
                  },
                  0
              );
        newInterventions[0] = {
            ...newInterventions[0],
            population: simulationInputs.population - treatedPopulation
        };
        return {
            ...simulationInputs,
            interventions: newInterventions
        };
    }
    case 'intervention change transition': {
        let newInterventions = simulationInputs.interventions.map(i => {
            if (i.id !== action.interventionID) {
                return i;
            }
            return {
                ...i,
                transitions: i.transitions.map(t => {
                    if (t.id === action.transitionID) {
                        return {...t, probability: Number(action.value)};
                    }
                    return t;
                })
            };
        });

        let newTransitionProbabilities: number[] = newInterventions.find(
            i => i.id === action.interventionID
        ).transitions.map(
            t => t.probability
        );

        // check if the sum of the transition probabilities exceeds the limit
        // and prevent the change if it would cause an excess of the limit
        if (constrainValues(newTransitionProbabilities, PROPORTION_MAX)) {
            return simulationInputs;
        }
        return({
            ...simulationInputs,
            interventions: newInterventions
        });
    }
    case 'intervention change overdose': {
        let newInterventions = simulationInputs.interventions.map(i => {
            if (i.id !== action.interventionID) {
                return i;
            }
            return {
                ...i,
                overdose: i.overdose.map((od) => {
                    if (od.injection == action.injection) {
                        return {...od, probability: action.value};
                    }
                    return od;
                })
            };
        });
    }
    default: {
        throw Error(`Unknown action: ${action.type}`);
    }
    }
}
