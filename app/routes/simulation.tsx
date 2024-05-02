import type { MetaFunction } from "@remix-run/node";
import {
    Form,
    Outlet,
} from "@remix-run/react";
import {
    useState,
} from "react";

import {
    getInterventions
} from "../constants";

import respond1 from "../images/diagram/1.png";
import respond2 from "../images/diagram/2.png";
import respond3 from "../images/diagram/3.png";
import respond4 from "../images/diagram/4.png";
import respond5 from "../images/diagram/5.png";
import respond6 from "../images/diagram/6.png";

export default function Index() {
    let interventions = getInterventions();
    const [population, setPopulation] = useState('214000');
    const [uptake, setUptake] = useState('5000');
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div>
            <div className="system">
                <img src={respond1} />
                <img src={respond2} /><br/>
                <img src={respond3} />
                <img src={respond4} /><br/>
                <img src={respond5} />
                <img src={respond6} />
            </div>
            <hr/>
	    <div id="inputs">
		<h1>Inputs</h1>
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
		<Form>
		    <div className="inputName">Initial Population Size</div>
		    <div className="slider">
			<input
			    type="number"
			    min="0" max="300000" step="500"
			    value={ population } name="init-cohort-number"
			    onChange={(event) => setPopulation(event.target.value)}
			/>
			<input
			    type="range" min="0" max="300000" step="500"
			    value={ population } id="init-cohort-slider"
			    onChange={(event) => setPopulation(event.target.value)}
			/>
		    </div>
		</Form>
		<Form>
		    <div className="inputName">Change in Population Per Week (Count)</div>
		    <div className="slider">
			<input
			    type="number"
			    min="0" max="50000" step="100"
			    value={ uptake } name="uptake-number"
			    onChange={(event) => setUptake(event.target.value)}
			/>
			<input
			    type="range"
			    min="0" max="50000" step="100"
			    value={ uptake } id="uptake-slider"
			    onChange={(event) => setUptake(event.target.value)}
			/>
		    </div>
		</Form>

		<div className="interventionTabs">
		    { interventions.map((intervention) => {
			let defaultopen = intervention.name == "No Treatment" ? "active" : "";
			return (
			    <button className={`interventionTab ${defaultopen}`}
				    key={ intervention.id }
				    onClick={(event) => {
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
				    }}
			    >
				{ intervention.name }
			    </button>
			);
		    })}
		    <button className="interventionTab addTab"
			    onClick={() =>
				interventions.push({
				    id: interventions.length,
				    name: `New Intervention ${interventions.length - 4}`,
				})
			    }
		    >+</button>
		</div>
		<div className="interventionContents">
		    { interventions.map((intervention) => {
			let placeholder1 = Math.floor(Math.random() * population);
			let placeholder2 = Math.round(Math.random() * 100) / 100;
			let defaultopen = intervention.name == "No Treatment" ? "defaultOpen" : "";
			return(
			    <div className={ `interventionContent ${defaultopen}` }
				 key={ intervention.id }
				 id={ intervention.name }
			    >
				<Form>
				    <div className="inputName">Initial Population Size</div>
				    <div className="slider">
					<input
					    type="number"
					    min="0" max="300000" step="500"
					    defaultValue={placeholder1} name="init-cohort-number"
					/>
					<input
					    type="range" min="0" max="300000" step="500"
					    defaultValue={placeholder1} id="init-cohort-slider"
					/>
				    </div>
				</Form>
				<Form>
				    <div className="inputName">Retention Rate</div>
				    <div className="slider">
					<input
					    type="number"
					    min="0" max="1" step="0.01"
					    defaultValue={placeholder2} name="uptake-number"
					/>
					<input
					    type="range"
					    min="0" max="1" step="0.01"
					    defaultValue={placeholder2} id="uptake-slider"
					/>
				    </div>
				</Form>
			    </div>
			);
		    })}
		</div>

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
