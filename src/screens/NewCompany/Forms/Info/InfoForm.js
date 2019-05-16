import React, { PureComponent } from 'react'
import { Form, Icon, Input, Button, Checkbox, AutoComplete } from 'antd'
import { UploadImg } from 'components'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/newCompany'

const Option = AutoComplete.Option
const FormItem = Form.Item

class InfoForm extends PureComponent {
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
            }
        })
    }
    onSelect = (value, option) => {
        this.props.getBaseInfo(value)
    }
    handleSearch = word => {
        this.props.getSearchWord(word)
        console.log(word)
    }
    renderOptions = () => {
        const { searchWord } = this.props
        return searchWord.map(company => (
            <Option
                key={company.id}
                value={company.name.replace(/<em>/g, '').replace(/<\/em>/g, '')}
            >
                <span dangerouslySetInnerHTML={{ __html: company.name }} />
            </Option>
        ))
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const items = [
            {
                label: '企业名称',
                field: 'name',
                rules: [
                    {
                        required: true,
                        message: '请选择企业',
                    },
                ],
                component: (
                    <AutoComplete
                        optionLabelProp="value"
                        onSelect={this.onSelect}
                        //onChange={this.handleChange}
                        onSearch={this.handleSearch}
                        placeholder="请输入企业名称"
                    >
                        {this.renderOptions()}
                    </AutoComplete>
                ),
            },
            {
                label: '企业logo',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <UploadImg />,
            },
            {
                label: '企业税号',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '开户银行',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '银行账户',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '成立时间',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '法定代表人',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '注册资金',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '联系电话',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '企业邮箱',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
            {
                label: '企业地址',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
                component: <Input />,
            },
        ]
        const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 12 } }
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                <Form.Item wrapperCol={{ offset: formItemLayout.labelCol.span }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
const mapStateToProps = state => {
    return {
        searchWord: state.newCompany.searchWord,
        baseInfo: state.newCompany.baseInfo,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSearchWord: actions('getSearchWord'),
            getBaseInfo: actions('getBaseInfo'),
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    Form.create({
        name: 'baseinfo',
        mapPropsToFields(props) {
            console.log(props)
            const fields = {},
                baseInfo = props.baseInfo
            Object.keys(baseInfo).forEach(item => {
                fields[item] = Form.createFormField({
                    value: baseInfo[item],
                })
            })
            console.log(fields)
            return fields
        },
    })(InfoForm),
)
