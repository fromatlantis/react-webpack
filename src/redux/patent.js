import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'patent',
    state: {
        patent: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getPatentList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.patent.searchParams)
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getPatentList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getPatentListOk')(res.data))
                }
            },
        },
        {
            name: 'getPatentListOk',
            reducer: 'patent',
        },
        {
            name: 'queryPatentDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/queryPatentDetail?keyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('queryPatentDetailOk')(res.data))
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
            name: 'queryPatentDetailOk',
            reducer: 'detail',
        },
        {
            name: 'increasePatentApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increasePatentApprove`,
                    data: {
                        params: action.payload,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'changePatentApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changePatentApprove`,
                    contentType: 'multipart/form-data',
                    data: {
                        newContent: action.payload,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
    ],
}
const finance = blaze(model)
// reducer combineReducers使用
export default finance.reducers
// action connect组件使用
export const actions = finance.actions
// effects saga监听副作用函数使用
export const effects = finance.effects
