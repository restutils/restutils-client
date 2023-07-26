const _ = require('restutils-helpers-js');
const validators = require('../validators');

const validate = opts => {

  // console.clear();
  // console.log('--- validate ---');
  // console.log(JSON.stringify(opts, null, 2));

  return Object.keys(validators)
    .map(key => (validators[key](opts)))
    .filter(_.isValidString);
};

module.exports = validate;
