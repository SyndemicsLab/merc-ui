interface QuestionnaireForm {
    purpose_personal: boolean;
    purpose_policy: boolean;
    purpose_academic: boolean;
    purpose_program: boolean;
    purpose_other: string | null;
    us_state: string | null;
    occupation_healthcare: boolean;
    occupation_publichealth: boolean;
    occupation_research: boolean;
    occupation_policy: boolean;
    occupation_government: boolean;
    occupation_education: boolean;
    occupation_nonprofit: boolean;
    occupation_media: boolean;
    occupation_other: string | null;
}

function createQuestionnaireForm(): QuestionnaireForm {
    return {
	purpose_personal: false,
	purpose_policy: false,
	purpose_academic: false,
	purpose_program: false,
	purpose_other: null,
	us_state: null,
	occupation_healthcare: false,
	occupation_publichealth: false,
	occupation_research: false,
	occupation_policy: false,
	occupation_government: false,
	occupation_education: false,
	occupation_nonprofit: false,
	occupation_media: false,
	occupation_other: null,
    };
}

export type { QuestionnaireForm };
export { createQuestionnaireForm };
