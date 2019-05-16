import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'product',
    state: {
        product: {},
    },
    actions: [
        {
            name: 'getProductInfoList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getProductInfoList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getProductInfoListOk')(res.data))
                }
            },
        },
        {
            name: 'getProductInfoListOk',
            reducer: 'product',
        },
        {
            name: 'increaseProductInfoApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseProductInfoApprove`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
    ],
}
const product = blaze(model)
// reducer combineReducers使用
export default product.reducers
// action connect组件使用
export const actions = product.actions
// effects saga监听副作用函数使用
export const effects = product.effects
