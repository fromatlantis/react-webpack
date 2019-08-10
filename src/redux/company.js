import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message, notification } from 'antd'
import qs from 'qs'
import { actions as companyDetailsActions } from './companyDetails'
import { actions as requireActions } from './agencyRequire'
import { APPID } from '../config'
const model = {
    namespace: 'company',
    state: {
        company: {},
        directorList: [], //获取服务人员列表
        companyList: [], //用户所在园区下公司列表
        importList: [], //导入
        archivesDetail: {}, //档案详情
        archives: {}, //档案列表
        principal: [], //企服、招商负责人
        serviceModel: [],
    },
    actions: [
        {
            name: 'searchCompany',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/enterprise/searchCompany`,
                    data: {
                        ...action.payload,
                        appIdentity: APPID,
                    },
                })
                if (res.code === 1000) {
                    yield put(actions('searchCompanyOk')(res.data))
                }
            },
        },
        {
            name: 'searchCompanyOk',
            reducer: 'company',
        },
        {
            name: 'getDirectorList',
            *effect(action) {
                console.log(action.payload)
                const res = yield call(request, {
                    url: `/enterprise/getServantList?companyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getDirectorListOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    directorList: [],
                }
            },
        },
        {
            name: 'getDirectorListOk',
            reducer: 'directorList',
        },
        {
            name: 'getCompanyList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getCompanyList`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyListOk')(res.data))
                }
            },
        },
        {
            name: 'getCompanyListOk',
            reducer: 'companyList',
        },
        // 指派相关
        {
            // 获取指定权限的用户列表
            name: 'getPrincipalList',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getPrincipalList`,
                    data: { ...action.payload, appIdendity: APPID },
                })
                if (res.code === 1000) {
                    yield put(actions('getPrincipalListOK')(res.data))
                }
            },
        },
        {
            name: 'getPrincipalListOK',
            reducer: 'principal',
        },
        {
            // 获取服务模块列表
            name: 'getServiceModel',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getServiceModel`,
                })
                if (res.code === 1000) {
                    yield put(actions('getServiceModelOK')(res.data))
                }
            },
        },
        {
            name: 'getServiceModelOK',
            reducer: 'serviceModel',
        },
        {
            name: 'assignServiceStaff',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/assignServiceStaff`,
                    contentType: 'multipart/form-data',
                    data: { ...action.payload, appIdentity: APPID },
                })
                if (res.code === 1000) {
                    message.success('指派成功')
                }
            },
        },
        {
            name: 'batchImport',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/batchImport`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('batchImportOk')(res.data))
                }
            },
        },
        {
            name: 'batchImportOk',
            reducer: 'importList',
        },
        {
            name: 'batchLoad',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/batchLoad`,
                    contentType: 'multipart/form-data',
                    data: {
                        enterprises: JSON.stringify(action.payload),
                        appIdentity: APPID,
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
        // 获取档案详情
        {
            name: 'getArchivesDetail',
            *effect(action) {
                console.log(action.payload)
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getArchivesDetail`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                // 复用企业详情
                if (res.code === 1000) {
                    const {
                        basicInfo,
                        baseInfo,
                        firmGraph,
                        financingHis,
                        coreTeam,
                        productInfo,
                        companyNews,
                        investmentEvent,
                        investmentsAbroad,
                        changeRecords,
                        trademark,
                        patent,
                        softwareCopyright,
                        productTrademark,
                        websiteRecords,
                        changesApprove,
                        demand,
                        suggestion,
                        otherInfo,
                    } = res.data.snapshot
                    //console.log(investmentsAbroad)
                    yield put(companyDetailsActions('queryBasicInfoDetialSuccess')(basicInfo))
                    yield put(companyDetailsActions('queryBaseInfoDetialSuccess')(baseInfo))
                    yield put(
                        companyDetailsActions('getRecentNewsSuccess')({
                            resultList: companyNews,
                        }),
                    )
                    yield put(
                        companyDetailsActions('getInvestmentEventListSuccess')(investmentEvent),
                    )
                    yield put(companyDetailsActions('getFinancingListSuccess')(financingHis))
                    yield put(companyDetailsActions('getCoreTeamListSuccess')(coreTeam))
                    yield put(companyDetailsActions('getProductInfoListSuccess')(productInfo))
                    yield put(
                        companyDetailsActions('getInvestmentAbroadListSuccess')({
                            resultList: investmentsAbroad,
                        }),
                    )
                    yield put(
                        companyDetailsActions('companyChangeRecordsOk')({
                            items: changeRecords,
                        }),
                    )
                    yield put(companyDetailsActions('getTrademarkListSuccess')(trademark))
                    yield put(companyDetailsActions('getPatentListSuccess')(patent))
                    yield put(
                        companyDetailsActions('getSoftwareCopyrightListSuccess')(softwareCopyright),
                    )
                    yield put(
                        companyDetailsActions('getProductTrademarkListSuccess')(productTrademark),
                    )
                    yield put(companyDetailsActions('getWebsiteRecordsListSuccess')(websiteRecords))
                    yield put(
                        companyDetailsActions('getFirmGraphSuccess')(JSON.parse(firmGraph.graph)),
                    )
                    yield put(companyDetailsActions('getChangesListOk')(changesApprove))
                    yield put(companyDetailsActions('getSuggestionListOk')(suggestion))
                    yield put(companyDetailsActions('getOtherInfoListOk')(otherInfo))
                    yield put(requireActions('getDemandListSuccess')(demand))
                    //yield put(actions('getArchivesDetailOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    archivesDetail: {},
                }
            },
        },
        {
            name: 'getArchivesDetailOk',
            reducer: 'archivesDetail',
        },
        // 存档
        {
            name: 'saveArchives',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/saveArchives`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        // 获取档案列表
        {
            name: 'getArchivesList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getArchivesList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getArchivesListOk')(res.data))
                }
            },
        },
        {
            name: 'getArchivesListOk',
            reducer: 'archives',
        },
    ],
}
const newCompany = blaze(model)
// reducer combineReducers使用
export default newCompany.reducers
// action connect组件使用
export const actions = newCompany.actions
// effects saga监听副作用函数使用
export const effects = newCompany.effects
