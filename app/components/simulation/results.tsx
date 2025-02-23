import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@components/ui/dialog";

import { Button } from "@components/ui/button";

export default function Results() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="run-text">RUN</Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Simulation Results</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    </div>
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
