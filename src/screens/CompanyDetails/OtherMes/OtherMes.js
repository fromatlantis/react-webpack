/**
 * 企服首页/企业详情==> OtherMes 其他信息
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button } from 'antd'
import styles from '../CompanyDetails.module.css'

export default class OtherMes extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="otherMes"
                        title={<span style={{ color: '#1890ff' }}>其他信息</span>}
                        extra={<Button type="link">展开更多>></Button>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '序号',
                                    dataIndex: 'key',
                                    key: 'key',
                                    align: 'center',
                                    render: (text, record, index) => <span>{index + 1}</span>,
                                },
                                {
                                    title: '提出人',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '提出时间',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '信息内容',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '张三',
                                    age: '2019-5-6 14:02:09    ',
                                    address:
                                        '其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息',
                                },
                                {
                                    key: '2',
                                    name: '张三',
                                    age: '2019-5-6 14:02:09    ',
                                    address:
                                        '其他信息其他信息其他信息其他信息其他信息其他信息其他信息其他信息',
                                },
                            ]}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
