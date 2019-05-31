import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import Order from './Order/Order'
import Work from './Work/Work'

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
]
export default class Dispatch extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
