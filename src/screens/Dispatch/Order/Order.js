import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Input, DatePicker, Divider, Modal } from 'antd'
import { FormView } from 'components'

import NewOrder from './NewOrder'
import DispatchForm from './DispatchForm'
import TransferForm from './TransferForm'
import RepairDetail from './RepairDetail'
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

export default class Order extends PureComponent {
    state = {
        newInfo: false,
        dispatchForm: false,
        transferForm: false,
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
    // 派工
    dispatchForm = () => {
        this.setState({
            dispatchForm: true,
        })
    }
    dispatchFormOk = () => {
        this.setState({
            dispatchForm: false,
        })
    }
    dispatchFormCancel = () => {
        this.setState({
            dispatchForm: false,
        })
    }
    // 转办
    transferForm = () => {
        this.setState({
            transferForm: true,
        })
    }
    transferFormOk = () => {
        this.setState({
            transferForm: false,
        })
    }
    transferFormCancel = () => {
        this.setState({
            transferForm: false,
        })
    }
    render() {
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
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: () => (
                    <div>
                        <Button onClick={this.dispatchForm} type="link" size="small">
                            派工
                        </Button>
                        <Divider type="vertical" />
                        <Button onClick={this.transferForm} type="link" size="small">
                            转办
                        </Button>
                    </div>
                ),
            },
        ]
        return (
            <Card title="申请报修" bordered={false}>
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
                >
                    <NewOrder />
                </Modal>
                <Modal
                    title="派工"
                    visible={this.state.dispatchForm}
                    onOk={this.dispatchFormOk}
                    onCancel={this.dispatchFormCancel}
                    width={800}
                >
                    <RepairDetail />
                    <Divider />
                    <DispatchForm />
                </Modal>
                <Modal
                    title="转办"
                    visible={this.state.transferForm}
                    onOk={this.transferFormOk}
                    onCancel={this.transferFormCancel}
                    width={800}
                >
                    <RepairDetail />
                    <Divider />
                    <TransferForm />
                </Modal>
            </Card>
        )
    }
}
