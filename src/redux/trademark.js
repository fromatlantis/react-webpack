import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'trademark',
    state: {
        trademark: {},
    },
    actions: [
        {
            name: 'getTrademarkList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getTrademarkList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getTrademarkListOk')(res.data))
                }
            },
        },
        {
            name: 'getTrademarkListOk',
            reducer: 'trademark',
        },
        {
            name: 'increaseTrademarkApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseTrademarkApprove`,
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
const trademark = blaze(model)
// reducer combineReducers使用
export default trademark.reducers
// action connect组件使用
export const actions = trademark.actions
// effects saga监听副作用函数使用
export const effects = trademark.effects
