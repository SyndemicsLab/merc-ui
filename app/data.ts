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

const raw_inputs: Inputs = {
    duration: 260,
    population: 214801,
    entering: 5784,
    fod: 6.25,
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
            description: "Buprenorphine is a medication for opioid use disorder and works as a partial opioid agonist. It ‘diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings’ (SAMHSA).",
            population: 1500,
        },
        {
            id: 2,
            name: "Naltrexone",
            active: false,
            description: "Naltrexone is a medication for opioid use disorder and works as an opioid antagonist, binding opioid receptors and blocking the ‘euphoric and sedative effects of opioids’ (SAMHSA). It can also be used to treat alcohol use disorder. Naltrexone for opioid use disorder should not be started until no opioids have been used for at least 7 days.",
            info: true,
            population: 2500,
        },
        {
            id: 3,
            name: "Methadone",
            active: false,
            population: 3500,
        },
        {
            id: 4,
            name: "Detox",
            active: false,
            population: 5000,
        },
        {
            id: 5,
            name: "Detention",
            active: false,
            population: 2000,
        },
    ],
}

const inputs = {
    ...raw_inputs,
    interventions: setTransitions(raw_inputs.interventions).map(
        (intervention) => setOverdoses(intervention)
    )
};

function uniform(a, b) {
    return a + Math.random() * (b - a);
}

function setOverdoses(intervention: Intervention) {
    if (Object.hasOwn(intervention, "overdose")) {
        return intervention.overdose;
    } else {
        return {
            ...intervention,
            overdose: [
                { probability: Math.ceil(uniform(10, 15)), injection: true },
                { probability: Math.ceil(uniform(8, 10)), injection: false }
            ]
        };
    }

}

function getInterventions(): Intervention[] {
    const interventions: Intervention[] = setTransitions(inputs.getAll());
    return interventions;
}

function makeEmptyTransition(id: number, name: string): Transition {
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
                    probability: intervention.id === 0 ? (25 / other_interventions.length).toFixed(2) : 0,
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

export {
    Intervention,
    Transition,
    Overdose,
    Inputs,
    inputs,
    getInterventions,
    makeEmptyTransition
};
