import { useState } from "react";
import { Form } from "react-router";

import type {
    QuestionnaireForm
} from "@components/home/types/questionnaire_form";
import {
    createQuestionnaireForm
} from "@components/home/types/questionnaire_form";
import StateDropdown from "@components/ui/statedropdown";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";

function DropdownQuestion(
    { name, question, children }:
    { name: string, question: string, children: Function }
) {
    return(
	<>
	    <span className="dialog-question">
		{question}
	    </span>
	    {children}
	</>
    );
}

function MultiResponseQuestion(
    { name, question, responses, data, onInputChange, lastOther = false }:
    { name: string, question: string, responses: string[], data: Object, onInputChange: Function, lastOther?: boolean }) {
    const responseOptions = responses.map((response, index) => {
	let target: string = name + '_' +
	    response
	    .replace(/(\s|-)/, "")
	    .replace(/(^\w+).*/, "$1")
	    .replace(/\w/g, x => x.toLowerCase());
	return(
	    <li key={index}>
		<input
		    type="checkbox"
		    className="dialog-checkbox"
		    name={name}
		    checked={data[target]}
		    onChange={() => onInputChange(target, !(data[target]))}
		/>
		<span className="dialog-response">{`${response} (${target})`}
		    { index === (responses.length - 1) && lastOther ? (
			<input className="dialog-input rounded-md"
			       type="text"
			       name={`${name}OtherText`}
			       placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
			/>
		    ): null}
		</span>
	    </li>
	);
    });
    return (
	<>
            <span className="dialog-question">{question}</span>
            <ul>{responseOptions}</ul>
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
			    data={formContents}
			    onInputChange={changeQuestionnaireData}
			    lastOther={true}
			/>
			<DropdownQuestion
			    name="usState"
			    question="What US State are you most interested in researching?"
			>
			    <StateDropdown />
			</DropdownQuestion>
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
                    <button type="submit" onClick={() => {alert(JSON.stringify(formContents))}}>Submit</button>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default Questionnaire;
