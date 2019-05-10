/**
 * 企服首页/企业详情==> Relation 企业关系
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table } from 'antd'
import styles from '../CompanyDetails.module.css'

export default class Relation extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="relation:1"
                        title={<span style={{ color: '#1890ff' }}>企业图谱</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    />
                    <Card
                        id="relation:2"
                        title={<span style={{ color: '#1890ff' }}>投资图谱</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    />
                </div>
            </Fragment>
        )
    }
}
