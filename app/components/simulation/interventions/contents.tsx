import type { Transition } from "~/data";
import NamedSlider from "@components/ui/namedslider";
import Transitions from "@simulation/interventions/transitions";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

function Content(
    { intervention, transitions, onNameChange, onTransitionChange, description = null, info = false }:
    { intervention: Intervention, transitions: Transition[], onNameChange: Function, onTransitionChange: Function, description?: string, info?: boolean }
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
		{ (description && !info) ? (
		    <p className="intervention-hint">
			{description}
		    </p>
		) : null }
		{ (description && info) ? (
		    <Dialog>
			<DialogTrigger asChild>
			    <Button variant="outline" className="intervention-info">
				<FontAwesomeIcon icon={faInfo} />
			    </Button>
			</DialogTrigger>
			<DialogContent className="bg-white lg:max-w-[1000px] max-w-[425px] p-9">
			    <DialogHeader>
				<DialogTitle>{intervention.name}</DialogTitle>
				<DialogDescription>
				    {`More information about ${intervention.name}.`}
				</DialogDescription>
			    </DialogHeader>
			    <div className="grid gap-4 py-4">
				{description}
			    </div>
			</DialogContent>
		    </Dialog>
		) : null }
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
			description={intervention.description ? intervention.description : null}
			info={intervention.info}
		    />
		))}
	    </div>
	</>
    );
}
