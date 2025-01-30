import { useFetcher } from "react-router";
import { useState } from "react";

export function UploadForm({ id, inputName }: { id: string, inputName: string }) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form id={id} className="upload-form">
            <div className="inputName">{inputName}</div>
            <input type="file" />
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