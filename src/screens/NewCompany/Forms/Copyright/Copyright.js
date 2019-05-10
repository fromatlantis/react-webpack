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
        fullname: '著作权名称',
        authorNationality: '著作权人',
        simplename: '简称',
        regtime: '登记日期',
        regnum: '登记号',
        catnum: '分类号',
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
        fullname: '著作权名称1',
        authorNationality: '著作权人1',
        simplename: '简称1',
        regtime: '登记日期1',
        regnum: '登记号1',
        catnum: '分类号1',
    },
]

export default class Copyright extends PureComponent {
    state = {
        visible: false,
        columns: [
            {
                title: '著作权名称',
                dataIndex: 'fullname',
                key: 'fullname',
            },
            {
                title: '著作权人',
                dataIndex: 'authorNationality',
                key: 'authorNationality',
            },
            {
                title: '简称',
                dataIndex: 'simplename',
                key: 'simplename',
            },
            {
                title: '登记日期',
                dataIndex: 'regtime',
                key: 'regtime',
            },
            {
                title: '登记号',
                dataIndex: 'regnum',
                key: 'regnum',
            },
            {
                title: '分类号',
                dataIndex: 'catnum',
                key: 'catnum',
            },
            {
                title: '操作',
                dataIndex: 'key',
                key: 'key',
                render: data => (
                    <div>
                        <Button type="primary" onClick={() => this.newInfo(data)}>
                            编辑
                        </Button>
                        <Button style={{ marginLeft: '10px' }} onClick={() => this.del(data)}>
                            删除
                        </Button>
                    </div>
                ),
            },
        ],
    }
    del(id) {
        console.log(id + 'del')
    }
    look(id) {
        console.log(id)
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
            // {
            //     label: '出资方',
            //     field: 'name',
            //     rules: [
            //         {
            //             required: true,
            //             message: '请输入企业名称',
            //         },
            //     ],
            //     component: <Input />,
            // },
            {
                label: '著作权名称',
                field: 'fullname',
                component: <Input />,
            },
            {
                label: '简称',
                field: 'simplename',
                component: <Input />,
            },
            {
                label: '登记日期',
                field: 'regtime',
                component: <Input />,
            },
            {
                label: '登记号',
                field: 'regnum',
                component: <Input />,
            },
            {
                label: '分类号',
                field: 'catnum',
                component: <Input />,
            },
            {
                label: '分类号',
                field: 'catnum',
                component: <Input />,
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
                // saveBtn={type === 'search' ? false : true}
                saveBtn={false}
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
                <Table
                    bordered
                    pagination={false}
                    dataSource={dataSource}
                    columns={this.state.columns}
                />
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
