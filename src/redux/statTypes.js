import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
import { APPID } from '../config'
const model = {
    namespace: 'statTypes',
    state: {
        chargeType: [],
        typeCount: {},
        typeDetailList: {},
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
            name: 'getChargeTypeDistribute',
            *effect(action) {
                const res = yield call(request, {
                    url: `/charge/getChargeTypeDistribute`,
                    data: { ...action.payload, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    yield put(actions('getChargeTypeDistributeOK')(res.data))
                }
            },
        },
        {
            name: 'getChargeTypeDistributeOK',
            reducer: 'chargeType',
        },
        {
            name: 'getChargeTypeCountList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.statTypes.searchParams)
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/getChargeTypeCountList`,
                    data: { ...params, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    yield put(actions('getChargeTypeCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getChargeTypeCountListOK',
            reducer: 'typeCount',
        },
        // 导出
        {
            name: 'exportChargeTypeCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/exportChargeTypeCountList`,
                    data: { ...action.payload, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 指定费用类型列表
        {
            name: 'getChargeTypeDetailList',
            reducer: (state, action) => {
                return {
                    ...state,
                    detailSearchParams: { ...state.detailSearchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.statTypes.detailSearchParams)
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/getChargeTypeDetailList`,
                    data: { ...params, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    yield put(actions('getChargeTypeDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getChargeTypeDetailListOK',
            reducer: 'typeDetailList',
        },
        // 导出
        {
            name: 'exportChargeTypeDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/charge/exportChargeTypeDetailList`,
                    data: { ...action.payload, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
    ],
}
const statTypes = blaze(model)
// reducer combineReducers使用
export default statTypes.reducers
// action connect组件使用
export const actions = statTypes.actions
// effects saga监听副作用函数使用
export const effects = statTypes.effects
