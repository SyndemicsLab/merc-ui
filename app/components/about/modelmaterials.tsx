import InfoButton from "@components/ui/info-button";

const ModelMaterials = () => {
    return (
	<div id="modelmaterials">
	    <main className="model-materials-main">
		<section className="model-materials-section">
		    <h2 className="model-materials-title">RESPOND Model Materials</h2>
		    <div className="model-materials-description">
			<p >
			    RESPOND simulates opioid use disorder as a series of transitions between health states defined by:
			</p>
			<div className="list-container">
			    <ol>
				<li>Active vs non-active drug use</li>
				<li>Injection vs. non-injection drug use</li>
			    </ol>
			</div>
			<p>
			    Active use states have a risk of overdose, as well as higher healthcare utilization, with the highest risk and highest cost being among active injection use. The model also includes OUD treatment and settings such as community-based buprenorphine-naloxone, community-based injectable naltrexone, methadone maintenance programs, acute inpatient detoxification centers, long-term residential treatment centers, and detention settings.
			    <br/>
			    The model also includes simulation of the period of increased overdose risk following a period of prolonged abstinence, such as when patients disengage from medications-based therapy, leave a detox center, or are released from jail. More detailed information can be found in the Technical Appendix below.
			</p>
			<div className="model-materials-buttons">
			    <InfoButton
				text="Technical Appendix"
				destination="https://www.syndemicslab.org/_files/ugd/bfe657_12eebc333cfd47d6beb5917826150782.pdf"
			    />
			    <InfoButton
				text="Terminology Glossary"
				destination="/glossary"
			    />
			</div>
		    </div>
		</section>
	    </main>
	</div>
    );
};

export default ModelMaterials;
