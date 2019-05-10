import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'

import formView from '../FormView'
import styles from '../index.module.css'

const dataSource = [
    {
        key: '1',
        tmName: 'REMODEO',
        tmType: '普通商标',
        regNo: '36941601',
        category: '商标注册申请-受理通知书发文-结束',
        appDate: '2019-03-04',
        expire: '2022-03-05',
        company: 'XX有限公司',
        status: '结束',
        service: 'REMODEO智能耳机',
        org: 'xxx事务所',
    },
    {
        key: '2',
        tmName: 'REMODEO',
        tmType: '普通商标',
        regNo: '36941601',
        category: '商标注册申请-受理通知书发文-结束',
        appDate: '2019-03-04',
        expire: '2022-03-05',
        company: 'XX有限公司',
        status: '结束',
        service: 'REMODEO智能耳机',
        org: 'xxx事务所',
    },
]

const columns = [
    {
        title: '商标名称',
        dataIndex: 'tmName',
        key: 'tmName',
    },
    {
        title: '商标类型',
        dataIndex: 'tmType',
        key: 'tmType',
    },
    {
        title: '注册号',
        dataIndex: 'regNo',
        key: 'regNo',
    },
    {
        title: '状态',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: '申请时间',
        dataIndex: 'appDate',
        key: 'appDate',
    },
    {
        title: '使用期限',
        dataIndex: 'expire',
        key: 'expire',
    },
    {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: '申请进度',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '服务项目',
        dataIndex: 'service',
        key: 'service',
    },
    {
        title: '代理机构',
        dataIndex: 'org',
        key: 'org',
    },
    {
        title: '操作',
        dataIndex: 'update',
        key: 'update',
    },
]

export default class Trademark extends PureComponent {
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
                title="商标信息"
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
                    title="商标信息"
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
