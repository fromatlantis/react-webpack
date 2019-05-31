import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import Repair from './Repair/Repair'

const menu = [
    {
        title: '报修反馈',
        icon: '',
        path: '/feedback/repair',
        component: Repair,
    },
]
export default class Feedback extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
