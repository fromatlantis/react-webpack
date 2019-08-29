import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'records',
    state: {
        records: {},
        detail: {},
        batchCharges: [],
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getChargeRecords',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.records.searchParams)
                const { receiveDate, ...others } = params
                if (receiveDate) {
                    const [receiveDateBegin, receiveDateEnd] = receiveDate
                    others.receiveDateBegin = receiveDateBegin.format('YYYY.MM.DD')
                    others.receiveDateEnd = receiveDateEnd.format('YYYY.MM.DD')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getChargeRecords`,
                    contentType: 'multipart/form-data',
                    data: others,
                })
                if (res.code === 1000) {
                    yield put(actions('getChargeRecordsOk')(res.data))
                }
            },
        },
        {
            name: 'getChargeRecordsOk',
            reducer: 'records',
        },
        // 批量导入
        {
            name: 'operateBatchLoadCharges',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateBatchLoadCharges`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('导入成功')
                    yield put(actions('getChargeRecords')())
                }
            },
        },
        // 获取制定客户费用列表
        {
            name: 'unverifiedCharges',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/unverifiedCharges`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('unverifiedChargesOK')(res.data))
                }
            },
        },
        {
            name: 'unverifiedChargesOK',
            reducer: 'batchCharges',
        },
        // 批量核对
        {
            name: 'operateVerifyCharge',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateVerifyCharge`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('核对成功')
                    yield put(actions('getChargeRecords')())
                }
            },
        },
    ],
}
const records = blaze(model)
// reducer combineReducers使用
export default records.reducers
// action connect组件使用
export const actions = records.actions
// effects saga监听副作用函数使用
export const effects = records.effects
