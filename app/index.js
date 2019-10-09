import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import  * as stores  from './store/configureStore';
import Root from './containers/Root';
import dbConfig from './db';
import './app.global.css';

console.log(stores)
// const {config,default} = store

const {configureStore,history} = stores.default

const store = configureStore();

dbConfig();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
