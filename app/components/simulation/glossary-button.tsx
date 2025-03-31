import InfoButton from "@components/ui/info-button";
export default function GlossaryButton() {
    return(
	    <InfoButton
		className="glossary"
		text="Open Glossary"
		destination="/glossary"
	    />
    );
}
