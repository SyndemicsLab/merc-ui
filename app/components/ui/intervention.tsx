import { useState } from "react";
import {
    type Intervention,
    type Transition,
    getInterventions,
    makeEmptyTransition
} from "~/data";
import NamedSlider from "@components/ui/namedslider";

function InterventionTab(
    { intervention, onSelect, onDelete }:
    { intervention: Intervention, onSelect: Function, onDelete: Function }
) {
    return (
	<>
	    <div
		className={`interventionTab${intervention.active ? " active" : ""}`}
		onClick={() => onSelect(intervention.id)}
	    >
		{intervention.name}
		{intervention.id > 0 && (
		    <button className="delete-button"
			    onClick={(event) => {
				onDelete(intervention.id);
				// avoid also selecting the tab underneath while
				// closing (selection overrides deletion)
				event.stopPropagation();
			    }}>
			×
		    </button>
		)}
	    </div>
	</>
    );
}

function InterventionTabs(
    { interventions, onSelectIntervention, onDeleteIntervention, addIntervention }:
    { interventions: Intervention[], onSelectIntervention: Function, onDeleteIntervention: Function, addIntervention: Function }
) {
    // handle bug where no intervention is selected on render; select no
    // treatment
    let noneSelected: boolean = interventions.every(i => i.active === false);
    noneSelected ? onSelectIntervention(0) : null;

    return(
	<>
	    <div className="interventionTabs">
		{interventions.map(intervention => (
			<InterventionTab
			    key={intervention.id}
			    intervention={intervention}
			    onSelect={onSelectIntervention}
			    onDelete={onDeleteIntervention}
			/>
		))}
                <button className="interventionTab addTab" onClick={() => addIntervention()}>
                    + New Intervention
                </button>
	    </div>
	</>
    );
}

function InterventionContent(
    { intervention, transitions, onNameChange }:
    { intervention: Intervention, transitions: Transition[], onNameChange: any }
) {
    return(
	<>
	    <div
		className={`interventionContent${intervention.active ? " active" : ""}`}>
		<div className="inputName">Intervention Name</div>
		{intervention.id > 0 ? (
		    <input
			type="text"
			defaultValue={intervention.name}
			onChange={(event) => onNameChange(event.target.value, intervention.id)}
		    />
		) : (
			<input
			    type="text"
			    value={intervention.name}
			    readOnly={true}
			/>
		)}
		<NamedSlider inputName="Intervention Population Size"
			     min={0} max={4000} step={50} defaultValue={1500} />
		<InterventionTransitions
		    transitions={transitions}
		/>
	    </div>
	</>
    );
}

function InterventionContents(
    { interventions, onInterventionNameChange }:
    { interventions: Intervention[], onInterventionNameChange: any}
) {
    return(
	<>
	    <div className="interventionContents">
		{interventions.map(intervention => (
		    <InterventionContent
			key={intervention.id}
			intervention={intervention}
			transitions={intervention.transitions}
			onNameChange={onInterventionNameChange}
		    />
		))}
	    </div>
	</>
    );
}

function InterventionTransitions(
    { transitions }:
    { transitions: Transition[] }
) {
    let sumProbs: number = transitions.reduce((accumulator, transition) =>
	accumulator + transition.probability, 0);
    return(
	<>
	    <NamedSlider inputName="Retention Rate"
			 min={0} max={1} step={0.01}
			 defaultValue={Math.max(1-sumProbs, 0)} readOnly={true}
	    />
	    {transitions.map((transition) => (
		<NamedSlider
		    key={transition.id}
		    inputName={`Proportion Transitioning to ${transition.name}`}
		    min={0} max={1} step={0.01}
		    defaultValue={transition.probability}
		/>
	    ))}
	</>
    );
}

export default function Interventions() {
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
		]}
	    );
	});
	setInterventions([
	    ...newInterventions,
	    {
		id: id,
		name: name,
		active: false,
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
	let deletingActive: boolean = interventions.find(i => i.id === id).active;
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

    function constrainValues(values: number[], limit: number) {
	let sumValues: number = values.reduce(
	    (accumulator, value) => accumulator + value,
	    0
	);
    }

    return (
        <>
	    <div id="interventions">
		<InterventionTabs
		    interventions={interventions}
		    onSelectIntervention={selectIntervention}
		    onDeleteIntervention={deleteIntervention}
		    addIntervention={addIntervention}
		/>
		<InterventionContents
		    interventions={interventions}
		    onInterventionNameChange={changeInterventionName}
		/>
	    </div>
        </>
    );
}
