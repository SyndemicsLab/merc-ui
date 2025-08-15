import React from "react";
import type { Route } from "./+types/root";
import {
    isRouteErrorResponse,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router";

import Navbar from "@components/ui/navbar";
import Footer from "@components/ui/footer"
import appStylesHref from "~/app.scss?url";
import tailwindStyle from "~/styles/tailwind.css?url";

export default function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export function Layout(
    { children, }: { children: React.ReactNode }
) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="icon" content="/favicon.ico" />
                <meta title="RESPOND Simulation" />
                <meta name="description" content="The Syndemics Lab at Boston Medical Center's RESPOND simulation as a web application." />
                <link rel="stylesheet" href={tailwindStyle} />
                <link rel="stylesheet" href={appStylesHref} />
                <link rel="icon" sizes="32x32" href="/favicon.ico" />
                <title>RESPOND — Syndemics Lab</title>
            </head>
            <body>
		<div id="content">
                    {children}
		</div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export function ErrorBoundary(
    { error, }: { error: Route.ErrorBoundaryProps, }
) {
    let message = "Uh-oh, something went wrong!";
    let details = "An unknown error occurred. The page you are attempting to see is currently unavailable.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
    }
    return (
        <main id="error-page">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}

export function HydrateFallback() {
    return (
        <div id="loading-splash">
            <div id="loading-splash-spinner" />
            <p>Loading, please wait...</p>
        </div>
    );
}
