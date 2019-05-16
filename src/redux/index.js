import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import companyDetails from './companyDetails'
import company from './company'
import newCompany from './newCompany'
import finance from './finance'
import members from './members'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        companyDetails,
        company,
        newCompany,
        finance,
        members,
    })
