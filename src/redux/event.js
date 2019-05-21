import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'outward',
    state: {
        event: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getInvestmentEventList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.event.searchParams)
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getInvestmentEventList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getInvestmentEventListOk')(res.data))
                }
            },
        },
        {
            name: 'getInvestmentEventListOk',
            reducer: 'event',
        },
        {
            name: 'queryInvestmentEventDetial',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/queryInvestmentEventDetial?keyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('queryInvestmentEventDetialOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    detail: {},
                }
            },
        },
        {
            name: 'queryInvestmentEventDetialOk',
            reducer: 'detail',
        },
        {
            name: 'increaseInvestmentEventApprove',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseInvestmentEventApprove`,
                    data: {
                        params,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'changeInvestmentEventApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeInvestmentEventApprove`,
                    contentType: 'multipart/form-data',
                    data: {
                        newContent: JSON.stringify(action.payload),
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
    ],
}
const event = blaze(model)
// reducer combineReducers使用
export default event.reducers
// action connect组件使用
export const actions = event.actions
// effects saga监听副作用函数使用
export const effects = event.effects
