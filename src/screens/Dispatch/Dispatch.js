import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import Order from './Order/Order'
import Work from './Work/Work'
import Detail from '../Repair/Detail/Detail'

const menu = [
    {
        title: '工单处理',
        icon: '',
        path: '/dispatch/order',
        component: Order,
    },
    {
        title: '我的派工',
        icon: '',
        path: '/dispatch/work',
        component: Work,
    },
    {
        title: '派工详情',
        icon: '',
        display: 'none',
        path: '/dispatch/detail/:id/:type',
        component: Detail,
    },
]
export default class Dispatch extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
