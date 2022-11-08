const fetch        = require('node-fetch');
const removePrefix = require('./remove-prefix');
const removeSuffix = require('./remove-suffix');

const toUrl = (value = '/') => {

  let url = value;
      url = removePrefix(url, '/');
      url = removeSuffix(url, '/');

  return url.toLowerCase().startsWith('http')
    ? url
    : `http://${url}`;
};

const doGetPromise = (url) => {
  return fetch(toUrl(url), {
    // credentials: 'same-origin', // 'include', default: 'omit'
    method: 'GET',             // 'GET', 'PUT', 'DELETE', etc.
    // body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .catch(error => console.debug(error));
};
const doGet = async (url) => {
  try {
    const response = await doGetPromise(url);
    return response;
  } catch (ex) {
    console.debug(`doGet Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const doPostPromise = (url, data) => {
  return fetch(toUrl(url), {
    // credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST',             // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .catch(error => console.debug(error));
};
const doPost = async (url, data) => {
  try {
    const response = await doPostPromise(url, data);
    return response;
  } catch (ex) {
    console.debug(`doPost Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const doPutPromise = (url, data) => {
  return fetch(toUrl(url), {
    // credentials: 'same-origin', // 'include', default: 'omit'
    method: 'PUT',             // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .catch(error => console.debug(error));
};
const doPut = async (url, data) => {
  try {
    const response = await doPutPromise(url, data);
    return response;
  } catch (ex) {
    console.debug(`doPut Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const doDeletePromise = (url, data) => {
  return fetch(toUrl(url), {
    // credentials: 'same-origin', // 'include', default: 'omit'
    method: 'DELETE',             // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Use correct payload (matching 'Content-Type')
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .catch(error => console.debug(error));
};
const doDelete = async (url, data) => {
  try {
    const response = await doDeletePromise(url, data);
    return response;
  } catch (ex) {
    console.debug(`doDelete Error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const ping = async () => {
  const response = await doGet('/');
  return response || 'FAILURE';
};

module.exports = {
  ping,

  doGet,
  doPost,
  doPut,
  doDelete
};
