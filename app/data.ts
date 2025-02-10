// This is meant to be a temporary file replicating what would be held in a cloud data source

export interface Intervention {
    id: number;
    name: string;
    active: boolean;
}

interface Simulation {
    interventions: Intervention[];
}

const simulation: Simulation = {
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
        },
        {
            id: 2,
            name: "Naltrexone",
	    active: false,
        },
        {
            id: 3,
            name: "Methadone",
	    active: false,
        },
        {
            id: 4,
            name: "Detox",
	    active: false,
        },
    ],

    getAll(): Promise<Intervention[]> {
        return this.interventions;
    },
}

export function getInterventions(): Intervention[] {
    let interventions = simulation.getAll();
    return interventions;
}
