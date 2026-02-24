import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js, mjs, cjs, ts, mts, cts, jsx, tsx}"],
        plugins: { js },
        extends: ["js/recommended", "plugin:react/jsx-runtime"],
        languageOptions: { globals: globals.browser },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "react/react-in-jsx-scope": "off"
        },
    },
    tseslint.configs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);
