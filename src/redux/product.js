import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'product',
    state: {
        product: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getProductInfoList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.product.searchParams)
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getProductInfoList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getProductInfoListOk')(res.data))
                }
            },
        },
        {
            name: 'getProductInfoListOk',
            reducer: 'product',
        },
        {
            name: 'queryProductInfoDetial',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/queryProductInfoDetial?keyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('queryProductInfoDetialOk')(res.data))
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
            name: 'queryProductInfoDetialOk',
            reducer: 'detail',
        },
        {
            name: 'increaseProductInfoApprove',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseProductInfoApprove`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'changeProductInfoApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeProductInfoApprove`,
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
const product = blaze(model)
// reducer combineReducers使用
export default product.reducers
// action connect组件使用
export const actions = product.actions
// effects saga监听副作用函数使用
export const effects = product.effects
