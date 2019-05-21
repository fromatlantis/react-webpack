// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Form, Input, Divider, Select, TreeSelect, Breadcrumb, Card } from 'antd'
import styles from './SupplierEdit.module.css'
import { Link } from 'react-router-dom'

const { TextArea } = Input
const TreeNode = TreeSelect.TreeNode
class supplierEdit extends PureComponent {
    state = {
        value: undefined,
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getSupplierList({ id: id })
        this.props.getServiceTypeList()
    }
    // 处理接口返回的数据
    nodeText = () => {
        let ServiceTypeList = this.props.ServiceTypeList
        let keys = [],
            newList = []
        ServiceTypeList.filter(item => {
            return item.level === '1'
        }).map(child => {
            if (keys.indexOf(child.id) < 0) {
                keys.push({ key: child.id, typeName: child.typeName })
            }
            return true
        })
        let temp = ServiceTypeList.filter(item => {
            return item.level === '2'
        })
        keys.forEach(parent => {
            let items = []
            temp.forEach(child => {
                if (parent.key === child.pid) {
                    items.push(child)
                }
            })
            newList.push({ parent, items })
        })
        return newList
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
    render() {
        const { getFieldDecorator } = this.props.form
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
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: '请输入供应商分类' }],
                            })(
                                <TreeSelect
                                    showSearch
                                    style={{ width: 375 }}
                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                >
                                    {this.nodeText().map(item => {
                                        if (item.items.length > 0) {
                                            return (
                                                <TreeNode
                                                    value={item.parent.key}
                                                    title={item.parent.typeName}
                                                    key={item.parent.key}
                                                    disabled
                                                >
                                                    {item.items.map(type => {
                                                        return (
                                                            <TreeNode
                                                                key={type.id}
                                                                title={type.typeName}
                                                                value={type.id}
                                                            />
                                                        )
                                                    })}
                                                </TreeNode>
                                            )
                                        } else {
                                            return (
                                                <TreeNode
                                                    value={item.parent.key}
                                                    key={item.parent.key}
                                                    title={item.parent.typeName}
                                                    disabled
                                                />
                                            )
                                        }
                                    })}
                                </TreeSelect>,
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
        return {
            supplier: Form.createFormField({ value: props.supperList.supplier }),
            contract: Form.createFormField({ value: props.supperList.contract }),
            telephone: Form.createFormField({ value: props.supperList.telephone }),
            email: Form.createFormField({ value: props.supperList.email }),
            website: Form.createFormField({ value: props.supperList.website }),
            introduce: Form.createFormField({ value: props.supperList.introduce }),
            category: Form.createFormField({ value: props.supperList.category_id }),
        }
    },
})(supplierEdit)
