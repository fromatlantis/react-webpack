/**
 * 物料管理 ==> 申请审批
 */
import React, { PureComponent } from 'react'
import { Alert, Button, Table, Input, DatePicker, Divider } from 'antd'
import { FormView } from 'components'

import styles from '../Material.module.css'

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

export default class Approval extends PureComponent {
    renderForm = type => {
        const items = [
            {
                label: '物料类型：',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '申请人：',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '状态：',
                field: 'applicationTime',
                component: <DatePicker />,
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
            <div>
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
                    <Alert message="共0条数据" type="info" showIcon />
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}
