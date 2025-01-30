import about1 from '../../images/about1.svg';
import about2 from '../../images/about2.svg';
import about3 from '../../images/about3.svg';
import about4 from '../../images/about4.svg';

const About = () => {
    return (
        <main className="about-main">
            <section className="about-section">
                <h2 className="about-title">About <span className="about-highlight">RESPOND</span></h2>
                <p className="about-description">
                    RESPOND is a population-based model that simulates a population with high-risk opioid use and movement on and off medication for opioid use disorder, providing outcomes such as overdose and cost. This online tool is intended to allow users to explore the impact of various policies on these outcomes with a simplified, customizable interface.
                </p>
                <div className="about-svg-grid">
                    <img className="about-svg" src={about1} alt="RESPOND Feature 1" />
                    <img className="about-svg" src={about2} alt="RESPOND Feature 2" />
                    <img className="about-svg" src={about3} alt="RESPOND Feature 3" />
                    <img className="about-svg" src={about4} alt="RESPOND Feature 4" />
                </div>
            </section>
        </main>
    );
};

export default About;
