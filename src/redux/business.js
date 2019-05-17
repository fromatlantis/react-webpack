import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'business',
    state: {
        businessInfo: {},
    },
    actions: [
        {
            name: 'queryBaseInfoDetial',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/queryBaseInfoDetial?companyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('queryBaseInfoDetialOk')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    businessInfo: {},
                }
            },
        },
        {
            name: 'queryBaseInfoDetialOk',
            reducer: 'businessInfo',
        },
        {
            name: 'changeBaseInfoApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeBaseInfoApprove`,
                    contentType: 'multipart/form-data',
                    data: {
                        newContent: action.payload,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
    ],
}
const business = blaze(model)
// reducer combineReducers使用
export default business.reducers
// action connect组件使用
export const actions = business.actions
// effects saga监听副作用函数使用
export const effects = business.effects
