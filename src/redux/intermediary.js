import { put, call } from 'redux-saga/effects'
import { replace, push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { redirectLogin } from '../utils'

import { message, Button } from 'antd'

const model = {
    namespace: 'intermediary',
    state: {
        intermediary: [],
        company: [],
    },
    actions: [
        {
            name: 'getServiceTypeList',
            *effect(action) {
                const res = yield call(request, {
                    // type: 'post',
                    url: '/enterprise/getServiceTypeList',
                    // data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getServiceTypeListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getServiceTypeListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    intermediary: action.payload,
                }
            },
        },
        {
            name: 'addDemand',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/addDemand',
                    data: action.payload,
                    contentType: 'multipart/form-data',
                })
                if (res.code === 1000) {
                    // message.success('成功')
                }
            },
        },
        {
            name: 'searchCompany',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url:
                        '/enterprise/searchCompany?column=' +
                        action.payload.column +
                        '&keyWord=' +
                        action.payload.keyWord +
                        '&pageNo=' +
                        action.payload.pageNo +
                        '&pageSize=' +
                        action.payload.pageSize,
                    // data: action.payload,
                    // contentType: 'multipart/form-data',
                })
                if (!res.data.totalCount) {
                    message.success('搜索结果为空')
                } else {
                    yield put(actions('searchCompanySuccess')(res.data))
                }
            },
        },
        {
            name: 'searchCompanySuccess',
            reducer: (state, action) => {
                // console.log(state)
                // console.log(action)
                // return {
                //     ...state,
                //     intermediary: action.payload,
                // }
            },
        },
        {
            name: 'increaseWebsiteRecordsApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/increaseWebsiteRecordsApprove',
                    data: action.payload,
                    // contentType: 'multipart/form-data',
                })
                console.log(res, '========================')
                if (res.code === 1000) {
                    message.success('成功')
                }
            },
        },
        {
            name: 'increaseProductTrademarkApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/increaseProductTrademarkApprove',
                    data: action.payload,
                    // contentType: 'multipart/form-data',
                })
                console.log(res, '========================')
                if (res.code === 1000) {
                    message.success('成功')
                }
            },
        },
        {
            name: 'increaseSoftwareCopyrightApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/increaseSoftwareCopyrightApprove',
                    data: action.payload,
                    // contentType: 'multipart/form-data',
                })
                console.log(res, '========================')
                if (res.code === 1000) {
                    message.success('成功')
                }
            },
        },
        {
            name: 'queryWebsiteRecordsDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: '/enterprise/queryWebsiteRecordsDetail?keyId=' + action.payload.keyId,
                    // data: action.payload,
                    // contentType: 'multipart/form-data',
                })
                console.log(res, '********************')
                // if (!res.data.totalCount) {
                //     message.success('搜索结果为空')
                // } else {
                //     yield put(actions('searchCompanySuccess')(res.data))
                // }
            },
        },
    ],
}
const manager = blaze(model)
// reducer combineReducers使用
export default manager.reducers
// action connect组件使用
export const actions = manager.actions
// effects saga监听副作用函数使用
export const effects = manager.effects
