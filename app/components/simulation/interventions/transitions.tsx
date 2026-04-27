import Slider from "~/components/ui/slider";
import type { Transition } from "~/features/simulation/model";
import { PROPORTION_MIN, PROPORTION_STEP, PROPORTION_MAX } from "~/globals";

export default function Transitions({
    transitions,
    onTransitionChange,
}: {
    transitions: Transition[];
    onTransitionChange: (value: number, transitionID: number) => void;
}) {
    const summer = (accumulator: number, transition: Transition): number => {
        const p =
            typeof transition.probability == "string"
                ? parseFloat(transition.probability)
                : transition.probability;
        return accumulator + p;
    };
    const sumProbs: number = transitions.reduce(summer, 0);

    return (
        <>
            {transitions.map((transition) => (
                <Slider
                    key={transition.id}
                    inputVar={`${transition.id}_transition`}
                    inputText={`Percent of Population Moving to ${transition.name} Per Week`}
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
                inputVar="retention_rate"
                inputText="Retention Rate"
                min={PROPORTION_MIN}
                max={PROPORTION_MAX}
                step={PROPORTION_STEP}
                defaultValue={Math.max(PROPORTION_MAX - sumProbs, 0)}
                readOnly={true}
            />
        </>
    );
}
