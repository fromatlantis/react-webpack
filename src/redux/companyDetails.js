/**
 * 企服首页/企业详情 redux
 */
import { put, call, select } from 'redux-saga/effects'
import { replace, goBack } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'companyDetails',
    state: {
        tabActive: 'building', //房源管理页面标签
    },
    actions: [
        {
            //获取园区项目详情
            name: 'getProjectDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: '/asset/getProjectDetail',
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getProjectDetailSuccess')(res.data))
                }
            },
        },
        {
            name: 'getProjectDetailSuccess',
            reducer: 'projectDetail',
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
