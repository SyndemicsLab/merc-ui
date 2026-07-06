// Package types
import type { Inputs } from "~/features/simulation/model";

// Component imports
import { useInputsDispatch, useInputs } from "@components/input-contexts";
import {
    DURATION_MIN,
    DURATION_STEP,
    DURATION_MAX,
    POPULATION_MIN,
    POPULATION_STEP,
    POPULATION_MAX,
    CHANGING_POP_MIN,
    CHANGING_POP_STEP,
    CHANGING_POP_MAX,
    FATAL_OD_MIN,
    FATAL_OD_STEP,
    FATAL_OD_MAX,
} from "~/globals";
import Slider from "@components/ui/slider";
import { getSliderConstraintError } from "~/features/simulation/reducer";

export default function GeneralInputs() {
    const inputs: Inputs = useInputs();
    const dispatch = useInputsDispatch();
    const totalPopulationViolation = getSliderConstraintError(
        inputs,
        "total_population",
    );

    const slider_defaults = [
        {
            inputVar: "duration",
            inputText: "Simulation Duration (Weeks)",
            min: DURATION_MIN,
            // limiting duration to 7 years in Alpha
            max: DURATION_MAX,
            step: DURATION_STEP,
            defaultValue: inputs.duration,
            action: (value: number) =>
                dispatch({
                    type: "change duration",
                    value: value,
                }),
        },
        {
            inputVar: "total_population",
            inputText: "Initial Total Population",
            min: POPULATION_MIN,
            max: POPULATION_MAX,
            step: POPULATION_STEP,
            defaultValue: inputs.total_population,
            action: (value: number) =>
                dispatch({
                    type: "change total population",
                    value: value,
                }),
        },
        {
            inputVar: "changing_population",
            inputText: "Change in Population Per Week (Count)",
            min: CHANGING_POP_MIN,
            max: CHANGING_POP_MAX,
            step: CHANGING_POP_STEP,
            defaultValue: inputs.changing_population,
            action: (value: number) =>
                dispatch({
                    type: "change changing population",
                    value: value,
                }),
        },
        {
            inputVar: "fatal_overdoses",
            inputText: "Percent of Overdoses That Result in Death",
            min: FATAL_OD_MIN,
            max: FATAL_OD_MAX,
            step: FATAL_OD_STEP,
            defaultValue: inputs.fatal_overdoses,
            action: (value: number) =>
                dispatch({
                    type: "change fatal overdose proportion",
                    value: value,
                }),
        },
    ];

    return (
        <div id="global-inputs">
            {slider_defaults.map((slider) => (
                <Slider
                    key={slider.inputVar}
                    inputVar={slider.inputVar}
                    inputText={slider.inputText}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    managementFunction={slider.action}
                    defaultValue={slider.defaultValue}
                    validationMessage={
                        slider.inputVar === "total_population" &&
                        totalPopulationViolation.hasViolation
                            ? totalPopulationViolation.message
                            : undefined
                    }
                />
            ))}
        </div>
    );
}
