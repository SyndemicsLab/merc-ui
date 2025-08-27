import { useInputsDispatch } from "@components/input-contexts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

function Tab(
    { intervention, onSelect, onDelete }:
    { intervention: Intervention, onSelect: Function, onDelete: Function }
) {
    const dispatch = useInputsDispatch();
    return (
        <>
            <div
                className={`interventionTab${intervention.active ? " active" : ""}`}
                onClick={() =>
                    dispatch({
                        type: 'intervention select',
                        id: intervention.id
                    })
                }
            >
                {intervention.name}
                {intervention.id > 0 && (
                    <button className="delete-button"
                            onClick={(event) => {
                                dispatch({
                                    type: 'intervention delete',
                                    id: intervention.id
                                });
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
    const dispatch = useInputsDispatch();

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="interventionTab addTab">+ New Intervention</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="add-intervention-dropdown">
                        <DropdownMenuItem
                            className="add-intervention-item"
                            onSelect={() =>
                                dispatch({
                                    type: 'intervention add',
                                })}
                        >
                            Blank Intervention
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="add-intervention-item"
                        >
                            Buprenorphine
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="add-intervention-item"
                        >
                            Naltrexone
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="add-intervention-item"
                        >
                            Methadone
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="add-intervention-item"
                        >
                            Detox
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="add-intervention-item"
                        >
                            Detention
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}
