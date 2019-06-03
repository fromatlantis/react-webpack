import { put, call } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
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
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/repairList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
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
    ],
}
const repair = blaze(model)
// reducer combineReducers使用
export default repair.reducers
// action connect组件使用
export const actions = repair.actions
// effects saga监听副作用函数使用
export const effects = repair.effects
