import { useRef, useState, useEffect } from "react";
import { Form } from "react-router";
import ScrollIndicator from "@components/ui/scroll-indicator";
import NamedSlider from "@components/ui/namedslider";
import Interventions from "@simulation/interventions"
import AdvancedInputs from "@simulation/advancedinputs";
import EmailIntake from "@simulation/emailintake";
import Disclaimers from "@simulation/disclaimers";
import GlossaryButton from "@simulation/glossary-button";

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
    const inputRef = useRef(false);
    const [inputsVisible, updateInputsVisible] = useState(false);
    const population = 214000;
    const uptake = 5000;
    useEffect(() => {
	const observer = new IntersectionObserver((entries, observer) => {
	    const entry = entries[0];
	    updateInputsVisible(entry.isIntersecting);
	});
	observer.observe(inputRef.current);
    }, [])

    return(
	<>
	    <div id="inputs" ref={inputRef}>
		<GlossaryButton />
		<ScrollIndicator
		    destination="/simulation#inputs"
		    visible={!inputsVisible}
		/>
                <h1>Simulation Inputs</h1>
		<GeneralInputs population={population} uptake={uptake} />
                <AdvancedInputs />
                <EmailIntake />
		<Disclaimers />
                <label id="run">
		    <div className="run-text"><span>▶ RUN</span></div>
                </label>
	    </div>
	</>
    );
}
