/* global document, window */

import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import config from '../config';
import App from '../App';

const doPreload = async () => {
  await Loadable.preloadReady();
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

window.startApp = () => { doPreload(); };
