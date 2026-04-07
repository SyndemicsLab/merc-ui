import { Link } from "react-router";

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
                    page to run our default values, or update the values to test
                    your hypotheses. Examples of questions you can answer with
                    the model include:
                </p>
                <div className="list-container">
                    <ul>
                        <li>
                            How would fatal overdoses change if buprenorphine
                            uptake is doubled?
                        </li>
                        <li>
                            How much would it cost if we increase the
                            probability of staying in residential treatment?
                        </li>
                        <li>
                            How would outcomes change if we decreased the
                            probability of arrest?
                        </li>
                    </ul>
                </div>
                <p>
                    At default, our model represents individuals who use opioids
                    in Massachusetts. Our baseline treatment states include: No
                    Treatment, Methadone, Buprenorphine, Naltrexone,
                    Residential, Detox, and Detention. With data, users of the
                    tool can add new treatment states and ask even more
                    questions.
                </p>
            </div>
        </div>
    );
}
