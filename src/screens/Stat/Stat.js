import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Overview from './Overview/Overview'
import Types from './Types/Types'
import Settle from './Settle/Settle'
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
        component: Types,
    },
    {
        title: '结清情况统计',
        icon: '',
        path: '/stats/settle',
        component: Settle,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
