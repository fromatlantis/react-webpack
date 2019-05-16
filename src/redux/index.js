import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import intermediary from './intermediary'
import company from './company'
import newCompany from './newCompany'
import finance from './finance'
import members from './members'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        company,
        newCompany,
        finance,
        members,
        intermediary,
    })
