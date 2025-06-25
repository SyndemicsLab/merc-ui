import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@components/ui/dialog";
import results from "~/images/examples/results.jpg";
import { useState } from "react";
import { Button } from "@components/ui/button";
import Disclaimers from "@components/simulation/disclaimers";

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
        <Dialog open={open} onOpenChange={(open) => {
		    setOpen(open);
		    if (open) {
			setLoaded(false);
		    }
		}}>
            <DialogTrigger asChild>
                <Button variant="outline" className="run-text">RUN</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl bg-white max-w-[425px] lg:max-w-[750px] p-9">
                <DialogHeader>
                    <DialogTitle>Simulation Results</DialogTitle>
                    <DialogDescription>
			It may take several minutes for the model to execute and for results to populate.
                    </DialogDescription>
                </DialogHeader>
		<Disclaimers />
		<Result loaded={loaded} loadedController={setLoaded} />
            </DialogContent>
        </Dialog>
    )
}
