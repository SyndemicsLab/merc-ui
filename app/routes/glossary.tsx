// type imports
import type { ReactNode } from "react";
import { Link } from "react-router";
import "~/styles/glossary.scss";

function generateGlossaryID(title: string) {
    return (title.toLowerCase().replace(/\s/,'-'));
}

function GlossaryItem ({ title, children }: { title: string, children: ReactNode }) {
    return(
        <div className="glossary-item" id={generateGlossaryID(title)}>
            <h3>{title}</h3>
            <div className="glossary-body">
                {children}
            </div>
        </div>
    );
}

interface GeneralItem {
    title: string;
    body: ReactNode | ReactNode[];
    sources?: (string | typeof Link)[];
}

const general: GeneralItem[] = [
    {
        title: "Simulation modeling",
        body: <p>a research method that creates a virtual environment that mimics the physical world to test and compare real world strategies and understand potential outcomes</p>,
    },
    {
        title: "Retention rate",
        body: <p>The probability a person will stay in their current treatment setting during the next movement opportunity</p>,
    },
    {
        title: "Transition rate",
        body: <p>The probability a person will enter a different treatment setting during the next movement opportunity.</p>
    },
    {
        title: "Transition",
        body: <p>The movement between treatment settings.</p>
    },
    {
        title: "Initial population",
        body: [
            <p>The group of individuals who exist at the beginning of the simulation run.</p>,
            <p>For example, if you started the model in the year 2020, the initial cohort would be a snapshot of the population with prior or current opioid use in 2020.</p>,
                <p>The initial cohort is stratified by age, sex, opioid use type, and treatment setting. Population size is determined from data from the Massachusetts Public Health Data Warehouse, as well as a capture-recapture analysis to estimate the population that does not touch the healthcare system.</p>,
        ],
        sources: [
            <Link to="https://pubmed.ncbi.nlm.nih.gov/30359112/">PubMed</Link>,
        ],
    },
    {
        title: "Entering cohort",
        body: [
            <p>When simulating an 'open cohort,' the entering cohort characterizes the population newly arriving to the model during each time step, which in our model is each week.</p>,
                <p>This quantity reflects individuals who join the population of people using opioids, such as those beginning opioid use for the first time or those who move into the area. The arriving population is stratified by age and sex.</p>,
            <p>This is sometimes called the 'migrating cohort,' to account for the fact that this value can be negative and represent that people are leaving the population.</p>,
        ],
    },
    {
        title: "RESPOND",
        body: <p><b>R</b>esearching <b>E</b>ffective <b>S</b>trategies to <b>P</b>revent <b>O</b>pioid <b>D</b>eath</p>,
    },
    {
        title: "Open cohort",
        body: <p>An open cohort typically represents a wider population and allows new individuals to arrive to the modeled population over the course of the simulation. This allows the model to follow historical trends of population size for a specific area, such as reflecting the population of people who use opioids in Massachusetts over a multi-year time period. The new arrivals, characterized as the <Link to="#entering-cohort" mask="/glossary" replace>entering cohort</Link>, may mitigate or outweigh the population loss due to death in the same time period.</p>,
    },
    {
        title: "Closed cohort",
        body: <p>A closed cohort typically represents a smaller group, and there is no entry to the modeled population (the entering cohort is zero). The population can only decrease, and it can only happen through death. Closed cohorts are used to follow a fixed group of people and their outcomes.</p>,
    },
    {
        title: "Calibration",
        body: <p>The approach used to set up the model so that the outcomes are very close to observed historical targets, such as the number of fatal overdoses, the size of the population using opioids, and the number of new admissions to medications for opioid use disorder.</p>,
    },
    {
        title: "MOUD",
        body: [
            <p>Medication for Opioid Use Disorder</p>,
            <p>This represents medications such as naltrexone, buprenorphine, and methadone, that are used to treat opioid use disorder.</p>,
        ]
    },
    {
        title: "Loss to follow-up",
        body: [
            <p>Disengagement from care</p>,
            <p>In our model, when an individual is lost to follow-up, they move into the 'Post-Treatment' setting for an average of 4 weeks, with higher risk of relapse and overdose, before moving into the 'No Treatment' setting.</p>,
        ]
    },
    {
        title: "Overdose probability",
        body: <p>In each time period, individuals have a chance of overdosing. The probability of doing so is stratified by age, sex, opioid use route, and treatment setting. The overdose probability refers to all overdoses, both fatal and nonfatal.</p>,
    },
    {
        title: "Fatal overdose proportion",
        body: <p>Once the overdose probability determines the number of overdoses in a given time step, the fatal overdose proportion is used to calculate how many overdoses result in death.</p>,
    },
    {
        title: "Admissions",
        body: [
            <p>In our model, we count admissions as any starts into any treatment setting aside from No Treatment.</p>,
            <p>For example, individuals moving from No Treatment to Buprenorphine would be considered Bupreonirphine Admissions. It is not limited to inpatient treatments such as Residential or Detoxification.</p>,
        ],
    },
];

