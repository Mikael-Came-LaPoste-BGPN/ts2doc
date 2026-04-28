const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const github = require("eslint-plugin-github");
const jsxA11Y = require("eslint-plugin-jsx-a11y");
const prettier = require("eslint-plugin-prettier");
const sonarjs = require("eslint-plugin-sonarjs");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jest = require("eslint-plugin-jest");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([
    sonarjs.configs.recommended,
    {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    languageOptions: {
        parser: tsParser,
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:github/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "prettier",
    )),

    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        github: fixupPluginRules(github),
        "jsx-a11y": fixupPluginRules(jsxA11Y),
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "i18n-text/no-en": "off",
        "eslint-comments/no-unused-disable": "off",
        "filenames/match-regex": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-deprecated": "off",
        "import/default": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-unresolved": "off",
        "@typescript-eslint/no-unused-vars": "error",

        "import/extensions": ["error", "never", {
            json: "always",
        }],

        "import/order": ["error", {
            groups: [
                "builtin",
                "external",
                "internal",
                ["sibling", "parent", "index"],
                "object",
                "type",
            ],

            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],

        "no-console": "error",
        "prettier/prettier": "error",
    },
}, globalIgnores([
    "**/node_modules",
    "**/dist",
    "**/*.d.ts",
    "**/coverage",
    "**/jest.config.js",
]), {
    files: ["**/*.test.ts"],

    plugins: {
        jest,
    },

    extends: compat.extends("plugin:jest/recommended"),

    languageOptions: {
        globals: {
            __dirname: true,
        },
    },

    rules: {},
}]);
