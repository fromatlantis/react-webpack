import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'outward',
    state: {
        outward: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getInvestmentAbroadList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.outward.searchParams)
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getInvestmentAbroadList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getInvestmentAbroadListOk')(res.data))
                }
            },
        },
        {
            name: 'getInvestmentAbroadListOk',
            reducer: 'outward',
        },
        {
            name: 'queryInvestmentAbroadDetial',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/queryInvestmentAbroadDetial?keyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('queryInvestmentAbroadDetialOk')(res.data))
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
            name: 'queryInvestmentAbroadDetialOk',
            reducer: 'detail',
        },
        {
            name: 'increaseInvestmentAbroadApprove',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseInvestmentAbroadApprove`,
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
            name: 'changeInvestmentAbroadApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeInvestmentAbroadApprove`,
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
const outward = blaze(model)
// reducer combineReducers使用
export default outward.reducers
// action connect组件使用
export const actions = outward.actions
// effects saga监听副作用函数使用
export const effects = outward.effects
