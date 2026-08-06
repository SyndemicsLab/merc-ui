import { Link } from "react-router";

interface MOUDCardProps {
    name: string;
    icon?: ReactNode;
    className?: string;
    children?: ReactNode;
}

function MOUDCard({ name, caption, className = "", children }: MOUDCardProps) {
    const classes = className === "" ? className : ` ${className}`;
    return (
        <div className={`moud-card${classes}`}>
            <div className="moud-card-content">
                <h3>{name}</h3>
                <div className="moud-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function AboutTool() {
    return (
        <div id="about-tool">
            <div className="home-tile">
                <h2>About This Tool</h2>
                <p>
                    This website is a user-friendly, simplified version of the
                    RESPOND model. The goal of this tool is to help anyone
                    interested, such as academic researchers, policy-makers, and
                    more, understand the impact of and make decisions about
                    research and implementation of interventions related to
                    opioid use. Use the <Link to="/simulation">Simulation</Link>{" "}
                    page to run our default data, which represent the state of
                    Massachusetts, or update the values to test your own
                    hypotheses.
                </p>
                <p>
                    At default, our model represents individuals who use opioids
                    in Massachusetts. Our baseline settings include:
                </p>
                <div className="moud-cards">
                    <MOUDCard
                        name="No treatment"
                        >
                        The population not currently receiving treatment
                        for opioid use disorder
                    </MOUDCard>
                    <MOUDCard
                        name="Medications for opioid use disorder"
                        >
                        Populations receiving medication for opioid use
                        disorder. The baseline includes:
                        <div className="centered-ul">
                            <ul>
                                <li>buprenorphine</li>
                                <li>naltrexone</li>
                                <li>methadone</li>
                            </ul>
                        </div>
                        </MOUDCard>
                    <MOUDCard
                        name="Community interventions"
                        >
                           Populations in community-provided care settings,
                           including detox facilities, or "detention",
                           interfacing with the corrections syste
                        </MOUDCard>
                </div>
                <p>
                    With data, users of the tool can add new treatment states
                    and ask even more questions.
                </p>
            </div>
        </div>
    );
}
