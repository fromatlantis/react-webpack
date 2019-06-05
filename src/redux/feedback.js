import { put, call, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'feedback',
    state: {
        feedback: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getFeedbackList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.feedback.searchParams)
                //参数处理
                let formData = new FormData()
                if (params.applyType) {
                    if (params.applyType.length === 1) {
                        formData.append('category', params.applyType[0])
                    } else if (params.applyType.length === 2) {
                        formData.append('category', params.applyType[0])
                        formData.append('classify', params.applyType[1])
                    } else if (params.applyType.length === 3) {
                        formData.append('category', params.applyType[0])
                        formData.append('classify', params.applyType[1])
                        formData.append('fault', params.applyType[2])
                    }
                }
                if (params.repairStatus) {
                    formData.append('repairStatus', params.repairStatus)
                }
                formData.append('isHasten', params.isHasten)
                formData.append('pageNo', params.pageNo)
                formData.append('pageSize', params.pageSize)
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/feedbackList',
                    data: formData,
                })
                if (res.code === 1000) {
                    yield put(actions('getFeedbackListOk')(res.data))
                }
            },
        },
        {
            name: 'getFeedbackListOk',
            reducer: 'feedback',
        },
        {
            name: 'feedback',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/submitFeedback',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('反馈成功')
                }
            },
        },
    ],
}
const dispatch = blaze(model)
// reducer combineReducers使用
export default dispatch.reducers
// action connect组件使用
export const actions = dispatch.actions
// effects saga监听副作用函数使用
export const effects = dispatch.effects
