import {
    Dialog,
    DialogContent, DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@components/ui/dialog";
import results from "~/images/examples/results.jpg";
import { useState } from "react";
import { Button } from "@components/ui/button";
import Disclaimers from "@components/simulation/disclaimers";
import EmailIntake from "@simulation/emailintake";
import LinePlot from "@components/simulation/viz/line-plot";

function Result({loaded, loadedController}) {
    setTimeout(() => {
        loadedController(true);
    }, 5000);
    if (loaded) {
        return(
            <>
                <img className="sim-result" src={results} alt="RESPOND model results" />
                <DialogFooter>
                    <Button type="download">Download Results</Button>
                    <EmailIntake />
                </DialogFooter>
            </>
        );
    } else {
        return(
            <div className="loader" />
        );
    }
}

export default function Results() {
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    return (
        <Dialog id="results" open={open}
                onOpenChange={
                    (open) => {
                        setOpen(open);
                        if (open) {
                            setLoaded(false);
                        }
                    }
                }>
            <DialogTrigger asChild>
                <Button variant="outline" className="run-text">RUN</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl bg-white max-w-[425px] lg:max-w-[750px] p-9">
                <DialogHeader>
                    <DialogTitle>Simulation Results</DialogTitle>
                    <DialogDescription>
                        It may take several minutes for the model to execute and
                        for results to populate.
                    </DialogDescription>
                </DialogHeader>
                <Disclaimers />
                {/* <Result loaded={loaded} loadedController={setLoaded} /> */}
                <LinePlot
                    data={[[0, 0], [1, 1000], [2, 1500], [3, 3000]]}
                />
            </DialogContent>
        </Dialog>
    )
}
