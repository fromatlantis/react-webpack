import { put, call, select } from 'redux-saga/effects'
import { message } from 'antd'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { APPID } from '../config'

const model = {
    namespace: 'approval',
    state: {
        changesList: [],
        changeDetail: {},
        searchParams: {
            pageNo: 1,
            pageSize: 10,
        },
    },
    actions: [
        // 更新消息
        {
            name: 'getChangesList',
            reducer: (state, action) => {
                return {
                    ...state,
                    changesList: [],
                }
            },
            *effect(action) {
                const companyId = sessionStorage.getItem('companyId')
                const res = yield call(request, {
                    url: `/enterprise/getChangesList?companyId=${companyId}&appIdentity=${APPID}`,
                })
                if (res.data) {
                    yield put(actions('getChangesListOk')(res.data))
                }
            },
        },
        {
            name: 'getChangesListOk',
            reducer: 'changesList',
        },
        // 更新详情
        {
            name: 'getChangeDetail',
            reducer: (state, action) => {
                return {
                    ...state,
                    changeDetail: {},
                }
            },
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/getChangeDetail`,
                    data: action.payload,
                })
                if (res.data) {
                    yield put(actions('getChangeDetailOK')(res.data))
                }
            },
        },
        {
            name: 'getChangeDetailOK',
            reducer: 'changeDetail',
        },
        {
            name: 'changeApprove',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    contentType: 'multipart/form-data',
                    url: `/enterprise/changeApprove`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('操作成功')
                    yield put(actions('getChangesList')())
                }
            },
        },
    ],
}
const approval = blaze(model)
// reducer combineReducers使用
export default approval.reducers
// action connect组件使用
export const actions = approval.actions
// effects saga监听副作用函数使用
export const effects = approval.effects
