const os   = require('os');
const path = require('path');
const _    = require('restutils-helpers');
const pkg = require('../../../package.json');

const displaySummary = (opts) => {

  console.log(`RESTUtils Client v${pkg.version}`);
  if (opts.output.calls === 0) {
    console.log('Nothing to do.');
    return [];
  }

  console.log(`FILE : ${_.getFileName(opts.output.path, false)}/${opts.output.file}`);
  console.log(`HOSTS: ${opts.definitions.length}`);
  console.log(`CALLS: ${opts.output.calls}`);
  console.log(`LINES: ${opts.output.lines}`);
  console.log(' ');
  console.log('Override the upstream URLs using environment variables:');
  console.log(' ');

  [].concat(opts.host).filter(_.isValidString).forEach(host => {
    const def = opts.definitions.find(x => (x && x.url.startsWith(`${host}/`)));
    console.log(`${def.constant}=${host}`);
  });

  console.log(' ');
  console.log('Have a great day!');
  console.log(' ');

  return [];
};

module.exports = displaySummary;
