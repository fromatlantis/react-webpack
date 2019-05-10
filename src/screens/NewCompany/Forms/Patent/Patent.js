import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'

import formView from '../FormView'
import styles from '../index.module.css'

const dataSource = [
    {
        key: '1',
        patentName: '消息推送方法及装置',
        appnumber: 'CN201510595839.9',
        applicationTime: '2019-03-04',
        expire: '2019-04-03',
        inventor: '李四',
        applicantName: 'XX有限责任公司',
        patentType: '发明授权',
        agency: 'XX有限公司',
        patentNo: 'CN105205140B',
        status: '公开',
        abstracts: '专利说明专利说明专利说明',
    },
    {
        key: '2',
        patentName: '消息推送方法及装置',
        appnumber: 'CN201510595839.9',
        applicationTime: '2019-03-04',
        expire: '2019-04-03',
        inventor: '李四',
        applicantName: 'XX有限责任公司',
        patentType: '发明授权',
        agency: 'XX有限公司',
        patentNo: 'CN105205140B',
        status: '公开',
        abstracts: '专利说明专利说明专利说明',
    },
]

const columns = [
    {
        title: '专利名称',
        dataIndex: 'patentName',
        key: 'patentName',
    },
    {
        title: '申请号',
        dataIndex: 'appnumber',
        key: 'appnumber',
    },
    {
        title: '申请日期',
        dataIndex: 'applicationTime',
        key: 'applicationTime',
    },
    {
        title: '授权日期',
        dataIndex: 'expire',
        key: 'expire',
    },
    {
        title: '专利发明人',
        dataIndex: 'inventor',
        key: 'inventor',
    },
    {
        title: '专利申请人',
        dataIndex: 'applicantName',
        key: 'applicantName',
    },
    {
        title: '专利类型',
        dataIndex: 'patentType',
        key: 'patentType',
    },
    {
        title: '专利代理结构',
        dataIndex: 'agency',
        key: 'agency',
    },
    {
        title: '公开号',
        dataIndex: 'patentNo',
        key: 'patentNo',
    },
    {
        title: '法律状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '专利说明',
        dataIndex: 'abstracts',
        key: 'abstracts',
    },
    {
        title: '操作',
        dataIndex: 'update',
        key: 'update',
    },
]

export default class Patent extends PureComponent {
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
                //saveBtn={type === 'search' ? false : true}
            />
        )
    }
    render() {
        return (
            <Card
                title="专利信息"
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
                    title="专利信息"
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
