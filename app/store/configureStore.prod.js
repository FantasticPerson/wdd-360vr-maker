// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import rootReducer from '../reducers';
// import type { counterStateType } from '../reducers/counter';

const history = createHashHistory();

// const createRootReducer = (history) => combineReducers({
//   router: connectRouter(history),
//   // rest of your reducers
// })

// const router = routerMiddleware(createRootReducer(history));
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState) {
  return createStore(rootReducer(history), initialState);
}

export default { configureStore, history };
