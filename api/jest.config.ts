/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default  {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"]
}