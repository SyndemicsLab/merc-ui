import { useState } from "react";
import { getInterventions } from "../../data";
import {
    InterventionTabs,
    InterventionContents
} from "../ui/intervention"
import NamedSlider from "../ui/namedslider";
// import CollapsibleMenu from "../ui/collapsiblemenu";

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

export function GeneralInputs({ population, uptake }: { population: number, uptake: number }) {
    return (
        <div className="general-inputs">
            <NamedSlider inputName={"Initial Population Size (Full Model)"} min={0} max={300000} step={500} defaultValue={population} />
            <NamedSlider inputName={"Change in Population Per Week (Count)"} min={0} max={50000} step={100} defaultValue={uptake} />
            <Interventions />
        </div>
    );
}
