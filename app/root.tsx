import type {
    LinksFunction,
} from "@remix-run/node";
import appStylesHref from "./app.css?url";
import respondLogo from "./images/respondlogo.png";
import BMCLogo from "./images/organization-logos/BMC Logos.png";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: appStylesHref },
    { rel: "icon", sizes: "32x32", href: "./favicon.ico" },
];

export const meta: MetaFunction = () => {
    return [
        {
            rel: "icon",
            href: "/favicon.ico",
        },
        { title: "RESPOND Simulation" },
        {
            name: "description",
            content: "The Syndemics Lab at Boston Medical Center's RESPOND simulation as a web application."
        },
    ];
};

export default function App() {
    return (
	<html lang="en">
	    <head>
		<meta charSet="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<Meta />
		<Links />
	    </head>
	    <body>
		<div id="sidebar">
		    <Link to={ `/` }>
			<img src={respondLogo} alt="RESPOND Simulation"/>
		    </Link>
		    <h2>Simulation Controls</h2>
		    <ul>
			<li><Link to={`/simulation`}>Simulation</Link></li>
			<li><Link to={`/simulation#inputs`}>Inputs</Link></li>
		    </ul>
		    <hr/>
		    <h2>More Information</h2>
		    <ul>
			<li><Link to={`/cookies`}>Cookies/Survey Example</Link></li>
			<li>
			    <Link to="/about" prefetch="viewport">About RESPOND</Link>
			</li>
		    </ul>
		</div>
		<div id="content">
		    <Outlet />
		    <hr/>
		    <div id="branding">
			<div className="logos">
			    <img src={ BMCLogo } alt="Boston Medical Center"/>
			</div>
			<span className="funding">
				This application is part of a collaboration between Weill Cornell Medicine, Boston Medical Center, and Brown University School of Public Health. RESPOND is funded by the National Institute on Drug Abuse (NIDA) R01DA046527. This web application is also funded by NIDA as a HEAL Data2Action Modeling and Economic Resource Center (HEAL D2A MERC) U24DA057650 project and by the Center for Health Economics of Treatment Interventions for Substance Use Disorder, HCV, and HIV (CHERISH) P30DA040500.
			</span>
		    </div>
		</div>
		<ScrollRestoration />
		<Scripts />
	    </body>
	</html>
    );
}
