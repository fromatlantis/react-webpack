import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'

import formView from '../FormView'
import styles from '../index.module.css'

const dataSource = [
    {
        key: '1',
        date: '2019-05-20',
        money: 520,
        investor: '涂山',
        person: '东方月初',
        update: '2019-05-20',
    },
    {
        key: '2',
        date: '2019-05-20',
        money: 520,
        investor: '涂山',
        person: '东方月初',
        update: '2019-05-20',
    },
]

const columns = [
    {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '金额',
        dataIndex: 'money',
        key: 'money',
    },
    {
        title: '出资方',
        dataIndex: 'investor',
        key: 'investor',
    },
    {
        title: '更新人',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: '更新时间',
        dataIndex: 'update',
        key: 'update',
    },
]

export default class Finance extends PureComponent {
    state = {
        visible: false,
    }
    newInfo = () => {
        this.setState({
            visible: true,
        })
    }
    handleOk = () => {
        this.form.validateFields((errors, values) => {
            console.log(values)
        })
        this.setState({
            visible: false,
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    renderForm = () => {
        const items = [
            {
                label: '出资方',
                field: 'name',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '金额',
                field: 'money',
                component: <Input />,
            },
            {
                label: '时间',
                field: 'date',
                component: <DatePicker />,
            },
            {
                label: '更新人',
                field: 'person',
                component: <Input />,
            },
            {
                label: '更新时间',
                field: 'update',
                component: <DatePicker />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }
        const FormView = formView({ items, data: {} })
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                saveBtn={false}
            />
        )
    }
    render() {
        return (
            <Card
                title="融资信息"
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <Table bordered pagination={false} dataSource={dataSource} columns={columns} />
                <Modal
                    className={styles.modalBox}
                    title="融资信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    //footer={null}
                >
                    {this.renderForm()}
                </Modal>
            </Card>
        )
    }
}
