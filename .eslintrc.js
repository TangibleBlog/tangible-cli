module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        node: true
    },
    extends: [
        "airbnb-base"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        // Console 在生产环境也是有必要使用的
        "no-await-in-loop": "off",
        "no-restricted-syntax": "off",
        "no-param-reassign": "off",
        "object-curly-spacing": "off",
        "import/prefer-default-export": "off",
        indent: ["warn", 4, {SwitchCase: 1}],
        quotes: ["warn", "double"],
        "no-console": "off",
        "comma-dangle": ["warn", "never"],
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-plusplus": "off",
        "class-methods-use-this": "off",
        "import/no-cycle": "off",
        "max-len": "warn",

        // 部分与 TypeScript 冲突的 ESLint 内置规则
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",

        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],

        // 其它 TypeScript 特定规则
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",

        "global-require": "off",

        // TODO: 过渡规则，需要在未来删除
        "import/extensions": "off",
        "vue/no-unused-vars": "off",
        "vue/no-unused-components": "off"
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"]
            },
            typescript: {} // this loads <rootdir>/tsconfig.json to eslint
        }
    }
};
