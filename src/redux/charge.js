import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'
import { APPID } from '../config'
const model = {
    namespace: 'charge',
    state: {
        charge: {},
        detail: {},
        billNo: '',
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getChargesByCus',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.charge.searchParams)
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getChargesByCus`,
                    contentType: 'multipart/form-data',
                    data: { ...params, appIdentify: APPID },
                })
                if (res.code === 1000) {
                    yield put(actions('getChargesByCusOK')(res.data))
                }
            },
        },
        {
            name: 'getChargesByCusOK',
            reducer: 'charge',
        },
        // 新增-获取账单号
        {
            name: 'getBillNo',
            *effect(action) {
                const res = yield call(request, {
                    url: `/charge/getBillNo`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getBillNoOK')(res.data))
                }
            },
        },
        {
            name: 'getBillNoOK',
            reducer: 'billNo',
        },
        {
            name: 'operateAddCusCharge',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateAddCusCharge`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                    yield put(actions('getChargesByCus')())
                }
            },
        },
        // 费用详情
        {
            name: 'getChargeDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getChargeDetail`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getChargeDetailOK')(res.data))
                }
            },
        },
        {
            name: 'getChargeDetailOK',
            reducer: 'detail',
        },
        // 编辑更新
        {
            name: 'operateUpdateCusCharge',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateUpdateCusCharge`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                    yield put(
                        actions('getChargeDetail')({
                            chargeId: action.payload.chargeId,
                        }),
                    )
                    yield put(actions('getChargesByCus')())
                }
            },
        },
        // 结清
        {
            name: 'operateChargeClosing',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateChargeClosing`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('结清成功')
                    yield put(
                        actions('getChargeDetail')({
                            chargeId: action.payload.chargeId,
                        }),
                    )
                    yield put(actions('getChargesByCus')())
                }
            },
        },
        // 催缴
        {
            name: 'operateAskPayment',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateAskPayment`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('催缴成功')
                    yield put(actions('getChargesByCus')())
                }
            },
        },
    ],
}
const charge = blaze(model)
// reducer combineReducers使用
export default charge.reducers
// action connect组件使用
export const actions = charge.actions
// effects saga监听副作用函数使用
export const effects = charge.effects
