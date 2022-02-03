import { Config } from '@jest/types';

// By default, all files inside `node_modules` are not transformed. But some 3rd party
// modules are published as untranspiled, Jest will not understand the code in these modules.
// To overcome this, exclude these modules in the ignore pattern.

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-async-storage)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./setupJest.js'],
};

export default config;
