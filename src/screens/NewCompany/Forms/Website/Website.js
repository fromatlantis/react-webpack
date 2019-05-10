import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, Select } from 'antd'
import formView from '../FormView'
import styles from '../index.module.css'

const Option = Select.Option
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
        type: '作品类别',
        finishTime: '创作完成日期',
        webSite: '网站首页',
        ym: '主办单位/域名/网站',
        examineDate: '审核时间',
        liscense: '备案号',
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
        type: '作品类别',
        finishTime: '创作完成日期',
        webSite: '网站首页',
        ym: '主办单位/域名/网站',
        examineDate: '审核时间',
        liscense: '备案号',
    },
]

export default class Website extends PureComponent {
    state = {
        visible: false,
        columns: [
            {
                title: '主办单位/域名/网站',
                dataIndex: 'ym',
                key: 'ym',
            },
            {
                title: '机构代码',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '主办单位性质',
                dataIndex: 'authorNationality',
                key: 'authorNationality',
            },
            {
                title: '备案号',
                dataIndex: 'liscense',
                key: 'liscense',
            },
            {
                title: '网站首页',
                dataIndex: 'webSite',
                key: 'webSite',
            },
            {
                title: '审核时间',
                dataIndex: 'examineDate',
                key: 'examineDate',
            },
            {
                title: '状态',
                dataIndex: 'examineDate',
                key: 'examineDate',
            },
            {
                title: '创建时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
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
    handleChange(value) {
        console.log(value)
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
                label: '主办单位/域名/网站',
                field: 'ym',
                component: <Input />,
            },
            {
                label: '机构代码',
                field: 'type',
                component: <Input />,
            },
            {
                label: '主办单位性质',
                field: 'type',
                component: (
                    <Select
                        defaultValue="请选择"
                        style={{ width: 120 }}
                        onChange={() => this.handleChange()}
                    >
                        <Option value="企业">企业</Option>
                        <Option value="个人">个人</Option>
                    </Select>
                ),
            },
            {
                label: '备案号',
                field: 'liscense',
                component: <Input />,
            },
            {
                label: '网站首页',
                field: 'webSite',
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
                title="知识产权-作品著作权"
                bordered={false}
                extra={
                    <div>
                        <Button type="primary" onClick={this.newInfo}>
                            预览
                        </Button>
                        <Button onClick={this.newInfo} style={{ marginLeft: '10px' }}>
                            存档
                        </Button>
                    </div>
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
                    title="知识产权-作品著作权"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.renderForm()}
                </Modal>
            </Card>
        )
    }
}
