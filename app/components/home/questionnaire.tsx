import { Form } from "react-router";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@components/ui/dialog";

import StateDropdown from "@components/ui/statedropdown";
import { useState } from "react";

const Questionnaire = () => {
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl text-left p-[20px] sm:max-w-[600px] bg-white dialog-root">
                <DialogHeader>
                    <DialogTitle>Questionnaire</DialogTitle>
		    <DialogDescription>Please help us serve you better by answering a few quick questions.</DialogDescription>
                </DialogHeader>
                <Form method="post">
                    <div className="questionnaire">
                        <span className="dialog-question">
                            What is the purpose of your site visit? (Select all that apply)
                        </span>
                        <ul>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="personal" />
                                <span className="dialog-response">Personal Research</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="policy" />
                                <span className="dialog-response">Policy Development</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="academic" />
                                <span className="dialog-response">Academic Research</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="program" />
                                <span className="dialog-response">Program Development</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="other" />
                                <span className="dialog-response">
                                    Other:
                                    <input
                                        className="dialog-input rounded-md"
                                        type="text"
                                        placeholder="Purpose"
                                    />
                                </span>
                            </li>
                        </ul>
                        <span className="dialog-question">
                            What US State are you most interested in researching?
                        </span>
                        <StateDropdown />
                        <span className="dialog-question">
                            What is your occupation or field of work? (Select all that apply)
                        </span>
                        <ul>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="healthcare" />
                                <span className="dialog-response">Healthcare</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="publichealth" />
                                <span className="dialog-response">Public Health</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="research" />
                                <span className="dialog-response">Research</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="policy" />
                                <span className="dialog-response">Policy</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="government" />
                                <span className="dialog-response">Government</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="education" />
                                <span className="dialog-response">Education</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="nonprofit" />
                                <span className="dialog-response">Non-Profit/Community Organization</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="media" />
                                <span className="dialog-response">Media/Communications</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="other" />
                                <span className="dialog-response">
                                    Other:
                                    <input
                                        className="dialog-input rounded-md"
                                        type="text"
                                        placeholder="Occupation/Field of Work"
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <input
                        type="hidden"
                        name="questionnaireVisibility"
                        value="hidden" />
                    <button type="submit">Submit</button>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default Questionnaire;
