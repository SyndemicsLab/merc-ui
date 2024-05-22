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
} from "@remix-run/react";
import {
    useState,
} from "react";

import {
    getInterventions,
} from "../constants";
import {
    System
} from "../system";

type SetterFunction = () => void;

// Function component for sliders in Inputs
const InputSlider = (
    inputName: string,
    min: number,
    max: number,
    step: number,
    defaultValue: Object,
    setMethod: SetterFunction
): React.TSX.Element => {
    return(
	<>
	    <Form>
		<div className="inputName">{ inputName }</div>
		<div className="slider">
		    <input
			type="number"
			min={ min } max={ max } step={ step }
			value={ defaultValue } name={`${inputName}-num`}
			onChange={(event) => setMethod(event.target.value)}
		    />
		    <input
			type="range" min={ min } max={ max } step={ step }
			value={ defaultValue } id={`${inputName}-slider`}
			onChange={(event) => setMethod(event.target.value)}
		    />
		</div>
	    </Form>
	</>
    );
}

function Interventions(
    interventions: Interventions[],
    population: number
) {
    const numInterventions = interventions.length;

    const interventionTabs = [];
    const interventionContents = [];

    for (let i = 0; i < numInterventions; i++) {
	let intervention = interventions[i];

	// No Treatment is the default open state
	let defaultOpen = intervention.name == "No Treatment";

	let defaultActiveTab = defaultOpen ? "active" : "";
	// add tab to intervention tab list
	interventionTabs.push(
	    <>
		<button className={`interventionTab ${defaultActiveTab}`}
			key={ intervention.name }
			onClick={(event, intervention) => switchTab(event) }
		>
		    { intervention.name }
		</button>
	    </>
	);

	// populate interventionContents
        let defaultActiveContent = defaultOpen ? "defaultOpen" : "";
        interventionContents.push(
	    InterventionContents(defaultActiveContent, population, intervention)
        );
    }

    // adds the "Add Tab" tab
    interventionTabs.push(
	<>
	    <button className="interventionTab addTab"
		    key="addTab"
		    onClick={ addTab(interventions, numInterventions) }
	    >+</button>
	</>
    );

    return (
	<>
	    <div className="interventionTabs">
		{ interventionTabs }
	    </div>
	    <div className="interventionContents">
		{/* { interventionContents } */}
	    </div>
	</>
    );
}

function switchTab(event, intervention) {
    let tabs = document.getElementsByClassName("interventionTab");
    for (let i = 0; i < tabs.length; i++) {
	tabs[i].className = tabs[i].className.replace(" active", "");
    }

    let tabContents = document.getElementsByClassName("interventionContent");

    for (let i = 0; i < tabContents.length; i++) {
	tabContents[i].style.display = "none";
	tabContents[i].className = tabContents[i].className.replace(" defaultOpen", "");
    }

    document.getElementById(intervention.name).style.display = "block";
    event.target.className += " active";
}

function addTab(interventions: Intervention[], numInterventions: number) {
    interventions.push({
	id: numInterventions,
	name: `New Intervention ${numInterventions - 4}`,
    })
}

function InterventionContents (
    defaultActiveContent: string,
    population: number,
    intervention: Intervention
) {
    const [pop, setPop] = useState(Math.random() * population);
    const [retention, setRetention] = useState(0.9);
    return (
	<>
	    <div className={ `interventionContent ${defaultActiveContent}` }
		 key={ intervention.name }
		 id={ intervention.name }
	    >
		{ InputSlider("Initial Population Size", 0, population, 100, pop, setPop) }
		{ InputSlider("Retention Rate", 0, 1, 0.01, retention, setRetention) }
	    </div>
	</>
    );
}

export default function Index() {
    const defaultInterventions = getInterventions();
    const [interventions, setInterventions] = useState(defaultInterventions);
    const [population, setPopulation] = useState(214000);
    const [uptake, setUptake] = useState(5000);
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div>
            <div className="system">
		{ System() }
            </div>
            <hr/>
	    <div id="inputs">
		<h1>Inputs</h1>
		{ InputSlider("Initial Population Size (Full Model)", 0, 300000, 500, population, setPopulation) }
		{ InputSlider("Change in Population Per Week (Count)", 0, 50000, 100, uptake, setUptake) }

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
                    <Form
                        id="overdose">
                        <div className="inputName">(Optional) Overdose Probability Per Week</div>
                        <input type="file"/>
                    </Form>
                </div>
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
