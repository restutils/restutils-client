const c = require('./constants');

const { BOOLEAN, NUMBER, STRING, ARRAY, PATH, FUNCTION } = c.OPTION_TYPE;

module.exports = {

  host: { type: STRING,  name: 'URL to the API',        default: null },
  name: { type: STRING,  name: 'Names of the API',      default: null },
  path: { type: PATH,    name: 'Path to client folder', default: null },

};
