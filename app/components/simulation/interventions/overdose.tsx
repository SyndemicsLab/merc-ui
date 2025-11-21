import * as React from "react";
import type { Overdose } from "~/data";
import { NamedSlider } from "@components/ui/sliders";
import {
    PROPORTION_MIN,
    PROPORTION_MAX,
    PROPORTION_STEP
} from "~/globals";

export default function Overdoses(
    { overdoses }: { overdoses: Overdose[] }
) {
    return(
        <>
            {overdoses.map((overdose) => (
                    <NamedSlider
                        key={overdose.injection ? 1 : 0}
                        inputName={`Weekly Percent of Active ${overdose.injection ? "Injector" : "Non-injector"} Population that Overdoses `}
                        min={PROPORTION_MIN}
                        max={PROPORTION_MAX}
                        step={PROPORTION_STEP}
                        defaultValue={overdose.probability}
                    />
            ))}
        </>
    );
}
