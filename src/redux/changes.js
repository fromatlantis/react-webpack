import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
import { APPID } from '../config'
const model = {
    namespace: 'changes',
    state: {
        changes: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getRecordsList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getRecordsList`,
                    contentType: 'multipart/form-data',
                    data: { ...action.payload, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    yield put(actions('getRecordsListOK')(res.data))
                }
            },
        },
        {
            name: 'getRecordsListOK',
            reducer: 'changes',
        },
    ],
}
const changes = blaze(model)
// reducer combineReducers使用
export default changes.reducers
// action connect组件使用
export const actions = changes.actions
// effects saga监听副作用函数使用
export const effects = changes.effects
