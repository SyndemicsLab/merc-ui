import aboutSvg from '../images/about.svg'; 

const About = () => {
  return (
    <main className="about-main">
      <section className="about-section">
        <h2 className="about-title">About <span className="about-highlight">RESPOND</span></h2>
        <p className="about-description">
          RESPOND is a population-based model that simulates a population with high-risk opioid use and movement on and off medication for opioid use disorder, providing outcomes such as overdose and cost. This online tool is intended to allow users to explore the impact of various policies on these outcomes with a simplified, customizable interface.
        </p>
        <div className="about-svg">
          <img src={aboutSvg} alt="RESPOND Features" />
        </div>
      </section>
    </main>
  );
};

export default About;
