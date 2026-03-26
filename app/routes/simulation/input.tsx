import type { Route } from "./+types/input";

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

import { Form, useFetcher } from "react-router";

// component imports
import Tabs from "@simulation/interventions/tabs";
import Contents from "@simulation/interventions/contents";

// method imports
import { useInputs } from "@components/input-contexts";
import { getInterventions } from "~/data";

export async function clientLoader({ params }: Route.LoaderArgs) {
    // get current interventions
    // const res = await fetch(`${process.env.BACKEND_API_URL}/data/interventions`)
    const interventions = await getInterventions();
    return interventions;
}

export default function Input({ loaderData }: Route.ComponentProps) {
    // const inputs = useInputs();
    const fetcher = useFetcher();
    const interventions = loaderData;
    console.log(interventions);

    return (
        <>
            <div id="interventions">
                <Tabs interventions={interventions} />
                <Contents interventions={interventions} />
            </div>
        </>
    )
}
