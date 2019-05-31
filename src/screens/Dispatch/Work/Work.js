import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Input, DatePicker, Divider } from 'antd'
import { FormView } from 'components'

import styles from '../Dispatch.module.css'

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

export default class Work extends PureComponent {
    renderForm = type => {
        const items = [
            {
                label: '报修类型',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '工单状态',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '维修人',
                field: 'applicationTime',
                component: <Input />,
            },
        ]
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    render() {
        return (
            <Card title="申请报修" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            查询
                        </Button>
                    </div>
                    <Alert message="Informational Notes" type="info" showIcon />
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </Card>
        )
    }
}
