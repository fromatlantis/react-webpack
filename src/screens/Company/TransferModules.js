import React, { PureComponent } from 'react'
import { Select } from 'antd'
import { connect } from 'react-redux'
import { IconFont, FormView } from 'components'
@connect(state => {
    return {
        auths: state.authUser.auths,
    }
})
class TransferModules extends PureComponent {
    render() {
        const { auths } = this.props
        if (auths.includes('企服领导')) {
            return (
                <FormView
                    ref={form => {
                        this.form = form
                    }}
                    formItemLayout={{ labelCol: { span: 7 }, wrapperCol: { span: 13 } }}
                    items={[
                        {
                            label: '企服负责人',
                            field: 'years',
                            component: <Select />,
                        },
                        {
                            label: '企服服务模块',
                            field: 'updateTime',
                            component: <Select />,
                        },
                    ]}
                    saveBtn={false}
                />
            )
        } else if (auths.includes('招商总监')) {
            return (
                <FormView
                    ref={form => {
                        this.form = form
                    }}
                    formItemLayout={{ labelCol: { span: 7 }, wrapperCol: { span: 13 } }}
                    items={[
                        {
                            label: '招商负责人',
                            field: 'years',
                            component: <Select />,
                        },
                        {
                            label: '招商服务模块',
                            field: 'updateTime',
                            component: <Select />,
                        },
                    ]}
                    saveBtn={false}
                />
            )
        }
    }
}
export default TransferModules
