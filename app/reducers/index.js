import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'

import scene from './scene';
import vr from './vr';
import folder from './folder';
import app from './app'
import hotpot from './hotpot'
import krpano from './krpano'
import picture from './picture'
import audio from './audio'
import video from './video'
import group from './group'

// const rootReducer = combineReducers({
//     scene,
//     vr,
//     router,
//     folder,
//     app,
//     hotpot,
//     krpano,
//     picture,
//     audio,
//     video,
//     group
// });

const rootReducer = (history)=>combineReducers({
    scene,
    vr,
    router,
    folder,
    app,
    hotpot,
    krpano,
    picture,
    audio,
    video,
    group,
    router: connectRouter(history),
});

export default rootReducer;
