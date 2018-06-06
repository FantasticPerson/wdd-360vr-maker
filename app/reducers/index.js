// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import scene from './scene';
import vr from './vr';
import folder from './folder';
import app from './app'
import hotpot from './hotpot'
import krpano from './krpano'
import picture from './picture'

const rootReducer = combineReducers({
    scene,
    vr,
    router,
    folder,
    app,
    hotpot,
    krpano,
    picture
});

export default rootReducer;