const oud: GeneralItem[] = [
    {
        title: "Active Opioid Use",
        body: <p>For our model, we define active use as any reported opioid use in the previous 7 days.</p>,
    },
    {
        title: "Non-Active Opioid Use",
        body: <p>For our model, we define non-active use as no reported opioid use in the previous 7 days. Also known as "prior" or "former" opioid use.</p>,
    },
    {
        title: "Injection Opioid Use",
        body: <p>For our model, we define injection use as any injection in the previous 7 days. Therefore, if an individual uses both injection and non-injection routes, they are categorized within injection use due to the higher associated risks.</p>,
    },
    {
        title: "Non-Injection Opioid Use",
        body: [
            <p>For our model, we define non-injection use as any non-injection opioid use, such as smoking, sniffing, or swallowing tablets, in the previous 7 days, with no injection use during that time period.</p>,
            <p>The majority of opioid users start with a non-injection route.</p>
        ],
    },
 ];

interface TreatmentItem {
    title: string;
    mainBody: ReactNode | ReactNode[];
    howItWorks?: ReactNode | ReactNode[];
    treatment?: ReactNode | ReactNode[];
    administration?: ReactNode | ReactNode[];
    brands?: ReactNode | ReactNode[];
    names?: ReactNode | ReactNode[];
    moreInformation?: ReactNode | ReactNode[];
    sources?: (string | typeof Link)[];
}

