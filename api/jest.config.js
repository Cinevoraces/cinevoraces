/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const aliases = require("module-alias-jest/register");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: aliases.jest,
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
