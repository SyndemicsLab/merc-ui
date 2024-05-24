// type imports
import type {
    MetaFunction
} from "@remix-run/node";
import type {
    Intervention
} from "../constants";
// method imports
import {
    Form,
    Outlet,
    useSubmit,
} from "@remix-run/react";
import {
    useState,
    Component
} from "react";

import {
    getInterventions,
} from "../constants";
import {
    System
} from "../system";

// Function component for sliders in Inputs
function InputSlider({
    inputName,
    min,
    max,
    step,
    defaultValue
}): React.TSX.Element {
    const [value, setValue] = useState(defaultValue);
    return(
	<>
	    <Form>
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
	    </Form>
	</>
    );
}

function Interventions() {
    const [interventions, setInterventions] = useState(getInterventions());
    const [numNewInterventions, setNumNewInterventions] = useState(1);
    const submit = useSubmit();

    function handleAdditionalIntervention() {
	let newInterventions = interventions.concat({
	    id: interventions.length + numNewInterventions,
	    name: `New Intervention ${numNewInterventions}`,
	});

	setInterventions(newInterventions);
	setNumNewInterventions(numNewInterventions + 1);
    }

    function changeInterventionName(
	formData: string,
    ) {
    }

    let interventionTabs = [];
    let interventionContents = [];

    for (let i = 0; i < interventions.length; i++) {
 	let intervention = interventions[i];

 	// No Treatment is the default open state
 	let defaultOpen = intervention.name == "No Treatment";

 	let defaultActiveTab = defaultOpen ? " active" : "";
 	// add tab to intervention tab list
 	interventionTabs.push(
 	    <>
 		<button className={`interventionTab${defaultActiveTab}`}
 			key={ crypto.randomUUID() }
 			onClick={(event) => {
			    let tabs = document.getElementsByClassName("interventionTab");
			    for (let i = 0; i < interventions.length; i++) {
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
		    <Form
			id="intervention-name"
			action={ changeInterventionName }>
			<input
			    type="text"
			    defaultValue={ intervention.name }
			/>
		    </Form>
		    <InputSlider
			inputName="Intervention Population Size"
			min={0} max={4000} step={50}
			defaultValue={1500}
		    />
		</div>
	    </>
        );
    }

    // adds the "Add Tab" tab
    interventionTabs.push(
 	<>
 	    <button className="interventionTab addTab"
 		    key="addTab"
 		    onClick={ handleAdditionalIntervention }
 	    >+</button>
 	</>
    );

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

function GeneralInputs({
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

function UploadForm({
    id,
    inputName,
}) {
    return(
	<>
	    <Form
		id={ id }>
		<div className="inputName">{ inputName }</div>
		<input type="file"/>
	    </Form>
	</>
    );
}

function AdvancedInputs() {
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
	    <div id="advanced" className={ showAdvanced ? "" : "hidden" }>
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

function EmailForm() {
    return(
	<>
            <Form
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
            </Form>
	</>
    );
}

export default function Index() {
    const population = 214000;
    const uptake = 5000;

    return (
        <div>
	    <System/>
            <hr/>
	    <div id="inputs">
		<h1>Inputs</h1>
		<GeneralInputs
		    population={population}
		    uptake={uptake}
		/>
		<AdvancedInputs/>
		<EmailForm/>
                <label id="run">
                    <div className="run-text"><span>▶ RUN</span></div>
                </label>
            </div>
            <hr/>
            <h3>Disclaimers</h3>
            <b className="warn">RESPOND is calibrated to Massachusetts data. If attempting to use the model to characterize another jurisdiction, the user will need to provide data for said jurisdiction.</b>
        </div>
    );
}
