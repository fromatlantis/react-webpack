import React, { PureComponent } from 'react'
import { Alert, Button, Table, Input, DatePicker, Divider, Modal } from 'antd'
import { FormView } from 'components'

import NewOrder from './NewOrder'
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

export default class Order extends PureComponent {
    state = {
        newInfo: false,
    }
    renderForm = type => {
        const items = [
            {
                label: '报修类型',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '状态',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '报修时间',
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
    // 新建派工弹窗
    newInfo = () => {
        this.setState({
            newInfo: true,
        })
    }
    newInfoOk = () => {
        this.setState({
            newInfo: false,
        })
    }
    newInfoCancel = () => {
        this.setState({
            newInfo: false,
        })
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
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            新建派工
                        </Button>
                    </div>
                    <Alert message="Informational Notes" type="info" showIcon />
                </div>
                <Table dataSource={dataSource} columns={columns} />
                <Modal
                    title="新建派工"
                    visible={this.state.newInfo}
                    onOk={this.newInfoOk}
                    onCancel={this.newInfoCancel}
                    className={styles.newFormInline}
                >
                    <NewOrder />
                </Modal>
            </div>
        )
    }
}
