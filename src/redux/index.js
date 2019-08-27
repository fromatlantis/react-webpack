import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import authUser from './authUser'
import customerBill from './customerBill'
import customer from './customer'
import changes from './changes'
import bill from './bill'
import records from './records'
import charge from './charge'
import statTypes from './statTypes'
import statSettle from './statSettle'
export default history =>
    combineReducers({
        router: connectRouter(history),
        authUser,
        customerBill,
        customer,
        changes,
        bill,
        records,
        charge,
        statTypes,
        statSettle,
    })
