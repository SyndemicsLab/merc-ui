interface Intervention {
    id: number;
    name: string;
}

interface Simulation {
    interventions: Intervention[];
}

const simulation: Simulation = {
    interventions: [
	{
	    id: 0,
	    name: "No Treatment",
	},
	{
	    id: 1,
	    name: "Buprenorphine",
	},
	{
	    id: 2,
	    name: "Naltrexone",
	},
	{
	    id: 3,
	    name: "Methadone",
	},
	{
	    id: 4,
	    name: "Detox",
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
