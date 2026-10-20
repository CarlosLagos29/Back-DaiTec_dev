import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
    globalIgnores(["node_modules", "uploads"]),
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            // Node 24 ejecuta los .ts borrando los tipos: los imports de tipos tienen que ser `import type`
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            // ...y los imports relativos tienen que llevar la extensión .ts
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            regex: "^\\.{1,2}/(?!.*\\.ts$)",
                            message:
                                "Los imports relativos tienen que llevar extensión .ts (Node 24 ejecuta los .ts directo).",
                        },
                    ],
                },
            ],
        },
    },
    // Va al final: corre Prettier como regla de ESLint y apaga las reglas de estilo que chocan con él
    prettierRecommended,
);
