import 'babel-polyfill';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import s3App from './reducers';
import App from './components/App';
import { retrieveList } from './actions';
// import './css/my.css'

const loggerMiddleware = createLogger();

const store = createStore(
  s3App,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

store.dispatch(retrieveList());
