import { Form } from "react-router";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@components/ui/dialog";

import StateDropdown from "@components/ui/statedropdown";
import { Input } from "@components/ui/input";
import { useState } from "react";
import type { QuestionnaireForm } from "@components/home/types/questionnaire_form";
import { createQuestionnaireForm } from "@components/home/types/questionnaire_form";

function MultiResponseQuestion(
    { name, question, responses, lastOther = false }:
    { name: string, question: string, responses: string[], lastOther?: boolean }) {
    return (
	<>
            <span className="dialog-question">
		{question}
            </span>
            <ul>
		{responses.map((response, index) => {
		    return(
			<>
			    <li>
				<input type="checkbox" className="dialog-checkbox" name={name} />
			        <span className="dialog-response">{response}
			            { index === (responses.length - 1) && lastOther ? (
					<input className="dialog-input rounded-md"
					       type="text"
				               name={`${name}OtherText`}
					       placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
					/>
			            ): null}
				</span>
			    </li>
			</>
		    );
		})}
            </ul>
	</>
    );
}

function QuestionnaireBody(
    { questionnaireData, onInputChange }:
    { questionnaireData: QuestionnaireForm, onInputChange: Function }
) {
}

const Questionnaire = () => {
    const [open, setOpen] = useState(true);
    const [formContents, setFormContents] = useState(createQuestionnaireForm);

    function changeQuestionnaireData(
	{ field, value }: { field: string, value: string | boolean }) {
	setFormContents({...formContents, [field]: value});
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl text-left p-[20px] sm:max-w-[600px] bg-white dialog-root">
                <DialogHeader>
                    <DialogTitle>Questionnaire</DialogTitle>
                    <DialogDescription>Please help us serve you better by answering a few quick questions.</DialogDescription>
                </DialogHeader>
                <Form method="post">
		    {
			//action="127.0.0.1:8000/SubmitQuestionnaire"> -->
		    }
                    <div className="questionnaire">
			<MultiResponseQuestion
			    name="purpose"
			    question={"What is the purpose of your site visit? (Select all that apply)"}
			    responses={[
				"Personal Research",
				"Policy Development",
				"Academic Research",
				"Program Development",
				"Other:"
			    ]}
			    lastOther={true}
			/>
                        <span className="dialog-question">
                            What US State are you most interested in researching?
                        </span>
                        <StateDropdown />
                        <Input type="hidden" name="usState" id="usState" required />
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
				"Other:"
			    ]}
			    lastOther={true}
			/>
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
