import type {
    LinksFunction,
} from "@remix-run/node";
import appStylesHref from "./app.css?url";
import {
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
		    <h1>RESPOND Simulation</h1>
		    <p>
			<b class="warn">NOTE:</b> Contents of this sidebar are subject to change.
		    </p>
		    <ul>
			<li></li>
		    </ul>
		</div>

		<div id="content">
		    <Outlet />
		</div>
		<ScrollRestoration />
		<Scripts />
		<LiveReload />
	    </body>
	</html>
    );
}
