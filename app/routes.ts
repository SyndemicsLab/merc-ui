import { type RouteConfig, route, index, layout, prefix } from "@react-router/dev/routes";

export interface Path {
    name: string;
    displayName: string;
}

export const sitemap: Path[] = [
    {
        name: "",
        displayName: "Home",
    },
    {
        name: "simulation",
        displayName: "Simulation",
    },
    {
        name: "respond",
        displayName: "About RESPOND",
    },
    {
        name: "glossary",
        displayName: "Glossary",
    },
    {
        name: "contact",
        displayName: "Contact",
    },
];

export default [
    index("routes/home.tsx"),
    ...prefix("simulation", [
        layout("routes/simulation.tsx", [
            route(":interventionId", "routes/simulation/input.tsx")
        ])
    ]),
    route("respond", "routes/respond.tsx"),
    route("glossary", "routes/glossary.tsx"),
    route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
