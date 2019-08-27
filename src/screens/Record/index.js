import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Record from './Record'
import Detail from './Detail/Detail'
const menu = [
    {
        title: '客户账单',
        display: 'none',
        icon: '',
        path: '/record',
        component: Record,
    },
    {
        title: '客户详情',
        display: 'none',
        icon: '',
        path: '/record/detail/:id',
        component: Detail,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
