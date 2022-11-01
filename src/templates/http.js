const fetch = require("node-fetch");

const HEADERS = { "Content-Type": "application/json" };

const isValidString = (value, isEmptyOkay) => {
  return typeof value === "string" && (isEmptyOkay || value.trim().length > 0);
};
const removePrefix = (value, prefix) => {
  if (!isValidString(value, true)) {
    return value;
  }
  if (!isValidString(prefix, true)) {
    return value;
  }
  while (value.length >= prefix.length && value.startsWith(prefix)) {
    if (value === prefix) {
      value = "";
    } else {
      value = value.substr(prefix.length);
    }
  }
  return value;
};
const removeSuffix = (value, suffix) => {
  if (!isValidString(value, true)) {
    return value;
  }
  if (!isValidString(suffix, true)) {
    return value;
  }
  while (value.length >= suffix.length && value.endsWith(suffix)) {
    value = value.substr(0, value.length - suffix.length);
  }
  return value;
};

const toUrl = (value = "/") => {
  let url = value;
      url = removePrefix(url, "/");
      url = removeSuffix(url, "/");

  return url.toLowerCase().startsWith("http") ? url: `http://${url}`;
};

const doGetPromise = (url) => {
  return fetch(toUrl(url), {
    method : "GET",
    headers: HEADERS,
  })
    .then((response) => response.json())
    .catch((error) => console.debug(error));
};
const doGet = async (url) => {
  try {
    const response = await doGetPromise(url);
    return response;
  } catch (ex) {
    console.debug(`doGet error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const doPostPromise = (url, data) => {
  return fetch(toUrl(url), {
    method : "POST",
    body   : JSON.stringify(data),
    headers: HEADERS,
  })
    .then((response) => response.json())
    .catch((error) => console.debug(error));
};
const doPost = async (url, data) => {
  try {
    const response = await doPostPromise(url, data);
    return response;
  } catch (ex) {
    console.debug(`doPost error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const doPutPromise = (url, data) => {
  return fetch(toUrl(url), {
    method : "PUT",
    body   : JSON.stringify(data),
    headers: HEADERS,
  })
    .then((response) => response.json())
    .catch((error) => console.debug(error));
};
const doPut = async (url, data) => {
  try {
    const response = await doPutPromise(url, data);
    return response;
  } catch (ex) {
    console.debug(`doPut error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const doDeletePromise = (url, data) => {
  return fetch(toUrl(url), {
    method : "DELETE",
    body   : JSON.stringify(data),
    headers: HEADERS,
  })
    .then((response) => response.json())
    .catch((error) => console.debug(error));
};
const doDelete = async (url, data) => {
  try {
    const response = await doDeletePromise(url, data);
    return response;
  } catch (ex) {
    console.debug(`doDelete error calling ${url}`);
    console.debug(ex);
    return null;
  }
};

const ping = async () => {
  const response = await doGet("/");
  return response || "FAILURE";
};

module.exports = {
  ping,

  doGet,
  doPost,
  doPut,
  doDelete,
};
