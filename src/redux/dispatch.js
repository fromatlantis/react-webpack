import { put, call, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'dispatch',
    state: {
        workorder: {},
        workorderParams: {
            pageNo: 1,
            pageSize: 10,
        },
        myDispatch: {},
        dispatchParams: {
            pageNo: 1,
            pageSize: 10,
        },
        dispatchors: [], //派工人员列表
        repairs: [], //维修人员列表
        companyDispatchorList: [],
    },
    actions: [
        {
            name: 'getWorkorderList',
            reducer: (state, action) => {
                return {
                    ...state,
                    workorderParams: { ...state.workorderParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.dispatch.workorderParams)
                //参数处理
                let formData = new FormData()
                if (params.applyType) {
                    if (params.applyType.length === 1) {
                        formData.append('category', params.applyType[0])
                    } else if (params.applyType.length === 2) {
                        formData.append('category', params.applyType[0])
                        formData.append('classify', params.applyType[1])
                    } else if (params.applyType.length === 3) {
                        formData.append('category', params.applyType[0])
                        formData.append('classify', params.applyType[1])
                        formData.append('fault', params.applyType[2])
                    }
                }
                if (params.status) {
                    formData.append('status', params.status)
                }
                if (params.applicationTime) {
                    formData.append('beginDate', params.applicationTime[0].format('YYYY-MM-DD'))
                    formData.append('endDate', params.applicationTime[1].format('YYYY-MM-DD'))
                }
                formData.append('isHasten', params.isHasten)
                formData.append('pageNo', params.pageNo)
                formData.append('pageSize', params.pageSize)
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/workorderList',
                    data: formData,
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
            reducer: (state, action) => {
                return {
                    ...state,
                    dispatchParams: { ...state.dispatchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.dispatch.dispatchParams)
                //参数处理
                let formData = new FormData()
                if (params.applyType) {
                    if (params.applyType.length === 1) {
                        formData.append('category', params.applyType[0])
                    } else if (params.applyType.length === 2) {
                        formData.append('category', params.applyType[0])
                        formData.append('classify', params.applyType[1])
                    } else if (params.applyType.length === 3) {
                        formData.append('category', params.applyType[0])
                        formData.append('classify', params.applyType[1])
                        formData.append('fault', params.applyType[2])
                    }
                }
                if (params.repairStatus) {
                    formData.append('repairStatus', params.repairStatus)
                }
                if (params.maintainerId) {
                    formData.append('maintainerId', params.maintainerId)
                }
                formData.append('pageNo', params.pageNo)
                formData.append('pageSize', params.pageSize)
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/myDispatchList',
                    data: formData,
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
        // 获取派工人员列表
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
        // 获取公司下所有派工人员列表
        {
            name: 'getCompanyDispatchorList',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getCompanyDispatchorList',
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyDispatchorListOk')(res.data))
                }
            },
        },
        {
            name: 'getCompanyDispatchorListOk',
            reducer: 'companyDispatchorList',
        },
        // 获取维修人员列表
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
        // 新建派工
        {
            name: 'newDispatch',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/newDispatch',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('新建派工成功')
                }
            },
        },
        // 派工
        {
            name: 'dispatching',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
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
                    type: 'post',
                    url: '/property/orderTransfer',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('转办成功')
                }
            },
        },
        // 催办
        {
            name: 'hastening',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/hastening',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getWorkorderList')())
                    message.success('催办成功')
                }
            },
        },
        // 撤回
        {
            name: 'dispatchRecall',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/dispatchRecall',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('myDispatchList')())
                    message.success('撤回成功')
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
