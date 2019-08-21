import { put, call, select } from 'redux-saga/effects'
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
            name: 'getCustomerBillList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.bill.searchParams)
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getCustomerBillList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getCustomerBillListOK')(res.data))
                }
            },
        },
        {
            name: 'getCustomerBillListOK',
            reducer: 'bill',
        },
        {
            name: 'increaseFinancing',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseFinancing`,
                    data: {
                        params,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                    yield put(actions('getFinancingList')())
                }
            },
        },
        {
            name: 'increaseFinancingApprove',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseFinancingApprove`,
                    data: {
                        params,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
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
