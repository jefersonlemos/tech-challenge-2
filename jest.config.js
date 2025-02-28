/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  detectOpenHandles: true,
  rootDir: "./",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
