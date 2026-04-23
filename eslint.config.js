import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended, // Usamos la configuración recomendada de base
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // --- REGLAS DE ESTILO (Aquí activas el auto-fix) ---
            "indent": ["error", 4], // Obliga a usar 4 espacios (o cambia a 2)
            "semi": ["error", "always"], // Obliga a usar punto y coma al final
            "quotes": ["error", "double"], // Obliga a usar comillas dobles
            "no-multi-spaces": "error", // Borra espacios múltiples innecesarios
            "space-infix-ops": "error", // Obliga a espacios alrededor de operadores (1 + 1)
            "no-unused-vars": "warn", // Avisa si hay variables sin usar
        },
    },
];