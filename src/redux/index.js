import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import agencyRequire from './agencyRequire'
import companyDetails from './companyDetails'
import intermediary from './intermediary'
import company from './company'
import newCompany from './newCompany'
import business from './business'
import finance from './finance'
import members from './members'
import news from './news'
import product from './product'
import event from './event'
import outward from './outward'
import trademark from './trademark'
import patent from './patent'
import dictionary from './dictionary'
import loading from './loading'
import configure from './configure'
import qualification from './qualification'
import revenueAndFinancing from './revenueAndFinancing'
import staff from './staff'
import revenue from './revenue'
import statOverview from './statOverview'
import parkStaff from './parkStaff'
import knowledgeRight from './knowledgeRight'

export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        companyDetails,
        agencyRequire,
        company,
        newCompany,
        business,
        finance,
        members,
        news,
        product,
        event,
        outward,
        trademark,
        patent,
        intermediary,
        dictionary,
        loading,
        configure,
        qualification,
        revenueAndFinancing,
        staff,
        revenue,
        statOverview,
        parkStaff,
        knowledgeRight,
    })
