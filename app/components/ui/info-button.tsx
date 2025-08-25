import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function InfoButton(
    { text, destination, className, download = false }:
    { text: string, destination: string, className?: string, download?: Boolean }) {
    let classNames: string = "info-button" + (className ? (" " + className) : "");
    return(
        <Link className={classNames} to={destination}>
            <FontAwesomeIcon
                icon={download ? faDownload : faCircleInfo}
            />
            <span>
                {text}
            </span>
        </Link>
    );
}
