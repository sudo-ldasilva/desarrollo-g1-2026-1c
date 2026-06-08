export default {
  testEnvironment: 'node',
  transform: {},
  // ✅ Remove '.js' from the array, as it's redundant with "type": "module" in package.json
  extensionsToTreatAsEsm: [],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // Forzar ejecución serializada de tests para evitar conflictos
  // de concurrencia en la base de datos compartida de integración
  maxWorkers: 1,
};
