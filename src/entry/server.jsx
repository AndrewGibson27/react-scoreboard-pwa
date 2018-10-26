/* eslint-disable global-require, import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import hotMiddleware from 'webpack-hot-middleware';
import devMiddleware from 'webpack-dev-middleware';

import App from '../App'; // eslint-disable-line
import config from '../config';
import initDb from '../db';
import schema from '../api';
import configureStore from '../utils/configureStore';
import getDataFetchers from '../utils/getDataFetchers';
import doInitialDispatches from '../utils/doInitialDispatches';
import checkAuthRoutes from '../utils/checkAuthRoutes';
import webpackBaseConfig from '../../webpack/base';
import webpackDevConfig from '../../webpack/client.dev';

const { port, isDev } = config;
const { PUBLIC_PATH } = webpackBaseConfig;
const compiler = webpack(webpackDevConfig);
const app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'foobarbaz',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

app.use('/graphql', (req, res, next) => {
  const context = { req, res };
  graphqlHTTP({ schema, context, graphiql: true })(req, res, next);
});
app.set('view engine', 'pug');
app.set('port', port);

if (isDev) {
  app.use(hotMiddleware(compiler));
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath,
  }));
}

app.get('*', (req, res) => {
  const store = configureStore();
  // eslint-disable-next-line consistent-return
  doInitialDispatches(store, req).then(() => {
    const { isAdmin } = store.getState().user.data;
    const hasAuthRoutes = checkAuthRoutes(req.url);

    if (!isAdmin && hasAuthRoutes) {
      return res.redirect('/login');
    }

    const fetchers = getDataFetchers(req.url, store);

    Promise.all(fetchers).then(() => {
      const modules = [];
      const context = {};
      const initialTree = (
        <Loadable.Capture
          report={moduleName => modules.push(moduleName)}
        >
          <StaticRouter
            location={req.url}
            context={context}
          >
            <Provider store={store}>
              <App />
            </Provider>
          </StaticRouter>
        </Loadable.Capture>
      );

      const stats = require('../../build/react-loadable.json');
      const manifest = require('../../build/manifest.json');

      const content = ReactDOM.renderToString(initialTree);
      const syncBundles = manifest.entrypoints.main.js;
      const asyncBundles = getBundles(stats, modules);

      res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>React Boilerplate</title>
          </head>
          <body>
            <div id="root">${content}</div>
            <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())};</script>
            ${asyncBundles.map(script => `<script src="${isDev ? '/' : PUBLIC_PATH}${script.file}"></script>`).join('\n')}
            ${syncBundles.map(script => `<script src="${isDev ? '/' : PUBLIC_PATH}${script}"></script>`).join('\n')}
          </body>
        </html>
      `);
    });
  });
});

Promise.all([
  initDb(),
  Loadable.preloadAll(),
]).then(() => {
  // eslint-disable-next-line consistent-return
  app.listen(port, 'localhost', (err) => {
    if (err) {
      if (isDev) console.error(err); // eslint-disable-line
      return false;
    }
    console.log(`Listening at http://localhost:${port}`); // eslint-disable-line
  });
});
