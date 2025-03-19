import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function ScrollIndicator() {
    return(
	<>
	    <div className="scrolldown">
		<FontAwesomeIcon icon={faChevronDown}/>
	    </div>
	</>
    );
}
