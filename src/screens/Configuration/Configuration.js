import React, { PureComponent } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import styles from './Configuration.module.css'
import HourWage from './HourWage/Connect'
import LimitSetting from './LimitSetting/Connect'
import RepairAddressSet from './RepairAddressSet/RepairAddressSet'
import RepairType from './RepairType/RepairType'
import UserSetting from './UserSetting/UserSetting'

export default class Agency extends PureComponent {
    state = {
        active: '1',
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.toalNav}>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '1' ? styles.active : ''
                        }`}
                        onClick={() => {
                            this.setState({ active: '1' })
                        }}
                        to="/configuration/repairType"
                    >
                        报修类型管理
                    </NavLink>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '2' ? styles.active : ''
                        }`}
                        onClick={() => {
                            this.setState({ active: '2' })
                        }}
                        to="/configuration/userSetting"
                    >
                        用户设置
                    </NavLink>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '3' ? styles.active : ''
                        }`}
                        onClick={() => {
                            this.setState({ active: '3' })
                        }}
                        to="/configuration/limitSetting"
                    >
                        时限设置
                    </NavLink>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '4' ? styles.active : ''
                        }`}
                        onClick={() => {
                            this.setState({ active: '4' })
                        }}
                        to="/configuration/hourWage"
                    >
                        工时费设置
                    </NavLink>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '5' ? styles.active : ''
                        }`}
                        onClick={() => {
                            this.setState({ active: '5' })
                        }}
                        to="/configuration/repairAddressSet"
                    >
                        报修地址配置
                    </NavLink>
                </div>
                <div style={{ flex: 1 }}>
                    <Route exact path="/configuration/repairType" component={RepairType} />
                    <Route exact path="/configuration/userSetting" component={UserSetting} />
                    <Route exact path="/configuration/limitSetting" component={LimitSetting} />
                    <Route exact path="/configuration/hourWage" component={HourWage} />
                    <Route
                        exact
                        path="/configuration/repairAddressSet"
                        component={RepairAddressSet}
                    />
                </div>
            </div>
        )
    }
}
