import { Link } from  "react-router";
import BMC from '~/images/organization-logos/bmc.png';
import syndemics from '~/images/organization-logos/syndemics.png';
import HD2A from '~/images/organization-logos/hd2a.svg';
import { SYNDEMICS_BLUE } from "~/globals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSquareLinkedin, faBluesky } from "@fortawesome/free-brands-svg-icons";

function Logo(
    { image, alt, link }:
    { image: HTMLImageElement, alt: string, link?: string }
) {
    return(
        <>
            <Link to={link}>
                <img src={image} alt={alt} />
            </Link>
        </>
    );
}

function Social(
    { icon, link }:
    { icon: Object, link: string }
) {
    return(
        <>
            <Link to={link}>
                <FontAwesomeIcon icon={icon} />
            </Link>
        </>
    );
}

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logos">
                    <div className="syndemics">
                        <Logo
                            image={syndemics}
                            alt="The Syndemics Lab at Boston Medical Center"
                            link="https://syndemicslab.org"
                        />
                        <hr style={{ borderTopWidth: "3px", borderColor: `${SYNDEMICS_BLUE}` }}/>
                        <div className="socials">
                            <Social
                                icon={faInstagram}
                                link="https://www.instagram.com/syndemicslab/"
                            />
                            <Social
                                icon={faSquareLinkedin}
                                link="https://www.linkedin.com/company/syndemics-lab/"
                            />
                            <Social
                                icon={faBluesky}
                                link="https://bsky.app/profile/syndemicslab.bsky.social"
                            />
                        </div>
                    </div>
                    <Logo
                        image={BMC}
                        alt="Boston Medical Center"
                        link="https://bmc.org"
                    />
                    <Logo
                        image={HD2A}
                        alt="HEAL Data 2 Action"
                        link="https://www.hd2arasc.org"
                    />
                </div>
                <p className="footer-description">
                    This application is part of a collaboration between Weill
                    Cornell Medicine, Boston Medical Center, and Brown
                    University School of Public Health. RESPOND is funded by the
                    National Institute on Drug Abuse (NIDA) R01DA046527. This
                    web application is also funded by NIDA as a HEAL Data2Action
                    Modeling and Economic Resource Center (HEAL D2A MERC)
                    U24DA057650 project and by the Center for Health Economics
                    of Treatment Interventions for Substance Use Disorder, HCV,
                    and HIV (CHERISH) P30DA040500.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
