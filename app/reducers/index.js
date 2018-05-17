// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import scene from './scene';
import vr from './vr';
import folder from './folder';
import app from './app'
import group from './group'
import hotpot from './hotpot'

const rootReducer = combineReducers({
    counter,
    scene,
    vr,
    router,
    folder,
    app,
    group,
    hotpot
});

export default rootReducer;
