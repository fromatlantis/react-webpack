import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'newCompany',
    state: {
        searchWord: [],
        baseInfo: {},
        loadAll: 'no',
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
                    yield put(actions('loadAll')('yes'))
                }
            },
        },
        {
            name: 'saveBasicInfoOk',
            reducer: 'baseInfo',
        },
        {
            name: 'loadAll',
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
                yield put(actions('loadAll')('no'))
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
                    url: `/enterprise/queryBasicInfoDetial?companyId=${action.payload}`,
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
    ],
}
const newCompany = blaze(model)
// reducer combineReducers使用
export default newCompany.reducers
// action connect组件使用
export const actions = newCompany.actions
// effects saga监听副作用函数使用
export const effects = newCompany.effects
