import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { CompanyInfo, BaseInfo, Changes } from '../../components'
import Bill from './Bill'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/customer'
@connect(
    state => ({
        customerBaseInfo: state.customer.customerBaseInfo,
        customerRentInfo: state.customer.customerRentInfo,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getCustomerBaseInfo: actions('getCustomerBaseInfo'),
                getCustomerRentInfo: actions('getCustomerRentInfo'),
            },
            dispatch,
        )
    },
)
class Detail extends PureComponent {
    componentDidMount() {
        const {
            match: { params },
        } = this.props
        this.props.getCustomerBaseInfo({
            customerId: params.id,
        })
        this.props.getCustomerRentInfo({
            customerId: params.id,
        })
    }
    render() {
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/bill">账单管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>企业详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <CompanyInfo />
                <Bill />
                <BaseInfo />
                <Changes category="bill" />
            </div>
        )
    }
}
export default Detail
