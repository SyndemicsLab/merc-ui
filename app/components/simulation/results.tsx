import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@components/ui/dialog";
import results from "~/images/tutorial/7.jpg";

import { Button } from "@components/ui/button";

export default function Results() {
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
		    <img src={results} alt="RESPOND model results" />
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
