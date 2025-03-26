import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function InfoButton(
    { text, destination, download = false }:
    { text: string, destination: string, download?: Boolean }) {
    return(
	<Link to={destination}>
	    <div className="info-button">
		<FontAwesomeIcon icon={download ? faDownload : faCircleInfo} />
		{/* create space between the icon and text */}
		{` `}
		{text}
	    </div>
	</Link>
    );
}
