# Nameless JS

Nameless is a utility that tries to make server/client communication easier. We dispatch actions to the server via XHR requests that do things we tell it to do then the server responds back to the client with whatever we tell it to send.

Nameless was initially built to be used with a Redux app, but you can use it any way you see fit!

```bash
npm i --save nameless-js
```
```bash
import namelessClient from 'nameless-js';
import namelessServer, { createService } from 'nameless-js/server';
```

A client side call to the server might look like:

```js
nameless.exec('jobs', actions.FILTER_JOBS, { /* filters */ }).then(data => /* do something with data. update store ? */ )));
```

## Getting Started

The first thing you will want to do is [get Nameless working with your server](read/server.md)


