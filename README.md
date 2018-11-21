# React Scoreboard SSR
A simple, CSS-less app intended to highlight how to do server-side rendering without something like Next.js. Don't get me wrong: Frameworks like Next are great. But sometimes it's nice to figure out the guts of complicated stuff like SSR on your own.

It demonstrates two kinds of data fetching:
+ **Critical fetch**: Data fetched during SSR and on subsequent route changes
+ **Client fetch**: Data fetched only on the client side

## Technologies used
+ React
+ GraphQL
+ Redux
+ React Router (v4)
+ [react-loadable](https://github.com/jamiebuilds/react-loadable)
+ [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
+ MongoDB

## Getting started
+ Get MongoDB running on your machine
+ Create a database and populated it with the data in `dump/` (or create comparable data yourself)
+ Create a `.env` file in the project root
+ Add `DB_HOST=<db-host>` to that file
+ `yarn` or `npm install`

## Commands
+ `yarn start`: Start the development server
+ `yarn run prod`: Build for production and start the Node server

## Routes
+ `/scores/`
+ `/scores/:id`
+ `/login/`: If you log in using `foo@bar.com`, password: `foobarbaz`, you will be granted admin access.
+ `/admin/`: Mostly empty, but should redirect you back to `/login/` if you're not an admin.

## License
MIT
