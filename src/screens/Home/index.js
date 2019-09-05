import React, { PureComponent } from 'react'
import { MenuLayout, IconFont } from 'components'
import Rem from './Rem'
const menu = [
    {
        title: 'rem单位',
        icon: <IconFont type="iconxingqiu" style={{ color: '#fff' }} />,
        path: '/home/rem',
        component: Rem,
    },
]
export default class Home extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
