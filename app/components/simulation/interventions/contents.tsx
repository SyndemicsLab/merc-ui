import type { Transition, Intervention } from "~/data";
import { ManagedSlider } from "@components/ui/sliders";
import Transitions from "@simulation/interventions/transitions";
import Overdoses from "@simulation/interventions/overdose";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@components/ui/dialog";
import { useInputsDispatch } from "@components/input-contexts";
import { Button } from "@components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

function InterventionInfo(
    { intervention, onNameChange }:
    { intervention: Intervention, onNameChange: Function }
) {
    const dispatch = useInputsDispatch();
    return(
        <>
            <h2 className="inputName">Intervention Name</h2>
            {intervention.id == 0 ? (
	        <input
	            type="text"
	            value={intervention.name}
	            readOnly={true}
	        />
            ) : (
	        <input
	            type="text"
	            defaultValue={intervention.name}
	            onChange={event =>
                        dispatch({
                            type: 'intervention rename',
                            name: event.target.value,
                            id: intervention.id
                        })}
	        />
            )}
            { (intervention.description && !intervention.info) ? (
	        <p className="intervention-description">
	            {intervention.description}
	        </p>
            ) : null }
            { (intervention.description && intervention.info) ? (
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
		            {intervention.description}
		        </div>
	            </DialogContent>
	        </Dialog>
            ) : null }
        </>
    );
}

function Content(
    { intervention,
      transitions,
      onNameChange,
      onTransitionChange,
      onPopulationChange }:
    { intervention: Intervention,
      transitions: Transition[],
      onNameChange: Function,
      onTransitionChange: Function,
      onPopulationChange: Function }
) {
    const dispatch = useInputsDispatch();
    return(
	<>
	    <div
		className={`interventionContent${intervention.active ? " active" : ""}`}>
                <InterventionInfo
                    intervention={intervention}
                    onNameChange={onNameChange}
                />
		<ManagedSlider
                    name="Intervention Population Size"
		    min={0}
                    max={200000}
                    step={1000}
                    value={Object.hasOwn(intervention, 'population') ?
                           intervention.population : 1000}
                    managementFunction={(value) =>
                        dispatch({
                            type: 'intervention change population',
                            interventionID: intervention.id,
                            value: value
                        })
                    }
                />
		<Transitions
		    transitions={transitions}
		    onTransitionChange={(value, transition) =>
                        dispatch({
                            type: 'intervention change transition',
                            transitionID: transition,
                            interventionID: intervention.id,
                            value: value
                        })}
		/>
                <hr style={{ margin: "1em 0", color: "var(--tertiary-color)" }}/>
                <Overdoses
                    overdoses={intervention.overdose}
                    onOverdoseChange={(value, injection) =>
                        dispatch({
                            type: 'intervention change overdose',
                            injection: injection,
                            interventionID: intervention.id,
                            value: value
                        })
                    }
                />
	    </div>
	</>
    );
}

export default function Contents(
    { interventions,
      onInterventionNameChange,
      onInterventionChangeTransition,
      onInterventionPopulationChange }:
    { interventions: Intervention[],
      onInterventionNameChange: Function,
      onInterventionChangeTransition: Function,
      onInterventionPopulationChange: Function }
) {
    const dispatch = useInputsDispatch();
    return(
	<>
	    <div className="interventionContents">
		{interventions.map(intervention => (
		    <Content
			key={intervention.id}
			intervention={intervention}
			transitions={intervention.transitions}
			onNameChange={onInterventionNameChange}
			onTransitionChange={() => {}}
                        onPopulationChange={(value) => onInterventionPopulationChange(value, intervention.id)}
		    />
		))}
	    </div>
	</>
    );
}
