import { Config } from '@jest/types';
const expoPreset = require('jest-expo/jest-preset');

const config: Config.InitialOptions = {
  ...expoPreset,
  preset: '@testing-library/react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-async-storage)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
};

export default config;
