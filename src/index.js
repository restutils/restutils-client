const path    = require('path');
const _       = require('restutils-helpers');
const options = require('./options');

module.exports.processOptions = async (opts) => {

  let errors = [];

  opts.root =  path.dirname(__dirname);

  errors = _.isValidArray(errors) ? errors : options.steps.unknowns(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.cleanPaths(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setDefaults(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.verifyFormats(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.validate(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.fetchDefinitions(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.constructLines(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.writeFiles(opts);

  errors = _.unique(errors);

  return {
    errors,
    files : opts._files
  };
};
