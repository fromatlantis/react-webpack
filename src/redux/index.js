import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import intermediary from './intermediary'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        intermediary,
    })
