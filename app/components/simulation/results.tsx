import {
    Dialog,
    DialogContent, DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@components/ui/dialog";
import { useState } from "react";
import { Button } from "@components/ui/button";
import Disclaimers from "@components/simulation/disclaimers";
import EmailIntake from "@simulation/emailintake";
import LinePlot from "@components/simulation/viz/line-plot";

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
                {/* Still need to add a loading indicator to plots */}
                <LinePlot
                    data={[[0, 0], [1, 1000], [2, 1500], [3, 3000], [4, 2200], [5, 4000], [6, 8000], [7, 5000], [8, 4400], [9, 8500]]}
                    width={480}
                    height={360}
                />
            </DialogContent>
        </Dialog>
    )
}
