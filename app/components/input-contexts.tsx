import { createContext, useContext, useReducer } from "react";
import {
    type Intervention,
    inputs,
    makeEmptyTransition
} from "~/data";

// used to avoid "prop drilling" through objects to access state for simulation
// inputs
export const InputsContext = createContext(null);
export const InputsDispatchContext = createContext(null);

export function InputProvider({ children }) {
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

export function useInputs() {
    return useContext(InputsContext);
}

export function useInputsDispatch() {
    return useContext(InputsDispatchContext);
}

function getInterventionID(interventions: Intervention[]): number {
    let id = 1;
    let used = interventions.map((intervention) => intervention.id);
    while (used.includes(id)) {
        id += 1;
    }
    return(id);
}

// generate a name for a new intervention
function getNewInterventionName(
    interventions: Intervention[],
    baseName?: string = "Intervention"
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
    decimals?: number = 5
) {
    let sumValues: number = values.reduce(
        (accumulator, value) => accumulator + parseFloat(value),
        0
    ).toFixed(decimals);

    if (sumValues > limit) {
        return(true);
    }
    return(false);
}

function inputsReducer(simulationInputs, action) {
    switch(action.type) {
    case 'change duration': {
        return({
            ...simulationInputs,
            duration: action.value
        });
    }
    case 'change total population': {
        return({
            ...simulationInputs,
            population: action.value
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
            interventions: simulationInputs.interventions.map(i => {
                if (i.id === action.id) {
                    i.active = true;
                } else {
                    i.active = false;
                }
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
            interventions: simulationInputs.interventions.map((intervention) => {
            let transitions = intervention.transitions.map(t => {
                if (t.id === action.id) {
                    if (intervention.id === action.id) {
                        return {...t, name: `Post-${updatedName}`};
                    } else {
                        return {...t, name: updatedName};
                    }
                }
                return t;
            });
            if (intervention.id === action.id) {
                return {
                    ...intervention,
                    name: updatedName,
                    transitions: transitions
                };
            } else {
                return {
                    ...intervention,
                    transitions: transitions
                };
            }
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
            simulationInputs.interventions.map(i => {
                return(
                    {...i, transitions: [
                        ...i.transitions, makeEmptyTransition(id, name)
                    ], active: false}
                );
            });

        let newIntervention;
        if (action.intervention !== "Intervention") {
            let temp = inputs.interventions.find(i => i.name === action.intervention);
            if (temp === undefined) {
                throw Error(`Unknown intervention: ${action.intervention}`);
            }
            newIntervention = {
                ...temp,
                id: id,
                name: name,
                active: true,
                population: 0
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
            {...simulationInputs.interventions.find(i => i.id === action.id)};
        let deletingActive: boolean = toDelete.active;
        let newInterventions: Intervention[] = simulationInputs.interventions.map(
            intervention => {
                // remove the transition associated with the intervention being
                // deleted
                let newIntervention: Intervention = {
                    ...intervention,
                    transitions: intervention.transitions.filter(t => t.id !== action.id)
                };
                // open no treatment when deleting the active intervention tab
                if (deletingActive) {
                    if (newIntervention.id === 0) {
                        return {...newIntervention, active: true };
                    }
                }
                return newIntervention;
            }
        );
        newInterventions = newInterventions.filter(i => i.id !== action.id);
        return {
            ...simulationInputs,
            interventions: newInterventions
        };
    }
    case 'intervention change population': {
        let newInterventions = simulationInputs.interventions.map(i => {
            if (i.id === action.interventionID) {
                return {...i, population: Number(action.value)};
            }
            return i;
        });

        if (constrainValues(newInterventions.map(i => i.population),
                            simulationInputs.population)) {
            return simulationInputs;
        }

        return {
            ...simulationInputs,
            interventions: newInterventions
        };
    }
    case 'intervention change transition': {
        let newInterventions = simulationInputs.interventions.map(i => {
            if (i.id === action.interventionID) {
                return {
                    ...i,
                    transitions: i.transitions.map(t => {
                        if (t.id === action.transitionID) {
                            return {...t, probability: action.value};
                        }
                        return t;
                })};
            }
            return i;
        });

        let newTransitionProbabilities: number[] = newInterventions.find(
            i => i.id === action.interventionID
        ).transitions.map(
            t => t.probability
        );

        // check if the sum of the transition probabilities exceeds the limit
        // and prevent the change if it would cause an excess of the limit
        if (constrainValues(newTransitionProbabilities, 1.0000)) {
            return simulationInputs;
        }
        return({
            ...simulationInputs,
            interventions: newInterventions
        });
    }
    case 'intervention change overdose': {
        let newInterventions = simulationInputs.interventions.map(i => {
            if (i.id === action.interventionID) {
                return {
                    ...i,
                    overdose: i.overdose.map((od) => {
                        if (od.injection == action.injection) {
                            return {...od, probability: action.value};
                        }
                        return od;
                    })
                };
            }
            return i;
        });
    }
    default: {
        throw Error(`Unknown action: ${action.type}`);
    }
    }
}
