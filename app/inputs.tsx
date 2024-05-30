import {
    useState,
} from "react";
import {
    Form,
    useFetcher,
    useSubmit,
} from "@remix-run/react";
import {
    getInterventions,
} from "./constants";

// Function component for sliders in Inputs
export function InputSlider({
    inputName,
    min,
    max,
    step,
    defaultValue
}): React.TSX.Element {
    const [value, setValue] = useState(defaultValue);
    const fetcher = useFetcher();

    return(
	<>
	    <fetcher.Form>
		<div className="inputName">{ inputName }</div>
		<div className="slider">
		    <input
			type="number"
			min={ min } max={ max } step={ step }
			value={ value } name={`${inputName}-num`}
			onChange={(event) => setValue(event.target.value)}
		    />
		    <input
			type="range" min={ min } max={ max }
			step={ step } value={ value }
			id={`${inputName}-slider`}
			onChange={(event) => setValue(event.target.value)}
		    />
		</div>
	    </fetcher.Form>
	</>
    );
}

function CollapsibleMenu({
    sectionName,
    context,
    contents,
    defaultState
}): React.TSX.Element {
    const [collapsed, setCollapsed] = useState(defaultState);

    return(
	<>
	    <input id={`collapsed-${context}`} type="checkbox"
		   value={ collapsed }
		   onChange={(event) => setCollapsed(event.target.checked)}
	    />
	    <label htmlFor={`collapsed-${context}`}
		   className={`collapse-toggle ${ collapsed ? "opened" : ""}`}>
		{ sectionName }
	    </label>
	    <div className={ collapsed ? "unhidden" : "hidden" }>
		{ contents }
	    </div>
	</>
    );
}

export function Interventions() {
    const [interventions, setInterventions] = useState(getInterventions());
    const [numNewInterventions, setNumNewInterventions] = useState(1);

    function handleAdditionalIntervention() {
	let newInterventions = interventions.concat({
	    id: interventions.length + numNewInterventions,
	    name: `New Intervention ${numNewInterventions}`,
	});

	setInterventions(newInterventions);
	setNumNewInterventions(numNewInterventions + 1);
    }

    function changeInterventionName(
	newName: string,
	interventionIndex: number,
    ) {
	let newInterventions = interventions;
	newInterventions[interventionIndex].name = newName;

	setInterventions(newInterventions);
    }

    let interventionTabs = [];
    let interventionContents = [];

    // adds the "Add Tab" tab
    interventionTabs.push(
 	<>
 	    <button className="interventionTab addTab"
 		    key={ crypto.randomUUID() }
 		    onClick={ handleAdditionalIntervention }
 	    >+</button>
 	</>
    );

    for (let i = 0; i < interventions.length; i++) {
 	let intervention = interventions[i];

 	// No Treatment is the default open state
 	let defaultOpen = intervention.name == "No Treatment";

 	let defaultActiveTab = defaultOpen ? " active" : "";
 	// add tab to intervention tab list
 	interventionTabs.push(
 	    <>
 		<button className={`interventionTab ${intervention.name}${defaultActiveTab}`}
 			key={ crypto.randomUUID() }
 			onClick={(event) => {
			    let tabs = document.getElementsByClassName("interventionTab");
			    for (let i = 1; i <= interventions.length; i++) {
				tabs[i].className = tabs[i].className.replace(" active", "");
			    }

			    let tabContents = document.getElementsByClassName("interventionContent");

			    for (let i = 0; i < tabContents.length; i++) {
				tabContents[i].style.display = "none";
				tabContents[i].className = tabContents[i].className.replace(" defaultOpen", "");
			    }

			    document.getElementById(intervention.name).style.display = "block";
			    event.target.className += " active";
			}}
 		>
 		    { intervention.name }
 		</button>
 	    </>
 	);

 	// populate interventionContents
        let defaultActiveContent = defaultOpen ? "defaultOpen" : "";
        interventionContents.push(
	    <>
		<div className={ `interventionContent ${defaultActiveContent}` }
		     key={ crypto.randomUUID() }
		     id={ intervention.name }
		>
		    <div className="inputName">Intervention Name</div>
		    <div>
			<Form
			    id="intervention-name"
			    method="post">
		    	    <input
		    		type="text"
		    		defaultValue={ intervention.name }
		    	    />
			</Form>
		    </div>
		    <InputSlider
			inputName="Intervention Population Size"
			min={0} max={4000} step={50}
			defaultValue={1500}
		    />
		    <InputSlider
			inputName="Retention Rate"
			min={0} max={1} step={0.01}
			defaultValue={0.8}
		    />
		    {
			// render intervention transitions
			(() => {
			    let transitionList = [];
			    for (let j = 0; j < interventions.length; j++) {
				// exclude transition to the same state
				if (j != i) {
				    transitionList.push(
					<InputSlider
					    key={`${i}:${j}`}
					    inputName={`Proportion Transitioning to ${interventions[j].name}`}
					    min={0} max={1} step={0.01}
					    defaultValue={0.2/(interventions.length - 1)}
					/>
				    );
				}
			    }
			    return(
				<>
				    {transitionList}
				</>
			    );
			})()
		    }
		    {
			(() => {
			    const oudTransitions = [];
			    const oudStates = [
				"Active Injection",
				"Active Non-Injection",
				"Non-Active Injection",
				"Non-Active Non-Injection",
			    ];
			    for (let j = 0; j < oudStates.length; j++) {
				let from = oudStates[j];
				for (let k = 0; k < oudStates.length; k++) {
				    let to = oudStates[k];
				    if (j != k) {
					oudTransitions.push(
					    <InputSlider
						inputName={`Proportion Transitioning from ${from} to ${to}`}
						min={0} max={1} step={0.01}
						defaultValue={0.25}
					    />
					);
				    } else {
					oudTransitions.push(
					    <InputSlider
						inputName={`Proportion Retained in ${to}`}
						min={0} max={1} step={0.01}
						defaultValue={0.25}
					    />
					);

				    }
				}
			    }
			    return(
				<>
				    <CollapsibleMenu
					sectionName={"OUD Transitions"}
					context={ `oud-${intervention.name}` }
					contents={oudTransitions}
					defaultState={ false }
				    />
				</>
			    );
			})()
		    }
	    </div>
	    </>
        );
    }

    return (
 	<>
 	    <div className="interventionTabs">
 		{ interventionTabs }
 	    </div>
 	    <div className="interventionContents">
 		{ interventionContents }
 	    </div>
 	</>
    );
}

