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
                            [0, 0],
                            [1, 1000],
                            [2, 1500],
                            [3, 3000],
                            [4, 2200],
                            [5, 4000],
                            [6, 8000],
                            [7, 5000],
                            [8, 4400],
                            [9, 8500]
                        ]}
                        title="Arbitrary Fixed Data"
                        xTitle="Time"
                        yTitle="Value"
                    />
                    <LinePlot
                        data={[...Array(101)].map((_, i) => -50+ i).map(
                            (x) => {
                                return([x * Math.PI/8, Math.sin(x * Math.PI/8)])
                            })}
                        title="Sine Wave"
                        xTitle="Time"
                        yTitle="Value"
                    />
                    <LinePlot
                        data={[...Array(71)].map((_, i) => -35+ i).map(
                            (x) => {
                                let temp = Math.random() * 1000000 + 500;
                                return([x, Math.random() > 0.5 ? temp : -temp]);
                            })}
                        title="Random Data Points"
                        xTitle="Time"
                        yTitle="Value"
                    />
                    <GroupedBarPlot
                        data={[
                            {cost: Math.random() * 10 ** 8, state: "MA", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 8, state: "MA", perspective: "societal"},
                            {cost: Math.random() * 10 ** 8, state: "MA", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 8, state: "CT", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 8, state: "CT", perspective: "societal"},
                            {cost: Math.random() * 10 ** 8, state: "CT", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 8, state: "RI", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 8, state: "RI", perspective: "societal"},
                            {cost: Math.random() * 10 ** 8, state: "RI", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 8, state: "VT", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 8, state: "VT", perspective: "societal"},
                            {cost: Math.random() * 10 ** 8, state: "VT", perspective: "policymaker"},
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
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "societal"},
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "MA", perspective: "charity"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "societal"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "CT", perspective: "charity"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "societal"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "RI", perspective: "charity"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "healthcare"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "societal"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "policymaker"},
                            {cost: Math.random() * 10 ** 5, state: "VT", perspective: "charity"},
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
