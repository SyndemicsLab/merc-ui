import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@components/ui/dialog";
import results from "~/images/tutorial/7.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@components/ui/button";

function Result({loaded, loadedController}) {
    setTimeout(() => {
	loadedController(true);
    }, 5000);
    if (loaded) {
	return(
	    <img src={results} alt="RESPOND model results" />
	);
    } else {
	return(
	    <div className="loader" />
	);
    }
}

export default function Results() {
    const [loaded, setLoaded] = useState(false);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="run-text">RUN</Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px] p-9">
                <DialogHeader>
                    <DialogTitle>Simulation Results</DialogTitle>
                    <DialogDescription>
			It may take several minutes for the model to execute and for results to populate.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    </div>
		    <Result loaded={loaded} loadedController={setLoaded} />
                    <div className="grid grid-cols-4 items-center gap-4">
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Download Results</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
