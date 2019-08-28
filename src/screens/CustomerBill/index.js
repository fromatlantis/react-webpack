import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import CustomerBill from './CustomerBill'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'
import Detail from './Detail/Detail'
const menu = [
    {
        title: '客户账单',
        display: 'none',
        icon: '',
        path: '/bill',
        component: CustomerBill,
    },
    {
        title: '新增客户',
        display: 'none',
        icon: '',
        path: '/bill/customerAdd',
        component: CustomerAdd,
    },
    {
        title: '编辑客户',
        display: 'none',
        icon: '',
        path: '/bill/customerEdit/:id',
        component: CustomerEdit,
    },
    {
        title: '客户详情',
        display: 'none',
        icon: '',
        path: '/bill/detail/:id',
        component: Detail,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
