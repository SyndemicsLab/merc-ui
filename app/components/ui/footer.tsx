import { Link } from "react-router";
import BMC from "~/images/organization-logos/bmc.svg";
import syndemics from "~/images/organization-logos/syndemics.svg";
import HD2A from "~/images/organization-logos/hd2a.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faInstagram,
    faSquareLinkedin,
    faBluesky,
} from "@fortawesome/free-brands-svg-icons";

function Logo({
    image,
    alt,
    link,
}: {
    image: string;
    alt: string;
    link?: string;
}) {
    if (link) {
        return (
            <>
                <Link to={link}>
                    <img src={image} alt={alt} />
                </Link>
            </>
        );
    }
    return (
        <>
            <img src={image} alt={alt} />
        </>
    );
}

function Social({ icon, link }: { icon: IconProp; link: string }) {
    return (
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
                    </div>
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
            <div className="utility-wrapper">
                <div className="footer-utility">
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
                    <div className="affiliated-orgs">
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
                </div>
            </div>
        </footer>
    );
};

export default Footer;
