import * as React from "react";
import Slider from "~/components/ui/slider";
import type { Transition } from "~/data";
import { PROPORTION_MIN, PROPORTION_STEP, PROPORTION_MAX } from "~/globals";

export default function Transitions({
    transitions,
    onTransitionChange,
}: {
    transitions: Transition[];
    onTransitionChange: (number) => void;
}) {
    const summer = (accumulator: number, transition: Transition): number => {
        // hoping to find a way to avoid needing this parseFloat, but currently
        // without it, this function will concatenate changed values as strings
        return accumulator + parseFloat(transition.probability);
    };
    const sumProbs: number = transitions.reduce(summer, 0);

    return (
        <>
            {transitions.map((transition) => (
                <Slider
                    key={transition.id}
                    inputText={`Weekly Percent of Population Moving to ${transition.name}`}
                    min={PROPORTION_MIN}
                    max={PROPORTION_MAX}
                    step={PROPORTION_STEP}
                    defaultValue={transition.probability}
                    managementFunction={(value) =>
                        onTransitionChange(value, transition.id)
                    }
                />
            ))}
            <Slider
                inputText="Retention Rate"
                min={PROPORTION_MIN}
                max={PROPORTION_MAX}
                defaultValue={Math.max(PROPORTION_MAX - sumProbs, 0).toFixed(4)}
                readOnly={true}
            />
        </>
    );
}
