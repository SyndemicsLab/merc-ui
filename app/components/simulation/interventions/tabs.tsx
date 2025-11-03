import { useInputsDispatch } from "@components/input-contexts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { inputs } from "~/data";

function Tab({ intervention }: { intervention: Intervention }) {
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

export default function Tabs({ interventions }: { interventions: Intervention[] }) {
    const dispatch = useInputsDispatch();

    return(
        <>
            <div className="interventionTabs">
                {interventions.map(intervention => (
                        <Tab
                            key={intervention.id}
                            intervention={intervention}
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
                                    intervention: "Intervention",
                                })}
                        >
                            Blank Intervention
                        </DropdownMenuItem>
                        {inputs.interventions.map(intervention => (
                                <DropdownMenuItem
                                    key={intervention.id}
                                    className="add-intervention-item"
                                    onSelect={() =>
                                        dispatch({
                                            type: "intervention add",
                                            intervention: `${intervention.name}`,
                                        })
                                    }
                                >
                                    {intervention.name}
                                </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}
