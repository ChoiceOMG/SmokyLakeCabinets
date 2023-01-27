/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,


};
