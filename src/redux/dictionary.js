import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'

const model = {
    namespace: 'dictionary',
    state: {
        BUSINESS_STATUS: [],
        COMPANY_TYPE: [],
        INDUSTRY: [],
        PARK_COMPANY_TYPE: [],
        PATENT_TYPE: [],
        WORKS_COPYRIGHT: [],
        COMPANY_NATURE: [],
        PROVINCE: [],
    },
    actions: [
        {
            name: 'getDictionary',
            *effect(action) {
                const category = action.payload
                const res = yield call(request, {
                    url: `/enterprise/getDictionary?categoryVal=${category}`,
                })
                if (res.code === 1000) {
                    yield put(actions(category)(res.data))
                }
            },
        },
        {
            name: 'BUSINESS_STATUS',
            reducer: 'BUSINESS_STATUS',
        },
        {
            name: 'COMPANY_TYPE',
            reducer: 'COMPANY_TYPE',
        },
        {
            name: 'INDUSTRY',
            reducer: 'INDUSTRY',
        },
        {
            name: 'PARK_COMPANY_TYPE',
            reducer: 'PARK_COMPANY_TYPE',
        },
        {
            name: 'PATENT_TYPE',
            reducer: 'PATENT_TYPE',
        },
        {
            name: 'WORKS_COPYRIGHT',
            reducer: 'WORKS_COPYRIGHT',
        },
        {
            name: 'COMPANY_NATURE',
            reducer: 'COMPANY_NATURE',
        },
        {
            name: 'PROVINCE',
            reducer: 'PROVINCE',
        },
    ],
}
const dictionary = blaze(model)
// reducer combineReducers使用
export default dictionary.reducers
// action connect组件使用
export const actions = dictionary.actions
// effects saga监听副作用函数使用
export const effects = dictionary.effects
