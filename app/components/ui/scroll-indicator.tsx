import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export default function ScrollIndicator() {
    return(
	<>
	    <div className="scrolldown">
		<Link to={`/simulation#inputs`}>
		    <FontAwesomeIcon icon={faChevronDown}/>
		</Link>
	    </div>
	</>
    );
}
