## Setting Up Nameless On Your Server

The first thing you will want to do is get Nameless working on your server. Nameless assumes you are using [Express](http://expressjs.com).

For the sake of keeping things organized I created a `setupNameless` folder that has a `services.js` and an `index.js` file.

### Setting Up Your Services

`setupNameless/index.js`
```js
import nameless from 'nameless-js/server';
import services from 'services';

const config = {

    // Nameless will use this property to dynamically
    // create an api that the client side code will interact with
    apiPrefix: '/api',

    // we will set up our services in another file to keep things organized
    services,
};

// the default export will be an anoymous function
// that we will pass our express app to. Then the function
// will return an object with a method to dispatch actions and the apiPrefix
// we set in the config
export default app => nameless(config, app);
```

`setupNameless/services.js`

```js
import { createService } from 'nameless-js/server';

// I would put this in a constants.js file
// but for this guide it is here
const ACTIONS = {
    GET_ALL_RECIPES: 'GET_ALL_RECIPES',
    UPDATE_RECIPE: 'UPDATE_RECIPE',
};

// here we use the createService method to create a recipe service
// that will be used to fetch all of our recipes and update recipes
// you can name your actions whatever you want and the functions those
// actions call can do whatever you want.
const recipes = createService('recipes', {

    // the name of our service methods is that of our actions
    // each service method receives 3 arguments which are
    // payload, resolve, and reject.

    // Service methods are promises and it is up to you to
    // call the resolve or reject methods. Data passed into
    // the resolve method will be sent back to the client.
    [ACTIONS.GET_ALL_RECIPES](payload, resolve, reject) {

        // Here we could make a call to our database to get
        // all of our recipes.

        // Once the data has arrived we can pass it to resolve
        // and it will be sent back to the client
        const data = {};
        resolve(data);
    },

    [ACTIONS.UPDATE_RECIPE](payload, resolve, reject) {

        // We can use the payload object to sent data to our services from the client.
        const { id, body } = payload;
        // Now we can use the id from the payload to update something in the database

        // Once our update is complete we can pass whatever we want to resolve which will be
        // sent back to the client.

        resolve({ message: `ID ${id} was updated!` });
    }
});

// We can add more services here if we want

// We will then export our service objects in an array
export default [ recipes ];
```

### Making It Work With Express

Now that we have Nameless set up to work with the server here's an example of how you could set it up.

```js
import express from 'express';
import setupNameless from './setupNameless';

const ACTIONS = {
    GET_ALL_RECIPES: 'GET_ALL_RECIPES',
};

const app = express();

// Here we pass our app to our setupNameless file
// What we get in return is an object with the commander function,
// which is used to dispatch actions and the apiPrefix we set in our
// config.

// The client will need to know what the apiPrefix is. You can either
// hardcode it in the client or do something like save it to your redux store.
const { commander, apiPrefix } = setupNameless(app);

app.use((req, res, next) => {

    // We can use the commander to fetch recipes server side
    // before we render our app.

    // Here 'recipes' is our service we defined and we want to dispatch the GET_ALL_RECIPES action
    commander.exec('recipes', ACTIONS.GET_ALL_RECIPES).then(recipes => {
        // render app
    });

});

app.listen(process.env.PORT || 3000, function () {
    console.log(`App listening on port ${process.env.PORT || 3000}`);
});

```

At this point Nameless has set up an API and is ready to receive requests from the client.

Next Up -> [Setting Up The Client](client.md)