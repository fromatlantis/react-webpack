import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import Apply from './Apply/Apply'
import Record from './Record/Record'

const menu = [
    {
        title: '申请报修',
        icon: '',
        path: '/repair/apply',
        component: Apply,
    },
    {
        title: '报修记录',
        icon: '',
        path: '/repair/record',
        component: Record,
    },
]

export default class Repair extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
