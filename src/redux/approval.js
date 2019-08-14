import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'approval',
    state: {
        changesList: [],
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
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
    ],
}
const approval = blaze(model)
// reducer combineReducers使用
export default approval.reducers
// action connect组件使用
export const actions = approval.actions
// effects saga监听副作用函数使用
export const effects = approval.effects
