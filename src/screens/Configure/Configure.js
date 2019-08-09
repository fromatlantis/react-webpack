import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Tags from './Tags/Tags'
const menu = [
    {
        title: '标签配置',
        role: '标签配置',
        icon: '',
        path: '/configure/tags',
        component: Tags,
    },
]
export default class Stats extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
