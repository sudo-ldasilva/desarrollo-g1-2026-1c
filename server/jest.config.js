export default {
  testEnvironment: 'node',
  transform: {},
  // ✅ Remove '.js' from the array, as it's redundant with "type": "module" in package.json
  extensionsToTreatAsEsm: [],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
