import type {
    LinksFunction,
} from "@remix-run/node";
import appStylesHref from "./app.css?url";
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
		    <h1><Link to={ `/` }>RESPOND Simulation</Link></h1>
		    <p>
			<b className="warn">NOTE:</b> Contents of this sidebar are subject to change.
		    </p>
		    <ul>
			<li>
			    <Link to="/about" prefetch="viewport">What is RESPOND?</Link>
			</li>
			<li>
			    How to use RESPOND
			</li>
			<li>
			    RESPOND Input Structure
			</li>
			<li>
			</li>
		    </ul>
		</div>

		<div id="content">
		    <Outlet />
		</div>
		<ScrollRestoration />
		<Scripts />
	    </body>
	</html>
    );
}
