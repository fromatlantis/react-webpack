import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import repair from './repair'
import dispatch from './dispatch'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        repair,
        dispatch,
    })
