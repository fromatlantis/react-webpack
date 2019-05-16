import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import agencyRequire from './agencyRequire'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        agencyRequire,
    })
