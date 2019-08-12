import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
import { APPID } from '../config'
const model = {
    namespace: 'newCompany',
    state: {
        searchWord: [],
        baseInfo: {},
        loadAll: 'no',
        modelList: [],
    },
    actions: [
        {
            name: 'getSearchWord',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/searchWord?word=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getSearchWordOk')(res.data))
                }
            },
        },
        {
            name: 'getSearchWordOk',
            reducer: 'searchWord',
        },
        // 从天眼查获取
        {
            name: 'getBaseInfo',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getBaseInfo?name=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getBaseInfoOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    baseInfo: {},
                }
            },
        },
        {
            name: 'getBaseInfoOk',
            reducer: 'baseInfo',
        },
        {
            name: 'saveBasicInfo',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/saveBasicInfo`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    //message.success('保存成功')
                    //yield put(actions('saveBasicInfoOk')({}))
                    yield put(actions('storeLoadAll')('yes'))
                }
            },
        },
        {
            name: 'saveBasicInfoOk',
            reducer: 'baseInfo',
        },
        // 编辑企业名片
        {
            name: 'updateBasicInfo',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/updateBasicInfo`,
                    data: JSON.stringify(action.payload),
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'storeLoadAll',
            reducer: 'loadAll',
        },
        {
            name: 'loadEnterpriseInfo',
            *effect(action) {
                const baseInfo = yield select(state => state.newCompany.baseInfo)
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/loadEnterpriseInfo`,
                    contentType: 'multipart/form-data',
                    data: {
                        baseStr: JSON.stringify(baseInfo),
                    },
                })
                yield put(actions('storeLoadAll')('no'))
                if (res.code === 1000) {
                    message.success('保存成功')
                    sessionStorage.setItem('companyId', res.data.companyId)
                    //yield put(actions('saveBasicInfoOk')({}))
                }
            },
        },
        // 从数据库查询
        {
            name: 'queryBasicInfoDetial',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getBasicInfoById?companyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getBaseInfoOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    baseInfo: {},
                }
            },
        },
        // 编辑更新
        {
            name: 'changeBasicInfoApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeBasicInfoApprove`,
                    contentType: 'multipart/form-data',
                    data: {
                        newContent: JSON.stringify(action.payload),
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        // 保存改进建议
        {
            name: 'increaseSuggestion',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseSuggestion`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('改进建议保存成功')
                }
            },
        },
        // 保存其他信息
        {
            name: 'increaseOtherInfo',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseOtherInfo`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('其他信息保存成功')
                }
            },
        },
        // 获取对应的权限模块
        {
            name: 'getModelList',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getModelList?appIdentity=${APPID}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getModelListOK')(res.data))
                }
            },
        },
        {
            name: 'getModelListOK',
            reducer: 'modelList',
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
