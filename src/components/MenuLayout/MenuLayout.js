import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { LeftMenu } from 'components'
import routes from './authMenu'
import styles from './MenuLayout.module.css'

export default class Repair extends Component {
    render() {
        const { menu } = this.props
        const authRoute = routes(menu)
        return (
            <div className={styles.root}>
                <LeftMenu menuData={menu} />
                <Switch>
                    {authRoute.map((item, index) => {
                        return (
                            <Route
                                exact
                                //strict
                                path={item.path}
                                component={item.component}
                                key={index}
                            />
                        )
                    })}
                    <Redirect to={authRoute[0].path} />
                </Switch>
            </div>
        )
    }
}
