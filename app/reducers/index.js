// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import scene from './scene';
import vr from './vr';
import folder from './folder';

const rootReducer = combineReducers({
    counter,
    scene,
    vr,
    router,
    folder
});

export default rootReducer;
