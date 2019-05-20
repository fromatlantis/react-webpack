import React, { PureComponent } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import styles from './Agency.module.css'
import SupplierType from './SupplierType/Connect'
import CompanyRequire from './CompanyRequire/CompanyRequire'
import SupplierList from './SupplierList/SupplierList'
import GoHandle from './CompanyRequire/GoHandle/Connect'
import SupplierDetail from './SupplierList/SupplierDetail/Connect'
import SupplierEdit from './SupplierList/SupplierEdit/Connect'
import SupplierAdd from './SupplierList/SupplierAdd/SupplierAdd'
import GoView from './CompanyRequire/GoView/Connect'

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
                        // activeClassName={styles.active}
                        onClick={() => {
                            this.setState({ active: '1' })
                        }}
                        to="/agency/companyRequire"
                    >
                        企业需求
                    </NavLink>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '2' ? styles.active : ''
                        }`}
                        // activeClassName={styles.active}
                        onClick={() => {
                            this.setState({ active: '2' })
                        }}
                        to="/agency/supplierList"
                    >
                        供应商列表
                    </NavLink>
                    <NavLink
                        exact
                        className={`${styles.nav} ${
                            this.state.active === '3' ? styles.active : ''
                        }`}
                        // activeClassName={styles.active}
                        onClick={() => {
                            this.setState({ active: '3' })
                        }}
                        to="/agency/supplierType"
                    >
                        供应商类型
                    </NavLink>
                </div>
                <div style={{ flex: 1 }}>
                    <Route exact path="/agency/companyRequire" component={CompanyRequire} />
                    <Route exact path="/agency/supplierList" component={SupplierList} />
                    <Route exact path="/agency/supplierType" component={SupplierType} />
                    <Route exact path="/agency/goHandle/:id" component={GoHandle} />
                    <Route exact path="/agency/supplierDetail/:id" component={SupplierDetail} />
                    <Route exact path="/agency/supplierEdit/:id" component={SupplierEdit} />
                    <Route exact path="/agency/supplierAdd" component={SupplierAdd} />
                    <Route exact path="/agency/goView/:id" component={GoView} />
                </div>
            </div>
        )
    }
}
