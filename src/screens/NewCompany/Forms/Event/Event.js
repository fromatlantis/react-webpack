import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'

import formView from '../FormView'
import styles from '../index.module.css'

const dataSource = [
    {
        key: '1',
        comname: 'REMODEO',
        name: '东方月初',
        capital: 520,
        num: 100,
        percent: '30%',
        org: 'XXX代理公司',
        update: '2019-05-20',
    },
    {
        key: '2',
        comname: 'REMODEO',
        name: '东方月初',
        capital: 520,
        num: 100,
        percent: '30%',
        org: 'XXX代理公司',
        update: '2019-05-20',
    },
]

const columns = [
    {
        title: '投资公司名称',
        dataIndex: 'comname',
        key: 'comname',
    },
    {
        title: '执行事务合伙人',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '注册资本',
        dataIndex: 'capital',
        key: 'capital',
    },
    {
        title: '投资数额',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: '投资比例',
        dataIndex: 'percent',
        key: 'percent',
    },
    {
        title: '股权机构',
        dataIndex: 'org',
        key: 'org',
    },
    {
        title: '操作',
        dataIndex: 'update',
        key: 'update',
    },
]

export default class Event extends PureComponent {
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
    renderForm = type => {
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
            labelCol: { span: 3 },
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
                saveBtn={type === 'search' ? false : true}
            />
        )
    }
    render() {
        return (
            <Card
                title="投资事件"
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <div className={styles.searchCard}>{this.renderForm('search')}</div>
                <Table bordered pagination={false} dataSource={dataSource} columns={columns} />
                <Modal
                    title="投资事件"
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
