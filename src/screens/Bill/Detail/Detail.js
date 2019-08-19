import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Breadcrumb, Input, Card, Table } from 'antd'
import { FormView } from 'components'
import { CompanyInfo, BaseInfo, Changes } from '../../components'
import theme from 'Theme'
export default class Detail extends PureComponent {
    render() {
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Link to="/bill">账单管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>企业详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <CompanyInfo />
                <div className={theme.detailCard} style={{ marginTop: '0.4rem' }}>
                    <div className={theme.titleChip}>
                        <div>
                            <span className={theme.divider}>|</span>
                            <span className={theme.title}>账单列表</span>
                        </div>
                    </div>
                    <Table
                        bordered={true} //边框
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        columns={[
                            {
                                title: '标题',
                                dataIndex: 'title',
                                key: 'title',
                                align: 'center',
                            },
                            {
                                title: '新闻来源',
                                dataIndex: 'website',
                                key: 'website',
                                align: 'center',
                            },
                            {
                                title: '发布时间',
                                dataIndex: 'time',
                                key: 'time',
                                align: 'center',
                            },
                        ]}
                        dataSource={[]}
                    />
                </div>
                <BaseInfo />
                <Changes />
            </div>
        )
    }
}
