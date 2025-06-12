/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  detectOpenHandles: true,
  rootDir: "./",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
