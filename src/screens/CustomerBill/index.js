import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import CustomerBill from './CustomerBill'
import Detail from './Detail/Detail'
import NewCustomer from '../NewCustomer/NewCustomer'
const menu = [
    {
        title: '客户账单',
        display: 'none',
        icon: '',
        path: '/bill',
        component: CustomerBill,
    },
    {
        title: '客户维护',
        display: 'none',
        icon: '',
        path: '/bill/newCustomer',
        component: NewCustomer,
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
