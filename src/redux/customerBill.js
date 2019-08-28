import { put, call, select } from 'redux-saga/effects'
import { goBack } from 'connected-react-router'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'customerBill',
    state: {
        bill: {},
        detail: {},
        batchBillList: [],
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getCustomerBillList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.customerBill.searchParams)
                const { receiveDate, limitDate, ...others } = params
                if (receiveDate) {
                    const [receiveDateBegin, receiveDateEnd] = receiveDate
                    others.receiveDateBegin = receiveDateBegin.format('YYYY.MM.DD')
                    others.receiveDateEnd = receiveDateEnd.format('YYYY.MM.DD')
                }
                if (limitDate) {
                    others.limitDate = limitDate.format('YYYY.MM.DD')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getCustomerBillList`,
                    contentType: 'multipart/form-data',
                    data: others,
                })
                if (res.code === 1000) {
                    yield put(actions('getCustomerBillListOK')(res.data))
                }
            },
        },
        {
            name: 'getCustomerBillListOK',
            reducer: 'bill',
        },
        // 新增客户
        {
            name: 'addCustomer',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/addCustomer`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('添加成功')
                    yield put(goBack())
                }
            },
        },
        // 编辑客户
        {
            name: 'updateCustomer',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/updateCustomer`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                    yield put(goBack())
                }
            },
        },
        {
            name: 'operateBatchImportBills',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/operateBatchImportBills`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('导入成功')
                    yield put(actions('getCustomerBillList')())
                }
            },
        },
        // 获取制定客户账单列表
        {
            name: 'getBatchConfirmBillList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/charge/getBatchConfirmBillList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getBatchConfirmBillListOk')(res.data))
                }
            },
        },
        {
            name: 'getBatchConfirmBillListOk',
            reducer: 'batchBillList',
        },
    ],
}
const customerBill = blaze(model)
// reducer combineReducers使用
export default customerBill.reducers
// action connect组件使用
export const actions = customerBill.actions
// effects saga监听副作用函数使用
export const effects = customerBill.effects
