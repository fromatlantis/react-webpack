import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'news',
    state: {
        news: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getRecentNews',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.members.searchParams)
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getRecentNews`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getRecentNewsOk')(res.data))
                }
            },
        },
        {
            name: 'getRecentNewsOk',
            reducer: 'news',
        },
    ],
}
const news = blaze(model)
// reducer combineReducers使用
export default news.reducers
// action connect组件使用
export const actions = news.actions
// effects saga监听副作用函数使用
export const effects = news.effects
