import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'knowledgeRight',
    state: {
        knowledgeRightList: [],
        knowledgeRightCountList: [],
        trademarkDetailList: [],
        patentDetailList: [],
        softwareCopyrightDetailList: [],
        productTrademarkDetailList: [],
        websiteDetailList: [],
    },
    actions: [
        // 知识产权统计-饼图
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
                    knowledgeRightList: action.payload,
                }
            },
        },
        // 知识产权统计-数量列表
        {
            name: 'getKnowledgeRightCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getKnowledgeRightCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getKnowledgeRightCountListOK')(res.data))
                }
            },
        },
        {
            name: 'getKnowledgeRightCountListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    knowledgeRightCountList: action.payload,
                }
            },
        },
        // 知识产权统计-数量列表-导出
        {
            name: 'exportKnowledgeRightCountList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportKnowledgeRightCountList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 知识产权统计-详情列表-商标
        {
            name: 'getTrademarkDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getTrademarkDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getTrademarkDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getTrademarkDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    trademarkDetailList: action.payload,
                }
            },
        },
        // 知识产权统计-详情列表-商标-导出
        {
            name: 'exportTrademarkDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportTrademarkDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 知识产权统计-详情列表-专利
        {
            name: 'getPatentDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getPatentDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getPatentDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getPatentDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    patentDetailList: action.payload,
                }
            },
        },
        // 知识产权统计-详情列表-专利-导出
        {
            name: 'exportPatentDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportPatentDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 知识产权统计-详情列表-软件著作权
        {
            name: 'getSoftwareCopyrightDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getSoftwareCopyrightDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getSoftwareCopyrightDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getSoftwareCopyrightDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    softwareCopyrightDetailList: action.payload,
                }
            },
        },
        // 知识产权统计-详情列表-软件著作权-导出
        {
            name: 'exportSoftwareCopyrightDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportSoftwareCopyrightDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 知识产权统计-详情列表-作品著作权
        {
            name: 'getProductTrademarkDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getProductTrademarkDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getProductTrademarkDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getProductTrademarkDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    productTrademarkDetailList: action.payload,
                }
            },
        },
        // 知识产权统计-详情列表-作品著作权-导出
        {
            name: 'exportProductTrademarkDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportProductTrademarkDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    window.location.href = res.data
                }
            },
        },
        // 知识产权统计-详情列表-网站域名
        {
            name: 'getWebsiteDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getWebsiteDetailList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getWebsiteDetailListOK')(res.data))
                }
            },
        },
        {
            name: 'getWebsiteDetailListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    websiteDetailList: action.payload,
                }
            },
        },
        // 知识产权统计-详情列表-网站域名-导出
        {
            name: 'exportWebsiteDetailList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/exportWebsiteDetailList',
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
const knowledgeRight = blaze(model)
// reducer combineReducers使用
export default knowledgeRight.reducers
// action connect组件使用
export const actions = knowledgeRight.actions
// effects saga监听副作用函数使用
export const effects = knowledgeRight.effects
