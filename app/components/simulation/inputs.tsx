import { useState } from "react";
import { Form } from "react-router";
import { getInterventions } from "../../data";
import NamedSlider from "../ui/namedslider";
// import CollapsibleMenu from "../ui/collapsiblemenu";

export function Interventions() {
    const [interventions, setInterventions] = useState(getInterventions());
    const [activeIntervention, setActiveIntervention] = useState(0);

    // generate IDs for new interventions
    function getInterventionID() {
	let id = 1;
	let used = interventions.map((intervention) => intervention.id);
	while (used.includes(id)) {
	    id += 1;
	}
	return(id);
    }

    // generate names for new interventions
    function getInterventionName() {
	let num = 1;
	let used = interventions.map((intervention) => intervention.name);
	while (used.includes(`New Intervention ${num}`)) {
	    num += 1;
	}
	return(`New Intervention ${num}`)
    }

    // handle the addition of a new intervention
    function addIntervention() {
        let newInterventions = interventions.concat({
            id: getInterventionID(),
            name: getInterventionName(),
        });

        setInterventions(newInterventions);
    }

    // handle the deletion of an intervention
    function deleteIntervention(id: number) {
        setInterventions(interventions.filter((intervention) => intervention.id !== id));
	setActiveIntervention(0);
    }

    // handle the change of intervention name
    function changeInterventionName(newName: string, id: number) {
	let interventionIndex = idToIndex(id);
        let newInterventions = interventions;
        newInterventions[interventionIndex].name = newName;
        setInterventions(newInterventions);
    }

    function idToIndex(id: number) {
	for (let i = 0; i < interventions.length; i++) {
	    if (interventions[i].id == id) {
		return(i);
	    }
	}
    }

    // Create intervention tabs with delete button for additional interventions
    let interventionTabs = interventions.map((intervention) => (
        <div
	    key={intervention.id}
	    className={`interventionTab ${intervention.id === activeIntervention ? "active" : ""}`}
	    onClick={() => setActiveIntervention(intervention.id)}
	>
            {intervention.name}
            {intervention.id > 0 && (
                <button className="delete-button"
			onClick={() => deleteIntervention(intervention.id)}>
                    ×
                </button>
            )}
        </div>
    ));

    // Create intervention contents for each intervention
    let interventionContents = interventions.map((intervention) => (
        <div key={intervention.id} className={`interventionContent`}
	     style={{ display: intervention.id == activeIntervention ? "block" : "none" }}>
            <div className="inputName">Intervention Name</div>
            <input
                type="text"
                defaultValue={intervention.name}
                onChange={(e) => changeInterventionName(e.target.value, intervention.id)}
            />
            <NamedSlider inputName="Intervention Population Size"
			 min={0} max={4000} step={50} defaultValue={1500} />
            <NamedSlider inputName="Retention Rate"
			 min={0} max={1} step={0.01} defaultValue={0.8} />
            <NamedSlider inputName="Proportion Transitioning to Buprenorphine"
			 min={0} max={1} step={0.01} defaultValue={0.2} />
            <NamedSlider inputName="Proportion Transitioning to Naltrexone"
			 min={0} max={1} step={0.01} defaultValue={0.2} />
            <NamedSlider inputName="Proportion Transitioning to Methadone"
			 min={0} max={1} step={0.01} defaultValue={0.2} />
            <NamedSlider inputName="Proportion Transitioning to Detox"
			 min={0} max={1} step={0.01} defaultValue={0.2} />
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
        </div>
    ));

    return (
        <>
            <div className="interventionTabs">
                {interventionTabs}
                <button className="interventionTab addTab" onClick={addIntervention}>
                    + New Treatment
                </button>
            </div>
            <div className="interventionContents">{interventionContents}</div>
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
