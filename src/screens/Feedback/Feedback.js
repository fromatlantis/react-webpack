import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import Repair from './Repair/Repair'
import Detail from '../Repair/Detail/Detail'

const menu = [
    {
        title: '报修反馈',
        icon: '',
        path: '/feedback/repair',
        component: Repair,
    },
    {
        title: '反馈详情',
        icon: '',
        display: 'none',
        path: '/feedback/detail/:id/:type',
        component: Detail,
    },
]
export default class Feedback extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
