import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import SupplierType from './SupplierType/Connect'
import CompanyRequire from './CompanyRequire/CompanyRequire'
import SupplierList from './SupplierList/SupplierList'
import GoHandle from './CompanyRequire/GoHandle/Connect'
import SupplierDetail from './SupplierList/SupplierDetail/Connect'
import SupplierEdit from './SupplierList/SupplierEdit/Connect'
import SupplierAdd from './SupplierList/SupplierAdd/SupplierAdd'
import GoView from './CompanyRequire/GoView/Connect'

const menu = [
    {
        title: '供应商列表',
        role: '供应商列表',
        icon: '',
        path: '/agency/supplierList',
        component: SupplierList,
    },
    {
        title: '供应商类型',
        role: '供应商类型',
        icon: '',
        path: '/agency/supplierType',
        component: SupplierType,
    },
    {
        title: '供应商详情',
        role: '供应商列表',
        icon: '',
        display: 'none',
        path: '/agency/supplierDetail/:id',
        component: SupplierDetail,
    },
    {
        title: '供应商编辑',
        role: '供应商列表',
        icon: '',
        display: 'none',
        path: '/agency/supplierEdit/:id',
        component: SupplierEdit,
    },
    {
        title: '供应商添加',
        role: '供应商列表',
        icon: '',
        display: 'none',
        path: '/agency/supplierAdd',
        component: SupplierAdd,
    },
]
export default class Agency extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
