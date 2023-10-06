# Test Ecom

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

This is a small basic ecom application, featuring a home page that contains a bunch of products, a product details page, a login page and a admin dashboard page.
We can add products to cart and remove from cart, cart data is stored in local storage, so if we do a hard refresh, the data will still be there. From the admin dashboard we can perform CRUD operations like we can create, read, update and delete a product. For the REST api I used a json-server, read the note below for details.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Note
Also install `json-server` for the REST api, so that the application works properly.
`npm install -g json-server`

To start JSON Server go to `src/db` then run `json-server --watch db.json`

[json-server docs](https://www.npmjs.com/package/json-server)
