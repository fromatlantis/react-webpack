import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'bill',
    state: {
        bill: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getBillList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.bill.searchParams)
                const res = yield call(request, {
                    // type: 'post',
                    url: `/charge/getBillList`,
                    // contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getBillListOK')(res.data))
                }
            },
        },
        {
            name: 'getBillListOK',
            reducer: 'bill',
        },
        {
            name: 'operateAddBill',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/addCustomer`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                    yield put(actions('getBillList')())
                }
            },
        },
    ],
}
const bill = blaze(model)
// reducer combineReducers使用
export default bill.reducers
// action connect组件使用
export const actions = bill.actions
// effects saga监听副作用函数使用
export const effects = bill.effects
