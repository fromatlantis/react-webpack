import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Overview from './Overview/Overview'
import Industry from './Industry/Industry'
import Staff from './Staff/Staff'
import Rights from './Rights/Rights'
import Qualifications from './Qualifications/Qualifications'
import Quantity from './Quantity/Quantity'
import Revenue from './Revenue/Revenue'
import Financing from './Financing/Financing'

const menu = [
    {
        title: '物业统计总览',
        role: '物业统计总览',
        icon: '',
        path: '/stats/overview',
        component: Overview,
    },
    {
        title: '企业行业统计',
        role: '企业行业统计',
        icon: '',
        path: '/stats/industry',
        component: Industry,
    },
    {
        title: '园区人员统计',
        role: '园区人员统计',
        icon: '',
        path: '/stats/staff',
        component: Staff,
    },
    {
        title: '知识产权统计',
        role: '知识产权统计',
        icon: '',
        path: '/stats/rights',
        component: Rights,
    },
    {
        title: '企业资质统计',
        role: '企业资质统计',
        icon: '',
        path: '/stats/qualifications',
        component: Qualifications,
    },
    {
        title: '企业数量统计',
        role: '企业数量统计',
        icon: '',
        path: '/stats/quantity',
        component: Quantity,
    },
    {
        title: '园区营收统计',
        role: '园区营收统计',
        icon: '',
        path: '/stats/revenue',
        component: Revenue,
    },
    {
        title: '融资情况统计',
        role: '融资情况统计',
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
