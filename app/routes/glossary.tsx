import * as React from "react";
import type { GlossaryTable } from "@components/ui/glossary/glossary-table";
import { GlossarySection } from "@components/ui/glossary/glossary-table";

const treatments: GlossaryTable = {
    section: "Treatment States",
    headers: ["Treatment State", "Definition"],
    items: [
        {
            name: "No Treatment",
            baseText:
                "This treatment state encompasses individuals who are not actively engaged with any kind of treatment.",
        },
        {
            name: "Buprenorphine (Bup)",
            baseText:
                "This treatment state is for individuals who are engaged with buprenorphine, a medication for opioid use disorder, in the community.",
            howItWorks:
                "Buprenorphine is a ‘partial opioid agonist’, and ‘diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings’ (SAMHSA).",
            treatment:
                "‘To begin treatment, an OUD patient must abstain from using opioids for at least 12 to 24 hours and be in the early stages of opioid withdrawal … The length of time a patient receives buprenorphine is tailored to meet the needs of each patient, and in some cases, treatment can be indefinite.’ (SAMHSA, same source)",
            administration:
                "sublingual tablets, buccal films, transdermal films, and injections, alone or in combination with naloxone. How often are doctors visits? How much take home can you get?",
            brands: "Belbuca, Brixadi, Buprenex, Buprenorphine, Butrans, Sublocade, Suboxone, Subutex, Zubsolv",
            otherNames:
                "big whites, buse, oranges, small whites, sobos, stops, strips, sub, subs (cite) – check this with CAB?",
            more: "do we want academic papers here? Info on where to get it?",
        },
        {
            name: "Methadone (MMT)",
            baseText:
                "This treatment state is for individuals who are engaged with Methadone, a medication for opioid use disorder, in the community.",
            howItWorks:
                "Methadone is a ‘long-acting full opioid agonist’, and ‘reduces opioid craving and withdrawal and blunts or blocks the effects of opioids’ (SAMHSA).",
            treatment:
                "Methadone is taken daily, and can only be prescribed through a certified opioid treatment program.",
            administration:
                "Tablet, dispersible tablet (tablet that can be dissolved in liquid), solution (liquid), and a concentrated solution to take by mouth. After a period of consistent treatment, certified providers can prescribe take-home doses of Methadone up to 28 days (cite).",
            brands: "Methadose, Dolophine",
            otherNames:
                "amidone, dollies, dolls, fizzies, mud, red rock, tootsie roll (cite) – check this with CAB?",
        },
        {
            name: "Naltrexone (Ntx)",
            baseText:
                "This treatment state is for individuals who are engaged with Naltrexone, a medication for opioid use disorder, in the community.",
            howItWorks:
                "Naltrexone is an opioid antagonist, and ‘blocks the euphoric and sedative effects of opioids such as heroin, morphine, and codeine. Naltrexone binds and blocks opioid receptors and reduces and suppresses opioid cravings.’ (SAMHSA)",
            treatment:
                "‘Patients should wait at least 7 days after their last use of short-acting opioids and 10 to 14 days for long-acting opioids, before starting Naltrexone.’",
            administration:
                "pill form for alcohol use disorder, or as an extended-release intramuscular injectable for alcohol or opioid use disorder (monthly injections).",
            brands: "Contrave, Embeda, Vivitrol",
            otherNames: "? – check this with CAB?",
        },
        {
            name: "Detoxification",
            baseText:
                "This treatment state is for individuals who are in medically supervised withdrawal management from opioids. Detox programs can occur in inpatient, residential, day, or outpatient settings, and we model inpatient settings.",
            howItWorks:
                "Individuals move to inpatient programs and stop opioid use. Withdrawal symptoms are managed by medical providers. We assume that due to medical supervision, there are no overdoses in Detox.",
            treatment:
                "Individuals stay in Detox centers for 3-10 days on average, and it has been shown that without linkage to medications for opioid use disorder, detox is not effective in permanently stopping an individual’s use of opioids.",
        },
        {
            name: "Residential",
            baseText:
                "This treatment state is for individuals who are in long-term inpatient residential facilities, receiving treatment for opioid use disorder. Residential programs may be combined with medications for opioid use disorder.",
            howItWorks:
                "Individuals move to residential treatment centers, typically staying 3 to 12 months. Residential treatment centers may offer the potential for opioid detoxification, coping skills development, and facilitated involvement with various non-medication treatments.",
        },
        {
            name: "Detention",
            baseText:
                "This treatment state is for individuals in detention settings, typically jails.",
            howItWorks:
                "Individuals move to detention settings, and typically do not receive medication for opioid use disorder. We know that while there are more barriers to using opioids in jails, it still happens, and overdoses do occur. The average length of stay is around 35 days in our model. ",
        },
        {
            name: "Post-Treatment",
            baseText:
                "This treatment state is for individuals who have recently left a treatment state other than No Treatment. Whenever a person who uses drugs withdraws from MOUD treatment or is discharged from detox, residential care, or a correctional facility, there is a risk of relapse to active drug use. Overdose rates are higher in Post-Treatment due to lowered tolerance.",
            howItWorks:
                "The population that is using drugs in the four-week period immediately “post-treatment” experiences an elevated overdose risk, reflecting the period of increased mortality when using opioids after a period of abstinence. Following this “post-treatment period”, people move to the No Treatment state, where they are eligible to begin treatment or remain untreated.",
        },
    ],
};

