/**
 * 中介服务-企业需求
 */
import { put, call, select } from 'redux-saga/effects'
import { replace, goBack } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'agencyRequire',
    state: {
        demandList: [],
        ServiceTypeList: [],
        supperList: [],
        supperListTotal: null,
        editTypeList: [],
    },
    actions: [
        //获取需求列表
        {
            name: 'getDemandList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getDemandList',
                    // url: '192.168.1.113/24:8843/getDemandList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    if (action.payload.supplier) {
                        yield put(
                            actions('getSupplierList')({
                                id:
                                    res.data.resultList[0].recommendSupplier === ''
                                        ? 'undefine'
                                        : res.data.resultList[0].recommendSupplier,
                                pageNo: 1,
                                pageSize: 10,
                            }),
                        )
                    }
                    if (action.payload.handleList) {
                        yield put(
                            actions('getSupplierList')({
                                pageNo: 1,
                                pageSize: 10,
                                typeId: res.data.resultList[0].typeId,
                            }),
                        )
                    }
                    yield put(actions('getDemandListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getDemandListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    demandList: action.payload.resultList,
                    demandTotal: action.payload.totalCount,
                }
            },
        },
        // 供应商类型的获取
        {
            name: 'getServiceTypeList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getServiceTypeList',
                })
                if (res.data) {
                    yield put(actions('getServiceTypeListSucc')(res.data))
                }
            },
        },
        {
            name: 'getServiceTypeListSucc',
            reducer: (state, action) => {
                return {
                    ...state,
                    ServiceTypeList: action.payload,
                }
            },
        },
        // (加)供应商类型的获取
        {
            name: 'editServiceTypeList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getServiceTypeList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('editServiceTypeListSucc')(res.data))
                }
            },
        },
        {
            name: 'editServiceTypeListSucc',
            reducer: (state, action) => {
                return {
                    ...state,
                    editTypeList: action.payload,
                }
            },
        },
        // 推荐供应商接口
        {
            name: 'getRecommendSupplierList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getRecommendSupplierList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    message.success('推荐成功')
                }
            },
        },
        // 供应商列表
        {
            name: 'getSupplierList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getSupplierList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    res.data.action = action.payload
                    yield put(actions('getSupplierListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getSupplierListSuccess',
            reducer: (state, action) => {
                console.log('......', action.payload)
                let newdemandList = state.demandList
                newdemandList[0].typeId = action.payload.key
                return {
                    ...state,
                    supperList: action.payload.resultList,
                    supperListTotal: action.payload.totalCount,
                    demandList: newdemandList,
                }
            },
        },
        // 新增供应商
        {
            name: 'addSupplier',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/addSupplier',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if ((res.code = 1000)) {
                    message.success('添加成功')
                    yield put(goBack())
                }
            },
        },
        //新增供应商类型
        {
            name: 'addServiceType',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/addServiceType',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getServiceTypeList')())
                    message.success('添加成功')
                }
            },
        },
        //删除供应商类型
        {
            name: 'deleteServiceType',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/deleteServiceType',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getServiceTypeList')())
                    message.success('删除成功')
                }
            },
        },
        // 编辑供应商类型
        {
            name: 'updateServiceType',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/updateServiceType',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getServiceTypeList')())
                    message.success('修改成功')
                }
            },
        },
        // 编辑供应商列表
        {
            name: 'updateSupplier',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/updateSupplier',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(goBack())
                    message.success('修改成功')
                }
            },
        },
        // 下架
        {
            name: 'undercarriageSupplier',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/undercarriageSupplier',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getSupplierList')(action.payload.parm))
                }
            },
        },
        // 推荐供应商列表
        {
            name: 'recommendSupplier',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/recommendSupplier',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    let temp = action.payload.parm
                    yield put(actions('getSupplierList')(temp))
                    message.success('推荐成功')
                }
            },
        },
        //完成订单
        {
            name: 'finishOrder',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/finishOrder',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(goBack())
                    message.success('成功')
                }
            },
        },
        {
            name: 'updateType',
            reducer: (state, action) => {
                let newdemandList = state.demandList
                newdemandList[0].typeId = action.payload.key
                return {
                    ...state,
                    demandList: newdemandList,
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
