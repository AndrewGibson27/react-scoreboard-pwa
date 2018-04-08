/* global document, window */

import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import config from '../config';
import App from '../App';

const { isDev } = config;

const doPreload = async () => {
  await Loadable.preloadReady();
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

if (isDev) {
  module.hot.accept();
  window.startApp = () => {};
  doPreload();
} else {
  window.startApp = () => { doPreload(); };
}
