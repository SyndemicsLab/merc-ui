import { useInputs } from "@components/input-contexts";
import Tabs from "@simulation/interventions/tabs";
import Contents from "@simulation/interventions/contents";

export default function Interventions() {
    const inputs = useInputs();
    const interventions = inputs.interventions;
    const nameErrorsById: Record<number, string> = {};
    return (
        <div id="interventions">
            {/*
               Temporarily commenting for Alpha - replace the element below with
               <Tabs interventions={interventions} presets={interventions} />
             */}
            <Tabs interventions={interventions} />
            <Contents
                interventions={interventions}
                nameErrorsById={nameErrorsById}
            />
        </div>
    );
}
