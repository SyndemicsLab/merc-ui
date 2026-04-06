import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    tseslint.configs.recommended,
    pluginReact.configs.flat["jsx-runtime"],
    // {
    //     ...pluginReact.configs.flat.recommended,
    //     settings: {
    //         react: {
    //             version: "detect",
    //         },
    //     },
    // },
    {
        files: ["**/*.{js, mjs, cjs, ts, mts, cts, jsx, tsx}"],
        plugins: {
            js,
            react: pluginReact,
        },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
        },
    },
]);
