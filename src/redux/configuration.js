import { put, call } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'configuration',
    state: {
        setDataList: {},
        repairsTypeList: [],
        repairsAddressList: [],
        userList: [],
        userTotal: null,
        addressRelateList: [],
        repairTypeRelateList: [],
    },
    actions: [
        // 获取时限设置/工时费设置数据
        {
            name: 'getSetInfo',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: '/property/getSetInfo',
                })
                if (res.data) {
                    yield put(actions('getSetInfoSuccess')(res.data))
                }
            },
        },
        {
            name: 'getSetInfoSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    setDataList: action.payload,
                }
            },
        },
        // 设置派工时限和维修签到时限
        {
            name: 'setTimeLimit',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/setTimeLimit',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('成功')
                }
            },
        },
        // 报修类型管理-获取报修类型树
        {
            name: 'getRepairsType',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/getRepairsType?level=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('getRepairsTypeSuccess')(res.data))
                }
            },
        },
        {
            name: 'getRepairsTypeSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    repairsTypeList: action.payload,
                }
            },
        },
        // 报修类型管理-添加节点
        {
            name: 'setRepairsTypeNode',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/setRepairsTypeNode',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                }
            },
        },
        // 报修类型管理-修改节点
        {
            name: 'updateRepairsTypeNode',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/updateRepairsTypeNode',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                }
            },
        },
        // 报修类型管理-删除节点
        {
            name: 'deleteRepairsTypeNode',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/deleteRepairsTypeNode?id=${action.payload}`,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                }
            },
        },
        // 报修地址配置-获取报修地址数
        {
            name: 'getAddressType',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: '/property/getAddressType',
                })
                if (res.data) {
                    yield put(actions('getAddressTypeSuccess')(res.data))
                }
            },
        },
        {
            name: 'getAddressTypeSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    repairsAddressList: action.payload,
                }
            },
        },
        // 报修地址管理-添加节点
        {
            name: 'seAddressTypeNode',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/seAddressTypeNode',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                }
            },
        },
        // 报修地址管理-修改节点
        {
            name: 'updateAddressTypeNode',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/updateAddressTypeNode',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                }
            },
        },
        // 报修地址管理-删除节点
        {
            name: 'deleteAddressTypeNode',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/deleteAddressTypeNode?id=${action.payload}`,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                }
            },
        },
        // 用户配置-获取列表
        {
            name: 'getUserList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/getUserList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getUserListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getUserListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    userList: action.payload.list,
                    userTotal: action.payload.totalCount,
                }
            },
        },
        // 用户设置-获取派工人员所有关联(楼宇)
        {
            name: 'getAddressRelateList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/getAddressRelateList?userId=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('getAddressRelateListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getAddressRelateListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    addressRelateList: action.payload,
                }
            },
        },
        // 用户设置-派工人员删除关联(楼宇)
        {
            name: 'deleteAddressRelate',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/deleteAddressRelate?id=${action.payload}`,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                }
            },
        },
        // 用户设置-派工人员添加（楼宇）
        {
            name: 'addAddressRelate',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/addAddressRelate',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('关联成功')
                }
            },
        },
        // 用户设置-维修人员添加关联（报修类型）
        {
            name: 'addRepairRelate',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/addRepairRelate',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('关联成功')
                }
            },
        },
        // 用户设置-维修人员删除关联（报修类型）
        {
            name: 'deleteRepairRelate',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/deleteRepairRelate?id=${action.payload}`,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                }
            },
        },
        // 用户设置-获取维修人员所有关联（报修类型）
        {
            name: 'getRepairRelateList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/getRepairRelateList?userId=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('getRepairRelateListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getRepairRelateListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    repairTypeRelateList: action.payload,
                }
            },
        },
    ],
}
const manager = blaze(model)
// reducer combineReducers使用
export default manager.reducers
// action connect组件使用
export const actions = manager.actions
// effects saga监听副作用函数使用
export const effects = manager.effects
