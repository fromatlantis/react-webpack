import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import companyDetails from './companyDetails'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        companyDetails,
    })
