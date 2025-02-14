// This is meant to be a temporary file replicating what would be held in a
// cloud data source

export interface Intervention {
    id: number;
    name: string;
    active: boolean;
}

export interface Transition {
    id: number;
    name: string;
    probability: number;
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
    const interventions: Intervention[] = setTransitions(simulation.getAll());
    return interventions;
}

export function makeEmptyTransition(id: number, name: string): Transition {
    return { id: id, name: name, probability: 0 };
}

function setTransitions(interventions: Intervention[]) {
    let newInterventions = interventions.map((intervention) => {
	if (Object.hasOwn(intervention, "transitions")) {
	    return intervention.transitions;
	} else {
	    let other_interventions: Intervention[] = interventions.filter(
		i => i.id != intervention.id
	    );
	    let transitions: Transition[] = other_interventions.map((i) => {
		return {
		    id: i.id,
		    name: i.name,
		    probability: (0.25 / other_interventions.length).toFixed(2),
		};
	    })

	    // id 0 is reserved for no treatment
	    if (intervention.id === 0) {
		return(
		    {...intervention,
		     transitions: transitions}
		);
	    } else {
		return(
		    {...intervention,
		     transitions: [{
			 id: intervention.id,
			 name: `Post-${intervention.name}`,
			 probability: 0.2
		     }, ...transitions]
		    }
		);
	    }
	}
    });
    return newInterventions;
}
