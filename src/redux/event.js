import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'event',
    state: {
        event: {},
    },
    actions: [
        {
            name: 'getFinancingList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getFinancingList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinancingListOk')(res.data))
                }
            },
        },
        {
            name: 'getFinancingListOk',
            reducer: 'finance',
        },
        {
            name: 'increaseFinancingApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseFinancingApprove`,
                    data: {
                        params: action.payload,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
    ],
}
const event = blaze(model)
// reducer combineReducers使用
export default event.reducers
// action connect组件使用
export const actions = event.actions
// effects saga监听副作用函数使用
export const effects = event.effects
