// This is meant to be a temporary file replicating what would be held in a
// cloud data source

interface Intervention {
    id: number;
    name: string;
    active: boolean;
    description?: string;
    info?: boolean;
    population: number;
    overdose: Overdose[];
    transitions: Transition[];
}

interface Transition {
    id: number;
    name: string;
    probability: number;
}

interface Overdose {
    probability: number;
    injection: boolean;
}

interface Inputs {
    duration: number;
    population: number;
    entering: number;
    fod: number;
    interventions: Intervention[];
}

function uniform(a, b) {
    return a + Math.random() * (b - a);
}


const realInputs: Inputs = {
    "duration": 52,
    "total_population": 227892,
    "changing_population": -1060.93708737323,
    "fatal_overdoses": 12.8128815628816,
    "interventions": [
        {
            "id": 0,
            "name": "No Treatment",
            "active": true,
            "transitions": [
                {
                    "id": 1,
                    "name": "Buprenorphine",
                    "probability": 1.3243
                },
                {
                    "id": 2,
                    "name": "Naltrexone",
                    "probability": 0.18259
                },
                {
                    "id": 3,
                    "name": "Methadone",
                    "probability": 0.79229
                },
                {
                    "id": 4,
                    "name": "Detox",
                    "probability": 0.0027592
                },
                {
                    "id": 5,
                    "name": "Detention",
                    "probability": 0.0027542
                }
            ],
            "overdose": [
                {
                    "probability": 0.79074,
                    "injection": true
                },
                {
                    "probability": 0.0056295,
                    "injection": false
                }
            ],
            "population": 127042
        },
        {
            "id": 1,
            "name": "Buprenorphine",
            "active": false,
            "description": "Buprenorphine is a medication for opioid use disorder and works as a partial opioid agonist. It ‘diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings’ (SAMHSA).",
            "population": 56376,
            "transitions": [
                {
                    "id": 1,
                    "name": "Post-Buprenorphine",
                    "probability": 14.58
                },
                {
                    "id": 0,
                    "name": "No Treatment",
                    "probability": 0
                },
                {
                    "id": 2,
                    "name": "Naltrexone",
                    "probability": 0
                },
                {
                    "id": 3,
                    "name": "Methadone",
                    "probability": 0
                },
                {
                    "id": 4,
                    "name": "Detox",
                    "probability": 0
                },
                {
                    "id": 5,
                    "name": "Detention",
                    "probability": 0
                }
            ],
            "overdose": [
                {
                    "probability": 0.2542,
                    "injection": true
                },
                {
                    "probability": 0.0050942,
                    "injection": false
                }
            ]
        },
        {
            "id": 2,
            "name": "Naltrexone",
            "active": false,
            "description": "Naltrexone is a medication for opioid use disorder and works as an opioid antagonist, binding opioid receptors and blocking the ‘euphoric and sedative effects of opioids’ (SAMHSA). It can also be used to treat alcohol use disorder. Naltrexone for opioid use disorder should not be started until no opioids have been used for at least 7 days.",
            "info": true,
            "population": 9479,
            "transitions": [
                {
                    "id": 2,
                    "name": "Post-Naltrexone",
                    "probability": 14.58
                },
                {
                    "id": 0,
                    "name": "No Treatment",
                    "probability": 0
                },
                {
                    "id": 1,
                    "name": "Buprenorphine",
                    "probability": 0
                },
                {
                    "id": 3,
                    "name": "Methadone",
                    "probability": 0
                },
                {
                    "id": 4,
                    "name": "Detox",
                    "probability": 0
                },
                {
                    "id": 5,
                    "name": "Detention",
                    "probability": 0
                }
            ],
            "overdose": [
                {
                    "probability": 0.2506,
                    "injection": true
                },
                {
                    "probability": 0.0049995,
                    "injection": false
                }
            ]
        },
        {
            "id": 3,
            "name": "Methadone",
            "active": false,
            "population": 29459,
            "transitions": [
                {
                    "id": 3,
                    "name": "Post-Methadone",
                    "probability": 4.5
                },
                {
                    "id": 0,
                    "name": "No Treatment",
                    "probability": 0
                },
                {
                    "id": 1,
                    "name": "Buprenorphine",
                    "probability": 0
                },
                {
                    "id": 2,
                    "name": "Naltrexone",
                    "probability": 0
                },
                {
                    "id": 4,
                    "name": "Detox",
                    "probability": 0
                },
                {
                    "id": 5,
                    "name": "Detention",
                    "probability": 0
                }
            ],
            "overdose": [
                {
                    "probability": 0.2611,
                    "injection": true
                },
                {
                    "probability": 0.0050942,
                    "injection": false
                }
            ]
        },
        {
            "id": 4,
            "name": "Detox",
            "active": false,
            "population": 4487,
            "transitions": [
                {
                    "id": 4,
                    "name": "Post-Detox",
                    "probability": 100
                },
                {
                    "id": 0,
                    "name": "No Treatment",
                    "probability": 0
                },
                {
                    "id": 1,
                    "name": "Buprenorphine",
                    "probability": 0
                },
                {
                    "id": 2,
                    "name": "Naltrexone",
                    "probability": 0
                },
                {
                    "id": 3,
                    "name": "Methadone",
                    "probability": 0
                },
                {
                    "id": 5,
                    "name": "Detention",
                    "probability": 0
                }
            ],
            "overdose": [
                {
                    "probability": 0,
                    "injection": true
                },
                {
                    "probability": 0,
                    "injection": false
                }
            ]
        },
        {
            "id": 5,
            "name": "Detention",
            "active": false,
            "population": 1049,
            "transitions": [
                {
                    "id": 5,
                    "name": "Post-Detention",
                    "probability": 19
                },
                {
                    "id": 0,
                    "name": "No Treatment",
                    "probability": 0
                },
                {
                    "id": 1,
                    "name": "Buprenorphine",
                    "probability": 0
                },
                {
                    "id": 2,
                    "name": "Naltrexone",
                    "probability": 0
                },
                {
                    "id": 3,
                    "name": "Methadone",
                    "probability": 0
                },
                {
                    "id": 4,
                    "name": "Detox",
                    "probability": 0
                }
            ],
            "overdose": [
                {
                    "probability": 0.048649,
                    "injection": true
                },
                {
                    "probability": 0.0047491,
                    "injection": false
                }
            ]
        }
    ]
};

