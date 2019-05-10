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
    },
]

export default class Works extends PureComponent {
    state = {
        visible: false,
        columns: [
            {
                title: '著作权名称',
                dataIndex: 'fullname',
                key: 'fullname',
            },
            {
                title: '著作权类别',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '著作权人',
                dataIndex: 'authorNationality',
                key: 'authorNationality',
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
                title: '完成创作时间',
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
                label: '著作权名称',
                field: 'fullname',
                component: <Input />,
            },
            {
                label: '著作权类别',
                field: 'type',
                component: (
                    <Select
                        defaultValue="请选择"
                        style={{ width: 120 }}
                        onChange={() => this.handleChange()}
                    >
                        <Option value="音乐作平">音乐作平</Option>
                        <Option value="美术作品">美术作品</Option>
                        <Option value="文学作品">文学作品</Option>
                        <Option value="汇编作品">汇编作品</Option>
                        <Option value="影视作品">影视作品</Option>
                        <Option value="戏剧作品">戏剧作品</Option>
                        <Option value="舞蹈作品">舞蹈作品</Option>
                        <Option value="建筑作品">建筑作品</Option>
                        <Option value="工程设计图">工程设计图</Option>
                        <Option value="产品设计图">产品设计图</Option>
                        <Option value="地图、示意图作品">地图、示意图作品</Option>
                        <Option value="摄影作品">摄影作品</Option>
                        <Option value="计算机软件">计算机软件</Option>
                        <Option value="模型作品">模型作品</Option>
                        <Option value="其他作品">其他作品</Option>
                    </Select>
                ),
            },
            {
                label: '著作权人',
                field: 'authorNationality',
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
                label: '完成创作时间',
                field: 'finishTime',
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
