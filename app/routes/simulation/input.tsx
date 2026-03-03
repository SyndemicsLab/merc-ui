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

export async function loader({ params }: Route.LoaderArgs) {
    const res = await fetch(`${process.env.BACKEND_API_URL}/data/interventions`)
    // const intervention = await getIntervention(params.id);

    // Temp data for testing
    const intervention =
    {
        id: 1,
        name: "No Treatment",
        helper: "Population not involved in any community based intervention treatments for opioid use disorder.",
        size: 7897,
        probs: { "buprenorphine": .035466, "naltrexone": 0.000735, "methadone": .009186, "detox": 0.000494, "detention": 0.001497, "retention": 0.952622 },
        od_probs: { "injection": 0.13, "non-injection": 0.09 }
    }
    return { intervention };
}

export default function Input({ loaderData }: Route.ComponentProps) {
    const { intervention } = loaderData;

    return (
        <>
            <h2 className="inputName">Intervention Name</h2>
            <input type="text" value={intervention.name} readOnly={true} />

            {intervention.helper ? (
                <p className="intervention-description">
                    {intervention.helper}
                </p>
            ) : null}
            {intervention.helper ? (
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
                            {intervention.helper}
                        </div>
                    </DialogContent>
                </Dialog>
            ) : null}
        </>
    )
}