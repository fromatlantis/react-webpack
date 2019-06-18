import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import repair from './repair'
import dispatch from './dispatch'
import feedback from './feedback'
import configuration from './configuration'
import materialManager from './materialManager'
import meter from './meter'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        repair,
        dispatch,
        feedback,
        configuration,
        materialManager,
        meter,
    })
