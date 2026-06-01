interface Intervention {
    id: number;
    name: string;
    active: boolean;
    description?: string;
    info?: boolean;
    population: number;
    postPopulation?: number;
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

function makeEmptyTransition(id: number, name: string): Transition {
    return { id: id, name: name, probability: 0 };
}

export type { Intervention, Transition, Overdose, Inputs };
export { makeEmptyTransition };
