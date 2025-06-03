import { useState } from "react";
import { Form } from "react-router";

import Dropdown from "@components/ui/dropdown";
import States from "@components/ui/questionnaire";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";

function DropdownQuestion(
    { name, question, options }:
    { name: string, question: string, options: any[] }
) {
    return(
	<>
	    <span className="dialog-question">
		{question}
	    </span>
	    <Dropdown
		name={name}
		options={options}
	    />
	    <input id={name} type="hidden" name={name} />
	</>
    );
}

function MultiResponseQuestion(
    { name, question, responses, lastOther = false }:
    { name: string, question: string, responses: string[], lastOther?: boolean }) {
    const responseOptions = responses.map((response, index) => {
	let target: string = name + '_' +
	    response
	    .replace(/(\s|-)/, "_")   // replace hyphens and white space
	    .replace(/\/.*/, "")      // remove content from `/` onward
	    .replace(/\w/g, x => x.toLowerCase()); // make all letters lowercase
	return(
	    <li key={index}>
		<input
		    type="checkbox"
		    className="dialog-checkbox"
		    name={target}
		/>
		<span className="dialog-response">{`${response}`}
		    { index === (responses.length - 1) && lastOther ? (
			<input className="dialog-input rounded-md"
			       type="text"
			       name={`${name}_other_text`}
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

const Questionnaire = () => {
    const [open, setOpen] = useState(true);

    function handleSubmit(e) {
	e.preventDefault();

	const formData = new FormData(e.target);

	const formJson = Object.fromEntries(formData.entries());
	for (var x in formJson) {
	    if (formJson[x] === "on") {
		formJson[x] = true;
	    }
	    if (formJson[x] === "") {
		formJson[x] = null;
	    }
	}

	delete formJson["questionnaireVisibility"];
	console.log(formJson);

	const request = fetch(
	    "http://127.0.0.1:8000/SubmitQuestionnaire",
	    {
		method: e.target.method,
		mode: "cors",
		body: JSON.stringify(formJson),
		headers: {
		    "Content-Type": "application/json",
		}
	    }
	);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-2xl text-left p-[20px] sm:max-w-[600px] bg-white dialog-root">
                <DialogHeader>
                    <DialogTitle>Questionnaire</DialogTitle>
                    <DialogDescription>Please help us serve you better by answering a few quick questions.</DialogDescription>
                </DialogHeader>
                <Form method="post" onSubmit={handleSubmit}>
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
				"Other"
			    ]}
			    lastOther={true}
			/>
			<DropdownQuestion
			    name="us_state"
			    question="What US State are you most interested in researching?"
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
				"Other"
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
