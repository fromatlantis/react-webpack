import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'revenueAndFinancing',
    state: {
        financialStatus: [],
        financeCountList: [],
        financeDetailList: [],
        financingTrend: [],
        financingHisCountList: [],
        financingHisDetailList: [],
    },
    actions: [
        // 园区营收统计-面积图
        {
            name: 'getFinancialStatus',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getFinancialStatus?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancialStatusOK')(res.data))
                }
            },
        },
        {
            name: 'getFinancialStatusOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financialStatus: action.payload,
                }
            },
        },
        // 园区营收统计-数量列表
        {
            name: 'getFinanceCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getFinanceCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinanceCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getFinanceCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financeCountList: action.payload,
                }
            },
        },
        // 园区营收统计-详情列表
        {
            name: 'getFinanceDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getFinanceDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinanceDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getFinanceDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financeDetailList: action.payload,
                }
            },
        },
        // 园区营收统计-数量列表-导出
        {
            name: 'exportFinanceCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportFinanceCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 园区营收统计-详情列表-导出
        {
            name: 'exportFinanceDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportFinanceDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 融资情况统计-折线图
        {
            name: 'getFinancingTrend',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getFinancingTrend?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancingTrendOK')(res.data))
                }
            },
        },
        {
            name: 'getFinancingTrendOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financingTrend: action.payload,
                }
            },
        },
        // 融资情况统计-数量列表
        {
            name: 'getFinancingHisCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getFinancingHisCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancingHisCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getFinancingHisCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financingHisCountList: action.payload,
                }
            },
        },
        // 融资情况统计-详情列表
        {
            name: 'getFinancingHisDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getFinancingHisDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancingHisDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getFinancingHisDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financingHisDetailList: action.payload,
                }
            },
        },
        // 融资情况统计-数量列表-导出
        {
            name: 'exportFinancingHisCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportFinancingHisCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 融资情况统计-详情列表-导出
        {
            name: 'exportFinancingHisDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportFinancingHisDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
    ],
}
const revenueAndFinancing = blaze(model)
// reducer combineReducers使用
export default revenueAndFinancing.reducers
// action connect组件使用
export const actions = revenueAndFinancing.actions
// effects saga监听副作用函数使用
export const effects = revenueAndFinancing.effects
