import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
    })
