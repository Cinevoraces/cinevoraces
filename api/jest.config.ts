/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const aliases = require("module-alias-jest/register");

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: aliases.jest,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
