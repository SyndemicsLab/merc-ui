import { Form } from "react-router";
import Interventions from "@components/simulation/intervention"
import NamedSlider from "@components/ui/namedslider";
import AdvancedInputs from "@components/simulation/advancedinputs";
import EmailIntake from "@components/simulation/emailintake";

function GeneralInputs({ population, uptake }: { population: number, uptake: number }) {
    return (
        <div className="general-inputs">
            <NamedSlider inputName={"Initial Population Size (Full Model)"} min={0} max={300000} step={500} defaultValue={population} />
            <NamedSlider inputName={"Change in Population Per Week (Count)"} min={0} max={50000} step={100} defaultValue={uptake} />
            <Interventions />
        </div>
    );
}

export default function Inputs() {
    const population = 214000;
    const uptake = 5000;

    return(
	<>
	    <div id="inputs">
                <h1>Simulation Inputs</h1>
		<GeneralInputs population={population} uptake={uptake} />
                <AdvancedInputs />
                <EmailIntake />
                <label id="run">
		    <div className="run-text"><span>▶ RUN</span></div>
                </label>
	    </div>
	</>
    );
}
