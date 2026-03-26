import * as React from "react";
import type { Transition, Intervention } from "~/data";
import Slider from "~/components/ui/slider";
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

function InterventionInfo({ intervention }: { intervention: Intervention }) {
    const dispatch = useInputsDispatch();
    return (
        <>
            <h2 className="inputName">Intervention Name</h2>
            {intervention.id == 0 ? (
                <input type="text" value={intervention.name} readOnly={true} />
            ) : (
                <input
                    type="text"
                    defaultValue={intervention.name}
                    onChange={(event) =>
                        dispatch({
                            type: "intervention rename",
                            name: event.target.value,
                            id: intervention.id,
                        })
                    }
                />
            )}
            {intervention.description && !intervention.info ? (
                <p className="intervention-description">
                    {intervention.description}
                </p>
            ) : null}
            {intervention.description && intervention.info ? (
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
            ) : null}
        </>
    );
}

function Content({
    intervention,
    transitions,
}: {
    intervention: Intervention;
    transitions: Transition[];
}) {
    const dispatch = useInputsDispatch();
    return (
        <>
            <div
                className={`interventionContent${intervention.active ? " active" : ""}`}
            >
                <InterventionInfo intervention={intervention} />
                <Slider
                    name="Intervention Population Size"
                    min={0}
                    max={200000}
                    step={1000}
                    value={intervention.population}
                    managementFunction={(value) =>
                        dispatch({
                            type: "intervention change population",
                            interventionID: intervention.id,
                            value: value,
                        })
                    }
                    readOnly={intervention.id === 0 ? true : false}
                />
                {/* Intervention transitions default to open for No Treatment */}
                <Collapsible
                    className="block-trans-root"
                    defaultOpen={intervention.id === 0 ? true : false}
                >
                    <CollapsibleTrigger asChild>
                        <h3>Transitions Between Interventions</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="block-trans-collapsible">
                        <Transitions
                            transitions={transitions}
                            onTransitionChange={(value, transition) =>
                                dispatch({
                                    type: "intervention change transition",
                                    transitionID: transition,
                                    interventionID: intervention.id,
                                    value: value,
                                })
                            }
                        />
                    </CollapsibleContent>
                </Collapsible>
                <hr
                    style={{ margin: "1em 0", color: "var(--tertiary-color)" }}
                />
                <Overdoses
                    overdoses={intervention.overdose}
                    onOverdoseChange={(value, injection) =>
                        dispatch({
                            type: "intervention change overdose",
                            injection: injection,
                            interventionID: intervention.id,
                            value: value,
                        })
                    }
                />
            </div>
        </>
    );
}

export default function Contents({
    interventions,
}: {
    interventions: Intervention[];
}) {
    return (
        <>
            <div className="interventionContents">
                {interventions.map((intervention, index) => (
                    <Content
                        key={index}
                        intervention={intervention}
                        transitions={intervention.transitions}
                    />
                ))}
            </div>
        </>
    );
}