const ouds: GlossaryTable = {
    section: "Opioid Use States",
    headers: ["Opioid Use State", "Definition"],
    items: [
        {
            name: "Active Opioid Use",
            baseText:
                "For our model, we define active use as any reported opioid use in the previous 7 days.",
        },
        {
            name: "Non-Active Opioid Use",
            baseText:
                "For our model, we define non-active use as no reported opioid use in the previous 7 days. Also known as prior or former opioid use.",
        },
        {
            name: "Injection Opioid Use",
            baseText:
                "For our model, we define injection use as any injection in the previous 7 days. Therefore, if an individual uses both injection and non-injection routes, they are categorized within injection use due to the higher associated risks.",
        },
        {
            name: "Non-Injection Opioid Use",
            baseText:
                "For our model, we define non-injection use as any non-injection opioid use, such as smoking, sniffing, or swallowing tablets, in the previous 7 days, with no injection use during that time period. The majority of opioid users start with a non-injection route (cite)",
        },
    ],
};

const general: GlossaryTable = {
    section: "General Terminology",
    headers: ["General Terminology", "Definition"],
    items: [
        {
            name: "Simulation modeling",
            baseText:
                "A research method that creates a virtual environment that mimics the physical world to test and compare real world strategies and understand potential outcomes.",
        },
        {
            name: "Retention rate",
            baseText:
                "The probability a person will stay in their current treatment setting during the next transition opportunity.",
        },
        {
            name: "Transition rate",
            baseText:
                "The probability a person will enter a different treatment setting during the next transition opportunity.",
        },
        {
            name: "Transition",
            baseText: "The movement between treatment states.",
        },
        {
            name: "Initial population",
            baseText:
                "The group of individuals who exist at the beginning of the model run. For example, if we started the model in 2020, the initial cohort would be a snapshot of the population with prior or current opioid use in 2020. The initial cohort is stratified by age, sex, opioid use state, and treatment state. Population size is determined from data from the Massachusetts Public Health Data Warehouse, as well as a capture-recapture analysis to estimate the population that does not touch the healthcare system. (cite)",
        },
        {
            name: "Entering cohort",
            baseText:
                "When simulating an ‘open cohort’, the entering cohort characterizes the population arriving to the model in each time period. This reflects individuals who join the population of people using opioid use, such as those beginning opioid use or moving into the area. The arriving population is stratified by age and sex.",
        },
        {
            name: "RESPOND",
            baseText:
                "Researching Effective Strategies to Prevent Opioid Death",
        },
        {
            name: "Open cohort",
            baseText:
                "An open cohort typically represents a wider population, and allows new individuals to arrive to the modeled population over the course of the simulation. This allows the model to follow historical trends of population size for a specific area, such as reflecting the population of people who use opioids in Massachusetts over a multi-year time period. The new arrivals, characterized as the ‘entering cohort’, may mitigate or outweigh the population loss due to death in the same time period.",
        },
        {
            name: "Closed cohort",
            baseText:
                "A closed cohort typically represents a smaller group, and there is no entry to the modeled population. As deaths occur, the population size can only decrease. Closed cohorts are used to follow a fixed group of people and their outcomes.",
        },
        {
            name: "Calibration",
            baseText:
                "The approach used to set up the model so that the outcomes are very close to observed historical targets, such as the number of fatal overdoses, the size of the population using opioids, and the number of individual starts on medications for opioid use disorder.",
        },
        {
            name: "MOUD",
            baseText:
                "Medication for Opioid Use Disorder. This represents medications such as naltrexone, buprenorphine, and methadone, that are used to treat opioid use disorder. ",
        },
        {
            name: "Loss to follow up",
            baseText:
                "Disengagement from care. In our model, when an individual is lost to follow up, they move into the ‘Post-Treatment’ state for an average of 4 weeks, with higher risk of relapse and overdose, before moving into the ‘No Treatment’ state. ",
        },
        {
            name: "Overdose probability",
            baseText:
                "In each time period, individuals have a chance of overdosing. The probability of doing so is stratified by age, sex, opioid use state, and treatment state. The overdose probability refers to all overdoses, both fatal and nonfatal.",
        },
        {
            name: "Fatal overdose proportion",
            baseText:
                "Once the overdose probability determines the number of overdoses in a given time period, we use the fatal overdose proportion to calculate how many of the overdoses result in death.",
        },
        {
            name: "Admissions",
            baseText:
                "In our model, we count admissions as any starts into any treatment setting aside from No Treatment. For example, individuals moving from No Treatment to Buprenorphine would be considered Buprenorphine Admissions. It is not limited to inpatient treatments such as Residential or Detoxification.",
        },
    ],
};

export default function Glossary() {
    return (
        <div id="glossary">
            {GlossarySection(general)}
            {GlossarySection(treatments)}
            {GlossarySection(ouds)}
        </div>
    );
}
