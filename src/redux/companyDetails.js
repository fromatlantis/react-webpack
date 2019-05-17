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
        BasicInfoDetial: [], //企业详情信息
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
    },
    actions: [
        {
            //获取企业详情信息
            name: 'queryBasicInfoDetial',
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
            reducer: 'InvestmentAbroadList',
        },
        {
            //POST 获取商标信息列表
            name: 'getTrademarkList',
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
    ],
}
const manager = blaze(model)
// reducer combineReducers使用
export default manager.reducers
// action connect组件使用
export const actions = manager.actions
// effects saga监听副作用函数使用
export const effects = manager.effects
