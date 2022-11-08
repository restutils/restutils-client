const _  = require('restutils-helpers');

const ALPHA           = 'abcdefghijklmnopqrstuvwxyz';
const DEFAULT_NAME    = 'client';
const DEFAULT_PUBLISH = '.restutils';
const HTTP            = 'http://';
const HTTPS           = 'https://';

const getUrl = url => {
  let base = url;
      base = base.toLowerCase().startsWith(HTTP) ? base.substr(HTTP.length) : base;
      base = base.toLowerCase().startsWith(HTTPS) ? base.substr(HTTPS.length) : base;
      base = _.removeSuffix(base, '/');
  return base.includes('/') ? url : [url, DEFAULT_PUBLISH].join('/');
}

const fetchDefinitions = async (opts) => {

  opts.definitions = [];

  const urls = [].concat(opts.host).filter(_.isValidString);
  const names = [].concat(opts.name).filter(_.isValidString);

  for (let i = 0; i < urls.length; i += 1) {

    const url  = getUrl(urls[i]);
    const name = names[i] || [DEFAULT_NAME, `${urls.length === 1 ? '' : ALPHA[i]}`].join('_');
    const data = await _.doGet(url);

    opts.definitions.push({
      url,
      name,
      data
    });

  }

  const invalid = opts.definitions.filter(x => (x && x.url && !_.isObject(x.data)));
  if (invalid.length > 0) {
    return ['Failure retrieving definitions.'];
  }

  return [];
};

module.exports = fetchDefinitions;
