import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import materialManager from './materialManager'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        materialManager,
    })
