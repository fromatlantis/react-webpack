import React, { PureComponent } from 'react'
import { Avatar, Row, Col } from 'antd'
import moment from 'moment'
import styles from './CompanyInfo.module.css'
import { connect } from 'react-redux'
@connect(state => ({
    customerBaseInfo: state.customer.customerBaseInfo,
}))
class CompanyInfo extends PureComponent {
    render() {
        const item = this.props.customerBaseInfo
        const rentTypeStr = {
            '1': '租',
            '2': '售',
        }
        return (
            <div className={styles.infoCard}>
                <Avatar className={styles.avatar} shape="square">
                    {item.customerName && item.customerName.substring(0, 4)}
                </Avatar>
                <div className={styles.detail}>
                    <h1 className={styles.title}>{item.customerName}</h1>
                    <Row gutter={16} style={{ marginTop: 6 }}>
                        <Col span={7}>
                            <div>业主名称：{item.ownerName}</div>
                        </Col>
                        <Col span={7}>
                            <div>楼栋：{item.building}</div>
                        </Col>
                        <Col span={7}>
                            <div>房号：{item.room}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 6 }}>
                        <Col span={7}>
                            <div>邮箱：{item.email}</div>
                        </Col>
                        <Col span={7}>
                            <div>手机号：{item.phone}</div>
                        </Col>
                        <Col span={7}>
                            <div>租售类型：{rentTypeStr[item.rentType]}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 6 }}>
                        <Col span={7}>
                            <div>产品类型：{item.productType}</div>
                        </Col>
                        <Col span={7}>
                            <div>业务员：{item.businessManager}</div>
                        </Col>
                        <Col span={7}>
                            <div>中介：{item.medium}</div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default CompanyInfo
