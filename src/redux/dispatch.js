import { put, call } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'dispatch',
    state: {
        workorder: {},
        myDispatch: {},
        feedback: {},
        dispatchors: [], //派工人员列表
        repairs: [], //维修人员列表
    },
    actions: [
        {
            name: 'getWorkorderList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/workorderList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getWorkorderListOk')(res.data))
                }
            },
        },
        {
            name: 'getWorkorderListOk',
            reducer: 'workorder',
        },
        {
            name: 'getMyDispatchList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/myDispatchList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getMyDispatchListOk')(res.data))
                }
            },
        },
        {
            name: 'getMyDispatchListOk',
            reducer: 'myDispatch',
        },
        {
            name: 'getFeedbackList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/getFeedbackList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFeedbackListOk')(res.data))
                }
            },
        },
        {
            name: 'getFeedbackListOk',
            reducer: 'feedback',
        },
        // 获取本公司内所有派工人员列表
        {
            name: 'getDispatchor',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getDispatchor',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getDispatchorOk')(res.data))
                }
            },
        },
        {
            name: 'getDispatchorOk',
            reducer: 'dispatchors',
        },
        // 获取本公司内所有维修人员列表
        {
            name: 'getRepairs',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getRepairs',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getRepairsOk')(res.data))
                }
            },
        },
        {
            name: 'getRepairsOk',
            reducer: 'repairs',
        },
        // 派工
        {
            name: 'dispatching',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/dispatching',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('派工成功')
                }
            },
        },
        // 转办
        {
            name: 'orderTransfer',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/orderTransfer',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('转办成功')
                }
            },
        },
    ],
}
const dispatch = blaze(model)
// reducer combineReducers使用
export default dispatch.reducers
// action connect组件使用
export const actions = dispatch.actions
// effects saga监听副作用函数使用
export const effects = dispatch.effects
