/**
 * 企服首页/企业详情==> Investment 投资关系
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table } from 'antd'
import styles from '../CompanyDetails.module.css'

export default class Investment extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="Investment:1"
                        title={<span style={{ color: '#1890ff' }}>投资事件</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '投资公司名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '执行事务合伙人',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '注册资本',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '投资数额',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '投资比例',
                                    dataIndex: 'desii',
                                    key: 'desii',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: 'XX公司',
                                    age: '张小明',
                                    address: '1亿美金',
                                    money: '5000万人民币',
                                    desii: '23.4%',
                                },
                                {
                                    key: '2',
                                    name: 'XX公司',
                                    age: '张小明',
                                    address: '1亿美金',
                                    money: '5000万人民币',
                                    desii: '23.4%',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="Investment:2"
                        title={<span style={{ color: '#1890ff' }}>对外投资</span>}
                        extra={<a>展开更多>></a>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            columns={[
                                {
                                    title: '被投资公司名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '被投资法定代表人',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '注册资本',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '投资数额',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '出资比例',
                                    dataIndex: 'duess',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '成立日期',
                                    dataIndex: 'data',
                                    key: 'data',
                                    align: 'center',
                                },
                                {
                                    title: '状态',
                                    dataIndex: 'state',
                                    key: 'state',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: 'REMODEO',
                                    age: '张小明',
                                    address: '1亿美金',
                                    money: '5000万人民币',
                                    duess: '23.4%',
                                    data: '2019-5-5',
                                    state: '存续',
                                },
                                {
                                    key: '2',
                                    name: 'REMODEO',
                                    age: '张小明',
                                    address: '1亿美金',
                                    money: '5000万人民币',
                                    duess: '23.4%',
                                    data: '2019-5-5',
                                    state: '注销',
                                },
                            ]}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
