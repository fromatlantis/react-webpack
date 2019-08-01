import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Overview from './Overview/Overview'
import Qualifications from './Qualifications/Qualifications'
import Quantity from './Quantity/Quantity'
import Revenue from './Revenue/Revenue'
import Financing from './Financing/Financing'

const menu = [
    {
        title: '物业统计总览',
        icon: '',
        path: '/stats/overview',
        component: Overview,
    },
    {
        title: '企业资质统计',
        icon: '',
        path: '/stats/qualifications',
        component: Qualifications,
    },
    {
        title: '企业数量统计',
        icon: '',
        path: '/stats/quantity',
        component: Quantity,
    },
    {
        title: '园区营收统计',
        icon: '',
        path: '/stats/revenue',
        component: Revenue,
    },
    {
        title: '融资情况统计',
        icon: '',
        path: '/stats/financing',
        component: Financing,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