const treatment: TreatmentItem[] = [
    {
        title: "No Treatment",
        mainBody: <p>This treatment setting encompasses individuals who are not actively engaged with any kind of treatment.</p>,
    },
    {
        title: "Buprenorphine (Bup)",
        mainBody: <p>This treatment setting is for individuals who are engaged with buprenorphine, a medication for opioid use disorder, in the community.</p>,
        howItWorks: (<p>Buprenorphine is a 'partial opioid agonist,' and 'diminish[es] the effects of physical dependency to opioids, such as withdrawal symptoms and cravings' (<Link to="https://www.samhsa.gov/substance-use/treatment/options/buprenorphine">SAMHSA</Link>).</p>),
        treatment: (<p>'To begin treatment, an OUD patient must abstain from using opioids for at least 12 to 24 hours and be in the early stages of opioid withdrawal. [...] The length of time a patient receives buprenorphine is tailored to meet the needs of each patient, and in some cases, treatment can be indefinite.' (<Link to="https://www.samhsa.gov/substance-use/treatment/options/buprenorphine">SAMHSA</Link>).</p>),
        administration: (<p>sublingual tablets, buccal films, transdermal films, and injections, alone or in combination with naloxone. How often are doctors' visits? How much take home can you get?</p>),
        brands: (<p>Belbuca, Brixadi, Buprenex, Buprenorphine, Butrans, Sublocade, Suboxone, Subutex, Zubsolv</p>),
        names: (<p>big whites, buse, oranges, small whites, sobos, stops, strips, sub, subs</p>),
    },
    {
        title: "Methadone (MMT)",
        mainBody: <p>This treatment setting is for individuals who are engaged with Methadone, a medication for opioid use disorder, in the community.</p>,
        howItWorks: (<p>Methadone is a 'long-acting full opioid agonist,' and \'reduces opioid craving and withdrawal and blunts or blocks the effects of opioids (<Link to="https://www.samhsa.gov/substance-use/treatment/options/methadone">SAMHSA</Link>).</p>),
        treatment: <p>Methadone is taken daily and can only be prescribed through a certified opioid treatment program.</p>,
        administration: (<p>Tablet, dispersible tablet (tablet that can be dissolved in liquid), solution (liquid), and a concentrated solution to take by mouth. After a period of consistent treatment, certified providers can prescribe take-home doses of Methadone in quantities lasting up to 28 days (<Link to="https://www.federalregister.gov/documents/2024/02/02/2024-01693/medications-for-the-treatment-of-opioid-use-disorder">Federal Register</Link>).</p>),
        brands: <p>Methadose, Dolophine</p>,
        names: <p>amidone, dollies, dolls, fizzies, mud, red rock, tootsie roll (<Link to="https://www.addictioncenter.com/drugs/drug-street-names/">Addiction Center</Link>)</p>,
    },
    {
        title: "Naltrexone (Ntx)",
        mainBody: <p>This treatment setting is for individuals who are engaged with Naltrexone, a medication for opioid use disorder, in the community.</p>,
        howItWorks: (<p>Naltrexone is an opioid antagonist and 'blocks the euphoric and sedative effects of opioids such as heroin, morphine, and codeine. Naltrexone binds and blocks opioid receptors and reduces and suppresses opioid cravings' (<Link to="https://www.samhsa.gov/substance-use/treatment/options/naltrexone">SAMHSA</Link>).</p>),
        treatment: (<p>'Patients should wait at least 7 days after their last use of short-acting opioids and 10 to 14 days for long-acting opioids, before starting Naltrexone.'</p>),
        administration: (<p>pill form for alcohol use disorder, or as an extended-release intramuscular injectable for alcohol or opioid use disorder (monthly injections)</p>),
        brands: <p>Contrave, Embeda, Vivitrol</p>,
    },
    {
        title: "Detoxification",
        mainBody: <p>This treatment setting is for individuals who are in medcally supervised withdrawal management from opioids. Detoxification, or "Detox," programs can occur in inpatient, residential, day, or outpatient settings, and we model inpatient settings.</p>,
        howItWorks: <p>Individuals move to inpatient programs and stop using opioids. Withdrawal symptoms are managed by medical providers. We assume that due to medical supervision, there are no overdoses in Detox.</p>,
        treatment: <p>Individuals stay in Detox centers for 3-10 days on average, and it has been shown that without linkage to medications for opioid use disorder, Detox is not effective in permanently stopping an individual's use of opioids.</p>,
    },
    {
        title: "Residential",
        mainBody: <p>This treatment setting is for individuals who are in long-term inpatient residential facilities, receiving treatment for opioid use disorder. Residential programs may be combined with medications for opioid use disorder.</p>,
        howItWorks: <p>Individuals move to residential treatment centers, typically staying for 3 to 12 months. Residential treatment centers may offer the potential for opioid detoxification, coping skills development, and facilitated involvement with various non-medication treatments.</p>
    },
    {
        title: "Detention",
        mainBody: <p>This treatment setting is for individuals in detention settings, typically jails.</p>,
        howItWorks: <p>Individuals move to detention settings and typically do not receive medication for opioid use disorder. We know that while there are more barriers to using opioids in jails, it still happens, and overdoses do occur. The average length of stay is approximately 35 days in our model.</p>,
    },
    {
        title: "Post-Treatment",
        mainBody: <p>This treatment setting is for individuals who have recently left a treatment setting other than <Link to="#no-treatment" mask="/glossary" replace>No Treatment</Link>. Whenever a person who uses drugs withdraws from MOUD treatment or is discharged from Detox, residential care, or a correctional facility, there is a risk of relapse to active drug use. Overdose rates are high in Post-Treatment due to decreased drug tolerance.</p>,
            howItWorks: <p>The population that is using drugs in the four-week period immediately <u>post-treatment</u> experiences an elevated overdose risk, reflecting the period of increased mortality when using opioids after a period of abstinence. Following this "post-treatment period," people move to the No Treatment setting, where they are eligible to begin treatment or remain untreated.</p>,
    },
];

const treatmentAttributes: string[] = [
    "howItWorks",
    "treatment",
    "administration",
    "brands",
    "names",
    "moreInformation",
];

const treatmentSectionMap: { [name : string] : string } = {};
treatmentSectionMap["howItWorks"] = "How It Works";
treatmentSectionMap["treatment"] = "Treatment";
treatmentSectionMap["administration"] = "Administration Pathways";
treatmentSectionMap["brands"] = "Brand Names";
treatmentSectionMap["names"] = "Lay/Street Names";
treatmentSectionMap["moreInformation"] = "More Information";

export default function Glossary() {
    return (
        <main id="glossary">
            <div className="glossary-toc">
                <ul>
                    <li><Link to="#general" mask="/glossary" replace>General Terminology</Link></li>
                        <ul>
                            {general.map((item) => (
                                <li key={item.title}>
                                    <Link to={`#${generateGlossaryID(item.title)}`} mask="/glossary" replace>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    <li><Link to="#treatment" mask="/glossary" replace>Treatment Settings</Link></li>
                    <ul>
                        {treatment.map((item) => (
                            <li key={item.title}>
                                <Link to={`#${generateGlossaryID(item.title)}`} mask="/glossary" replace>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <li><Link to="#oud" mask="/glossary" replace>Opioid Use Settings</Link></li>
                        <ul>
                            {oud.map((item) => (
                                <li>
                                    <Link to={`#${generateGlossaryID(item.title)}`} mask="/glossary" replace>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                </ul>
            </div>
            <div className="glossary-content-wrapper">
                <h2 id="general">General Terminology</h2>
                {general.map((item) => (
                    <GlossaryItem key={item.title} title={item.title}>
                        {item.body.constructor === Array ? (
                            item.body.map((element) => element)
                        ): item.body}
                        {"sources" in item ? (
                            <>
                                <h4>Sources</h4>
                                <ol>
                                    {item.sources.map((element) => {
                                        return(<li>{element}</li>);
                                    })}
                                </ol>
                            </>
                        ): null}
                    </GlossaryItem>
                ))}
                <h2 id="treatment">Treatment Settings</h2>
                {treatment.map((item) => (
                    <GlossaryItem key={item.title} title={item.title}>
                        {item.mainBody.constructor === Array ? (
                            item.mainBody.map((element) => element)
                        ): item.mainBody}
                        {treatmentAttributes.map((attr) => {
                        if (attr in item) {
                            return(
                                <div className={attr}>
                                    <h4>{treatmentSectionMap[attr]}</h4>
                                {item[attr].constructor === Array ? (
                                    item[attr].map((element) => element)
                                ): item[attr]}
                            </div>
                            );
                        }
                        return (null);
                    })}
                    </GlossaryItem>
                )
                )}
                <h2 id="oud">Opioid Use Settings</h2>
                {oud.map((item) => (
                    <GlossaryItem key={item.title} title={item.title}>
                        {item.body.constructor === Array ? (
                            item.body.map((element) => element)
                        ): item.body}
                    </GlossaryItem>
                ))}
            </div>
        </main>
    );
}
