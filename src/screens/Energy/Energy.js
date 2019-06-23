import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import Analysis from './Analysis/Analysis'
import Records from './Records/Records'
import RecordCreate from './RecordCreate/RecordCreate'
import RecordDetail from './RecordDetail/RecordDetail'
import Manage from './Manage/Manage'
import ManageDetail from './ManageDetail/ManageDetail'

const menu = [
    {
        title: '能耗分析',
        icon: '',
        path: '/energy/analysis',
        component: Analysis,
    },
    {
        title: '抄表记录',
        icon: '',
        path: '/energy/record',
        component: Records,
    },
    {
        title: '新增记录',
        icon: '',
        display: 'none',
        path: '/energy/newRecord',
        component: RecordCreate,
    },
    {
        title: '抄表详情',
        icon: '',
        display: 'none',
        path: '/energy/record/:id',
        component: RecordDetail,
    },
    {
        title: '抄表管理',
        icon: '',
        path: '/energy/manage',
        component: Manage,
    },
    {
        title: '设备详情',
        icon: '',
        display: 'none',
        path: '/energy/manage/:id',
        component: ManageDetail,
    },
]

export default class Energy extends PureComponent {
    componentDidMount() {
        // alert('1') //有时候路由刷新不出来
    }

    render() {
        return <MenuLayout menu={menu} />
    }
}
