/**
 * 物料管理 ==> 左侧导航
 */
import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

// 物料管理
import Manager from './Manager/Manager'
import MaterialDetails from './Manager/MaterialDetails'
import CompileMaterial from './Manager/CompileMaterial'

// 申请审批
import Approval from './Approval/Approval'

// 物料申请
import Apply from './Apply/Apply'

// 申请记录
import Record from './Record/Record'

const menu = [
    {
        title: '物料管理',
        icon: 'home',
        path: '/material/manager',
        component: Manager,
    },
    {
        title: '申请审批',
        icon: 'mail',
        path: '/material/Approval',
        component: Approval,
    },
    {
        title: '物料申请',
        icon: 'dropbox',
        path: '/material/apply',
        component: Apply,
    },
    {
        title: '申请记录',
        icon: 'mail',
        path: '/material/record',
        component: Record,
    },
    {
        path: '/material/materialDetails',
        component: MaterialDetails,
    },
    {
        path: '/material/compileMaterial',
        component: CompileMaterial,
    },
]

export default class Material extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
