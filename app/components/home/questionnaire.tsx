import { Form } from "react-router";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import React, { useState } from "react";

const Questionnaire = () => {
    const [open, setOpen] = useState(true);

    const states = [
        {
            value: "Alabama",
            label: "Alabama"
        },
        {
            value: "Alaska",
            label: "Alaska"
        },
        {
            value: "Arizona",
            label: "Arizona"
        },
        {
            value: "Arkansas",
            label: "Arkansas"
        },
        {
            value: "California",
            label: "California"
        },
        {
            value: "Colorado",
            label: "Colorado"
        },
        {
            value: "Connecticut",
            label: "Connecticut"
        },
        {
            value: "Delaware",
            label: "Delaware"
        },
        {
            value: "Florida",
            label: "Florida"
        },
        {
            value: "Georgia",
            label: "Georgia"
        },
        {
            value: "Hawaii",
            label: "Hawaii"
        },
        {
            value: "Idaho",
            label: "Idaho"
        },
        {
            value: "Illinois",
            label: "Illinois"
        },
        {
            value: "Indiana",
            label: "Indiana"
        },
        {
            value: "Iowa",
            label: "Iowa"
        },
        {
            value: "Kansas",
            label: "Kansas"
        },
        {
            value: "Kentucky",
            label: "Kentucky"
        },
        {
            value: "Louisiana",
            label: "Louisiana"
        },
        {
            value: "Maine",
            label: "Maine"
        },
        {
            value: "Maryland",
            label: "Maryland"
        },
        {
            value: "Massachusetts",
            label: "Massachusetts"
        },
        {
            value: "Michigan",
            label: "Michigan"
        },
        {
            value: "Minnesota",
            label: "Minnesota"
        },
        {
            value: "Mississippi",
            label: "Mississippi"
        },
        {
            value: "Missouri",
            label: "Missouri"
        },
        {
            value: "Montana",
            label: "Montana"
        },
        {
            value: "Nebraska",
            label: "Nebraska"
        },
        {
            value: "Nevada",
            label: "Nevada"
        },
        {
            value: "New Hampshire",
            label: "New Hampshire"
        },
        {
            value: "New Jersey",
            label: "New Jersey"
        },
        {
            value: "New Mexico",
            label: "New Mexico"
        },
        {
            value: "New York",
            label: "New York"
        },
        {
            value: "North Carolina",
            label: "North Carolina"
        },
        {
            value: "North Dakota",
            label: "North Dakota"
        },
        {
            value: "Ohio",
            label: "Ohio"
        },
        {
            value: "Oklahoma",
            label: "Oklahoma"
        },
        {
            value: "Oregon",
            label: "Oregon"
        },
        {
            value: "Pennsylvania",
            label: "Pennsylvania"
        },
        {
            value: "Rhode Island",
            label: "Rhode Island"
        },
        {
            value: "South Carolina",
            label: "South Carolina"
        },
        {
            value: "South Dakota",
            label: "South Dakota"
        },
        {
            value: "Tennessee",
            label: "Tennessee"
        },
        {
            value: "Texas",
            label: "Texas"
        },
        {
            value: "Utah",
            label: "Utah"
        },
        {
            value: "Vermont",
            label: "Vermont"
        },
        {
            value: "Virginia",
            label: "Virginia"
        },
        {
            value: "Washington",
            label: "Washington"
        },
        {
            value: "West Virginia",
            label: "West Virginia"
        },
        {
            value: "Wisconsin",
            label: "Wisconsin"
        },
        {
            value: "Wyoming",
            label: "Wyoming"
        },

    ]

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Questionnaire</DialogTitle>
                </DialogHeader>
                <div>
                    <span>Please help us continue our research by answering a few quick questions.</span>
                </div>
                <Form method="post">
                    <div className="questionnaire">
                        <span className="dialog-question">
                            What is the purpose of your site visit? (Select all that apply)
                        </span>
                        <ul>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="personal" />
                                <span className="dialog-response">Personal research</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="policy" />
                                <span className="dialog-response">Policy development</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="academic" />
                                <span className="dialog-response">Academic research</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="program" />
                                <span className="dialog-response">Program development</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="purpose" value="other" />
                                <span className="dialog-response">
                                    Other:
                                    <input
                                        className="dialog-input"
                                        type="text"
                                        placeholder="Purpose"
                                    />
                                </span>
                            </li>
                        </ul>
                        <span className="dialog-question">
                            What US State are you most interested in researching?
                        </span>

                        <br />
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
                                <span className="dialog-response">Public health</span>
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
                                <span className="dialog-response">Non-profit/community organization</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="media" />
                                <span className="dialog-response">Media/communications</span>
                            </li>
                            <li>
                                <input type="checkbox" className="dialog-checkbox" name="occupation" value="other" />
                                <span className="dialog-response">
                                    Other:
                                    <input
                                        className="dialog-input"
                                        type="text"
                                        placeholder="Occupation/Field of Work"
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <input
                        type="hidden"
                        name="answeredQuestionnaire"
                        value="hidden" />
                    <button type="submit">Submit</button>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default Questionnaire;
