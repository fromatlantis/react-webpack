import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'parkStaff',
    state: {
        industryDistribute: [],
        industryCountList: [],
        industryDetailList: [],
        staffDistribute: [],
        staffCountList: [],
        staffDetailList: [],
    },
    actions: [
        // 企业行业统计-饼图
        {
            name: 'getIndustryDistribute',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getIndustryDistribute?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getIndustryDistributeOK')(res.data))
                }
            },
        },
        {
            name: 'getIndustryDistributeOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    industryDistribute: action.payload,
                }
            },
        },
        // 企业行业统计-数量列表
        {
            name: 'getIndustryCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getIndustryCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getIndustryCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getIndustryCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    industryCountList: action.payload,
                }
            },
        },
        // 企业行业统计-详情列表
        {
            name: 'getIndustryDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getIndustryDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getIndustryDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getIndustryDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    industryDetailList: action.payload,
                }
            },
        },
        // 企业行业统计-数量列表-导出
        {
            name: 'exportIndustryCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportIndustryCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 企业行业统计-详情列表-导出
        {
            name: 'exportIndustryDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportIndustryDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 园区人员统计-饼图
        {
            name: 'getStaffDistribute',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getStaffDistribute?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getStaffDistributeOK')(res.data))
                }
            },
        },
        {
            name: 'getStaffDistributeOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    staffDistribute: action.payload,
                }
            },
        },
        // 园区人员统计-数量列表
        {
            name: 'getStaffCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getStaffCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getStaffCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getStaffCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    staffCountList: action.payload,
                }
            },
        },
        // 园区人员统计-详情列表
        {
            name: 'getStaffDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getStaffDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getStaffDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getStaffDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    staffDetailList: action.payload,
                }
            },
        },
        // 园区人员统计-数量列表-导出
        {
            name: 'exportStaffCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportStaffCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 园区人员统计-详情列表-导出
        {
            name: 'exportStaffDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportStaffDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
    ],
}
const parkStaff = blaze(model)
// reducer combineReducers使用
export default parkStaff.reducers
// action connect组件使用
export const actions = parkStaff.actions
// effects saga监听副作用函数使用
export const effects = parkStaff.effects
