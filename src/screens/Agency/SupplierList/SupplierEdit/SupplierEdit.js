// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Form, Input, Divider, Select, TreeSelect, Breadcrumb } from 'antd'
import styles from './SupplierEdit.module.css'
import { Link } from 'react-router-dom'

const { TextArea } = Input
const TreeNode = TreeSelect.TreeNode
class supplierEdit extends PureComponent {
    state = {
        value: undefined,
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('vales', values)
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
        return (
            <div className={styles.container}>
                <Breadcrumb className={styles.title}>
                    <Breadcrumb.Item>
                        <Link to="/agency/supplierList">供应商列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/agency/supplierEdit">供应商编辑</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/* <div className={styles.title}>供应商列表/供应商编辑</div> */}
                <Divider />
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="供应商分类:">
                        {getFieldDecorator('type')(
                            <TreeSelect
                                showSearch
                                style={{ width: 375 }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                multiple
                                treeDefaultExpandAll
                            >
                                <TreeNode value="parent 1" title="知识产权" key="0-1" />
                                <TreeNode value="parent 2" title="人资服务" key="random2" />
                                <TreeNode value="parent 3" title="法律服务" key="random3" />
                                <TreeNode value="parent 4" title="代理记账" key="random4" />
                            </TreeSelect>,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="供应商细类:">
                        {getFieldDecorator('xiFen', {
                            rules: [{ required: true, message: '请输入' }],
                        })(
                            <TreeSelect
                                showSearch
                                style={{ width: 375 }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                                allowClear
                                multiple
                                treeDefaultExpandAll
                            >
                                <TreeNode value="parent 1" title="知识产权" key="0-1" />
                                <TreeNode value="parent 2" title="人资服务" key="random2" />
                                <TreeNode value="parent 3" title="法律服务" key="random3" />
                                <TreeNode value="parent 4" title="代理记账" key="random4" />
                            </TreeSelect>,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="供应商名称:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入供应商名称' }],
                        })(<Input className={styles.inputStyle} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系人:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入联系人' }],
                        })(<Input className={styles.inputStyle} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系人电话:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入联系人电话' }],
                        })(<Input className={styles.inputStyle} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="邮箱:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入邮箱' }],
                        })(<Input className={styles.inputStyle} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="官网:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入官网地址' }],
                        })(<Input className={styles.inputStyle} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="供应商简介:" layout="inline">
                        {getFieldDecorator('synopsis')(
                            <TextArea rows={6} style={{ width: '85%' }} />,
                        )}
                    </Form.Item>
                </Form>
                <div className={styles.btn}>
                    <Button type="primary" onClick={this.handleSubmit} style={{ marginRight: 20 }}>
                        保存
                    </Button>
                    <Button>取消</Button>
                </div>
            </div>
        )
    }
}

export default Form.create()(supplierEdit)
