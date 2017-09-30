//@flow

import React from 'react';

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import store from './modules/store'

import './index.css';
// import 'semantic-ui-css/semantic.min.css';

render(
  <Provider className="app" store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);