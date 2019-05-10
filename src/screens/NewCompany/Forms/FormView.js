import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'

export default ({ items, data }) => {
    class FormView extends PureComponent {
        static defaultProps = {
            formItemLayout: { labelCol: { span: 3 }, wrapperCol: { span: 12 } },
            layout: 'horizontal',
            saveBtn: true,
        }
        static propTypes = {
            formItemLayout: PropTypes.object,
            layout: PropTypes.string,
            saveBtn: PropTypes.bool,
        }
        handleSubmit = e => {
            e.preventDefault()
            this.props.form.validateFields((err, fieldsValue) => {
                if (err) {
                    return
                }
                console.log('Received values of form: ', fieldsValue)
            })
        }
        render() {
            const { formItemLayout, layout, saveBtn } = this.props
            const { getFieldDecorator } = this.props.form
            return (
                <Form {...formItemLayout} layout={layout} onSubmit={this.handleSubmit}>
                    {items.map((item, index) => {
                        return (
                            <Form.Item label={item.label} key={index}>
                                {getFieldDecorator(item.field, {
                                    rules: item.rules,
                                })(item.component)}
                            </Form.Item>
                        )
                    })}
                    {saveBtn && (
                        <Form.Item wrapperCol={{ offset: formItemLayout.labelCol.span }}>
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            )
        }
    }
    return Form.create({
        name: 'register',
        mapPropsToFields(props) {
            const fields = {}
            items.forEach(item => {
                fields[item.field] = Form.createFormField({
                    value: data[item.field],
                })
            })
            console.log(fields)
            return fields
        },
    })(FormView)
}
