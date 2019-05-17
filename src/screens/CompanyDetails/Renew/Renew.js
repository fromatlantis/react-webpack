/**
 * 企服首页/企业详情==> Property 更新记录
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button } from 'antd'
import styles from '../CompanyDetails.module.css'

export default class Renew extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="renew:1"
                        title={<span style={{ color: '#1890ff' }}>更新消息</span>}
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
                                    title: '更新项',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '更新时间',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '消息内容',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '投资关系',
                                    age: '2018-10-01',
                                    address: '张三投资本公司一亿美金',
                                },
                                {
                                    key: '2',
                                    name: '投资关系',
                                    age: '2018-10-01',
                                    address: '张三投资本公司一亿美金',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="renew:2"
                        title={<span style={{ color: '#1890ff' }}>历史记录</span>}
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
                                    title: '变更日期',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '变更项',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '变更方式',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '变更前',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '变更后',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: '2018-10-01',
                                    age: '投资人',
                                    address: '爬取信息',
                                    money: '2019-04-03',
                                    duess:
                                        '吴明辉,自然人股东闵启阳,自然人股东【退出】董斌,自然人股东',
                                    data: '吴明辉,自然人股东董斌,自然人股东',
                                },
                                {
                                    key: '2',
                                    name: '2018-10-01',
                                    age: '投资人',
                                    address: '爬取信息',
                                    money: '2019-04-03',
                                    duess:
                                        '吴明辉,自然人股东闵启阳,自然人股东【退出】董斌,自然人股东',
                                    data: '吴明辉,自然人股东董斌,自然人股东',
                                },
                            ]}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
