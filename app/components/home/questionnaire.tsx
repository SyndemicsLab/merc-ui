import { useState } from "react";
import { useFetcher } from "react-router";

import Dropdown from "@components/ui/dropdown";
import States from "@components/ui/questionnaire";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@components/ui/dialog";

interface DropdownOption {
    value: string;
    label: string;
}

function DropdownQuestion({
    name,
    question,
    options,
}: {
    name: string;
    question: string;
    options: DropdownOption[];
}) {
    return (
        <div className="questionnaire-question">
            <span className="dialog-question">{question}</span>
            <Dropdown
                name={name}
                options={options}
                className="h-[40px] w-[220px] justify-between"
            />
            <input id={name} type="hidden" name={name} />
        </div>
    );
}

function MultiResponseQuestion({
    name,
    question,
    responses,
    lastOther = false,
}: {
    name: string;
    question: string;
    responses: string[];
    lastOther?: boolean;
}) {
    const [otherChecked, setOtherChecked] = useState(false);
    const responseOptions = responses.map((response, index) => {
        const target: string =
            name +
            "_" +
            response
                .replace(/(\s|-)/, "_") // replace hyphens and white space
                .replace(/\/.*/, "") // remove content from `/` onward
                .replace(/\w/g, (x) => x.toLowerCase()); // make all letters lowercase

        return (
            <li key={index}>
                <div className="questionnaire-check">
                    {index === responses.length - 1 && lastOther ? (
                        <>
                            <input
                                type="checkbox"
                                className="dialog-checkbox"
                                name={target}
                                onChange={() => setOtherChecked(!otherChecked)}
                            />
                            <div className="dialog-response">
                                {`${response}`}
                                {otherChecked ? (
                                    <input
                                        className="dialog-input rounded-md"
                                        type="text"
                                        name={`${name}_other_text`}
                                        placeholder={
                                            name.charAt(0).toUpperCase() +
                                            name.slice(1)
                                        }
                                        required
                                    />
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <>
                            <input
                                type="checkbox"
                                className="dialog-checkbox"
                                name={target}
                            />
                            <div className="dialog-response">
                                {`${response}`}
                            </div>
                        </>
                    )}
                </div>
            </li>
        );
    });
    return (
        <div className="questionnaire-question">
            <span className="dialog-question">{question}</span>
            <ul>{responseOptions}</ul>
        </div>
    );
}

const Questionnaire = () => {
    const [open, setOpen] = useState(true);
    const fetcher = useFetcher();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl text-left p-[20px] max-w-[600px] min-w-[400px] bg-white dialog-root">
                <DialogHeader>
                    <DialogTitle>Questionnaire</DialogTitle>
                    <DialogDescription>
                        Your answers to the following questions are optional
                        and serve only to help us understand the way this tool
                        is being used. This information will let us know how we
                        can best update and expand the tool to be as useful as
                        possible. The answers you do or do not provide will not
                        impact your use of the tool in any way.
                    </DialogDescription>
                </DialogHeader>
                <fetcher.Form method="post">
                    <div className="questionnaire">
                        <MultiResponseQuestion
                            name="purpose"
                            question={
                                "What is the purpose of your site visit? (Select all that apply)"
                            }
                            responses={[
                                "Personal Research",
                                "Policy Development",
                                "Academic Research",
                                "Program Development",
                                "Other",
                            ]}
                            lastOther={true}
                        />
                        <DropdownQuestion
                            name="us_state"
                            question="Which US State are you most interested in researching?"
                            options={States}
                        />
                        <MultiResponseQuestion
                            name="occupation"
                            question="What is your occupation or field of work? (Select all that apply)"
                            responses={[
                                "Healthcare",
                                "Public Health",
                                "Research",
                                "Policy",
                                "Government",
                                "Education",
                                "Non-Profit/Community Organization",
                                "Media/Communications",
                                "Other",
                            ]}
                            lastOther={true}
                        />
                    </div>
                    <input
                        name="questionnaireVisibility"
                        type="hidden"
                        value="hidden"
                    />
                    <button type="submit">Submit</button>
                </fetcher.Form>
            </DialogContent>
        </Dialog>
    );
};

export default Questionnaire;
