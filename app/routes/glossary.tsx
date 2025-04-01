import React from "react";
import type { GlossaryItem,
	      GlossaryTable } from "@components/ui/glossary/glossary-table";
import { GlossarySection } from "@components/ui/glossary/glossary-table";

const treatments: GlossaryTable = {
    section: "Treatment States",
    headers: ["Treatment State", "Definition"],
    items: [
	{
	    name: "No Treatment",
	    baseText: "This treatment state encompasses individuals who are not actively engaged with any kind of treatment.",
	},
	{
	    name: "Buprenorphine (Bup)",
	    baseText: "This treatment state is for individuals who are engaged with buprenorphine, a medication for opioid use disorder, in the community.",
	    howItWorks: "Buprenorphine is a ‘partial opioid agonist’, and ‘diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings’ (SAMHSA).",
	    treatment: "‘To begin treatment, an OUD patient must abstain from using opioids for at least 12 to 24 hours and be in the early stages of opioid withdrawal … The length of time a patient receives buprenorphine is tailored to meet the needs of each patient, and in some cases, treatment can be indefinite.’ (SAMHSA, same source)",
	    administration: "sublingual tablets, buccal films, transdermal films, and injections, alone or in combination with naloxone. How often are doctors visits? How much take home can you get?",
	    brands: "Belbuca, Brixadi, Buprenex, Buprenorphine, Butrans, Sublocade, Suboxone, Subutex, Zubsolv",
	    otherNames: "big whites, buse, oranges, small whites, sobos, stops, strips, sub, subs (cite) – check this with CAB?",
	    more: "do we want academic papers here? Info on where to get it?",
	},
	{
	    name: "Methadone (MMT)",
	    baseText: "This treatment state is for individuals who are engaged with Methadone, a medication for opioid use disorder, in the community.",
	    howItWorks: "Methadone is a ‘long-acting full opioid agonist’, and ‘reduces opioid craving and withdrawal and blunts or blocks the effects of opioids’ (SAMHSA).",
	    treatment: "Methadone is taken daily, and can only be prescribed through a certified opioid treatment program.",
	    administration: "Tablet, dispersible tablet (tablet that can be dissolved in liquid), solution (liquid), and a concentrated solution to take by mouth. After a period of consistent treatment, certified providers can prescribe take-home doses of Methadone up to 28 days (cite).",
	    brands: "Methadose, Dolophine",
	    otherNames: "amidone, dollies, dolls, fizzies, mud, red rock, tootsie roll (cite) – check this with CAB?",
	},
	{
	    name: "Naltrexone (Ntx)",
	    baseText: "This treatment state is for individuals who are engaged with Naltrexone, a medication for opioid use disorder, in the community.",
	    howItWorks: "Naltrexone is an opioid antagonist, and ‘blocks the euphoric and sedative effects of opioids such as heroin, morphine, and codeine. Naltrexone binds and blocks opioid receptors and reduces and suppresses opioid cravings.’ (SAMHSA)",
	    treatment: "‘Patients should wait at least 7 days after their last use of short-acting opioids and 10 to 14 days for long-acting opioids, before starting Naltrexone.’",
	    administration: "pill form for alcohol use disorder, or as an extended-release intramuscular injectable for alcohol or opioid use disorder (monthly injections).",
	    brands: "Contrave, Embeda, Vivitrol",
	    otherNames: "? – check this with CAB?",
	},
	{
	    name: "Detoxification",
	    baseText: "This treatment state is for individuals who are in medically supervised withdrawal management from opioids. Detox programs can occur in inpatient, residential, day, or outpatient settings, and we model inpatient settings.",
	    howItWorks: "Individuals move to inpatient programs and stop opioid use. Withdrawal symptoms are managed by medical providers. We assume that due to medical supervision, there are no overdoses in Detox.",
	    treatment: "Individuals stay in Detox centers for 3-10 days on average, and it has been shown that without linkage to medications for opioid use disorder, detox is not effective in permanently stopping an individual’s use of opioids.",
	},
	{
	    name: "Residential",
	    baseText: "This treatment state is for individuals who are in long-term inpatient residential facilities, receiving treatment for opioid use disorder. Residential programs may be combined with medications for opioid use disorder.",
	    howItWorks: "Individuals move to residential treatment centers, typically staying 3 to 12 months. Residential treatment centers may offer the potential for opioid detoxification, coping skills development, and facilitated involvement with various non-medication treatments.",
	},
	{
	    name: "Detention",
	    baseText: "This treatment state is for individuals in detention settings, typically jails.",
	    howItWorks: "Individuals move to detention settings, and typically do not receive medication for opioid use disorder. We know that while there are more barriers to using opioids in jails, it still happens, and overdoses do occur. The average length of stay is around 35 days in our model. ",
	},
	{
	    name: "Post-Treatment",
	    baseText: "This treatment state is for individuals who have recently left a treatment state other than No Treatment. Whenever a person who uses drugs withdraws from MOUD treatment or is discharged from detox, residential care, or a correctional facility, there is a risk of relapse to active drug use. Overdose rates are higher in Post-Treatment due to lowered tolerance.",
	    howItWorks: "The population that is using drugs in the four-week period immediately “post-treatment” experiences an elevated overdose risk, reflecting the period of increased mortality when using opioids after a period of abstinence. Following this “post-treatment period”, people move to the No Treatment state, where they are eligible to begin treatment or remain untreated.",
	},
    ]
};

export default function Glossary() {
    return(
	<div id="glossary">
	    {GlossarySection(treatments)}
	</div>
    );
}
