import { useRef, useState, useEffect } from "react";
import { useFetcher } from "react-router";
import ScrollIndicator from "@components/ui/scroll-indicator";
import NamedSlider from "@components/ui/namedslider";
import Interventions from "@simulation/interventions"
import AdvancedInputs from "@simulation/advancedinputs";
import EmailIntake from "@simulation/emailintake";
import Disclaimers from "@simulation/disclaimers";
import GlossaryButton from "@simulation/glossary-button";
import Results from "@simulation/results";

function GeneralInputs({ population, uptake }: { population: number, uptake: number }) {
    return (
        <div className="general-inputs">
	    <NamedSlider
		inputName={"Simulation Duration (Weeks)"}
		min={1}
		max={2600}
		step={1}
		defaultValue={260}
	    />
            <NamedSlider
		inputName={"Initial Total Population"}
		min={0}
		max={300000}
		step={500}
		defaultValue={population}
	    />
            <NamedSlider
		inputName={"Change in Population Per Week (Count)"}
		min={-10000}
		max={50000}
		step={100}
		defaultValue={uptake}
	    />
            <NamedSlider
		inputName={"Fatal Overdose Probability"}
		min={0}
		max={1}
		step={0.005}
		defaultValue={0.13}
	    />
            <Interventions />
        </div>
    );
}

export default function Inputs() {
    // reference for the input section, used for testing intersection with the
    // viewport
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
    const fetcher = useFetcher();

    return(
        <>
            <div id="inputs" ref={inputRef}>
                <GlossaryButton />
                <ScrollIndicator
                    destination="/simulation#inputs"
                    visible={!inputsVisible}
                />
		<fetcher.Form method="post">
                    <h1>Simulation Inputs</h1>
                    <GeneralInputs
			population={population}
			uptake={uptake}
                    />
		</fetcher.Form>
                <AdvancedInputs />
                <EmailIntake />
                <Disclaimers />
                <Results />
            </div>
        </>
    );
}
