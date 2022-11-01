![RESTUtils Logo](./docs/images/logo-wide.png)

# RESTUtils Host (`restutils-client`)

Generate local client library for APIs created with the [RESTUtils Host](https://github.com/restutils/restutils-host) utility with one command.

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
                     --path ~/clients
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
