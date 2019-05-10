import React, { PureComponent } from 'react'
import { Card, Form, Input, Icon, AutoComplete } from 'antd'
import { UploadImg } from 'components'

class InfoForm extends PureComponent {
    search = () => {
        alert('1')
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        }
        const dataSource = ['12345', '23456', '34567']
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="企业名称">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入企业名称',
                            },
                        ],
                    })(
                        <AutoComplete
                            dropdownMatchSelectWidth={false}
                            dropdownStyle={{ width: 300 }}
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={dataSource}
                            placeholder="请输入企业名称"
                            optionLabelProp="value"
                            onChange={this.search}
                        >
                            <Input
                                suffix={<Icon type="search" className="certain-category-icon" />}
                            />
                        </AutoComplete>,
                    )}
                </Form.Item>
                <Form.Item label="企业logo">
                    {getFieldDecorator('logo', {
                        rules: [
                            {
                                required: true,
                                message: '请输入企业名称',
                            },
                        ],
                    })(<UploadImg />)}
                </Form.Item>
            </Form>
        )
    }
}
const WrappedForm = Form.create({ name: 'register' })(InfoForm)
export default class Info extends PureComponent {
    render() {
        return (
            <Card title="企业信息" bordered={false}>
                <WrappedForm />
            </Card>
        )
    }
}
