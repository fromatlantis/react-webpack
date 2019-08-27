import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'statSettle',
    state: {
        squareUpStatus: [],
        settleCount: {},
        settleDetailList: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
        detailSearchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getSquareUpStatus',
            *effect(action) {
                const res = yield call(request, {
                    url: `/charge/getSquareUpStatus`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getSquareUpStatusOK')(res.data))
                }
            },
        },
        {
            name: 'getChargeTypeDistributeOK',
            reducer: 'squareUpStatus',
        },
        {
            name: 'getSquareUpStatusCountList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.statSettle.searchParams)
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/getSquareUpStatusCountList`,
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getSquareUpStatusCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getSquareUpStatusCountListOK',
            reducer: 'settleCount',
        },
        // 导出
        {
            name: 'exportSquareUpStatusCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/exportSquareUpStatusCountList`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 指定费用类型列表
        {
            name: 'getSquareUpDetailList',
            reducer: (state, action) => {
                return {
                    ...state,
                    detailSearchParams: { ...state.detailSearchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.statSettle.detailSearchParams)
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/getSquareUpDetailList`,
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getSquareUpDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getSquareUpDetailListOK',
            reducer: 'settleDetailList',
        },
        // 导出
        {
            name: 'exportSquareUpDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/exportSquareUpDetailList`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
    ],
}
const statSettle = blaze(model)
// reducer combineReducers使用
export default statSettle.reducers
// action connect组件使用
export const actions = statSettle.actions
// effects saga监听副作用函数使用
export const effects = statSettle.effects
