import { put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'bill',
    state: {
        bill: {},
        billDetail: {},
        billNo: '',
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getBillList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.bill.searchParams)
                const res = yield call(request, {
                    // type: 'post',
                    url: `/charge/getBillList`,
                    // contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getBillListOK')(res.data))
                }
            },
        },
        {
            name: 'getBillListOK',
            reducer: 'bill',
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
            name: 'operateAddBill',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateAddBill`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                    yield put(actions('getBillList')())
                }
            },
        },
        // 账单详情
        {
            name: 'getBillDetail',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getBillDetail`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getBillDetailOK')(res.data))
                }
            },
        },
        {
            name: 'getBillDetailOK',
            reducer: 'billDetail',
        },
        // 编辑更新
        {
            name: 'updateBill',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/updateBill`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                    yield put(
                        actions('getBillDetail')({
                            billId: action.payload.billId,
                        }),
                    )
                    yield put(actions('getBillList')())
                }
            },
        },
        // 批量确认
        {
            name: 'operateBatchConfirmBills',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateBatchConfirmBills`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('确认成功')
                    if (action.payload.single) {
                        yield put(
                            actions('getBillDetail')({
                                billId: action.payload.billIds,
                            }),
                        )
                    }
                    yield put(actions('getBillList')())
                }
            },
        },
        // 批量发送
        {
            name: 'operateBatchSendBills',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateBatchSendBills`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('发送成功')
                    yield put(actions('getBillList')())
                }
            },
        },
    ],
}
const bill = blaze(model)
// reducer combineReducers使用
export default bill.reducers
// action connect组件使用
export const actions = bill.actions
// effects saga监听副作用函数使用
export const effects = bill.effects
