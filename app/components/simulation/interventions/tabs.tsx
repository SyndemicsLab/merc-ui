function Tab(
    { intervention, onSelect, onDelete }:
    { intervention: Intervention, onSelect: Function, onDelete: Function }
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
				// avoid also selecting the tab underneath while
				// closing (selection overrides deletion)
				event.stopPropagation();
			    }}>
			×
		    </button>
		)}
	    </div>
	</>
    );
}

export default function Tabs(
    { interventions, onSelectIntervention, onDeleteIntervention, addIntervention }:
    { interventions: Intervention[], onSelectIntervention: Function, onDeleteIntervention: Function, addIntervention: Function }
) {
    // handle bug where no intervention is selected on render; select no
    // treatment
    let noneSelected: boolean = interventions.every(i => i.active === false);
    noneSelected ? onSelectIntervention(0) : null;

    return(
	<>
	    <div className="interventionTabs">
		{interventions.map(intervention => (
			<Tab
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
