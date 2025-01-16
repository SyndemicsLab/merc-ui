import { useState } from "react";
import { Form, useFetcher } from "@remix-run/react";
import { getInterventions } from "../constants";

export function InputSlider(
    { inputName, min, max, step, defaultValue }:
        { inputName: string, min: number, max: number, step: number, defaultValue: any }
) {
    const [value, setValue] = useState(defaultValue);
    const fetcher = useFetcher();

    return (
        <fetcher.Form className="input-slider-form">
            <div className="inputName">{inputName}</div>
            <div className="slider">
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    name={`${inputName}-num`}
                    onChange={(event) => setValue(event.target.value)}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    id={`${inputName}-slider`}
                    onChange={(event) => setValue(event.target.value)}
                />
            </div>
        </fetcher.Form>
    );
}

function CollapsibleMenu(
    { sectionName, context, contents, defaultState }:
        { sectionName: string, context: string, contents: any, defaultState: any }
) {
    const [collapsed, setCollapsed] = useState(defaultState);

    return (
        <>
            <input
                id={`collapsed-${context}`}
                type="checkbox"
                value={collapsed}
                onChange={(event) => setCollapsed(event.target.checked)}
            />
            <label
                htmlFor={`collapsed-${context}`}
                className={`collapse-toggle ${collapsed ? "opened" : ""}`}
            >
                {sectionName}
            </label>
            <div className={collapsed ? "unhidden" : "hidden"}>{contents}</div>
        </>
    );
}

export function Interventions() {
    const [interventions, setInterventions] = useState(getInterventions());
    const [numNewInterventions, setNumNewInterventions] = useState(1);

    // Handle the addition of a new intervention
    function handleAdditionalIntervention() {
        let newInterventions = interventions.concat({
            id: interventions.length + numNewInterventions,
            name: `New Intervention ${numNewInterventions}`,
        });

        setInterventions(newInterventions);
        setNumNewInterventions(numNewInterventions + 1);
    }

    // Handle the deletion of an intervention
    function handleDeleteIntervention(id: number) {
        setInterventions(interventions.filter((intervention) => intervention.id !== id));
    }

    // Handle the change of intervention name
    function changeInterventionName(newName: string, interventionIndex: number) {
        let newInterventions = interventions;
        newInterventions[interventionIndex].name = newName;
        setInterventions(newInterventions);
    }

    // Create intervention tabs with delete button for additional interventions
    let interventionTabs = interventions.map((intervention, index) => (
        <div key={index} className={`interventionTab ${intervention.name === "No Treatment" ? "active" : ""}`}>
            {intervention.name}
            {index > 0 && (
                <button className="delete-button" onClick={() => handleDeleteIntervention(intervention.id)}>
                    ×
                </button>
            )}
        </div>
    ));

    // Create intervention contents for each intervention
    let interventionContents = interventions.map((intervention, index) => (
        <div key={index} className={`interventionContent ${intervention.name === "No Treatment" ? "defaultOpen" : ""}`}>
            <Form id="intervention-name" method="post">
                <div className="inputName">Intervention Name</div>
                <input
                    type="text"
                    defaultValue={intervention.name}
                    onChange={(e) => changeInterventionName(e.target.value, index)}
                />
            </Form>
            <InputSlider inputName="Intervention Population Size" min={0} max={4000} step={50} defaultValue={1500} />
            <InputSlider inputName="Retention Rate" min={0} max={1} step={0.01} defaultValue={0.8} />
            <InputSlider inputName="Proportion Transitioning to Buprenorphine" min={0} max={1} step={0.01} defaultValue={0.2} />
            <InputSlider inputName="Proportion Transitioning to Naltrexone" min={0} max={1} step={0.01} defaultValue={0.2} />
            <InputSlider inputName="Proportion Transitioning to Methadone" min={0} max={1} step={0.01} defaultValue={0.2} />
            <InputSlider inputName="Proportion Transitioning to Detox" min={0} max={1} step={0.01} defaultValue={0.2} />
            <CollapsibleMenu
                sectionName={"OUD Transitions"}
                context={`oud-${intervention.name}`}
                contents={
                    <>
                        {["Active Injection", "Active Non-Injection", "Non-Active Injection", "Non-Active Non-Injection"].map((state) =>
                            ["Active Injection", "Active Non-Injection", "Non-Active Injection", "Non-Active Non-Injection"].map(
                                (target) =>
                                    state !== target && (
                                        <InputSlider
                                            key={`${state}-to-${target}`}
                                            inputName={`Proportion Transitioning from ${state} to ${target}`}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            defaultValue={0.25}
                                        />
                                    )
                            )
                        )}
                    </>
                }
                defaultState={false}
            />
        </div>
    ));

    return (
        <>
            <div className="interventionTabs">
                {interventionTabs}
                <button className="interventionTab addTab" onClick={handleAdditionalIntervention}>
                    + New Treatment
                </button>
            </div>
            <div className="interventionContents">{interventionContents}</div>
        </>
    );
}

export function GeneralInputs({ population, uptake }: { population: number, uptake: number }) {
    return (
        <div className="general-inputs">
            <InputSlider inputName={"Initial Population Size (Full Model)"} min={0} max={300000} step={500} defaultValue={population} />
            <InputSlider inputName={"Change in Population Per Week (Count)"} min={0} max={50000} step={100} defaultValue={uptake} />
            <Interventions />
        </div>
    );
}

export function EmailForm() {
    const fetcher = useFetcher();

    return (
        <fetcher.Form id="email">
            <div className="inputName">Email Results</div>
            <div className="email-form">
                <input
                    type="checkbox"
                />
                <input
                    id="email-address"
                    type="text"
                    placeholder="Email Address"
                />
            </div>
        </fetcher.Form>
    );
}
