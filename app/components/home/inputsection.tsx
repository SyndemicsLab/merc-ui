import { Link } from "react-router";

// This is the inputsection that is a shortcut to the simulation page
const InputsSection = () => (
    <section className="home-inputs-section">
      <div className="home-inputs-container">
        <h2 className="home-inputs-title">Input Shortcuts</h2>
        <div className="home-inputs-list">
          <Link to="/simulation" className="home-input-item fill">No Treatment</Link>
          <Link to="/simulation" className="home-input-item fill">Naltrexone</Link>
          <Link to="/simulation" className="home-input-item fill">Buprenorphine</Link>
          <Link to="/simulation" className="home-input-item fill">Methadone</Link>
          <Link to="/simulation" className="home-input-item fill">Detox</Link>
          <Link to="/simulation" className="home-input-button">+</Link>
        </div>
      </div>
    </section>
  );
  
  export default InputsSection;