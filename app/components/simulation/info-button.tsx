import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function InfoButton(
    { text, destination }:
    {text: string, destination: string}) {
    return(
	<Link to={destination}>
	    <div className="info-button">
		<FontAwesomeIcon icon={faCircleInfo} />
		{/* create space between the icon and text */}
		{` `}
		{text}
	    </div>
	</Link>
    );
}
