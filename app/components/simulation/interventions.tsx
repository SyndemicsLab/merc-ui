import { useState } from "react";
import {
    type Intervention,
    type Transition,
    getInterventions,
    makeEmptyTransition
} from "~/data";
import { useInputs } from "@components/input-contexts";
import Tabs from "@simulation/interventions/tabs";
import Contents from "@simulation/interventions/contents";

export default function Interventions() {
    const inputs = useInputs();
    const interventions = inputs.interventions;
    return (
	<div id="interventions">
	    <Tabs interventions={interventions} />
	    <Contents interventions={interventions} />
	</div>
    );
}
