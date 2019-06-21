import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'meter',
    state: {
        meter: {},
        meterDetail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getMeterList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.meter.searchParams)
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/getMeterList',
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getMeterListOK')(res.data))
                }
            },
        },
        {
            name: 'getMeterListOK',
            reducer: 'meter',
        },
        {
            name: 'getMeterDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getMeterDetail',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getMeterDetailOK')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    meterDetail: {},
                }
            },
        },
        {
            name: 'getMeterDetailOK',
            reducer: 'meterDetail',
        },
        {
            name: 'addMeter',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/addMeter',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                    yield put(actions('getMeterList')())
                }
            },
        },
        {
            name: 'updateMeter',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/updateMeter',
                    type: 'post',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                    yield put(actions('getMeterList')())
                }
            },
        },
        {
            name: 'deleteMeter',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/deleteMeter',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                    yield put(actions('getMeterList')())
                }
            },
        },
        {
            name: 'leadInMeters',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: '/property/leadInMeters',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('导入成功')
                    yield put(actions('getMeterList')())
                }
            },
        },
        {
            name: 'meterSet',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: '/property/meterSet',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('设置成功')
                    yield put(actions('getMeterList')())
                }
            },
        },
    ],
}
const meter = blaze(model)
// reducer combineReducers使用
export default meter.reducers
// action connect组件使用
export const actions = meter.actions
// effects saga监听副作用函数使用
export const effects = meter.effects
