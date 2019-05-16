import { put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message } from 'antd'

const model = {
    namespace: 'members',
    state: {
        team: {},
    },
    actions: [
        {
            name: 'getCoreTeamList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getCoreTeamList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
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
            name: 'increaseCoreTeam',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/increaseCoreTeam`,
                    data: action.payload,
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
