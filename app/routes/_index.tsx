import type { MetaFunction } from "@remix-run/node";
import {
    Form,
    Outlet,
} from "@remix-run/react";
import modelStructure from "../images/model.png";
import {
    useState,
} from "react";

export const meta: MetaFunction = () => {
    return [
	{
	    rel: "icon",
	    href: "/favicon.ico",
	},
	{ title: "RESPOND Simulation" },
	{
	    name: "description",
	    content: "The Syndemics Lab at Boston Medical Center's RESPOND simulation as a web application."
	},
    ];
};

export default function Index() {
    const [population, setPopulation] = useState('214000');
    const [uptake, setUptake] = useState('5000');
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
	<div>
	    <div className="system">
		<img src={modelStructure} alt="RESPOND simulation structure"/>
	    </div>
	    <hr/>


	    <h1>Inputs</h1>
	    <div id="inputs">
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
		    <div className="inputName">Uptake Per Week (Count)</div>
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
		<input
		    id="show-advanced"
		    type="checkbox"
		    onChange={(event) => setShowAdvanced(event.target.checked)}
		/>
		<label for="show-advanced" id="advanced-options">
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
	    </div>
	    <hr/>
	    <h3>Disclaimers</h3>
	    <b className="warn">RESPOND is calibrated to Massachusetts data. If attempting to use the model to characterize another jurisdiction, the user will need to provide data for said jurisdiction.</b>
	</div>
    );
}
