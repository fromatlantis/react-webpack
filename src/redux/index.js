import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import bill from './bill'
export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        bill,
    })
