import React, { PureComponent } from 'react'
import { Avatar, Row, Col } from 'antd'
import moment from 'moment'
import styles from './CompanyInfo.module.css'
export default class CompanyInfo extends PureComponent {
    render() {
        const item = {
            name: '钛罗（上海）机器人科技有限公司',
        }
        return (
            <div className={styles.infoCard}>
                <Avatar className={styles.avatar} src={item.logo} shape="square">
                    {item.name && item.name.substring(0, 4)}
                </Avatar>
                <div className={styles.detail}>
                    <h1 className={styles.title}>{item.name}</h1>
                    <Row gutter={16} style={{ marginTop: 6 }}>
                        <Col span={7}>
                            <div>法人：{item.legalPersonName}</div>
                        </Col>
                        <Col span={7}>
                            <div>注册资金：{item.regCapital}</div>
                        </Col>
                        <Col span={7}>
                            <div>
                                成立时间：
                                {moment(parseInt(item.estiblishTime)).format('YYYY-MM-DD')}
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 6 }}>
                        <Col span={7}>
                            <div>邮箱：{item.email}</div>
                        </Col>
                        <Col span={7}>
                            <div>联系电话：{item.phoneNumber}</div>
                        </Col>
                        <Col span={7}>
                            <div>官网：{item.websiteList}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 6 }}>
                        <Col span={16}>
                            <div>企业地址：{item.regLocation}</div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
