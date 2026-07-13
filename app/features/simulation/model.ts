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

interface DurationRange {
    min: number;
    max: number;
}

interface Inputs {
    duration: DurationRange;
    total_population: number;
    changing_population: number;
    fatal_overdoses: number;
    interventions: Intervention[];
}

function makeEmptyTransition(id: number, name: string): Transition {
    return { id: id, name: name, probability: 0 };
}

function coerceDurationRange(duration: number | DurationRange): DurationRange {
    if (typeof duration === "number") {
        return { min: duration, max: duration };
    }

    return {
        min: duration.min,
        max: duration.max,
    };
}

function serializeDurationForRun(duration: number | DurationRange): number {
    if (typeof duration === "number") {
        return duration;
    }

    return Math.max(duration.min, duration.max);
}

export type { Intervention, Transition, Overdose, Inputs, DurationRange };
export { makeEmptyTransition, coerceDurationRange, serializeDurationForRun };
