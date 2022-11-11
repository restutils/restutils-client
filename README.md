![RESTUtils Logo](./docs/images/logo-wide.png)

# RESTUtils Host (`restutils-client`)

Generate local client library for APIs created with the [RESTUtils Host](https://github.com/restutils/restutils-host) utility with one command.

## Purpose

This package is designed to work exclusively with APIs created using the [RESTUtils Host](https://github.com/restutils/restutils-host) utility.  The [RESTUtils Host](https://github.com/restutils/restutils-host) utility works by instantly generating a web-based API from any JavaScript file or Node package.  The generated routes can be extensive and they change as your file or package matures.  The RESTUtils **Client** package (this one) connects to your APIs and generates a JavaScript / ES6 client library locally so you don't have to remember the upstream URLs.

## Installation

It's best to run from `npx` but it can be installed globally...

```bash
npm i -g restutils-client
```

## Usage  

Generate a new RESTUtils Client in your project with one command...

```bash
npx restutils-client --host http://localhost:3000
```

... and, give it a name if you'd like ...

```bash
npx restutils-client --host http://localhost:3000 --name cool-web-api
```

The best part is you can issue that same one command for all of your upstream APIs...

```bash
npx restutils-client --host http://localhost:3001 --name mailboxes \
                     --host http://localhost:3002 --name processing \
                     --host http://localhost:3003 --name storage-mobile \
                     --path ~/apis
```

From then on, you can simply call your APIs by using simple async functions...

```bash
const apis = require('./apis/client');

const main = async () => {

  const testData = {
    ...
  };

  const result = await apis.storageMobile.messages.storeIncoming(testData);

  console.log('result:', result);

}

main();

```

The `--host` parameter is the only required param.  That same example above will still work just fine, however the generateing naming becomes a bit generic.  So, this...

```bash
npx restutils-client --host http://localhost:3001 \
                     --host http://localhost:3002 \
                     --host http://localhost:3003
```

... is used like this:

```bash
const apis = require('./restutils/client');

const main = async () => {

  const testData = {
    ...
  };

  const result = await apis.clientC.messages.storeIncoming(testData);

  console.log('result:', result);

}

main();

```

## Parameters

| Name   | Description           | Type            | Default |
|--------|-----------------------|-----------------|---------|
| `host` | URL to the API        | `string`        |         |
| `name` | Names of the API      | `string`        |         |
| `path` | Path to client folder | `string (path)` |         |

## Contact

Please feel free to contact me directly with any questions, comments, or enhancement requests:

**Fred Lackey**  
**[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)**  
**[http://fredlackey.com](http://www.fredlackey.com)**  
