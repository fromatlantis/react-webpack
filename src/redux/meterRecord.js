import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
const model = {
    namespace: 'meterRecord',
    state: {
        records: {},
        recordDetail: {},
        taskDetail: {}, //获取上期读数
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getMeterRecordList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.meterRecord.searchParams)
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/getMeterRecordList',
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getMeterRecordListOK')(res.data))
                }
            },
        },
        {
            name: 'getMeterRecordListOK',
            reducer: 'records',
        },
        {
            name: 'getRecordDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/getRecordDetail',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getRecordDetailOK')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    recordDetail: {},
                }
            },
        },
        {
            name: 'getRecordDetailOK',
            reducer: 'recordDetail',
        },
        {
            name: 'saveRecord',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: '/property/saveRecord',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                    yield put(push('/energy/record'))
                }
            },
        },
        {
            name: 'delRecord',
            *effect(action) {
                const res = yield call(request, {
                    url: '/property/delRecord',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                    yield put(actions('getMeterRecordList')())
                }
            },
        },
        {
            name: 'loadRecords',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: '/property/loadRecords',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('导入成功')
                    yield put(actions('getMeterRecordList')())
                }
            },
        },
        {
            name: 'getReadingTaskDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: '/property/getReadingTaskDetail',
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getReadingTaskDetailOK')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    taskDetail: {},
                }
            },
        },
        {
            name: 'getReadingTaskDetailOK',
            reducer: 'taskDetail',
        },
    ],
}
const meterRecord = blaze(model)
// reducer combineReducers使用
export default meterRecord.reducers
// action connect组件使用
export const actions = meterRecord.actions
// effects saga监听副作用函数使用
export const effects = meterRecord.effects
