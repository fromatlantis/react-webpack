import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'meterAnalysis',
    state: {
        latestConsumption: [], //能耗趋势
        consumption: [], //用量分布
        topList: [], //用量排名
        taskStatus: {}, //任务情况
        latestTask: [], //抄表动态
        warnings: [], //用量预警
    },
    actions: [
        {
            name: 'getLatestConsumption',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getLatestConsumption',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getLatestConsumptionOK')(res.data))
                }
            },
        },
        {
            name: 'getLatestConsumptionOK',
            reducer: 'latestConsumption',
        },
        {
            name: 'getConsumptionDistribution',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getConsumptionDistribution',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getConsumptionDistributionOK')(res.data))
                }
            },
        },
        {
            name: 'getConsumptionDistributionOK',
            reducer: 'consumption',
        },
        {
            name: 'getConsumptionTopList',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getConsumptionTopList',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getConsumptionTopListOK')(res.data))
                }
            },
        },
        {
            name: 'getConsumptionTopListOK',
            reducer: 'topList',
        },
        {
            name: 'getTaskStatus',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getTaskStatus',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getTaskStatusOK')(res.data))
                }
            },
        },
        {
            name: 'getTaskStatusOK',
            reducer: 'taskStatus',
        },
        {
            name: 'getLatestTask',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getLatestTask',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getLatestTaskOK')(res.data))
                }
            },
        },
        {
            name: 'getLatestTaskOK',
            reducer: 'latestTask',
        },
        {
            name: 'consumptionWarning',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/consumptionWarning',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('consumptionWarningOK')(res.data))
                }
            },
        },
        {
            name: 'consumptionWarningOK',
            reducer: 'warnings',
        },
    ],
}
const meterAnalysis = blaze(model)
// reducer combineReducers使用
export default meterAnalysis.reducers
// action connect组件使用
export const actions = meterAnalysis.actions
// effects saga监听副作用函数使用
export const effects = meterAnalysis.effects
