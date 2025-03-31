import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export default function ScrollIndicator(
    { destination, visible = true }:
    { destination?: string, visible?: Boolean }
) {
    return(
	<>
	    <div className={`scrolldown${visible ? "" : " hide"}`}>
		<Link to={destination}>
		    <FontAwesomeIcon icon={faChevronDown}/>
		</Link>
	    </div>
	</>
    );
}
