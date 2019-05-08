import React, { Component } from 'react'
import { Form, Card } from 'antd'
import PropTypes from 'prop-types'
export default class TenantForm extends Component {
    static defaultProps = {
        title: '默认标题',
    }

    static childContextTypes = {
        form: PropTypes.object,
    }
    getChildContext() {
        return {
            form: this.props.form,
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) return
            let formData = null
            if (this.props.enctype === 'form') {
                formData = new FormData()
                Object.keys(values).map(key => {
                    formData.append(key, values[key])
                })
            } else {
                formData = {}

                // 暂时没想到好的办法
                Object.keys(values).map(item => {
                    formData[item] =
                        values[item].constructor.name === 'Moment'
                            ? values[item].format('YYYY-MM-DD')
                            : values[item]
                })

                console.log(formData)
            }

            this.props.onSubmit(formData)
        })
    }

    render() {
        return (
            <Card title={this.props.title} style={{ display: this.props.hide ? 'none' : 'block' }}>
                <Form onSubmit={this.handleSubmit}>{this.props.children}</Form>
            </Card>
        )
    }
}
