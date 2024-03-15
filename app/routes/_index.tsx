import type { MetaFunction } from "@remix-run/node";
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
	    <div class="system">
		<img src={modelStructure} alt="RESPOND simulation structure"/>
	    </div>
	    <hr/>
	    <h1>RESPOND Simulation Model</h1>
	    <b>R</b>esearching <b>E</b>ffective <b>S</b>trategies to <b>P</b>revent <b>O</b>pioid <b>D</b>eaths (RESPOND) is one of the <a href="https://syndemicslab.org">Syndemics Lab's</a> simulation models.
	    <h2>What is RESPOND?</h2>
	    <hr/>
	    <h3>Disclaimers</h3>
	</div>
    );
}
