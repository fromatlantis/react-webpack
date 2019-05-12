import React, { PureComponent } from 'react'
import { Link, NavLink, Route } from 'react-router-dom'
import styles from './Agency.module.css'
import SupplierType from './SupplierType/SupplierType'
import CompanyRequire from './CompanyRequire/CompanyRequire'
import SupplierList from './SupplierList/SupplierList'
import GoHandle from './CompanyRequire/GoHandle/GoHandle'
import SupplierDetail from './SupplierList/SupplierDetail/SupplierDetail'
import SupplierEdit from './SupplierList/SupplierEdit/SupplierEdit'

export default class Agency extends PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.toalNav}>
                    <NavLink
                        exact
                        className={styles.nav}
                        activeClassName={styles.active}
                        to="/agency/companyRequire"
                    >
                        企业需求
                    </NavLink>
                    <NavLink
                        exact
                        className={styles.nav}
                        activeClassName={styles.active}
                        to="/agency/supplierList"
                    >
                        供应商列表
                    </NavLink>
                    <NavLink
                        exact
                        className={styles.nav}
                        activeClassName={styles.active}
                        to="/agency/supplierType"
                    >
                        供应商类型
                    </NavLink>
                </div>
                <div style={{ flex: 1 }}>
                    <Route exact path="/agency/companyRequire" component={CompanyRequire} />
                    <Route exact path="/agency/supplierList" component={SupplierList} />
                    <Route exact path="/agency/supplierType" component={SupplierType} />
                    <Route exact path="/agency/goHandle" component={GoHandle} />
                    <Route exact path="/agency/supplierDetail" component={SupplierDetail} />
                    <Route exact path="/agency/supplierEdit" component={SupplierEdit} />
                </div>
            </div>
        )
    }
}
