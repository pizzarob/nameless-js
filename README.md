[![Build Status](https://travis-ci.org/realseanp/nameless-js.svg?branch=master)](https://travis-ci.org/realseanp/nameless-js)

# Nameless JS - Isomorphic Client/Server Communication

Nameless is a utility that tries to make server/client communication easier. Built for isomorphic apps, Nameless dispatches actions from the client and the server the same way. These actions are tied to methods set up server-side. So when actions are dispatched we can interact with databases (or do other async stuff) and send data back to the client.

Nameless was initially built to be used with a Redux app, but you can use it any way you see fit!

```bash
npm i --save nameless-js
```
```bash
import namelessClient from 'nameless-js/client';
import namelessServer, { createService } from 'nameless-js/server';
```

A client side call to the server might look like. If this function is called server side you will get the same results.

```js
nameless.exec('jobs', actions.FILTER_JOBS, { /* filters */ }).then(data => /* do something with data. update store ? */ )));
```

## Getting Started

The first thing you will want to do is [get Nameless working with your server](https://github.com/realseanp/nameless-js/blob/dev/read/server.md)


## Api

### Server

```js
import nameless, { createService } from 'nameless-js/server';
```

**`nameless(config = Object, app = Express Object)`**

**Arguments**

`config` - Object

- **Object Properties**

  - `apiPrefix` - String - The path you want Nameless to use for your API.

  - `services` - Array - Array of service objects

`app` - Express object - [Example](http://expressjs.com/en/4x/api.html#express)

**Returns**

`Object` - An object is returned with two properties `commander` and `apiPrefix`.

- `commander` - Object
  - `exec(serviceName = String, actionName = String)`- Promise
- `apiPrefix` - String - String you specified in `config` object.

**`createService(name = String, actions = Object)`**

`name` - String - Name of your service

`actions` - Object - An object containing action methods.

- `[ACTION_METHOD_NAME](payload, resolve, reject)` - Function that will be executed when action correlating to this functions name is executed.

### Client

```js
import nameless from 'nameless-js';
```

**`nameless(apiPrefix = String)`**

**Arguments**

`apiPrefix` - String - Path specified in server configuration object.

**Returns**

`Object` - An object containing the `exec` method

- `exec(serviceName = String, actionName = String, payload)`
