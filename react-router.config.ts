import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
    config: {
        middleware: true,
        splitRouteModules: true,
        viteEnvironmentApi: true,
        passThroughRequests: true,
        trailingSlashAwareDataRequests: true,
    },
    allowedActionOrigins: ["respond.syndemicslab.org"],
    async prerender() {
        // temporarily removing `/contact` for alpha
        return ["/respond", "/glossary"];
    },
} satisfies Config;
