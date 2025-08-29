import { useRef, useState, useEffect } from "react";
import { useFetcher } from "react-router";
import ScrollIndicator from "@components/ui/scroll-indicator";
import { ManagedSlider } from "@components/ui/sliders";
import Interventions from "@simulation/interventions"
import GlossaryButton from "@simulation/glossary-button";
import Results from "@simulation/results";
import InfoButton from "@components/ui/info-button.tsx"
import { useInputs, useInputsDispatch } from "@components/input-contexts";

export default function Inputs() {
    // use the overarching inputs state and reducer functions (dispatch)
    const inputs = useInputs();
    const dispatch = useInputsDispatch();

    const fetcher = useFetcher();
    // reference for the input section, used for testing intersection with the
    // viewport
    const inputRef = useRef(false);
    const [inputsVisible, updateInputsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            // can select only the first entry because there is only one element
            // we're checking for intersection with
            const entry = entries[0];
            updateInputsVisible(entry.isIntersecting);
        }, { threshold: [0.05]});
        observer.observe(inputRef.current);
    }, [])

    return(
        <div id="inputs" ref={inputRef}>
            <GlossaryButton />
            <ScrollIndicator
                destination="/simulation#inputs"
                visible={!inputsVisible}
            />
            <h1>General Inputs</h1>
            <fetcher.Form method="post">
                <div id="global-inputs">
                    <ManagedSlider
                        name={"Simulation Duration (Weeks)"}
                        min={1}
                        max={2600}
                        step={1}
                        value={inputs.duration}
                        managementFunction={
                            (value) =>
                            dispatch({
                                type: 'change duration',
                                value: value
                            })
                        }
                    />
                    <ManagedSlider
                        name={"Initial Total Population"}
                        min={0}
                        max={300000}
                        step={500}
                        value={inputs.population}
                        managementFunction={
                            (value) =>
                            dispatch({
                                type: 'change total population',
                                value: value
                            })
                        }
                    />
                    <ManagedSlider
                        name={"Change in Population Per Week (Count)"}
                        min={-10000}
                        max={50000}
                        step={100}
                        value={inputs.entering}
                        managementFunction={
                            (value) =>
                            dispatch({
                                type: 'change entering cohort',
                                value: value
                            })
                        }
                    />
                    <ManagedSlider
                        name={"Fatal Overdose Probability"}
                        min={0}
                        max={1}
                        step={0.005}
                        value={inputs.fod}
                        managementFunction={
                            (value) =>
                            dispatch({
                                type: 'change fatal overdose proportion',
                                value: value
                            })
                        }
                    />
                </div>
                <h1>Intervention Inputs</h1>
                <Interventions />
            </fetcher.Form>
            <AdvancedInputs />
            <Results />
        </div>
    );
}

export function UploadForm(
    { id, inputName }:
    { id: string, inputName: string }
) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form id={id} className="upload-form">
            <label className="advancedInputName"
                   htmlFor={`${id}-input`}
                   form={id}
            >{inputName}</label>
            <input
                id={`${id}-input`}
                type="file"
                accept=".csv"
            />
        </fetcher.Form>
    );
}

const AdvancedInputs = () => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div className="advanced-inputs">
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
            <div id="advanced" className={showAdvanced ? "unhidden" : null}>
                <h2>For More Information</h2>
                <div className="more-info">
                    <InfoButton
                        text="See Example Tables"
                        destination="https://www.syndemicslab.org/respond-model-materials"
                    />
                    <InfoButton
                        text="Download Shell Tables"
                        destination="https://www.syndemicslab.org/respond-model-materials"
                        download={true}
                    />
                    <InfoButton
                        text="See Table Descriptions"
                        destination="https://www.syndemicslab.org/respond-model-materials"
                    />
                </div>
                <h2>Tabular Data Upload Forms</h2>
                <UploadForm id="sim-conf" inputName="General Configuration File (sim.conf)" />
                <UploadForm id="overdose" inputName="All Types Overdose (all_types_overdose.csv)" />
                <UploadForm id="mort" inputName="Background Mortality (background_mortality.csv)" />
                <UploadForm id="smr" inputName="Standardized Mortality Ratio (SMR.csv)" />
                <UploadForm id="init_effect" inputName="Treatment Initialization Effect (block_init_effect.csv)" />
                <UploadForm id="block_trans" inputName="Treatment Transition Proportions (block_trans.csv)" />
                <UploadForm id="entering" inputName="Entering Cohort (entering_cohort.csv)" />
                <UploadForm id="fod" inputName="Fatal Overdose Proportions (fatal_overdose.csv)" />
                <UploadForm id="initial" inputName="Initial Population (init_cohort.csv)" />
                <UploadForm id="oud" inputName="Drug Use State Transitions (oud_trans.csv)" />
            </div>
        </div>
    );
}
