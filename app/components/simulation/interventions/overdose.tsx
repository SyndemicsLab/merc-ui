import * as React from "react";
import type { Overdose } from "~/data";
import Slider from "@components/ui/slider";
import { PROPORTION_MIN, PROPORTION_MAX, PROPORTION_STEP } from "~/globals";

export default function Overdoses(
    { overdoses, onOverdoseChange }:
    { overdoses: Overdose[], onOverdoseChange: Function }
) {
    return (
        <>
            {overdoses.map((overdose) => (
                <Slider
                    key={overdose.injection ? 1 : 0}
                    inputText={`Weekly Percent of Active ${overdose.injection ? "Injector" : "Non-injector"} Population that Overdoses `}
                    min={PROPORTION_MIN}
                    max={PROPORTION_MAX}
                    step={PROPORTION_STEP}
                    defaultValue={overdose.probability}
                    managementFunction={(value) => onOverdoseChange(
                        value,
                        overdose.injection
                    )}
                />
            ))}
        </>
    );
}
