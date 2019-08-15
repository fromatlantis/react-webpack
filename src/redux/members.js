import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'members',
    state: {
        team: {},
        detail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        {
            name: 'getCoreTeamList',
            reducer: (state, action) => {
                return {
                    ...state,
                    searchParams: { ...state.searchParams, ...action.payload },
                }
            },
            *effect(action) {
                const params = yield select(rootState => rootState.members.searchParams)
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getCoreTeamList`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    yield put(actions('getCoreTeamListOk')(res.data))
                }
            },
        },
        {
            name: 'getCoreTeamListOk',
            reducer: 'team',
        },
        {
            name: 'queryCoreTeamDetail',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/queryCoreTeamDetail?keyId=${action.payload}`,
                })
                if (res.code === 1000) {
                    yield put(actions('queryCoreTeamDetailOk')(res.data))
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
            name: 'queryCoreTeamDetailOk',
            reducer: 'detail',
        },
        {
            name: 'increaseCoreTeam',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseCoreTeam`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                    yield put(actions('getCoreTeamList')())
                }
            },
        },
        // 新增-需要审批
        {
            name: 'increaseCoreTeamApprove',
            *effect(action) {
                let params = action.payload
                params.companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseCoreTeamApprove`,
                    contentType: 'multipart/form-data',
                    data: params,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'changeCoreTeam',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeCoreTeam`,
                    contentType: 'multipart/form-data',
                    data: {
                        newContent: JSON.stringify(action.payload),
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                    yield put(actions('getCoreTeamList')())
                }
            },
        },
        // 更新-需要审批
        {
            name: 'changeCoreTeamApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/changeCoreTeamApprove`,
                    contentType: 'multipart/form-data',
                    data: {
                        newContent: JSON.stringify(action.payload),
                    },
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
    ],
}
const members = blaze(model)
// reducer combineReducers使用
export default members.reducers
// action connect组件使用
export const actions = members.actions
// effects saga监听副作用函数使用
export const effects = members.effects
