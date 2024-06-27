import { Link } from "@remix-run/react";

const InputsSection = () => (
    <section className="inputs-section">
      <div className="inputs-container">
        <h2 className="inputs-title">Input Shortcuts</h2>
        <div className="inputs-list">
          <Link to="/simulation" className="input-item fill">Buprenorphine</Link>
          <Link to="/simulation" className="input-item fill">Naltrexone</Link>
          <Link to="/simulation" className="input-item fill">Buprenorphine</Link>
          <Link to="/simulation" className="input-item fill">Methadone</Link>
          <Link to="/simulation" className="input-item fill">Detox</Link>
          <Link to="/simulation" className="input-button">+</Link>
        </div>
      </div>
    </section>
  );
  
  export default InputsSection;