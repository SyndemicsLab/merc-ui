import {
    type RouteConfig,
    route,
    index,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("simulation", "routes/simulation.tsx"),
    route("respond", "routes/respond.tsx"),
    route("results", "routes/results.tsx"),
    route("glossary", "routes/glossary.tsx"),
    route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
