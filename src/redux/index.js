import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import company from './company'
import newCompany from './newCompany'
import business from './business'
import finance from './finance'
import members from './members'
import news from './news'
import product from './product'

import trademark from './trademark'
import patent from './patent'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        company,
        newCompany,
        business,
        finance,
        members,
        news,
        product,
        trademark,
        patent,
    })
