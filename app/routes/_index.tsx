import {
    Link,
} from "@remix-run/react";

export default function Index() {
    return(
	<>
	    <div id="welcome">
		<div className="mainGreet">
		    <span>Welcome to <Link to={`/simulation`}>RESPOND</Link>!</span>
		</div>
		<div className="additionalLinks">
		    <ul>
			<li>More about the <Link to="https://syndemicslab.org">Syndemics Lab</Link></li>
			<li><Link to="https://syndemicslab.org/respond">Model Documentation</Link></li>
		    </ul>
		</div>
	</div>
	</>
    );
};
