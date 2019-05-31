/**
 * 物料管理 redux
 */
import { put, call, select } from 'redux-saga/effects'
import { replace, goBack } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'materialManager',
    state: {
        MaterialList: [], //物料列表
    },
    actions: [
        {
            //POST 获取物料列表
            name: 'getMaterialList',
            reducer: (state, action) => {
                return {
                    ...state,
                    InvestmentAbroadList: [],
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/property/getMaterialList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
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
                }
            },
        },
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
    ],
}
const manager = blaze(model)
// reducer combineReducers使用
export default manager.reducers
// action connect组件使用
export const actions = manager.actions
// effects saga监听副作用函数使用
export const effects = manager.effects
