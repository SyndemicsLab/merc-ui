const ModelMaterials = () => {
  return (
    <main className="model-materials-main">
      <section className="model-materials-section">
        <h2 className="model-materials-title">RESPOND Model Materials</h2>
        <p className="model-materials-description">
          RESPOND simulates opioid use disorder as a series of transitions between health states defined by: 1) active vs no active drug use, and 2) non-injection vs. injection use. Permutations along these two axes lead to 4 unique states: active non-injection, active injection, non-active non-injection, and non-active injection. Active use states are characterized by a risk of overdose, as well as higher healthcare utilization, with the highest risk and highest cost being among active injection users. By simulating bidirectional movement between these states (Figure A below), RESPOND replicates the relapsing and remitting nature of OUD. The model also includes simulation of various modalities and venues for OUD treatment including (see Figure B below): community-based buprenorphine-naloxone, community-based injectable naltrexone, methadone maintenance programs, acute inpatient detoxification centers, long-term residential treatment centers, and correctional settings (which could be employed as a venue for treatment). The model also includes simulation of the period of increased overdose risk following a period of prolonged abstinence, such as when patients disengage from medications-based therapy, leave a detox center, or are released from jail.
        </p>
        <p className="model-materials-description">
          More detailed information can be found in the Technical Appendix below.
        </p>
        <div className="model-materials-buttons">
          <a href="https://www.syndemicslab.org/_files/ugd/bfe657_12eebc333cfd47d6beb5917826150782.pdf" className="model-materials-button" target="_blank" rel="noopener noreferrer">Technical Appendix</a>
          <a href="https://www.syndemicslab.org/_files/ugd/bfe657_6feaf23324424adcab86e1c5044ae7de.pdf" className="model-materials-button" target="_blank" rel="noopener noreferrer">Simulation Flow</a>
        </div>
      </section>
    </main>
  );
};

export default ModelMaterials;

