import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'staff',
    state: {
        staff: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getStaffEdusList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const searchParams = yield select(rootState => rootState.staff.searchParams)
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
                    url: `/enterprise/getStaffEduList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getStaffEdusListOK')(res.data))
                }
            },
        },
        {
            name: 'getStaffEdusListOK',
            reducer: 'staff',
        },
        {
            name: 'getStaffsDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getStaffsDetail?staffId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('getStaffsDetailOK')(res.data))
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
            name: 'getStaffsDetailOK',
            reducer: 'detail',
        },
        // 新增
        {
            name: 'addStaffEdu',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                if (params.years) {
                    params.years = params.years.format('YYYY')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/addStaffEdu`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                    yield put(actions('getStaffEdusList')())
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
            name: 'updateStaffEdu',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                if (params.years) {
                    params.years = params.years.format('YYYY')
                }
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/updateStaffEdu`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('修改成功')
                    yield put(actions('getStaffEdusList')())
                }
            },
        },
        {
            name: 'delStaffEdu',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/delStaffEdu`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('删除成功')
                    yield put(actions('getStaffEdusList')())
                }
            },
        },
    ],
}
const staff = blaze(model)
// reducer combineReducers使用
export default staff.reducers
// action connect组件使用
export const actions = staff.actions
// effects saga监听副作用函数使用
export const effects = staff.effects
