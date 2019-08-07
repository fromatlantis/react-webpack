import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'qualification',
    state: {
        intelligenceCompanyCount: [],
        qualificationCountList: [],
        qualificationDetailList: [],
        introducedCompanyCount: [],
        companyCountList: [],
        companyDetailList: [],
    },
    actions: [
        //企业资质柱状图
        {
            name: 'getIntelligenceCompanyCount',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getIntelligenceCompanyCount?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getIntelligenceCompanyCountOK')(res.data))
                }
            },
        },
        {
            name: 'getIntelligenceCompanyCountOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    intelligenceCompanyCount: action.payload,
                }
            },
        },
        //企业资质统计-数量列表
        {
            name: 'getCompanyQualificationCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getCompanyQualificationCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyQualificationCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getCompanyQualificationCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    qualificationCountList: action.payload,
                }
            },
        },
        //企业资质统计-详情列表
        {
            name: 'getCompanyQualificationDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getCompanyQualificationDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyQualificationDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getCompanyQualificationDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    qualificationDetailList: action.payload,
                }
            },
        },
        //企业资质统计-数量列表-导出
        {
            name: 'exportCompanyQualificationCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportCompanyQualificationCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        //企业资质统计-详情列表-导出
        {
            name: 'exportCompanyQualificationDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportCompanyQualificationDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        //企业数量统计-柱状图
        {
            name: 'getIntroducedCompanyCount',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getIntroducedCompanyCount?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getIntroducedCompanyCountOK')(res.data))
                }
            },
        },
        {
            name: 'getIntroducedCompanyCountOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    introducedCompanyCount: action.payload,
                }
            },
        },
        //企业数量统计-数量列表
        {
            name: 'getCompanyCountCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getCompanyCountCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyCountCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getCompanyCountCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    companyCountList: action.payload,
                }
            },
        },
        //企业数量统计-详情列表
        {
            name: 'getCompanyCountDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getCompanyCountDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyCountDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getCompanyCountDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    companyDetailList: action.payload,
                }
            },
        },
        //企业数量统计-数量列表-导出
        {
            name: 'exportCompanyCountCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportCompanyCountCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        //企业数量统计-详情列表-导出
        {
            name: 'exportCompanyCountDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportCompanyCountDetailList',
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
const qualification = blaze(model)
// reducer combineReducers使用
export default qualification.reducers
// action connect组件使用
export const actions = qualification.actions
// effects saga监听副作用函数使用
export const effects = qualification.effects
