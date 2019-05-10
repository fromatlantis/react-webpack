import React, { PureComponent } from 'react'
import LeftMenu from './LeftMenu/LeftMenu'
import routes from './LeftMenu/menuData'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './NewCompany.module.css'

@connect(state => ({ router: state.router }))
class NewCompany extends PureComponent {
    render() {
        return (
            <div className={styles.root}>
                <div>
                    <LeftMenu />
                </div>
                <div style={{ flex: 1 }}>
                    {routes().map((item, index) => {
                        return (
                            <Route
                                exact
                                //strict
                                path={`/newCompany/${item.path}`}
                                component={item.component}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default NewCompany
