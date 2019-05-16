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
            })
        }
        render() {
            const { formItemLayout, layout, saveBtn, emptyBtn } = this.props
            const { getFieldDecorator } = this.props.form
            return (
                <Form {...formItemLayout} layout={layout} onSubmit={this.handleSubmit}>
                    {items.map((item, index) => {
                        return (
                            <Form.Item label={item.label} key={index}>
                                {/* {item.component} */}
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
                    {emptyBtn && (
                        <Form.Item wrapperCol={{ offset: formItemLayout.labelCol.span / 2 }}>
                            <Button
                                htmlType="submit"
                                style={{ marginRight: '10px' }}
                                onClick={() => this.props.empty()}
                            >
                                清空
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '10px', background: 'rgb(50,200,100)' }}
                                onClick={() => this.props.query()}
                            >
                                查询
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '10px' }}
                                onClick={() => this.props.add()}
                            >
                                新增
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
            return fields
        },
    })(FormView)
}
