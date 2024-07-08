const publications = [
  {
    title: "Population-level impact of initiating pharmacotherapy and linking to care persons with opioid use disorder at inpatient medically managed withdrawal programs: an effectiveness and cost-effectiveness analysis",
    source: "Addiction",
    date: "Mar 2022",
    link: "https://onlinelibrary.wiley.com/doi/abs/10.1111/add.15879"
  },
  {
    title: "Modeling the cost-effectiveness and impact on fatal overdose and initiation of buprenorphine-naloxone treatment at syringe service programs",
    source: "Addiction",
    date: "Mar 2022",
    link: "https://onlinelibrary.wiley.com/doi/10.1111/add.15883?af=R"
  },
  {
    title: "Combination Therapy With Tocilizumab and Dexamethasone Cost-Effectively Reduces Coronavirus Disease 2019 Mortality",
    source: "Clin Infect Dis",
    date: "Dec. 2019",
    link: "https://pubmed.ncbi.nlm.nih.gov/33956936/"
  }
];

const Publications = () => {
  return (
    <main className="publications-main">
      <section className="publications-section">
        <h2 className="publications-title">Publications on RESPOND</h2>
        <div className="publications-grid">
          {publications.map((publication, index) => (
            <div key={index} className="publication-card">
              <h3 className="publication-title">{publication.title}</h3>
              <p className="publication-source">{publication.source}</p>
              <p className="publication-date">{publication.date}</p>
              <a href={publication.link} target="_blank" rel="noopener noreferrer" className="publication-link">See more</a>
            </div>
          ))}
        </div>
        <div className="see-more-button-container">
          <a href="https://www.syndemicslab.org/respond-pubs" className="see-more-button">See more</a>
        </div>
      </section>
    </main>
  );
};

export default Publications;
