import footer from '~/images/organization-logos/BMC Logos.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={footer} alt="Boston Medical Center" className="footer-logo" />
                <p className="footer-description">
                    This application is part of a collaboration between Weill Cornell Medicine, Boston Medical Center, and Brown University School of Public Health. RESPOND is funded by the National Institute on Drug Abuse (NIDA) R01DA046527. This web application is also funded by NIDA as a HEAL Data2Action Modeling and Economic Resource Center (HEAL D2A MERC) U24DA057650 project and by the Center for Health Economics of Treatment Interventions for Substance Use Disorder, HCV, and HIV (CHERISH) P30DA040500.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
