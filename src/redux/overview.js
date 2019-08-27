import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'overview',
    state: {
        amountStatistic: [],
        typeStatistic: [],
        upStatusStatistic: [],
    },
    actions: [
        // 费用合计，数量统计
        {
            name: 'chargeAmountStatistic',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/charge/chargeAmountStatistic?range=${action.payload.range}`,
                })
                if (res.code === 1000) {
                    yield put(actions('amountStatisticOK')(res.data))
                }
            },
        },
        {
            name: 'amountStatisticOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    amountStatistic: action.payload,
                }
            },
        },
        // 费用类型统计-柱状图
        {
            name: 'chargeTypeStatistic',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/charge/chargeTypeStatistic?range=${action.payload.range}`,
                })
                if (res.code === 1000) {
                    yield put(actions('chargeTypeStatisticOK')(res.data))
                }
            },
        },
        {
            name: 'chargeTypeStatisticOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    typeStatistic: action.payload,
                }
            },
        },
        // 结清情况统计
        {
            name: 'squareUpStatusStatistic',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/charge/squareUpStatusStatistic?range=${action.payload.range}`,
                })
                if (res.code === 1000) {
                    yield put(actions('squareUpStatusStatisticOK')(res.data))
                }
            },
        },
        {
            name: 'squareUpStatusStatisticOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    upStatusStatistic: action.payload,
                }
            },
        },
    ],
}
const overview = blaze(model)
// reducer combineReducers使用
export default overview.reducers
// action connect组件使用
export const actions = overview.actions
// effects saga监听副作用函数使用
export const effects = overview.effects
