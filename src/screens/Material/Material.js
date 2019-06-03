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
import ApplyDetail from './Approval/ApplyDetail'

// 物料申请
import Apply from './Apply/Apply'
import applySub from './Apply/ApplySub'

// 申请记录
import Record from './Record/Record'
import RecordDetail from './Record/RecordDetail'

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
        title: '物料详情',
        display: 'none',
        path: '/material/materialDetails/:id',
        component: MaterialDetails,
    },
    {
        title: '物料编辑',
        display: 'none',
        path: '/material/compileMaterial/:id',
        component: CompileMaterial,
    },
    {
        title: '物料申请',
        display: 'none',
        path: '/material/applyDetail/:id',
        component: ApplyDetail,
    },
    {
        title: '申请详情',
        display: 'none',
        path: '/material/recordDetail/:id',
        component: RecordDetail,
    },
    {
        title: '申请提交',
        display: 'none',
        path: '/material/applySub/:id',
        component: applySub,
    },
]

export default class Material extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
