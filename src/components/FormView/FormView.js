import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'

class FormView extends PureComponent {
    static defaultProps = {
        formItemLayout: { labelCol: { span: 3 }, wrapperCol: { span: 13 } },
        layout: 'horizontal',
        saveBtn: true,
        items: [],
        data: {},
    }
    static propTypes = {
        formItemLayout: PropTypes.object,
        layout: PropTypes.string,
        saveBtn: PropTypes.bool,
        items: PropTypes.array,
        data: PropTypes.object,
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            } else {
                this.props.onSubmit(fieldsValue)
            }
            console.log('Received values of form: ', fieldsValue)
        })
    }
    render() {
        const { formItemLayout, layout, saveBtn, items } = this.props
        const { getFieldDecorator } = this.props.form
        //console.log(saveBtn + 'saveBtn')
        return (
            <Form {...formItemLayout} layout={layout} onSubmit={this.handleSubmit}>
                {items.map((item, index) => {
                    return (
                        <Form.Item label={item.label} style={item.style} key={index}>
                            {/* {item.component} */}
                            {item.field
                                ? getFieldDecorator(item.field, {
                                      initialValue: item.initialValue,
                                      rules: item.rules,
                                  })(item.component)
                                : item.component}
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
export default Form.create({
    //name: 'register',
    onFieldsChange(props, changedFields) {
        if (props.onChange) {
            props.onChange(changedFields)
        }
    },
    mapPropsToFields({ items = [], data = {} }) {
        const fields = {}
        items
            .filter(item => !item.initialValue)
            .forEach(item => {
                let { field, formatter } = item
                let getValue = data[item.field]
                if (!getValue) {
                    getValue = null
                } else if (formatter) {
                    getValue = formatter(getValue, { ...data })
                }
                fields[field] = Form.createFormField({
                    value: getValue,
                })
            })
        return fields
    },
})(FormView)
export const SearchView = Form.create()(FormView)
