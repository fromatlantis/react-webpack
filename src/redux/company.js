import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'company',
    state: {
        company: {},
    },
    actions: [
        {
            name: 'searchCompany',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/searchCompany?pageNo=1&pageSize=10`,
                })
                if (res.code === 1000) {
                    yield put(actions('searchCompanyOk')(res.data))
                }
            },
        },
        {
            name: 'searchCompanyOk',
            reducer: 'company',
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
