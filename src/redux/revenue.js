import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'revenue',
    state: {
        revenue: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getFinanceInfosList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const searchParams = yield select(rootState => rootState.revenue.searchParams)
                // 时间处理
                const { years, updateTime, ...params } = searchParams
                params.companyId = sessionStorage.getItem('companyId')
                if (searchParams.years) {
                    params.years = searchParams.years.format('YYYY')
                }
                if (searchParams.updateTime) {
                    params.updateTime = searchParams.updateTime.format('YYYY-MM-DD')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getFinanceInfosList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinanceInfosListOK')(res.data))
                }
            },
        },
        {
            name: 'getFinanceInfosListOK',
            reducer: 'revenue',
        },
        {
            name: 'getFinanceDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getFinanceDetail?financeId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getFinanceDetailOK')(res.data))
                }
            },
            reducer: (state, action) => {
                return {
                    ...state,
                    detail: {},
                }
            },
        },
        {
            name: 'getFinanceDetailOK',
            reducer: 'detail',
        },
        // 新增
        {
            name: 'addFinanceInfo',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                if (params.years) {
                    params.years = params.years.format('YYYY')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/addFinanceInfo`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                    yield put(actions('getFinanceInfosList')())
                }
            },
        },
        // 添加-经过审批
        {
            name: 'increasePatentApprove',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increasePatentApprove`,
                    data: {
                        params,
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'updateFinanceInfo',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                if (params.years) {
                    params.years = params.years.format('YYYY')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/updateFinanceInfo`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                    yield put(actions('getFinanceInfosList')())
                }
            },
        },
        {
            name: 'delFinanceInfo',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/delFinanceInfo`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                    yield put(actions('getFinanceInfosList')())
                }
            },
        },
    ],
}
const revenue = blaze(model)
// reducer combineReducers使用
export default revenue.reducers
// action connect组件使用
export const actions = revenue.actions
// effects saga监听副作用函数使用
export const effects = revenue.effects
