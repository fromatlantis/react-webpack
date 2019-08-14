import React, { PureComponent } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { LeftMenu, AuthWrapper } from 'components'
import getRoutes, { getNav } from './authMenu'
import styles from './MenuLayout.module.css'

@connect(state => {
    return {
        auths: state.authUser.auths,
        router: state.router,
    }
})
class Repair extends PureComponent {
    render() {
        let { menu, auths, privateAuths } = this.props
        if (privateAuths) {
            auths = privateAuths
        }
        const authRoute = getRoutes(
            menu,
            auths,
        ) /*.filter(item => auths.includes(item.title) || item.display === 'none')*/
        const [first] = authRoute
        const navs = getNav(menu, auths)
        return (
            auths.length > 0 && (
                <div className={styles.root}>
                    <LeftMenu menuData={navs} />
                    <Switch>
                        {authRoute.map((item, index) => {
                            return (
                                <Route
                                    exact
                                    //strict
                                    path={item.path}
                                    component={item.component}
                                />
                            )
                        })}
                        {first && <Redirect to={first.path} />}
                        <div>「没有相关权限」</div>
                    </Switch>
                </div>
            )
        )
    }
}
export default Repair
