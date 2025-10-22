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
import GroupedBarPlot from "@components/simulation/viz/grouped-bar-plot";

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
            <DialogContent className="rounded-2xl bg-white w-[80%] p-9">
                <DialogHeader>
                    <DialogTitle>Simulation Results</DialogTitle>
                    <DialogDescription>
                        It may take several minutes for the model to execute and
                        for results to populate.
                    </DialogDescription>
                </DialogHeader>
                {/* Temporarily commenting out disclaimers */}
                {/* <Disclaimers /> */}
                <div className="results-main flex flex-col">
                    {/* Still need to add a loading indicator to plots */}
                    {/* All data contained below is dummy data for testing */}
                    <LinePlot
                        data={[
                            [2020, 2103],
                            [2021, 2290],
                            [2022, 2357],
                            [2023, 2125],
                            [2024, 1596],
                            [2025, 1782],
                        ]}
                        title="Fatal Overdose Counts By Calendar Year"
                        xTitle="Year"
                        yTitle="Number of Fatal Overdoses"
                    />
                    <LinePlot
                        data={[
                            [2020, 16177],
                            [2021, 17615],
                            [2022, 18131],
                            [2023, 16346],
                            [2024, 12277],
                            [2025, 13708],
                        ]}
                        title="Non-Fatal Overdose Counts By Calendar Year"
                        xTitle="Year"
                        yTitle="Number of Non-Fatal Overdoses"
                    />
                    <GroupedBarPlot
                        data={[
                            {cost: Math.random() * 10 ** 8, state: "MA", perspective: "Healthcare"},
                            {cost: Math.random() * 10 ** 8, state: "MA", perspective: "Societal"},
                            {cost: Math.random() * 10 ** 8, state: "MA", perspective: "Policymaker"},
                        ]}
                        primaryKey="state"
                        groupKey="perspective"
                        valueKey="cost"
                        title="Three-Perspective Analysis"
                        xTitle="New England State"
                        yTitle="Cost of Intervention ($)"
                    />
                    <GroupedBarPlot
                        data={[
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "Healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "Societal"},
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "Policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "Charity"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "Healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "Societal"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "Policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "Charity"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "Healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "Societal"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "Policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "Charity"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "Healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "Societal"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "Policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "Charity"},
                        ]}
                        primaryKey="state"
                        groupKey="perspective"
                        valueKey="cost"
                        title="Four-Perspective Analysis"
                        xTitle="US State"
                        yTitle="Cost of Intervention ($)"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
