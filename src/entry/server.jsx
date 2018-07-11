/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import webpack from 'webpack'; // eslint-disable-line
import hotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import devMiddleware from 'webpack-dev-middleware'; // eslint-disable-line

import App from '../App'; // eslint-disable-line
import config from '../config';
import initDb from '../db';
import schema from '../api';
import contextReducer from '../store/context/reducers';
import scoresRibbonReducer from '../store/scores-ribbon/reducers';
import scoresListReducer from '../store/scores-list/reducers';
import scoreDetailReducer from '../store/score-detail/reducers';
import getDataFetchers from '../utils/getDataFetchers';
import webpackBaseConfig from '../../webpack/base';
import webpackDevConfig from '../../webpack/client.dev';

const { port, isDev } = config;
const { PUBLIC_PATH } = webpackBaseConfig;
const compiler = webpack(webpackDevConfig);
const app = express();

app.use(express.static('public'));
app.use('/graphql', bodyParser.json(), graphqlHTTP({ schema, graphiql: true }));
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
  const store = createStore(
    combineReducers({
      context: contextReducer,
      scoresRibbon: scoresRibbonReducer,
      scoresList: scoresListReducer,
      scoreDetail: scoreDetailReducer,
    }),
    {},
    applyMiddleware(thunk),
  );
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

initDb().then(() => {
  Loadable.preloadAll().then(() => {
    // eslint-disable-next-line consistent-return
    app.listen(port, 'localhost', (err) => {
      if (err) {
        if (isDev) {
          console.log(err); // eslint-disable-line
        }
        return false;
      }
      console.log(`Listening at http://localhost:${port}`); // eslint-disable-line
    });
  });
});
