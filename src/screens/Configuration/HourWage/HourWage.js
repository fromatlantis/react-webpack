import React, { PureComponent } from 'react'
import { Card, InputNumber, Button, Input, Form } from 'antd'

class hourWage extends PureComponent {
    componentDidMount = () => {
        // this.props.getSetInfo()
    }
    submitForm = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                // this.props.addServiceType(fieldsValue)
                console.log('这是什么呀', fieldsValue)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        }
        return (
            <Card title="" bordered={false}>
                <Form {...formItemLayout}>
                    <Form.Item label="标准工时费用(每小时/每人):">
                        {getFieldDecorator('limitTime', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入工时费',
                                },
                                {
                                    pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                                    message: '工时费输入有误，请重新输入',
                                },
                            ],
                        })(<Input style={{ width: 200 }} />)}
                        <span> 元</span>
                    </Form.Item>
                    <Form.Item label="收费时间阈值：">
                        {getFieldDecorator('repairTime', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入收费时间阈值',
                                },
                            ],
                        })(<InputNumber min={1} max={60} />)}
                        <span className="ant-form-text"> 分钟</span>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ marginLeft: 220 }}
                            onClick={this.submitForm}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        return {
            standardLaborCost: Form.createFormField({ value: props.setDataList.standardLaborCost }),
            chargeableTimeLimit: Form.createFormField({
                value: props.setDataList.chargeableTimeLimit,
            }),
        }
    },
})(hourWage)
