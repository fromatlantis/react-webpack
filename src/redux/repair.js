import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'repair',
    state: {
        repair: {},
        addressType: [],
        repairsType: [],
        materials: [],
        repairDetail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'applyRepair',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/applyRepair',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('报修成功')
                }
            },
        },
        {
            name: 'getRepairList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.repair.searchParams)
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
                if (params.applicationTime) {
                    formData.append('beginDate', params.applicationTime[0].format('YYYY-MM-DD'))
                    formData.append('endDate', params.applicationTime[1].format('YYYY-MM-DD'))
                }
                formData.append('pageNo', params.pageNo)
                formData.append('pageSize', params.pageSize)
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/repairList',
                    data: formData,
                })
                if (res.code === 1000) {
                    yield put(actions('getRepairListOk')(res.data))
                }
            },
        },
        {
            name: 'getRepairListOk',
            reducer: 'repair',
        },
        // 获取地址
        {
            name: 'getAddressType',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getAddressType',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getAddressTypeOk')(res.data))
                }
            },
        },
        {
            name: 'getAddressTypeOk',
            reducer: 'addressType',
        },
        // 获取地址
        {
            name: 'getRepairsType',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getRepairsType',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getRepairsTypeOk')(res.data))
                }
            },
        },
        {
            name: 'getRepairsTypeOk',
            reducer: 'repairsType',
        },
        {
            name: 'addMaterial',
            reducer: (state, action) => {
                return {
                    ...state,
                    materials: [...state.materials, ...[action.payload]],
                }
            },
        },
        {
            name: 'removeMaterial',
            reducer: (state, action) => {
                return {
                    ...state,
                    materials: state.materials.filter((_, index) => index !== action.payload),
                }
            },
        },
        {
            name: 'getRepairDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/repairDetail',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getRepairDetailOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    repairDetail: {},
                }
            },
        },
        {
            name: 'getRepairDetailOk',
            reducer: 'repairDetail',
        },
        // 对于“已反馈”的报修单，进行确认操作
        {
            name: 'repairOrderConfirm',
            *effect(action) {
                const res = yield call(request, {
                    // type: 'post',
                    url: '/property/repairOrderConfirm',
                    // contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('确认成功')
                    yield put(push('/repair/record'))
                }
            },
        },
        // 评价
        {
            name: 'repairEvaluate',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/repairEvaluate',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('评价成功')
                    yield put(push('/repair/record'))
                }
            },
        },
    ],
}
const repair = blaze(model)
// reducer combineReducers使用
export default repair.reducers
// action connect组件使用
export const actions = repair.actions
// effects saga监听副作用函数使用
export const effects = repair.effects
