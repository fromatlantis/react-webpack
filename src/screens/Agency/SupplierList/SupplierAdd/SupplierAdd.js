// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Form, Input, Divider, Select, TreeSelect, Breadcrumb, Card } from 'antd'
import styles from './SupplierAdd.module.css'
import { Link } from 'react-router-dom'
import { UploadImg } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../../redux/agencyRequire'

const { TextArea } = Input
class supplierEdit extends PureComponent {
    state = {
        value: undefined,
        classifyMap: [],
    }
    componentDidMount = () => {
        this.props.getServiceTypeList()
    }
    // 处理接口返回的数据
    nodeText = () => {
        let data = this.props.ServiceTypeList.filter(item => {
            return item.level === '1'
        })
        return data
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.category = values.category.join(',')
                this.props.addSupplier(values)
            }
        })
    }
    selectClassify = value => {
        let data = []
        value.map(id => {
            let temp = this.props.ServiceTypeList.filter(item => {
                return item.pid == id
            })
            temp.map(child => {
                data.push(child)
            })
        })
        this.setState({ classifyMap: data })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { classifyMap } = this.state
        let list = this.props.ServiceTypeList
        const Option = Select.Option
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        return (
            <div>
                <Card
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/agency/supplierList">供应商列表</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/agency/supplierAdd">供应商新建</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    bordered={false}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="LOGO:">
                            {getFieldDecorator('logo', {})(<UploadImg />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商分类:">
                            <Select
                                mode="multiple"
                                style={{ width: 375 }}
                                onChange={this.selectClassify}
                            >
                                {list &&
                                    this.nodeText().map(item => {
                                        return <Option key={item.id}>{item.typeName} </Option>
                                    })}
                            </Select>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商细类:">
                            {getFieldDecorator('classify', {
                                rules: [{ required: true, message: '请输入正确的供应商细类' }],
                            })(
                                <Select mode="multiple" style={{ width: 375 }}>
                                    {classifyMap.length &&
                                        classifyMap.map(item => {
                                            return <Option key={item.id}>{item.typeName}</Option>
                                        })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商名称:">
                            {getFieldDecorator('supplier', {
                                rules: [{ required: true, message: '请输入供应商名称' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系人:">
                            {getFieldDecorator('contract', {
                                rules: [{ required: true, message: '请输入联系人' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系人电话:">
                            {getFieldDecorator('telephone', {
                                rules: [
                                    { required: true, message: '请输入联系方式' },
                                    {
                                        pattern: /^1[3,4,5,7,8]\d{9}$|^(\d{3,4}-)?\d{7,8}$/,
                                        message: '联系方式有误，请重填',
                                    },
                                ],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="邮箱:">
                            {getFieldDecorator('email', {
                                rules: [
                                    { type: 'email', message: '请输入正确的邮箱' },
                                    { required: true, message: '请输入邮箱' },
                                ],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="官网:">
                            {getFieldDecorator('website', {
                                rules: [{ required: true, message: '请输入官网地址' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商简介:" layout="inline">
                            {getFieldDecorator('introduce', {
                                rules: [{ required: true, message: '请输入供应商简介' }],
                            })(<TextArea rows={6} style={{ width: '85%' }} />)}
                        </Form.Item>
                    </Form>
                    <div className={styles.btn}>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                            style={{ marginRight: 20 }}
                        >
                            保存
                        </Button>
                        <Button href="#/agency/supplierList">取消</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addSupplier: actions('addSupplier'),
            getServiceTypeList: actions('getServiceTypeList'),
        },
        dispatch,
    )
}

export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(supplierEdit),
)
