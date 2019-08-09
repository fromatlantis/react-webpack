import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'statOverview',
    state: {
        companyInfosCount: [],
        financingTrend: [],
        introducedCompanyCount: [],
        knowledgeRight: [],
        intelligenceCompanyCount: [],
        staffDistribute: [],
        industryDistribute: [],
        financialStatus: [],
    },
    actions: [
        {
            name: 'getCompanyInfosCount',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getCompanyInfosCount?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyInfosCountOK')(res.data))
                }
            },
        },
        {
            name: 'getCompanyInfosCountOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    companyInfosCount: action.payload,
                }
            },
        },
        // 融资趋势
        {
            name: 'getFinancingTrend',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getFinancingTrend?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancingTrendOK')(res.data))
                }
            },
        },
        {
            name: 'getFinancingTrendOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financingTrend: action.payload,
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
        // 知识产权分布
        {
            name: 'getKnowledgeRightDistribute',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getKnowledgeRightDistribute?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getKnowledgeRightDistributeOK')(res.data))
                }
            },
        },
        {
            name: 'getKnowledgeRightDistributeOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    knowledgeRight: action.payload,
                }
            },
        },
        //企业资质
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
        // 人才建设
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
        // 行业分布
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
        // 园区营收纳税情况
        {
            name: 'getFinancialStatus',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getFinancialStatus?year=${action.payload.year}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancialStatusOK')(res.data))
                }
            },
        },
        {
            name: 'getFinancialStatusOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    financialStatus: action.payload,
                }
            },
        },
    ],
}
const statOverview = blaze(model)
// reducer combineReducers使用
export default statOverview.reducers
// action connect组件使用
export const actions = statOverview.actions
// effects saga监听副作用函数使用
export const effects = statOverview.effects