const raw_inputs: Inputs = {
    duration: 52,
    total_population: 10000,
    changing_population: 0,
    fatal_overdoses: 6.25,
    interventions: [
        {
            id: 0,
            name: "No Treatment",
            active: true,
        },
        {
            id: 1,
            name: "Buprenorphine",
            active: false,
            description:
                "Buprenorphine is a medication for opioid use disorder and works as a partial opioid agonist. It ‘diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings’ (SAMHSA).",
            population: Math.ceil(uniform(1100, 1250)),
        },
        {
            id: 2,
            name: "Naltrexone",
            active: false,
            description:
                "Naltrexone is a medication for opioid use disorder and works as an opioid antagonist, binding opioid receptors and blocking the ‘euphoric and sedative effects of opioids’ (SAMHSA). It can also be used to treat alcohol use disorder. Naltrexone for opioid use disorder should not be started until no opioids have been used for at least 7 days.",
            info: true,
            population: Math.ceil(uniform(80, 120)),
        },
        {
            id: 3,
            name: "Methadone",
            active: false,
            population: Math.ceil(uniform(750, 850)),
        },
        {
            id: 4,
            name: "Detox",
            active: false,
            population: 0,
        },
        {
            id: 5,
            name: "Detention",
            active: false,
            population: 0,
        },
    ],
};

const inputs = {
    ...raw_inputs,
    interventions: setTransitions(raw_inputs.interventions).map(
        (intervention) => {
            if (intervention.id !== 0) {
                return setOverdoses(intervention);
            }
            // no treatment needs a population size
            const treatedPopulation = raw_inputs.interventions
                .filter((i) => i.id !== 0)
                .reduce(
                    (accumulator, intervention) =>
                        accumulator + parseInt(intervention.population),
                    0,
                );
            return {
                ...setOverdoses(intervention),
                population: raw_inputs.total_population - treatedPopulation,
            };
        },
    ),
};

function setOverdoses(intervention: Intervention) {
    if (Object.hasOwn(intervention, "overdose")) {
        return intervention.overdose;
    } else {
        return {
            ...intervention,
            overdose: [
                { probability: Math.ceil(uniform(10, 15)), injection: true },
                { probability: Math.ceil(uniform(8, 10)), injection: false },
            ],
        };
    }
}

function makeEmptyTransition(id: number, name: string): Transition {
    return { id: id, name: name, probability: 0 };
}

function setTransitions(interventions: Intervention[]) {
    const newInterventions = interventions.map((intervention) => {
        if (Object.hasOwn(intervention, "transitions")) {
            return intervention.transitions;
        } else {
            const other_interventions: Intervention[] = interventions.filter(
                (i) => i.id != intervention.id,
            );
            const transitions: Transition[] = other_interventions.map((i) => {
                let prob = 0;
                if (intervention.id === 0) {
                    switch (i.id) {
                        case 1: {
                            // Buprenorphine
                            prob = uniform(0, 0.1);
                            break;
                        }
                        case 5: {
                            // Corrections
                            prob = uniform(0.001, 0.01);
                        }
                        default: {
                            // Naltrexone, Methadone, Detox
                            prob = uniform(0, 0.01);
                        }
                    }
                }
                return {
                    id: i.id,
                    name: i.name,
                    probability:
                        prob % 1.0 !== 0 ? (prob * 100).toFixed(4) : prob,
                };
            });

            // id 0 is reserved for no treatment
            if (intervention.id === 0) {
                return { ...intervention, transitions: transitions };
            } else {
                const prob = 19.5 + Math.random();
                return {
                    ...intervention,
                    transitions: [
                        {
                            id: intervention.id,
                            name: `Post-${intervention.name}`,
                            probability: prob.toFixed(4),
                        },
                        ...transitions,
                    ],
                };
            }
        }
    });
    return newInterventions;
}

export {
    Intervention,
    Transition,
    Overdose,
    Inputs,
    realInputs,
    makeEmptyTransition,
};
