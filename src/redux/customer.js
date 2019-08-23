import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'customer',
    state: {
        customerBaseInfo: {},
        customerRentInfo: {},
    },
    actions: [
        {
            name: 'getCustomerBaseInfo',
            reducer: (state, action) => {
                return {
                    ...state,
                    customerBaseInfo: {},
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/charge/getCustomerBaseInfo`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCustomerBaseInfoOK')(res.data))
                }
            },
        },
        {
            name: 'getCustomerBaseInfoOK',
            reducer: 'customerBaseInfo',
        },
        {
            name: 'getCustomerRentInfo',
            reducer: (state, action) => {
                return {
                    ...state,
                    customerRentInfo: {},
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/charge/getCustomerRentInfo`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCustomerRentInfoOK')(res.data))
                }
            },
        },
        {
            name: 'getCustomerRentInfoOK',
            reducer: 'customerRentInfo',
        },
    ],
}
const customer = blaze(model)
// reducer combineReducers使用
export default customer.reducers
// action connect组件使用
export const actions = customer.actions
// effects saga监听副作用函数使用
export const effects = customer.effects
