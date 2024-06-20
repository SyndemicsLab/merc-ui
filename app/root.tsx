import type { LinksFunction, MetaFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "icon", sizes: "32x32", href: "/favicon.ico" }
];

export const meta: MetaFunction = () => {
  return [
    { rel: "icon", href: "/favicon.ico" },
    { title: "RESPOND Simulation" },
    { name: "description", content: "The Syndemics Lab at Boston Medical Center's RESPOND simulation as a web application." },
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
