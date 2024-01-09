/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    roots: ['<rootDir>'],
    moduleNameMapper: {
        '@src/(.*)$': '<rootDir>/src/$1',
        '@routes/(.*)$': '<rootDir>/src/routes/$1',
        '@plugins/(.*)$': '<rootDir>/src/plugins/$1',
        '@modules/(.*)$': '<rootDir>/src/modules/$1',
        '@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    },
};
