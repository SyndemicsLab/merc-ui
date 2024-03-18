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
			<div className="inputName">Initial Population Size</div>
			<input type="range" min="1" max="100" defaultValue="90" className="slider"/>
		    </div>
		    <div className="value">
			<div className="inputName">Uptake Per Week Count</div>
			<input type="range" min="1" max="100" defaultValue="50" className="slider"/>
		    </div>
		    <Form
			id="overdose">
			<div className="inputName">(Optional) Overdose Probability Per Week</div>
			<input type="file"/>
		    </Form>
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
				type="text"
				placeholder="Email Address"
			    />
			</div>
		    </Form>
		</div>
	    </div>
	    <hr/>
	    <h3>Disclaimers</h3>
	</div>
    );
}
