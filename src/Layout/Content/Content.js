import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import { routes } from '../../routes/routes'
import getRoutes from '../../utils/authRouter'
import styles from './Content.module.css'
import Footer from '../Footer/Footer'
export default class Content extends Component {
    render() {
        const { auths } = this.props
        const authRoute = getRoutes(routes, auths)
        const [first] = authRoute
        console.log(first)
        return (
            <Layout.Content className={styles.content}>
                <div className={styles.body}>
                    <Switch>
                        {authRoute.map((item, index) => {
                            return (
                                <Route
                                    // exact
                                    // strict
                                    path={item.path}
                                    component={item.component}
                                    key={index}
                                />
                            )
                        })}
                        {first && <Redirect to={first.path} />}
                        <div>「没有相关权限」</div>
                    </Switch>
                </div>
                <BackTop />
                <Footer />
            </Layout.Content>
        )
    }
}
