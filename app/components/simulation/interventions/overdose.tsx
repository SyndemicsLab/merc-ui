import type { Overdose } from "~/features/simulation/model";
import Slider from "@components/ui/slider";
import { PROPORTION_MIN, PROPORTION_MAX, PROPORTION_STEP } from "~/globals";

export default function Overdoses({
    overdoses,
    onOverdoseChange,
}: {
    overdoses: Overdose[];
    onOverdoseChange: (value: number, injection: boolean) => void;
}) {
    return (
        <>
            {overdoses.map((overdose) => (
                <Slider
                    key={overdose.injection ? 1 : 0}
                    inputVar={`overdose_${overdose.injection ? "injector" : "non_injector"}`}
                    inputText={`Percent of Active ${overdose.injection ? "Injector" : "Non-injector"} Population that Overdoses Per Week`}
                    min={PROPORTION_MIN}
                    max={PROPORTION_MAX}
                    step={PROPORTION_STEP}
                    defaultValue={overdose.probability}
                    managementFunction={(value) =>
                        onOverdoseChange(value, overdose.injection)
                    }
                />
            ))}
        </>
    );
}
