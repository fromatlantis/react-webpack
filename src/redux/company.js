import { put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { blaze } from '../utils/blaze'
import { message, notification } from 'antd'

const model = {
    namespace: 'company',
    state: {
        company: {},
        directorList: [], //获取服务人员列表
        companyList: [], //用户所在园区下公司列表
        importList: [], //导入
    },
    actions: [
        {
            name: 'searchCompany',
            *effect(action) {
                const res = yield call(request, {
                    url: `/enterprise/searchCompany?pageNo=1&pageSize=10`,
                })
                if (res.code === 1000) {
                    yield put(actions('searchCompanyOk')(res.data))
                }
            },
        },
        {
            name: 'searchCompanyOk',
            reducer: 'company',
        },
        {
            name: 'getDirectorList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getDirectorList`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getDirectorListOk')(res.data))
                }
            },
        },
        {
            name: 'getDirectorListOk',
            reducer: 'directorList',
        },
        {
            name: 'getCompanyList',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/getCompanyList`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('getCompanyListOk')(res.data))
                }
            },
        },
        {
            name: 'getCompanyListOk',
            reducer: 'companyList',
        },
        {
            name: 'assignServiceStaff',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/assignServiceStaff`,
                    data: action.payload,
                })
                if (res.code === 1000) {
                    message.success('保存成功')
                }
            },
        },
        {
            name: 'batchImport',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/batchImport`,
                    contentType: 'multipart/form-data',
                    data: action.payload,
                })
                if (res.code === 1000) {
                    yield put(actions('batchImportOk')(res.data))
                }
            },
        },
        {
            name: 'batchImportOk',
            reducer: 'importList',
        },
        {
            name: 'batchLoad',
            *effect(action) {
                const res = yield call(request, {
                    type: 'post',
                    url: `/enterprise/batchLoad`,
                    contentType: 'multipart/form-data',
                    data: {
                        enterprises: JSON.stringify(action.payload),
                    },
                })
                if (res.code === 1000) {
                    notification.open({
                        message: 'Notification Title',
                        description:
                            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                        onClick: () => {
                            console.log('Notification Clicked!')
                        },
                    })
                }
            },
        },
    ],
}
const newCompany = blaze(model)
// reducer combineReducers使用
export default newCompany.reducers
// action connect组件使用
export const actions = newCompany.actions
// effects saga监听副作用函数使用
export const effects = newCompany.effects
