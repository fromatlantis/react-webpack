import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'configure',
    state: {
        industryList: [],
        qualityList: [],
        addLabelList: [],
    },
    actions: [
        {
            name: 'closeLabelList',
            reducer: (state, action) => {
                return {
                    ...state,
                    industryList: [],
                    qualityList: [],
                }
            },
        },
        //标签列表
        {
            name: 'getLabelList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/getLabelList',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    if (action.payload.type === 'industry') {
                        yield put(actions('getIndustryListOK')(res.data))
                    } else if (action.payload.type === 'qualification') {
                        yield put(actions('getQualityListOK')(res.data))
                    }
                }
            },
        },
        {
            name: 'getIndustryListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    industryList: action.payload,
                }
            },
        },
        {
            name: 'getQualityListOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    qualityList: action.payload,
                }
            },
        },
        //新增标签
        {
            name: 'addLabel',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/addLabel',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('addLabelOK')(res.data))
                    yield put(actions('getLabelList')({ type: action.payload.type }))
                }
            },
        },
        {
            name: 'addLabelOK',
            reducer: (state, action) => {
                return {
                    ...state,
                    addLabelList: action.payload,
                }
            },
        },
        //修改标签
        {
            name: 'updateLabel',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/enterprise/updateLabel',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                }
            },
        },
        //删除标签
        {
            name: 'deleteLabel',
            *effect(action) {
                const res = yield call(request, {
                    type: 'get',
                    url: `/enterprise/deleteLabel?id=${action.payload.id}`,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                }
            },
        },
    ],
}
const configure = blaze(model)
// reducer combineReducers使用
export default configure.reducers
// action connect组件使用
export const actions = configure.actions
// effects saga监听副作用函数使用
export const effects = configure.effects
