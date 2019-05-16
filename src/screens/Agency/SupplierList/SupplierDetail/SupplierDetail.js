// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Form, Input, Divider, Select, TreeSelect, Breadcrumb, Card, Table } from 'antd'
import styles from './SupplierDetail.module.css'
import { Link } from 'react-router-dom'

const { TextArea } = Input
const TreeNode = TreeSelect.TreeNode
let parm = { pageNo: 1, pageSize: 10 }
class supplierEdit extends PureComponent {
    state = {
        value: undefined,
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getSupplierList({ id: id })
        parm.processStatus = '2'
        parm.recommendSupplier = id
        this.props.getDemandList(parm)
    }
    // table的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        parm.pageNo = 1
        parm.pageSize = pageSize
        this.props.getDemandList(parm)
    }
    // table的pageNo改变
    onChange = (pageNo, pageSize) => {
        parm.pageNo = pageNo
        parm.pageSize = pageSize
        this.props.getDemandList(parm)
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
                dataIndex: 'enterpriseName',
                key: 'enterpriseName',
                align: 'center',
            },
            {
                title: '联系人',
                dataIndex: 'contract',
                key: 'contract',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'telephone',
                key: 'telephone',
                align: 'center',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                align: 'center',
            },
            {
                title: '服务时间',
                dataIndex: 'responseTime',
                key: 'responseTime',
                align: 'center',
            },
            {
                title: '服务类型',
                dataIndex: 'category',
                key: 'category',
                align: 'center',
            },
            {
                title: '评价',
                dataIndex: 'evaluation',
                key: 'evaluation',
                align: 'center',
            },
            {
                title: '评价描述',
                dataIndex: 'description',
                key: 'description',
                align: 'center',
            },
        ]
        let id = this.props.match.params.id
        const list = this.props.demandList.map(item => {
            item.evaluation = '不错哦'
            item.description = '继续加油哦'
            return item
        })
        return (
            <div>
                <Card
                    title={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/agency/supplierList">供应商列表</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/agency/supplierDetail/${id}`}>供应商详情</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    bordered={false}
                >
                    <Form {...formItemLayout}>
                        <Form.Item {...formItemLayout} label="供应商分类:">
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: '请输入' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商名称:">
                            {getFieldDecorator('supplier', {
                                rules: [{ required: true, message: '请输入供应商名称' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系人:">
                            {getFieldDecorator('contract', {
                                rules: [{ required: true, message: '请输入联系人' }],
                            })(<Input className={styles.inputStyle} disabled />)}
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
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="邮箱:">
                            {getFieldDecorator('email', {
                                rules: [
                                    { type: 'email', message: '请输入正确的邮箱' },
                                    { required: true, message: '请输入邮箱' },
                                ],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="官网:">
                            {getFieldDecorator('website', {
                                rules: [{ required: true, message: '请输入官网地址' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="供应商简介:" layout="inline">
                            {getFieldDecorator('introduce')(
                                <TextArea rows={6} style={{ width: '85%' }} disabled />,
                            )}
                        </Form.Item>
                    </Form>
                    <div className={styles.order}>服务记录：共{this.props.demandTotal}条</div>
                    <Table
                        style={{ margin: '20px 0' }}
                        columns={columns}
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        dataSource={list}
                        pagination={{
                            // current: pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: this.props.demandTotal,
                            onShowSizeChange: this.onShowSizeChange.bind(this),
                            onChange: this.onChange.bind(this),
                        }}
                    />
                    <div className={styles.btn}>
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
            category: Form.createFormField({ value: props.supperList.category }),
        }
    },
})(supplierEdit)
