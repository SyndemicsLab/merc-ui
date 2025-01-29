import {
    type RouteConfig,
    route,
    index,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("simulation", "routes/simulation.tsx"),
    route("results", "routes/results.tsx"),
] satisfies RouteConfig;