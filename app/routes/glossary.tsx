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
    }
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
                    <li><Link to="#general">General Terminology</Link></li>
                        <ul>
                            {general.map((item) => (
                                <li key={item.title}>
                                    <Link to={`#${generateGlossaryID(item.title)}`}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    <li><Link to="#treatment">Treatment Settings</Link></li>
                    <ul>
                        {treatment.map((item) => (
                            <li key={item.title}>
                                <Link to={`#${generateGlossaryID(item.title)}`}>
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
            </div>
        </main>
    );
}
