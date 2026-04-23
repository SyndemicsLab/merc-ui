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
    total_population: number;
    changing_population: number;
    fatal_overdoses: number;
    interventions: Intervention[];
}

const inputs: Inputs = {
    duration: 52,
    total_population: 227892,
    changing_population: -1060.93708737323,
    fatal_overdoses: 12.8128815628816,
    interventions: [
        {
            id: 0,
            name: "No Treatment",
            active: true,
            transitions: [
                {
                    id: 1,
                    name: "Buprenorphine",
                    probability: 1.3243,
                },
                {
                    id: 2,
                    name: "Naltrexone",
                    probability: 0.18259,
                },
                {
                    id: 3,
                    name: "Methadone",
                    probability: 0.79229,
                },
                {
                    id: 4,
                    name: "Detox",
                    probability: 0.0027592,
                },
                {
                    id: 5,
                    name: "Detention",
                    probability: 0.0027542,
                },
            ],
            overdose: [
                {
                    probability: 0.79074,
                    injection: true,
                },
                {
                    probability: 0.0056295,
                    injection: false,
                },
            ],
            population: 127042,
        },
        {
            id: 1,
            name: "Buprenorphine",
            active: false,
            description:
                "Buprenorphine is a medication for opioid use disorder and works as a partial opioid agonist. It ‘diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings’ (SAMHSA).",
            population: 56376,
            transitions: [
                {
                    id: 1,
                    name: "Post-Buprenorphine",
                    probability: 14.58,
                },
                {
                    id: 0,
                    name: "No Treatment",
                    probability: 0,
                },
                {
                    id: 2,
                    name: "Naltrexone",
                    probability: 0,
                },
                {
                    id: 3,
                    name: "Methadone",
                    probability: 0,
                },
                {
                    id: 4,
                    name: "Detox",
                    probability: 0,
                },
                {
                    id: 5,
                    name: "Detention",
                    probability: 0,
                },
            ],
            overdose: [
                {
                    probability: 0.2542,
                    injection: true,
                },
                {
                    probability: 0.0050942,
                    injection: false,
                },
            ],
        },
        {
            id: 2,
            name: "Naltrexone",
            active: false,
            description:
                "Naltrexone is a medication for opioid use disorder and works as an opioid antagonist, binding opioid receptors and blocking the ‘euphoric and sedative effects of opioids’ (SAMHSA). It can also be used to treat alcohol use disorder. Naltrexone for opioid use disorder should not be started until no opioids have been used for at least 7 days.",
            info: true,
            population: 9479,
            transitions: [
                {
                    id: 2,
                    name: "Post-Naltrexone",
                    probability: 14.58,
                },
                {
                    id: 0,
                    name: "No Treatment",
                    probability: 0,
                },
                {
                    id: 1,
                    name: "Buprenorphine",
                    probability: 0,
                },
                {
                    id: 3,
                    name: "Methadone",
                    probability: 0,
                },
                {
                    id: 4,
                    name: "Detox",
                    probability: 0,
                },
                {
                    id: 5,
                    name: "Detention",
                    probability: 0,
                },
            ],
            overdose: [
                {
                    probability: 0.2506,
                    injection: true,
                },
                {
                    probability: 0.0049995,
                    injection: false,
                },
            ],
        },
        {
            id: 3,
            name: "Methadone",
            active: false,
            population: 29459,
            transitions: [
                {
                    id: 3,
                    name: "Post-Methadone",
                    probability: 4.5,
                },
                {
                    id: 0,
                    name: "No Treatment",
                    probability: 0,
                },
                {
                    id: 1,
                    name: "Buprenorphine",
                    probability: 0,
                },
                {
                    id: 2,
                    name: "Naltrexone",
                    probability: 0,
                },
                {
                    id: 4,
                    name: "Detox",
                    probability: 0,
                },
                {
                    id: 5,
                    name: "Detention",
                    probability: 0,
                },
            ],
            overdose: [
                {
                    probability: 0.2611,
                    injection: true,
                },
                {
                    probability: 0.0050942,
                    injection: false,
                },
            ],
        },
        {
            id: 4,
            name: "Detox",
            active: false,
            population: 4487,
            transitions: [
                {
                    id: 4,
                    name: "Post-Detox",
                    probability: 100,
                },
                {
                    id: 0,
                    name: "No Treatment",
                    probability: 0,
                },
                {
                    id: 1,
                    name: "Buprenorphine",
                    probability: 0,
                },
                {
                    id: 2,
                    name: "Naltrexone",
                    probability: 0,
                },
                {
                    id: 3,
                    name: "Methadone",
                    probability: 0,
                },
                {
                    id: 5,
                    name: "Detention",
                    probability: 0,
                },
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
        },
        {
            id: 5,
            name: "Detention",
            active: false,
            population: 1049,
            transitions: [
                {
                    id: 5,
                    name: "Post-Detention",
                    probability: 19,
                },
                {
                    id: 0,
                    name: "No Treatment",
                    probability: 0,
                },
                {
                    id: 1,
                    name: "Buprenorphine",
                    probability: 0,
                },
                {
                    id: 2,
                    name: "Naltrexone",
                    probability: 0,
                },
                {
                    id: 3,
                    name: "Methadone",
                    probability: 0,
                },
                {
                    id: 4,
                    name: "Detox",
                    probability: 0,
                },
            ],
            overdose: [
                {
                    probability: 0.048649,
                    injection: true,
                },
                {
                    probability: 0.0047491,
                    injection: false,
                },
            ],
        },
    ],
};

function makeEmptyTransition(id: number, name: string): Transition {
    return { id: id, name: name, probability: 0 };
}

export type { Intervention, Transition, Overdose, Inputs };
export { inputs, makeEmptyTransition };
