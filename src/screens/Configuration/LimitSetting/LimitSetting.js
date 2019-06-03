import React, { PureComponent } from 'react'
import { Card, InputNumber, Button, Form } from 'antd'
import FormView from '../../../components/FormView/FormView'

class LimitSetting extends PureComponent {
    componentDidMount = () => {
        this.props.getSetInfo()
    }
    submitForm = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                this.props.setTimeLimit(fieldsValue)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 18 },
        }
        return (
            <Card title="" bordered={false}>
                <Form {...formItemLayout}>
                    <Form.Item label="派工时限:">
                        {getFieldDecorator('dispatchingTimeLimit', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入派工时限',
                                },
                            ],
                        })(<InputNumber min={1} />)}
                        <span> 分钟</span>
                    </Form.Item>
                    <Form.Item label="维修签到时限：">
                        {getFieldDecorator('repairTimeLimit', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入维修签到时限',
                                },
                            ],
                        })(<InputNumber min={1} />)}
                        <span className="ant-form-text"> 分钟</span>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ marginLeft: 100, marginTop: 30 }}
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
            dispatchingTimeLimit: Form.createFormField({
                value: props.setDataList.dispatchingTimeLimit,
            }),
            repairTimeLimit: Form.createFormField({
                value: props.setDataList.repairTimeLimit,
            }),
        }
    },
})(LimitSetting)
