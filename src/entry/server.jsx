import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack'; // eslint-disable-line
import hotMiddleware from 'webpack-hot-middleware'; // eslint-disable-line
import devMiddleware from 'webpack-dev-middleware'; // eslint-disable-line

import App from '../App'; // eslint-disable-line
import config from '../config';
import routes from '../routes';
import adminReducer from '../store/admin/reducers';
import barReducer from '../store/bar/reducers';
import bazReducer from '../store/baz/reducers';
import webpackBaseConfig from '../../webpack/base';
import webpackDevConfig from '../../webpack/client.dev';
import stats from '../../build/react-loadable.json';
import manifest from '../../build/manifest.json';

const { port, isDev } = config;
const { PUBLIC_PATH } = webpackBaseConfig;
const compiler = webpack(webpackDevConfig);
const app = express();

app.use(express.static('public'));
app.use('/graphql', bodyParser.json());
app.set('view engine', 'pug');
app.set('port', port);

if (isDev) {
  app.use(hotMiddleware(compiler));
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath,
  }));
}

app.get('*', async (req, res) => {
  const store = createStore(
    combineReducers({
      adminState: adminReducer,
      barState: barReducer,
      bazState: bazReducer,
    }),
    {},
    applyMiddleware(thunk),
  );

  const fetchers = routes.map(({ path, exact, components }) => {
    const foundPath = matchPath(req.url, { path, exact, strict: false });

    if (foundPath && components.length) {
      return components.map((component) => {
        if (component.fetchData) {
          return component.fetchData(foundPath.params, store);
        }
        return null;
      });
    }
    return null;
  });

  fetchers.filter(fetcher => !!fetcher);
  await Promise.all(fetchers);

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
        ${syncBundles.map(script => `<script src="${isDev ? '/' : PUBLIC_PATH}${script}"></script>`).join('\n')}
        ${asyncBundles.map(script => `<script src="${isDev ? '/' : PUBLIC_PATH}${script.file}"></script>`).join('\n')}
        <script>window.startApp();</script>
        <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())};</script>
      </body>
    </html>
  `);
});

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
