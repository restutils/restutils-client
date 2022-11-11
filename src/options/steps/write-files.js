const os   = require('os');
const path = require('path');
const _    = require('restutils-helpers');

const DEFAULT_FOLDER   = 'restutils';
const CLIENT_FILENAME  = 'client.js';

const writeFiles = async (opts) => {

  opts.output = opts.output || {};
  opts.output = {
    ...opts.output,
    file: CLIENT_FILENAME,
    lines: 0
  };

  opts.output.path = _.isValidString(opts.path)
    ? path.resolve(opts.path)
    : path.join(process.cwd(), DEFAULT_FOLDER);

  if (!_.makePath(opts.output.path)) {
    return ['Failure creating output folder.'];
  }

  const clientFile = path.join(opts.output.path, CLIENT_FILENAME);

  let fileContents = '';
  opts.lines.forEach(line => {
    fileContents += line;
    fileContents += os.EOL;
    opts.output.lines += 1;
  });

  if (!_.writeFile(clientFile, fileContents));

  return [];
};

module.exports = writeFiles;
