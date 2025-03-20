import { useFetcher } from "react-router";
import { useState } from "react";
import InfoButton from "@simulation/info-button.tsx"

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
            <div id="advanced" className={showAdvanced ? "unhidden" : "hidden"}>
		<h2>Explanatory Links</h2>
		<InfoButton
		    text="See Example Tables"
		    destination="https://www.syndemicslab.org/respond-model-materials"/>
		<InfoButton
		    text="Download Shell Tables"
		    destination="https://www.syndemicslab.org/respond-model-materials"/>
		<InfoButton
		    text="See Table Descriptions"
		    destination="https://www.syndemicslab.org/respond-model-materials"/>
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

export default AdvancedInputs;
