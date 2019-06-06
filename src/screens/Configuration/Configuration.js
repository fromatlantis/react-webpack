import React, { PureComponent } from 'react'

import { MenuLayout } from 'components'

import HourWage from './HourWage/Connect'
import LimitSetting from './LimitSetting/Connect'
import RepairAddressSet from './RepairAddressSet/RepairAddressSet'
import RepairType from './RepairType/RepairType'
import UserSetting from './UserSetting/UserSetting'

const menu = [
    {
        title: '报修类型设置',
        icon: '',
        path: '/configuration/repairType',
        component: RepairType,
    },
    {
        title: '用户设置',
        icon: '',
        path: '/configuration/userSetting',
        component: UserSetting,
    },
    {
        title: '时限设置',
        icon: '',
        // display: 'none',
        path: '/configuration/limitSetting',
        component: LimitSetting,
    },
    {
        title: '工时费设置',
        icon: '',
        path: '/configuration/hourWage',
        component: HourWage,
    },
    {
        title: '报修地址设置',
        icon: '',
        path: '/configuration/repairAddressSet',
        component: RepairAddressSet,
    },
]

export default class Repair extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
