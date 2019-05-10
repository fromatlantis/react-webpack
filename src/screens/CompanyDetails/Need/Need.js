/**
 * 企服首页/企业详情==> Need 企业需求
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table } from 'antd'
import styles from '../CompanyDetails.module.css'

export default class Need extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="need"
                        className={styles.cardSty}
                        tabList={[{ key: '企业需求', tab: '企业需求' }]}
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
                                    title: '供应商类型',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '发起人',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '发起时间',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '状态',
                                    dataIndex: 'name2',
                                    key: 'name2',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '代理记账',
                                    age: '张三',
                                    address: '2018-10 12:00:00',
                                    name2: '已下单',
                                },
                                {
                                    key: '2',
                                    name: '知识产权',
                                    age: '张三',
                                    address: '2018-10 12:00:00',
                                    name2: '已办理',
                                },
                            ]}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
