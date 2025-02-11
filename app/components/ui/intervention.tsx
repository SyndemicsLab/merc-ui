import type { Intervention } from "../../data";
import NamedSlider from "../ui/namedslider";
import { useState } from "react";
import { getInterventions } from "../../data";

function InterventionTab(
    { intervention, onSelect, onDelete }:
    { intervention: Intervention, onSelect: any, onDelete: any }
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
				// avoid also selecting the tab while closing
				event.stopPropagation();
			    }}>
			×
		    </button>
		)}
	    </div>
	</>
    );
}

export function InterventionTabs(
    { interventions, onSelectIntervention, onDeleteIntervention, addIntervention }:
    { interventions: Intervention[], onSelectIntervention: any, onDeleteIntervention: any, addIntervention }
) {
    // handle bug where no intervention is selected on render; select no
    // treatment
    let noneSelected: boolean = interventions.every(i => i.active === false);
    noneSelected ? onSelectIntervention(0): null;

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
    { intervention, onNameChange }:
    { intervention: Intervention, onNameChange: any }
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
		<NamedSlider inputName="Retention Rate"
			     min={0} max={1} step={0.01} defaultValue={0.8} readOnly={true} />
		<NamedSlider inputName="Proportion Transitioning to Buprenorphine"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
		<NamedSlider inputName="Proportion Transitioning to Naltrexone"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
		<NamedSlider inputName="Proportion Transitioning to Methadone"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
		<NamedSlider inputName="Proportion Transitioning to Detox"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
	    </div>
	</>
    );
}

export function InterventionContents(
    { interventions, onInterventionNameChange }:
    { interventions: Intervention[], onInterventionNameChange: any }
) {
    return(
	<>
	    <div className="interventionContents">
		{interventions.map(intervention => (
		    <InterventionContent
			key={intervention.id}
			intervention={intervention}
			onNameChange={onInterventionNameChange}
		    />
		))}
	    </div>
	</>
    );
}

export function Interventions() {
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
	return(`New Intervention ${num}`)
    }

    // add a new intervention
    function addIntervention() {
	setInterventions([
	    ...interventions,
	    {
		id: getInterventionID(),
		name: getNewInterventionName(),
		active: false
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
	let deletingActive: boolean = interventions[idToIndex(id)].active;
	let newInterventions: Intervention[] = interventions.map(
	    intervention => {
		// open no treatment when deleting the active intervention tab
		if (deletingActive) {
		    if (intervention.id === 0) {
			return {...intervention, active: true };
		    }
		}
		return intervention;
	    }
	);
	newInterventions = newInterventions.filter(i => i.id !== id);
	setInterventions(
	    newInterventions
	);
    }

    // handle the change of intervention name
    function changeInterventionName(newName: string, id: number) {
        let newInterventions = interventions.map((intervention) => {
	    // insert a placeholder for the intervention if the user leaves the
	    // name blank
	    if (intervention.id === id) {
		return {...intervention, name: (newName === "" ? "<no name>" : newName)};
	    }
	    return intervention;
	});
        setInterventions(newInterventions);
    }

    // get the array index of an intervention based on its id
    function idToIndex(id: number) {
	for (let i = 0; i < interventions.length; i++) {
	    if (interventions[i].id == id) {
		return(i);
	    }
	}
    }

            {/* <CollapsibleMenu
                sectionName={"OUD Transitions"}
                context={`oud-${intervention.name}`}
                contents={
                    <>
                        {["Active Injection", "Active Non-Injection", "Non-Active Injection", "Non-Active Non-Injection"].map((state) =>
                            ["Active Injection", "Active Non-Injection", "Non-Active Injection", "Non-Active Non-Injection"].map(
                                (target) =>
                                    state !== target && (
                                        <NamedSlider
                                            key={`${state}-to-${target}`}
                                            inputName={`Proportion Transitioning from ${state} to ${target}`}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            defaultValue={0.25}
                                        />
                                    )
                            )
                        )}
                    </>
                }
                defaultState={false}
            /> */}

    return (
        <>
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
        </>
    );
}
