import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import houseManage from './houseManage'
import leaseManage from './leaseManage'

export default (history)=> combineReducers({
    router: connectRouter(history),
    authUser,
    houseManage,
    leaseManage,
})
