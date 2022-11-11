const path = require('path');
const _    = require('restutils-helpers');

const HEADER          = [
  "const _ = require('restutils-helpers');",
  ' '
];
// const CONSTANT        = "const %NAME% = '%URL%';";
// const CONSTANT        = "const { %NAME% } = process.env;";
const CONSTANT        = "const %NAME% = process.env.%NAME% || '%URL%';";
const CONSTANT_SUFFIX = '_BASE';
const URL_TOKEN       = '%URL%';
const NAME_TOKEN      = '%NAME%';
const EMPTY           = ' ';
const ANY_FN          = "async (data) => data ? _.doPost(`${%NAME%}/%URL%`, data) : _.doGet(`${%NAME%}/%URL%`)"
const POST_FN         = "async (data) => _.doPost(`${%NAME%}/%URL%`, data)"
const GET_FN          = "async (data) => _.doGet(`${%NAME%}/%URL%`)"
const FN_PREFIX       = 'const %NAME% = ';
const FN_SUFFIX       = ';';
const EXPORT_START    = 'module.exports = {';
const EXPORT_LINE     = '  %NAME%,';
const EXPORT_END      = '};';

const addLines = (opts, lines) => {
  opts.lines.push(...lines);
}

const getConstantsSection = (opts) => {
  const lines = [];
  opts.definitions.filter(x => (x && _.isObject(x.data))).forEach(dev => {
    let   name    = `${dev.name.toUpperCase().split('-').join('_')}${CONSTANT_SUFFIX}`;
          name    = name.split('_').filter(x => (x && _.isValidString(x)));
          name    = name.join('_');
    let   url     = _.removeSuffix(dev.url, '/');
    const lastPos = url.lastIndexOf('/');
          url     = url.substr(0, lastPos)
    
    dev.constant = name;

    lines.push(CONSTANT.replaceAll(NAME_TOKEN, name).replaceAll(URL_TOKEN, url));
  });
  return lines;
}
const populateFunctions = (constantName, obj, curUrl, opts) => {

  Object.keys(obj).forEach(key => {

    const url = curUrl ? `${curUrl}/${key}` : key;
    let value = null;
    if (obj[key] === 'POST') {
      value = POST_FN.replaceAll(NAME_TOKEN, constantName).replaceAll(URL_TOKEN, url);
      obj[key] = value;
      opts.output.calls += 1;
    } else if (obj[key] === 'GET') {
      value = GET_FN.replaceAll(NAME_TOKEN, constantName).replaceAll(URL_TOKEN, url);
      obj[key] = value;
      opts.output.calls += 1;
    } else if (obj[key] === 'ANY') {
      value = ANY_FN
        .replaceAll(NAME_TOKEN, constantName).replaceAll(URL_TOKEN, url)
        .replaceAll('/*', '/');
      obj[key] = value;
      opts.output.calls += 1;
    } else {
      populateFunctions(constantName, obj[key], url, opts);
    }
  });

}
const convertKeys = obj => {
  const oldKeys = [];
  Object.keys(obj).forEach(key => {
    const newKey = _.toCamelCase(key === '*' ? 'any' : key);
    if (newKey !== key) {
      oldKeys.push(key);
      obj[newKey] = obj[key];
    }
  });
  oldKeys.filter(_.isValidString).forEach(key => {
    Reflect.deleteProperty(obj, key);
  })
  Object.keys(obj).filter(x => (x && _.isObject(obj[x]))).forEach(key => {
    convertKeys(obj[key]);
  });
}

const countSpaces = value => {
  const chars = value.split('');
  for (let i = 0; i < chars.length; i += 1) {
    if (chars[i] !== ' ') {
      return i;
    }
  }
  return -1;
}
const cleanLine = value => {
  const count = countSpaces(value);
  const space = (count > 0) ? ''.padStart(count, ' ') : '';
  const line = space + value.trim().split('"').join('');
  return line;
}
const convertToLines = async (obj) => {
  const tmpName = _.getBlockDate() + '.tmp';
  const tmpPath = path.join(__dirname, tmpName);
  let lines = null;
  if (_.writeFile(tmpPath, JSON.stringify(obj, null, 2))) {
    lines = await _.readLines(tmpPath);
  }
  _.deleteFile(tmpPath);
  if (!_.isValidArray(lines)) {
    return null;
  }
  lines = lines.map(cleanLine);
  return lines;
}

const constructLines = async (opts) => {

  opts.lines = [];

  opts.output = opts.output || {};
  opts.output = {
    ...opts.output,
    calls: 0
  }

  addLines(opts, HEADER);
  addLines(opts, getConstantsSection(opts));

  const exportLines = [EMPTY, EXPORT_START];

  const definitions = opts.definitions.filter(x => (x && _.isObject(x.data)));
  for (let i = 0; i < definitions.length; i += 1) {

    const definition = definitions[i];

    populateFunctions(definition.constant, definition.data, '', opts);
    convertKeys(definition.data)

    definition.lines = await convertToLines(definition.data);
    
    const name    = _.toCamelCase(definition.name);
    const prefix  = FN_PREFIX.replaceAll(NAME_TOKEN, name);
    const lastPos = definition.lines.length - 1;

    definition.lines[0]       = `${prefix}${definition.lines[0]}`;
    definition.lines[lastPos] = definition.lines[lastPos] + FN_SUFFIX;

    opts.lines.push(EMPTY);
    opts.lines.push(...definition.lines);

    exportLines.push(EXPORT_LINE.replaceAll(NAME_TOKEN, name));
  }
  exportLines.push(EXPORT_END);
 
  opts.lines.push(...exportLines);

  return [];
};

module.exports = constructLines;
