import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import Tags from './Tags/Tags'
const menu = [
    {
        title: '标签设置',
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
