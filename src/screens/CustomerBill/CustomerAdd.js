import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import CustomerForm from '../components/CustomerForm/CustomerForm'
import theme from 'Theme'

class CustomerAdd extends PureComponent {
    render() {
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/bill">账单管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>新增客户</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={theme.content}>
                    <CustomerForm />
                </div>
            </div>
        )
    }
}
export default CustomerAdd
