import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPeopleLine,
    faHexagonNodes,
    faBookMedical,
    faHouseMedical,
} from "@fortawesome/free-solid-svg-icons";

interface InfoCardProps {
    icon: ReactNode;
    caption: string;
    overlay: string;
    className?: string;
}

function InfoCard({ icon, caption, overlay, className = "" }: InfoCardProps) {
    // handle class names - add leading space only if className is nonempty
    const classes = className === "" ? className : ` ${className}`;
    return (
        <div className={`info-card${classes}`}>
            <div className="info-card-content">
                <div className="icon">{icon}</div>
                <span>{caption}</span>
            </div>
            <div className="info-card-overlay">{overlay}</div>
        </div>
    );
}

const About = () => {
    return (
        <div id="about">
            <main className="about-main">
                <section className="about-section">
                    <h2 className="about-title">About RESPOND</h2>
                    <p className="about-description">
                        RESPOND (Researching Effective Strategies to Prevent
                        Opioid Death) is a cohort-based state transition
                        simulation model designed to help understand and address
                        opioid use. It tracks a population at high risk for
                        opioid use, modeling how people start and stop
                        medication for opioid use disorder (MOUD) and how this
                        affects outcomes like overdose, mortality, quality of
                        life, and costs. RESPOND can evaluate the impact and
                        cost-effectiveness of different strategies, including
                        expanding MOUD access. While it uses data specific to
                        Massachusetts, it can be adapted for other locations
                        with the right data. Explore our{" "}
                        <Link to="https://syndemicslab.github.io/respond">
                            documentation
                        </Link>{" "}
                        and <Link to="#modelmaterials">model materials</Link> to
                        learn more.
                    </p>
                    <div className="about-svg-grid">
                        <InfoCard
                            caption="Models populations at high risk for opioid use disorder"
                            overlay="More information about RESPOND"
                            icon={<FontAwesomeIcon icon={faPeopleLine} />}
                        />
                        <InfoCard
                            caption="Simulates groups of people moving between health states"
                            overlay="More information about RESPOND"
                            icon={<FontAwesomeIcon icon={faHexagonNodes} />}
                            className="blue-card"
                        />
                        <InfoCard
                            caption="Analyzes the impact of policy changes on health outcomes and costs"
                            overlay="More information about RESPOND"
                            icon={<FontAwesomeIcon icon={faBookMedical} />}
                        />
                        <InfoCard
                            caption="Presents information about the impact of medication on substance use"
                            overlay="More information about RESPOND"
                            icon={<FontAwesomeIcon icon={faHouseMedical} />}
                            className="blue-card"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
