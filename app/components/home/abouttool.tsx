import { Link } from "react-router";

export default function AboutTool() {
    return (
        <div id="about-tool">
            <div className="home-tile">
                <h2>About This Tool</h2>
                <p>
                    This website provides a simplified version of the RESPOND
                    simulation model and aims to be a user-friendly interface
                    for modeling the health and health economic effects of the
                    opioid use epidemic. The goal of this tool is to help anyone
                    interested, such as academic researchers, policy-makers, and
                    more, understand the impact of and make decisions about
                    research and implementation of interventions related to
                    opioid use. Use the <Link to="/simulation">Simulation</Link>{" "}
                    page to run our default values, or update the values to test
                    your hypotheses.
                </p>
                <p>
                    At default, our model represents individuals who use opioids
                    in Massachusetts. Our baseline treatment states include: No
                    Treatment, Methadone, Buprenorphine, Naltrexone, Detox, and
                    Detention. With data, users of the tool can add new
                    treatment states and ask even more questions.
                </p>
            </div>
        </div>
    );
}
