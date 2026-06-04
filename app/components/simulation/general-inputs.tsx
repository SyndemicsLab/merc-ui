// Package types
import type { Inputs } from "~/features/simulation/model";

// Component imports
import {
    useInputsDispatch,
    useInputs,
} from "@components/input-contexts";
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
    FATAL_OD_MAX
} from "~/globals";
import Slider from "@components/ui/slider";

export default function GeneralInputs({
}: {
}) {
    const inputs = useInputs();
    const dispatch = useInputsDispatch();

    const slider_defaults = [
        {
            inputVar: "duration",
            inputText: "Simulation Duration (Weeks)",
            min: 1,
            // limiting duration to 7 years in Alpha
            max: 364,
            step: 1,
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
            min: 0,
            max: 300000,
            step: 500,
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
            min: -10000,
            max: 50000,
            step: 100,
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
            min: 0,
            max: 100,
            step: 0.25,
            defaultValue: inputs.fatal_overdoses,
            action: (value: number) =>
                dispatch({
                    type: "change fatal overdose proportion",
                    value: value,
                }),
        },
    ];

    return(
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
                />
            ))}
        </div>
    )
}
