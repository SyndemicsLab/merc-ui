import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
    resolve: {
        alias: {
            "~": "/app",
            "@components": "/app/components",
            "@simulation": "/app/components/simulation",
            "@tests": "/tests",
        },
    },
    plugins: [tailwindcss(), ...(mode === "test" ? [] : [reactRouter()])],
    test: {
        globals: true,
        environment: "jsdom",
        include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    },
}));
