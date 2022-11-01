const cleanPaths       = require('./clean-paths');
const setDefaults      = require('./set-defaults');
const unknowns         = require('./unknowns');
const validate         = require('./validate');
const verifyFormats    = require('./verify-formats');
const fetchDefinitions = require('./fetch-definitions');
const constructLines   = require('./construct-lines');
const writeFiles       = require('./write-files');

module.exports = {
  cleanPaths,
  setDefaults,
  unknowns,
  validate,
  verifyFormats,
  fetchDefinitions,
  constructLines,
  writeFiles
};
