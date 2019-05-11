// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Form, Input, Divider, Table, Select, TreeSelect, Breadcrumb } from 'antd'
import styles from './SupplierDetail.module.css'
import { Link } from 'react-router-dom'

const { TextArea } = Input
const TreeNode = TreeSelect.TreeNode
class supplierDetail extends PureComponent {
    handleSubmit = e => {
        e.preventDefault()
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
        const data = [
            {
                key: 1,
                supplierType: '启迪智慧',
                money: '张三',
                companyType: '11943675888',
                companyName: '11+94367511@qq.com',
                companyRelative: '2019-02-09',
                companyPhone: '知识产权',
                time: '5分',
                serverType: '服务类型',
            },
            {
                key: 2,
                supplierType: '启迪智慧',
                money: '张三',
                companyType: '11943675888',
                companyName: '11+94367511@qq.com',
                companyRelative: '2019-02-09',
                companyPhone: '知识产权',
                time: '5分',
                serverType: '服务类型',
            },
            {
                key: 3,
                supplierType: '启迪智慧',
                money: '张三',
                companyType: '11943675888',
                companyName: '11+94367511@qq.com',
                companyRelative: '2019-02-09',
                companyPhone: '知识产权',
                time: '5分',
                serverType: '服务类型',
            },
        ]
        const columns = [
            {
                title: '序号',
                key: 'num',
                dataIndex: 'num',
                align: 'center',
                render: (text, record, index) => <span key={text}>{index + 1}</span>,
            },
            {
                title: '企业名称',
                dataIndex: 'supplierType',
                key: 'supplierType',
                align: 'center',
            },
            {
                title: '联系人',
                dataIndex: 'money',
                key: 'money',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'companyType',
                key: 'companyType',
                align: 'center',
            },
            {
                title: '邮箱',
                dataIndex: 'companyName',
                key: 'companyName',
                align: 'center',
            },
            {
                title: '服务时间',
                dataIndex: 'companyRelative',
                key: 'companyRelative',
                align: 'center',
            },
            {
                title: '服务类型',
                dataIndex: 'serverType',
                key: 'serverType',
                align: 'center',
            },
            {
                title: '评价',
                dataIndex: 'companyPhone',
                key: 'companyPhone',
                align: 'center',
            },
            {
                title: '评价描述',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
            },
        ]
        return (
            <div className={styles.container}>
                <Breadcrumb className={styles.title}>
                    <Breadcrumb.Item>
                        <Link to="/agency/supplierList">供应商列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/agency/supplierDetail">供应商详情</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/* <div className={styles.title}>供应商列表/供应商详情</div> */}
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
                        })(<Input className={styles.inputStyle} disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系人:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入联系人' }],
                        })(<Input className={styles.inputStyle} disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="联系人电话:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入联系人电话' }],
                        })(<Input className={styles.inputStyle} disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="邮箱:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入邮箱' }],
                        })(<Input className={styles.inputStyle} disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="官网:">
                        {getFieldDecorator('spaceName', {
                            rules: [{ required: true, message: '请输入官网地址' }],
                        })(<Input className={styles.inputStyle} disabled />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="供应商简介:" layout="inline">
                        {getFieldDecorator('synopsis')(
                            <TextArea rows={6} disabled style={{ width: '85%' }} />,
                        )}
                    </Form.Item>
                </Form>
                <div className={styles.order}>服务记录：共XX条</div>
                <Table
                    style={{ margin: '20px 0' }}
                    columns={columns}
                    dataSource={data}
                    // rowKey={(record, index) => `complete${record.id}${index}`}
                    // dataSource={this.props.parkNoticeList}
                    // pagination={{
                    //     current: pageNo,
                    //     showSizeChanger: true,
                    //     showQuickJumper: true,
                    //     pageSizeOptions: ['10', '15', '20'],
                    //     total: this.props.total,
                    //     onShowSizeChange: this.onShowSizeChange.bind(this),
                    //     onChange: this.onChange.bind(this)
                    // }}
                />
                <div className={styles.btn}>
                    <Button>取消</Button>
                </div>
            </div>
        )
    }
}

export default Form.create()(supplierDetail)
