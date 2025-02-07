import type { Intervention } from "../../data";
import NamedSlider from "../ui/namedslider";

function InterventionTab(
    { intervention, onSelect, onDelete }:
    { intervention: Intervention, onSelect: any, onDelete: any }
) {

    return (
	<>
	    <div
		className={`interventionTab${intervention.active ? " active" : ""}`}
		onClick={() => onSelect(intervention.id)}
	    >
		{intervention.name}
		{intervention.id > 0 && (
		    <button className="delete-button"
			    onClick={(event) => {
				onDelete(intervention.id);
				// avoid also selecting the tab while closing
				event.stopPropagation();
			    }}>
			×
		    </button>
		)}
	    </div>
	</>
    );
}

export function InterventionTabs(
    { interventions, onSelectIntervention, onDeleteIntervention, addIntervention }:
    { interventions: Intervention[], onSelectIntervention: any, onDeleteIntervention: any, addIntervention }
) {
    return(
	<>
	    <div className="interventionTabs">
		{interventions.map(intervention => (
			<InterventionTab
			    key={intervention.id}
			    intervention={intervention}
			    onSelect={onSelectIntervention}
			    onDelete={onDeleteIntervention}
			/>
		))}
                <button className="interventionTab addTab" onClick={() => addIntervention()}>
                    + New Intervention
                </button>
	    </div>
	</>
    );
}

function InterventionContent(
    { intervention, onNameChange }:
    { intervention: Intervention, onNameChange: any }
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
		<NamedSlider inputName="Retention Rate"
			     min={0} max={1} step={0.01} defaultValue={0.8} />
		<NamedSlider inputName="Proportion Transitioning to Buprenorphine"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
		<NamedSlider inputName="Proportion Transitioning to Naltrexone"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
		<NamedSlider inputName="Proportion Trasitioning to Methadone"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
		<NamedSlider inputName="Proportion Transitioning to Detox"
			     min={0} max={1} step={0.01} defaultValue={0.2} />
	    </div>
	</>
    );
}

export function InterventionContents(
    { interventions, onInterventionNameChange }:
    { interventions: Intervention[], onInterventionNameChange: any }
) {
    return(
	<>
	    <div className="interventionContents">
		{interventions.map(intervention => (
		    <InterventionContent
			key={intervention.id}
			intervention={intervention}
			onNameChange={onInterventionNameChange}
		    />
		))}
	    </div>
	</>
    );
}
