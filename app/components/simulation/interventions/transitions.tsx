import type { Transition } from "~/data";
import { ManagedSlider } from "@components/ui/sliders";
import { useInputsDispatch } from "@components/input-contexts";

export default function Transitions(
    { transitions, onTransitionChange }:
    { transitions: Transition[], onTransitionChange: Function }
) {
    let summer: Function = (accumulator: number, transition: Transition): number => {
	// hoping to find a way to avoid needing this parseFloat, but currently
	// without it, this function will concatenate changed values as strings
	return accumulator + parseFloat(transition.probability);
    };
    let sumProbs: number = transitions.reduce(summer, 0);
    return(
	<>
	    {transitions.map((transition) => (
		<ManagedSlider
		    key={transition.id}
		    name={`Proportion Transitioning to ${transition.name}`}
		    min={0}
		    max={1}
		    step={0.01}
		    value={transition.probability}
		    managementFunction={(value) =>
                        onTransitionChange(value, transition.id)
                    }
		/>
	    ))}
	    <ManagedSlider name="Retention Rate"
			   min={0}
			   max={1}
			   step={0.01}
			   value={Math.max(1-sumProbs, 0).toFixed(5)}
			   readOnly={true}
	    />
	</>
    );
}
