import type { Overdose } from "~/data";
import { NamedSlider } from "@components/ui/sliders";

export default function Overdoses(
    { overdoses, onOverdoseChange }:
    { overdoses: Overdose[], onOverdoseChange: Function }
) {
    return(
        <>
            {overdoses.map((overdose) => (
                    <NamedSlider
                        key={overdose.injection ? 1 : 0}
                        inputName={`Weekly Percent Overdoses in Active ${overdose.injection ? "Injectors" : "Non-injectors"}`}
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={overdose.probability}
                    />
            ))}
        </>
    );
}
