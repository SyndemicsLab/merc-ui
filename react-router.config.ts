import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
    async prerender() {
        return ["/respond", "/glossary", "/contact"];
    },
} satisfies Config;