export function GeneralInputs({
    population,
    uptake,
}) {
    return(
	<>
	    <InputSlider
		inputName={"Initial Population Size (Full Model)"}
		min={0} max={300000} step={500} defaultValue={population}/>
	    <InputSlider
		inputName={"Change in Population Per Week (Count)"}
		min={0} max={50000} step={100} defaultValue={uptake}/>
	    <Interventions/>
	</>
    );
}

export function UploadForm({
    id,
    inputName,
}) {
    const fetcher = useFetcher();

    return(
	<>
	    <fetcher.Form
		id={ id }>
		<div className="inputName">{ inputName }</div>
		<input type="file"/>
	    </fetcher.Form>
	</>
    );
}

export function AdvancedInputs() {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return(
	<>
	    <input
		id="show-advanced"
		type="checkbox"
		onChange={(event) => setShowAdvanced(event.target.checked)}
	    />
	    <label htmlFor="show-advanced" id="advanced-options">
		<div className="advanced-options-text">
		    Advanced Options
		</div>
	    </label>
	    <div id="advanced" className={ showAdvanced ? "unhidden" : "hidden" }>
		<UploadForm
		    id="sim-conf"
		    inputName="General Configuration File (sim.conf)"
		/>
		<UploadForm
		    id="overdose"
		    inputName="All Types Overdose (all_types_overdose.csv)"
		/>
		<UploadForm
		    id="mort"
		    inputName="Background Mortality (background_mortality.csv)"
		/>
		<UploadForm
		    id="smr"
		    inputName="Standardized Mortality Ratio (SMR.csv)"
		/>
		<UploadForm
		    id="init_effect"
		    inputName="Treatment Initialization Effect (block_init_effect.csv)"
		/>
		<UploadForm
		    id="block_trans"
		    inputName="Treatment Transition Proportions (block_trans.csv)"
		/>
		<UploadForm
		    id="entering"
		    inputName="Entering Cohort (entering_cohort.csv)"
		/>
		<UploadForm
		    id="fod"
		    inputName="Fatal Overdose Proportions (fatal_overdose.csv)"
		/>
		<UploadForm
		    id="initial"
		    inputName="Initial Population (init_cohort.csv)"
		/>
		<UploadForm
		    id="oud"
		    inputName="Drug Use State Transitions (oud_trans.csv)"
		/>
	    </div>
	</>
    );
}

export function EmailForm() {
    const fetcher = useFetcher();

    return(
	<>
            <fetcher.Form
                id="email">
                <div className="inputName">Email Results</div>
                <div className="email-form">
                    <div id="email-check">
                        <input
                            type="checkbox"
                        />
                    </div>
                    <input
                        id="email-address"
                        type="text"
                        placeholder="Email Address"
                    />
                </div>
            </fetcher.Form>
	</>
    );
}

export function Disclaimers() {
    const message = "RESPOND is calibrated to Massachusetts data. If attempting to use the model to characterize another jurisdiction, the user will need to provide data for said jurisdiction."
    return(
	<>
	    <div id="disclaimers">
		<h3>Disclaimers</h3>
		<b className="warn">{message}</b>
	    </div>
	</>
    );
}
