// @flow
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { createHashHistory } from 'history';
// import { routerMiddleware } from 'react-router-redux';
// import rootReducer from '../reducers';
// const history = createHashHistory();
// const router = routerMiddleware(history);
// const enhancer = applyMiddleware(thunk, router);



if (process.env.NODE_ENV === 'production') {
  // config = configProd
  module.exports = require('./configureStore.prod.js'); // eslint-disable-line global-require
} else {
  // config = configDev
  module.exports = require('./configureStore.dev.js'); // eslint-disable-line global-require
}

// export default {configureStore:config.configureStore,history:configureStore.history}
