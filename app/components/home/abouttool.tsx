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
                    page to run our default data, which represent the state of
                    Massachusetts, or update the values to test your own
                    hypotheses.
                </p>
                <p>
                    At default, our model represents individuals who use opioids
                    in Massachusetts. Our baseline settings include:
                </p>
                <div className="list-container">
                    <ul>
                        <li>No Treatment</li>
                        <li>Methadone</li>
                        <li>Buprenorphine</li>
                        <li>Naltrexone</li>
                        <li>Detox</li>
                        <li>Detention</li>
                    </ul>
                </div>
                <p>
                    With data, users of the tool can add new treatment states
                    and ask even more questions.
                </p>
            </div>
        </div>
    );
}
