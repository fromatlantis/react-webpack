import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Overview from './Overview/Overview'

const menu = [
    {
        title: '费用总览统计',
        icon: '',
        path: '/stats/overview',
        component: Overview,
    },
    {
        title: '费用类型统计',
        icon: '',
        path: '/stats/types',
        component: Overview,
    },
    {
        title: '结清情况统计',
        icon: '',
        path: '/stats/settle',
        component: Overview,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
