/**
 * 物料管理 redux
 */
import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message, notification } from 'antd'

const model = {
    namespace: 'materialManager',
    state: {
        MaterialList: [], //物料列表
        MaterialListTotalCount: {}, //物料列表总条数
        MaterialDetail: {}, //物料详情信息
        materialStockRecordsList: [], //物料出入库记录表列表
        materialStockRecordsTotalCount: {}, //物料出入库记录表列表总条数
        MaterialApplyList: [], //物料审批列表
        MaterialApplyListTotalCount: {}, //物料审批列表总条数
        MaterialApplyDetail: {}, //物料审批详情

        //物料列表-分页
        searchParamsMaterialList: {
            pageNo: 1,
            pageSize: 10,
        },
        //物料出入库记录表列表-分页
        searchParamsmaterialStockRecords: {
            pageNo: 1,
            pageSize: 10,
        },
        //物料审批列表-分页
        searchParamsMaterialApplyList: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            //POST-1 获取物料列表
            name: 'getMaterialList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParamsMaterialList: {
                        ...state.searchParamsMaterialList,
                        ...action.payload,
                    },
                }
            },
            *effect(action) {
                const params = yield select(
                    rootState => rootState.materialManager.searchParamsMaterialList,
                )
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/getMaterialList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.data) {
                    yield put(actions('getMaterialListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getMaterialListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    MaterialList: action.payload.resultList,
                    MaterialListTotalCount: action.payload.totalCount,
                }
            },
        },
        {
            //get-2 获取物料详情信息
            name: 'getMaterialDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/getMaterialDetail?id=${action.payload}`,
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getMaterialDetailSuccess')(res.data))
                }
            },
        },
        {
            name: 'getMaterialDetailSuccess',
            reducer: 'MaterialDetail',
        },
        {
            //POST-3 新增物料
            name: 'addMaterial',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/addMaterial`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getMaterialList')())
                    message.success('新建物料成功')
                }
            },
        },
        {
            //POST-4 物料修改
            name: 'updateMaterial',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/updateMaterial`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('updateMaterialSuccess')(res.data))
                }
            },
        },
        {
            //POST-5 物料出入库
            name: 'materialStock',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/materialStock`,
                    // contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('materialStockSuccess')(res.data))
                    // yield put(actions('getMaterialList')())
                }
            },
        },
        {
            //POST-6 物料出入库记录列表
            name: 'materialStockRecords',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParamsmaterialStockRecords: {
                        ...state.searchParamsmaterialStockRecords,
                        ...action.payload,
                    },
                }
            },
            *effect(action) {
                const params = yield select(
                    rootState => rootState.materialManager.searchParamsmaterialStockRecords,
                )
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/materialStockRecords`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.data) {
                    yield put(actions('materialStockRecordsSuccess')(res.data))
                }
            },
        },
        {
            name: 'materialStockRecordsSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    materialStockRecordsList: action.payload.resultList,
                    materialStockRecordsTotalCount: action.payload.totalCount,
                }
            },
        },
        {
            //POST-7 物料审批列表
            name: 'getMaterialApplyList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParamsMaterialApplyList: {
                        ...state.searchParamsMaterialApplyList,
                        ...action.payload,
                    },
                }
            },
            *effect(action) {
                const params = yield select(
                    rootState => rootState.materialManager.searchParamsMaterialApplyList,
                )
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/getMaterialApplyList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.data) {
                    yield put(actions('getMaterialApplyListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getMaterialApplyListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    MaterialApplyList: action.payload.resultList,
                    MaterialApplyListTotalCount: action.payload.totalCount,
                }
            },
        },
        {
            //get-8 物料审批详情
            name: 'getMaterialApplyDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/property/getMaterialApplyDetail?id=${action.payload}`,
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getMaterialApplyDetailSuccess')(res.data))
                }
            },
        },
        {
            name: 'getMaterialApplyDetailSuccess',
            reducer: 'MaterialApplyDetail',
        },
        {
            //POST-9 物料申请提交
            name: 'addMaterialApply',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/addMaterialApply`,
                    // contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('申请成功')
                    yield put(push('/material/Approval'))
                }
            },
        },
        {
            //POST-10 物料申请审批
            name: 'approvalMaterialApply',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/approvalMaterialApply`,
                    // contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    message.success('提交成功')
                    yield put(push('/material/apply'))
                }
            },
        },
        {
            //  post-上传
            name: 'bulkImportMaterials',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/bulkImportMaterials`,
                    contentType: 'multipart/form-data',
                    data: {
                        enterprises: JSON.stringify(action.payload),
                    },
                })
                if (res.code === 1000) {
                    notification.open({
                        message: '批量导入成功',
                        description: '批量导入成功',
                        onClick: () => {
                            console.log('Notification Clicked!')
                        },
                    })
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
