import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
    allowedActionOrigins: ["respond.syndemicslab.org"],
    async prerender() {
        return ["/respond", "/glossary", "/contact"];
    },
} satisfies Config;
