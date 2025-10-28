import { Link } from "react-router";
import about1 from '~/images/about1.svg';
import about2 from '~/images/about2.svg';
import about3 from '~/images/about3.svg';
import about4 from '~/images/about4.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPeopleLine,
    faHexagonNodes,
    faBookMedical,
    faHouseMedical
} from "@fortawesome/free-solid-svg-icons";

function DetailSVG({ icon, caption, className = "" }: { icon: ReactNode, caption: string, className?: string }) {
    // handle class names - add space only if className is nonempty
    let classes = className === "" ? className : ` ${className}`;
    return(
        <div className={`detail-svg${classes}`}>
            <div className="icon">
                {icon}
            </div>
            <span>{caption}</span>
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
                        RESPOND (Researching Effective Strategies to Prevent Opioid Death) is a cohort-based state transition simulation model designed to help understand and address opioid use. It tracks a population at high risk for opioid use, modeling how people start and stop medication for opioid use disorder (MOUD) and how this affects outcomes like overdose, mortality, quality of life, and costs. RESPOND can evaluate the impact and cost-effectiveness of different strategies, including expanding MOUD access. While it uses data specific to Massachusetts, it can be adapted for other locations with the right data. Explore our <Link to="https://syndemicslab.github.io/respond">documentation</Link> and <Link to="#modelmaterials">model materials</Link> to learn more.
                    </p>
                    <div className="about-svg-grid">
                        <DetailSVG
                            caption="Models populations at high risk for opioid use disorder"
                            icon={<FontAwesomeIcon icon={faPeopleLine} />}
                        />
                        <DetailSVG
                            caption="Simulates groups of people moving between health states"
                            icon={<FontAwesomeIcon icon={faHexagonNodes} />}
                            className="blue"
                        />
                        <DetailSVG
                            caption="Analyzes the impact of policy changes on health outcomes and costs"
                            icon={<FontAwesomeIcon icon={faBookMedical} />}
                        />
                        <DetailSVG
                            caption="Presents information about the impact of medication on substance use"
                            icon={<FontAwesomeIcon icon={faHouseMedical} />}
                            className="blue"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
