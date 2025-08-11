import { useState } from "react";
import {
    type Intervention,
    type Transition,
    getInterventions,
    makeEmptyTransition
} from "~/data";
import Tabs from "@simulation/interventions/tabs";
import Contents from "@simulation/interventions/contents";

export default function Interventions(totalPopulation: number) {
    const [interventions, setInterventions] = useState(getInterventions);

    // generate an ID for a new intervention, avoiding duplicates
    function getInterventionID(): number {
	let id = 1;
	let used = interventions.map((intervention) => intervention.id);
	while (used.includes(id)) {
	    id += 1;
	}
	return(id);
    }

    // generate a name for a new intervention
    function getNewInterventionName(): string {
	let num = 1;
	let used = interventions.map((intervention) => intervention.name);
	while (used.includes(`New Intervention ${num}`)) {
	    num += 1;
	}
	return(`New Intervention ${num}`);
    }

    // add a new intervention
    function addIntervention() {
	let id: number = getInterventionID();
	let name: string = getNewInterventionName();
	let newInterventions: Intervention[] = interventions.map(i => {
	    return(
		{...i, transitions: [
		    ...i.transitions, makeEmptyTransition(id, name)
		], active: false}
	    );
	});
	setInterventions([
	    ...newInterventions,
	    {
		id: id,
		name: name,
		active: true,
                population: 0,
		transitions: [
		    makeEmptyTransition(id, `Post-${name}`),
		    ...newInterventions.map(i => {
			return makeEmptyTransition(i.id, i.name);
		    })
		]
	    }
	]);
    }

    // select a new active intervention
    function selectIntervention(id: number) {
	setInterventions(interventions.map(i => {
	    if (i.id === id) {
		i.active = true;
	    } else {
		i.active = false;
	    }
	    return i;
	}));
    }

    // delete an intervention
    function deleteIntervention(id: number) {
	let toDelete: Intervention = {...interventions.find(i => i.id === id)};
	let deletingActive: boolean = toDelete.active;
	let newInterventions: Intervention[] = interventions.map(
	    intervention => {
		// remove the transition associated with the intervention being
		// deleted
		let newIntervention: Intervention = {
		    ...intervention,
		    transitions: intervention.transitions.filter(t => t.id !== id)
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
	newInterventions = newInterventions.filter(i => i.id !== id);
	setInterventions(newInterventions);
    }

    // handle the change of intervention name
    function changeInterventionName(newName: string, id: number) {
	// insert a placeholder for the intervention if the user leaves the name
	// blank
	let updatedName = newName === "" ? "<no name>" : newName;
        let newInterventions = interventions.map((intervention) => {
	    let transitions = intervention.transitions.map(t => {
		if (t.id === id) {
		    if (intervention.id === id) {
			return {...t, name: `Post-${updatedName}`};
		    } else {
			return {...t, name: updatedName};
		    }
		}
		return t;
	    });
	    if (intervention.id === id) {
		return {...intervention, name: updatedName, transitions: transitions};
	    } else {
		return {...intervention, transitions: transitions};
	    }
	});
        setInterventions(newInterventions);
    }

    function constrainValues(values: number[], limit: number, decimals?: number = 2): boolean {
	let sumValues: number = values.reduce(
	    (accumulator, value) => accumulator + parseFloat(value),
	    0
	).toFixed(decimals);

	if (sumValues > limit) {
	    return(true);
	}
	return(false);
    }

    function changeTransition(value: number, interventionID: number, transitionID: number) {
	let newInterventions = interventions.map(i => {
	    if (i.id === interventionID) {
		return {...i, transitions: i.transitions.map(t => {
		    if (t.id === transitionID) {
			return {...t, probability: value};
		    }
		    return t;
		})};
	    }
	    return i;
	});

	let newTransitionProbabilities: number[] = newInterventions.find(
	    i => i.id === interventionID
	).transitions.map(
	    t => t.probability
	);

	// check if the sum of the transition probabilities exceeds the limit
	// and prevent the change if it would cause an excess of the limit
	if (constrainValues(newTransitionProbabilities, 1.0000)) {
	    return;
	}
	setInterventions(newInterventions);
    }

    function changePopulation(value: number, interventionID: number) {
	let newInterventions = interventions.map(i => {
	    if (i.id === interventionID) {
		return {...i, population: value};
	    }
	    return i;
	});

        if (constrainValues(newInterventions.map(i => i.population), totalPopulation)) {
            return;
        }
        setInterventions(newInterventions);
    }

    return (
        <>
	    <div id="interventions">
		<Tabs
		    interventions={interventions}
		    onSelectIntervention={selectIntervention}
		    onDeleteIntervention={deleteIntervention}
		    addIntervention={addIntervention}
		/>
		<Contents
		    interventions={interventions}
		    onInterventionNameChange={changeInterventionName}
		    onInterventionChangeTransition={changeTransition}
                    onInterventionPopulationChange={changePopulation}
		/>
	    </div>
        </>
    );
}
