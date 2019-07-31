import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Overview from './Overview/Overview'
const menu = [
    {
        title: '物业统计总览',
        icon: '',
        path: '/stats/overview',
        component: Overview,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
