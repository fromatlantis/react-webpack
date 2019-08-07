// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Form, Input, Select, Breadcrumb, Card } from 'antd'
import styles from './SupplierEdit.module.css'
import { Link } from 'react-router-dom'

const { TextArea } = Input

class supplierEdit extends PureComponent {
    state = {
        value: undefined,
        classifyMap: [],
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getSupplierDetail({ supplierId: id })
        this.props.getServiceTypeList()
    }
    // 初始化细类
    componentWillReceiveProps(nextProps) {
        if (this.props.detail !== nextProps.detail) {
            const category = this.props.ServiceTypeList.filter(item => item.level === '2').filter(
                item => nextProps.detail.classifyId.split(',').includes(item.id),
            )
            this.setState({
                classifyMap: category,
            })
        }
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
                // values.category = this.props.supperList.id
                let id = this.props.match.params.id
                values.id = id
                this.props.updateSupplier(values)
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
        // 重置细类
        this.props.form.setFieldsValue({
            classifies: [],
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
        let id = this.props.match.params.id
        return (
            <div>
                <Card
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/agency/supplierList">供应商列表</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/agency/supplierEdit/${id}`}>供应商编辑</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    bordered={false}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="供应商分类:">
                            {getFieldDecorator('categories', {
                                rules: [{ required: true, message: '请选择供应商类型' }],
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: 375 }}
                                    onChange={this.selectClassify}
                                >
                                    {list &&
                                        this.nodeText().map(item => {
                                            return <Option key={item.id}>{item.typeName} </Option>
                                        })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商细类:">
                            {getFieldDecorator('classifies', {
                                rules: [{ required: true, message: '请选择供应商细类' }],
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
export default Form.create({
    mapPropsToFields(props) {
        console.log(props.detail.categoryId)
        return {
            supplier: Form.createFormField({ value: props.detail.supplier }),
            contract: Form.createFormField({ value: props.detail.contract }),
            telephone: Form.createFormField({ value: props.detail.telephone }),
            email: Form.createFormField({ value: props.detail.email }),
            website: Form.createFormField({ value: props.detail.website }),
            introduce: Form.createFormField({ value: props.detail.introduce }),
            categories: Form.createFormField({
                value: props.detail.categoryId ? props.detail.categoryId.split(',') : [],
            }),
            classifies: Form.createFormField({
                value: props.detail.classifyId ? props.detail.classifyId.split(',') : [],
            }),
        }
    },
})(supplierEdit)
