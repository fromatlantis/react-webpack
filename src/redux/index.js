import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import configuration from './configuration'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        configuration,
    })
