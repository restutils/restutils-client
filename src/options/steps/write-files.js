const os   = require('os');
const path = require('path');
const _    = require('../../utils');

const TEMPLATES_FOLDER = path.resolve(path.join(__dirname, '../../templates'));
const HTTP_FILENAME    = 'http.js';
const DEFAULT_FOLDER   = 'restutils';
const CLIENT_FILENAME  = 'client.js';

const writeFiles = async (opts) => {

  const workPath = _.isValidString(opts.path)
    ? path.resolve(opts.path)
    : path.join(process.cwd(), DEFAULT_FOLDER)

  if (!_.makePath(workPath)) {
    return ['Failure creating output folder.'];
  }

  const httpSource = path.join(TEMPLATES_FOLDER, HTTP_FILENAME);
  const httpTarget = path.join(workPath, HTTP_FILENAME);
  const clientFile = path.join(workPath, CLIENT_FILENAME);

  if (!_.copyFile(httpSource, httpTarget)) {
    return ['Failure creating output files.'];
  }

  let fileContents = '';
  opts.lines.forEach(line => {
    fileContents += line;
    fileContents += os.EOL;
  })

  if (!_.writeFile(clientFile, fileContents));

  return [];
};

module.exports = writeFiles;
