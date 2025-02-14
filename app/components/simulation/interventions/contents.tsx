import type { Transition } from "~/data";
import NamedSlider from "@components/ui/namedslider";
import Transitions from "@simulation/interventions/transitions";

function Content(
    { intervention, transitions, onNameChange, onTransitionChange }:
    { intervention: Intervention, transitions: Transition[], onNameChange: Function, onTransitionChange: Function }
) {
    return(
	<>
	    <div
		className={`interventionContent${intervention.active ? " active" : ""}`}>
		<div className="inputName">Intervention Name</div>
		{intervention.id > 0 ? (
		    <input
			type="text"
			defaultValue={intervention.name}
			onChange={(event) => onNameChange(event.target.value, intervention.id)}
		    />
		) : (
			<input
			    type="text"
			    value={intervention.name}
			    readOnly={true}
			/>
		)}
		<NamedSlider inputName="Intervention Population Size"
			     min={0} max={4000} step={50} defaultValue={1500} />
		<Transitions
		    transitions={transitions}
		    onTransitionChange={onTransitionChange}
		/>
	    </div>
	</>
    );
}

export default function Contents(
    { interventions, onInterventionNameChange, onInterventionChangeTransition }:
    { interventions: Intervention[], onInterventionNameChange: Function, onInterventionChangeTransition: Function }
) {
    return(
	<>
	    <div className="interventionContents">
		{interventions.map(intervention => (
		    <Content
			key={intervention.id}
			intervention={intervention}
			transitions={intervention.transitions}
			onNameChange={onInterventionNameChange}
			onTransitionChange={(value, transition) => onInterventionChangeTransition(value, intervention.id, transition)}
		    />
		))}
	    </div>
	</>
    );
}
