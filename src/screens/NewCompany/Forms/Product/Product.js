import React, { PureComponent } from 'react'
import { Button, Card, Table, Modal, Input, DatePicker } from 'antd'

import { UploadImg } from 'components'
import formView from '../FormView'
import logo from 'assets/hz.png'

const { TextArea } = Input
const dataSource = [
    {
        key: '1',
        photo: logo,
        name: '新能源电池',
        function:
            '九号平衡车体积小巧，重量只有12.8公斤，拥有超高性能，时速可达16km/h，可以让驾驶者体会到4倍于行走的速度。',
        intro: '九号平衡车，是小米公司推出“次时代玩具”。',
        update: '2019-05-20',
    },
    {
        key: '2',
        photo: logo,
        name: '新能源电池',
        function:
            '九号平衡车体积小巧，重量只有12.8公斤，拥有超高性能，时速可达16km/h，可以让驾驶者体会到4倍于行走的速度。',
        intro: '九号平衡车，是小米公司推出“次时代玩具”。',
        update: '2019-05-20',
    },
]

const columns = [
    {
        title: '产品图片',
        dataIndex: 'photo',
        key: 'photo',
        render: photo => <img src={photo} style={{ width: 100 }} alt="" />,
    },
    {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: '产品功能',
        dataIndex: 'function',
        key: 'function',
    },
    {
        title: '产品介绍',
        dataIndex: 'intro',
        key: 'intro',
    },
    {
        title: '操作',
        dataIndex: 'update',
        key: 'update',
    },
]

export default class Product extends PureComponent {
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
                label: '产品图片',
                field: 'avatar',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <UploadImg />,
            },
            {
                label: '产品名称',
                field: 'name',
                component: <Input />,
            },
            {
                label: '产品功能',
                field: 'duty',
                component: <TextArea />,
            },
            {
                label: '产品介绍',
                field: 'person',
                component: <TextArea />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
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
                title="主要产品"
                bordered={false}
                extra={
                    <Button type="primary" onClick={this.newInfo}>
                        新增
                    </Button>
                }
            >
                <Table bordered pagination={false} dataSource={dataSource} columns={columns} />
                <Modal
                    title="主要产品"
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
