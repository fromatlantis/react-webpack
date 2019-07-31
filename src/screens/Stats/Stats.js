import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Overview from './Overview/Overview'
import Industry from './Industry/Industry'
import Staff from './Staff/Staff'
import Rights from './Rights/Rights'
const menu = [
    {
        title: '物业统计总览',
        icon: '',
        path: '/stats/overview',
        component: Overview,
    },
    {
        title: '企业行业统计',
        icon: '',
        path: '/stats/industry',
        component: Industry,
    },
    {
        title: '园区人员统计',
        icon: '',
        path: '/stats/staff',
        component: Staff,
    },
    {
        title: '知识产权统计',
        icon: '',
        path: '/stats/rights',
        component: Rights,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
