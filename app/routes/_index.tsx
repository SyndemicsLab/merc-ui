import type { MetaFunction } from "@remix-run/node";
import {
    Form,
} from "@remix-run/react";
import modelStructure from "../images/model.png";

export const meta: MetaFunction = () => {
    return [
	{ title: "RESPOND Simulation" },
	{
	    name: "description",
	    content: "The Syndemics Lab at Boston Medical Center's RESPOND simulation as a web application."
	},
    ];
};

export default function Index() {
    return (
	<div>
	    <div className="system">
		<img src={modelStructure} alt="RESPOND simulation structure"/>
	    </div>
	    <hr/>
	    <div className="inputs">
		<h1>Inputs</h1>
		<div id="sliders">
		    <div className="value">
			Initial Population Size<br/>
			<input type="range" min="1" max="100" defaultValue="90" className="slider" id="initpop"/>
		    </div>
		    <div className="value">
			Uptake Per Week Count<br/>
			<input type="range" min="1" max="100" defaultValue="50" className="slider"/>
		    </div>
		    <Form
			id="overdose">
			(Optional) Overdose Probability Per Week<br/>
			<input type="file"/>
		    </Form>
		</div>
	    </div>
	    <hr/>
	    <h1>RESPOND Simulation Model</h1>
	    <b>R</b>esearching <b>E</b>ffective <b>S</b>trategies to <b>P</b>revent <b>O</b>pioid <b>D</b>eaths (RESPOND) is a simulation model of populations of high-risk opioid users made by the <a href="https://syndemicslab.org">Syndemics Lab's</a> at <a href="https://bmc.org">Boston Medical Center</a>.
	    <h2>What is RESPOND?</h2>
	    <hr/>
	    <h3>Disclaimers</h3>
	</div>
    );
}
