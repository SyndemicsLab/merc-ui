import { Link } from "react-router";

interface Publication {
    title: string,
    source: string,
    date: string,
    link: string,
};

const publications: Publication[] = [
    {
	title: "Health and Economic Outcomes of Addressing Encampments of Individuals Using Opioids in Massachusetts",
	source: "JAMA Network Open",
	date: "2025",
	link: "",
    },
    {
	title: "Health and Economic Outcomes of Offering Buprenorphine in Homeless Shelters in Massachusetts",
	source: "JAMA Network Open",
	date: "October 16, 2024",
	link: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2824916"
    },
    {
	title: "Estimated Costs and Outcomes Associated With Use and Nonuse of Medications for Opioid Use Disorder During Incarceration and at Release in Massachusetts",
	source: "JAMA Network Open",
	date: "April 14, 2023",
	link: "https://doi.org/10.1001/jamanetworkopen.2023.7036",
    },
    {
	title: "Modeling the cost-effectiveness and impact on fatal overdose and initiation of buprenorphine-naloxone treatment at syringe service programs",
	source: "Society for the Study of Addiction",
	date: "March 21, 2022",
	link: "https://doi.org/10.1111/add.15883"
    },
    {
	title: "Population-level impact of initiating pharmacotherapy and linking to care people with opioid use disorder at inpatient medically managed withdrawal programs: an effectiveness and cost-effectiveness analysis",
	source: "Society for the Study of Addiction",
	date: "March 21, 2022",
	link: "https://doi.org/10.1111/add.15879"
    },
];

const Publications = () => {
    return (
	<div id="publications">
	    <main className="publications-main">
		<section className="publications-section">
		    <h2 className="publications-title">Publications Using RESPOND</h2>
		    <div className="publications-grid">
			{publications.map((publication, index) => (
			    <Link key={index} to={publication.link} target="_blank" rel="external noreferrer noopener">
				<div className="publication-card">
				    <h3 className="publication-title">{publication.title}</h3>
				    <p className="publication-source">{publication.source}</p>
				    <p className="publication-date">{publication.date}</p>
				</div>
			    </Link>
			))}
		    </div>
		    <div className="see-more-button-container">
			<a href="https://www.syndemicslab.org/respond-pubs" className="see-more-button">See More</a>
		    </div>
		</section>
	    </main>
	</div>
    );
};

export default Publications;
