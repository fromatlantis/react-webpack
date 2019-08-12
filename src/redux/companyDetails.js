/**
 * 企服首页（企服管理）/企业详情 redux
 */
import { put, call, select } from 'redux-saga/effects'
import { replace, goBack } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'companyDetails',
    state: {
        BasicInfoDetial: {}, //企业详情信息
        BaseInfoDetial: [], //工商信息
        RecentNews: [], //企业动态（新闻）
        FinancingList: [], //融资信息分页列表
        CoreTeamList: [], //核心人员的列表
        ProductInfoList: [], //主要产品的详情列表
        InvestmentAbroadList: [], //对外投资列表
        TrademarkList: [], //商标信息列表
        PatentList: [], //专利列表
        SoftwareCopyrightList: [], //软件著作权列表
        ProductTrademarkList: [], //产品著作权列表
        WebsiteRecordsList: [], //网站备案列表
        FirmGraph: [], //指定企业投资图谱
        InvestmentEventList: [], //投资事件列表
        changesList: [], //更新消息
        changeRecords: [], //历史记录
        suggestionList: [], //建议
        otherInfoList: [], //其他
        // v2.1新增
        staff: {}, //人员情况
        revenue: {}, //财务情况
    },
    actions: [
        {
            //获取企业详情信息
            name: 'queryBasicInfoDetial',
            reducer: (state, action) => {
                return {
                    ...state,
                    BasicInfoDetial: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/queryBasicInfoDetial?companyId=${action.payload}`,
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('queryBasicInfoDetialSuccess')(res.data))
                }
            },
        },
        {
            name: 'queryBasicInfoDetialSuccess',
            reducer: 'BasicInfoDetial',
        },
        {
            //获取工商信息GET
            name: 'queryBaseInfoDetial',
            reducer: (state, action) => {
                return {
                    ...state,
                    BaseInfoDetial: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/queryBaseInfoDetial?companyId=${action.payload}`,
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('queryBaseInfoDetialSuccess')(res.data))
                }
            },
        },
        {
            name: 'queryBaseInfoDetialSuccess',
            reducer: 'BaseInfoDetial',
        },
        {
            //获取企业动态（新闻） /POST
            name: 'getRecentNews',
            reducer: (state, action) => {
                return {
                    ...state,
                    RecentNews: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getRecentNews`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getRecentNewsSuccess')(res.data))
                }
            },
        },
        {
            name: 'getRecentNewsSuccess',
            reducer: 'RecentNews',
        },
        {
            //获取融资信息分页列表
            name: 'getFinancingList',
            reducer: (state, action) => {
                return {
                    ...state,
                    FinancingList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getFinancingList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getFinancingListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getFinancingListSuccess',
            reducer: 'FinancingList',
        },
        {
            // 获取核心人员的分页列表
            name: 'getCoreTeamList',
            reducer: (state, action) => {
                return {
                    ...state,
                    CoreTeamList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getCoreTeamList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getCoreTeamListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getCoreTeamListSuccess',
            reducer: 'CoreTeamList',
        },
        {
            // POST 获取主要产品的详情分页列表
            name: 'getProductInfoList',
            reducer: (state, action) => {
                return {
                    ...state,
                    ProductInfoList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getProductInfoList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getProductInfoListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getProductInfoListSuccess',
            reducer: 'ProductInfoList',
        },
        {
            //POST 获取对外投资列表
            name: 'getInvestmentAbroadList',
            reducer: (state, action) => {
                return {
                    ...state,
                    InvestmentAbroadList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getInvestmentAbroadList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getInvestmentAbroadListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getInvestmentAbroadListSuccess',
            reducer: (state, action) => {
                return {
                    ...state,
                    InvestmentAbroadList: action.payload.resultList,
                }
            },
        },
        {
            //POST 获取商标信息列表
            name: 'getTrademarkList',
            reducer: (state, action) => {
                return {
                    ...state,
                    TrademarkList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getTrademarkList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getTrademarkListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getTrademarkListSuccess',
            reducer: 'TrademarkList',
        },
        {
            //POST 获取专利列表
            name: 'getPatentList',
            reducer: (state, action) => {
                return {
                    ...state,
                    PatentList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getPatentList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getPatentListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getPatentListSuccess',
            reducer: 'PatentList',
        },
        {
            //POST 获取软件著作权列表
            name: 'getSoftwareCopyrightList',
            reducer: (state, action) => {
                return {
                    ...state,
                    SoftwareCopyrightList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getSoftwareCopyrightList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getSoftwareCopyrightListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getSoftwareCopyrightListSuccess',
            reducer: 'SoftwareCopyrightList',
        },
        {
            //POST 获取产品著作权列表
            name: 'getProductTrademarkList',
            reducer: (state, action) => {
                return {
                    ...state,
                    ProductTrademarkList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getProductTrademarkList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getProductTrademarkListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getProductTrademarkListSuccess',
            reducer: 'ProductTrademarkList',
        },
        {
            //POST 获取网站备案列表
            name: 'getWebsiteRecordsList',
            reducer: (state, action) => {
                return {
                    ...state,
                    WebsiteRecordsList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getWebsiteRecordsList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getWebsiteRecordsListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getWebsiteRecordsListSuccess',
            reducer: 'WebsiteRecordsList',
        },
        {
            //GET 查询指定企业投资图谱
            name: 'getFirmGraph',
            reducer: (state, action) => {
                return {
                    ...state,
                    FirmGraph: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/getFirmGraph?companyId=${action.payload}`,
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getFirmGraphSuccess')(res.data))
                }
            },
        },
        {
            name: 'getFirmGraphSuccess',
            reducer: 'FirmGraph',
        },
        {
            //POST 获取投资事件列表
            name: 'getInvestmentEventList',
            reducer: (state, action) => {
                return {
                    ...state,
                    InvestmentEventList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getInvestmentEventList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getInvestmentEventListSuccess')(res.data))
                }
            },
        },
        {
            name: 'getInvestmentEventListSuccess',
            reducer: 'InvestmentEventList',
        },
        // 更新消息
        {
            name: 'getChangesList',
            reducer: (state, action) => {
                return {
                    ...state,
                    changesList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getChangesList?companyId=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('getChangesListOk')(res.data))
                }
            },
        },
        {
            name: 'getChangesListOk',
            reducer: 'changesList',
        },
        // 历史记录
        {
            name: 'companyChangeRecords',
            reducer: (state, action) => {
                return {
                    ...state,
                    changeRecords: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/companyChangeRecords?companyId=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('companyChangeRecordsOk')(res.data))
                }
            },
        },
        {
            name: 'companyChangeRecordsOk',
            reducer: 'changeRecords',
        },
        // 改进建议
        {
            name: 'getSuggestionList',
            reducer: (state, action) => {
                return {
                    ...state,
                    suggestionList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getSuggestionList?companyId=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('getSuggestionListOk')(res.data))
                }
            },
        },
        {
            name: 'getSuggestionListOk',
            reducer: 'suggestionList',
        },
        // 其他信息
        {
            name: 'getOtherInfoList',
            reducer: (state, action) => {
                return {
                    ...state,
                    otherInfoList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getOtherInfoList?companyId=${action.payload}`,
                })
                if (res.data) {
                    yield put(actions('getOtherInfoListOk')(res.data))
                }
            },
        },
        {
            name: 'getOtherInfoListOk',
            reducer: 'otherInfoList',
        },
        // 人员情况
        {
            name: 'getStaffEdusList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getStaffEduList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getStaffEdusListOK')(res.data))
                }
            },
        },
        {
            name: 'getStaffEdusListOK',
            reducer: 'staff',
        },
        // 财务情况
        {
            name: 'getFinanceInfosList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getFinanceInfosList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinanceInfosListOK')(res.data))
                }
            },
        },
        {
            name: 'getFinanceInfosListOK',
            reducer: 'revenue',
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
