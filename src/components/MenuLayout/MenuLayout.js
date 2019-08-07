import React, { PureComponent } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { LeftMenu, AuthWrapper } from 'components'
import getRoutes, { filterMenu } from './authMenu'
import styles from './MenuLayout.module.css'

@connect(state => {
    return {
        auths: state.authUser.auths,
        router: state.router,
    }
})
class Repair extends PureComponent {
    render() {
        const { menu, auths } = this.props
        const authRoute = getRoutes(
            menu,
        ) /*.filter(item => auths.includes(item.title) || item.display === 'none')*/
        return (
            <div className={styles.root}>
                <LeftMenu
                    menuData={filterMenu(menu) /*.filter(item => auths.includes(item.title))*/}
                />
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
                    <Redirect to={authRoute[0].path} />
                </Switch>
            </div>
        )
    }
}
export default Repair
