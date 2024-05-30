import {
    Link,
} from "@remix-run/react";

function About({
    text,
}) {
    return(
	<>
	    <div className="welcome-about">
		<div className="welcome-about-contents">
		    <h1>What is RESPOND?</h1>
		    {text}
		</div>
	    </div>
	</>
    );
}

export default function Index() {
    const aboutRESPOND = "RESPOND is a cohort-based model that simulates a population with high-risk opioid use and movement on and off medication for opioid use disorder, providing outcomes such as overdose and cost. This online tool is intended to allow users to explore the impact of various policies on these outcomes with a simplified, customizable interface.";
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
	    <About
		text={aboutRESPOND}
	    />
	</>
    );
};
