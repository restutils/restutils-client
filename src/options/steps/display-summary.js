const os   = require('os');
const path = require('path');
const _    = require('restutils-helpers');
const pkg = require('../../../package.json');

const displaySummary = (opts) => {

  console.log(`RESTUtils Client v${pkg.version}`);
  if (opts.output.calls === 0) {
    console.log('Nothing to do.');
  } else {
    console.log(`FILE : ${_.getFileName(opts.output.path, false)}/${opts.output.file}`);
    console.log(`HOSTS: ${opts.definitions.length}`);
    console.log(`CALLS: ${opts.output.calls}`);
    console.log(`LINES: ${opts.output.lines}`);
  }

  return [];
};

module.exports = displaySummary;
