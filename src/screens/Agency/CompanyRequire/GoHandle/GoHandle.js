// 企业需求/办理
import React, { PureComponent } from 'react'
import {
    Button,
    Card,
    Form,
    Input,
    Divider,
    Steps,
    TreeSelect,
    Table,
    Select,
    Breadcrumb,
} from 'antd'
import styles from './GoHandle.module.css'
import { Link } from 'react-router-dom'

const Step = Steps.Step
const TreeNode = TreeSelect.TreeNode
let page = { pageNo: 1, pageSize: 10 }
class GoHandle extends PureComponent {
    state = {
        selectRow: [],
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getDemandList({ id: id, handleList: true })
        this.props.getSupplierList(page)
        this.props.getServiceTypeList()
    }
    formParms = () => {
        let params = {}
        let that = this
        this.props.form.validateFields((err, fieldsValue) => {
            // if (err) {
            //     return
            // }
            params = fieldsValue
            if (fieldsValue.typeId) {
                params.typeId = fieldsValue.typeId
                that.props.updateType({ key: params.typeId })
            }
        })
        return params
    }
    // table的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = pageSize
        this.props.getSupplierList(parm)
    }
    // table的pageNo改变
    onChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = pageNo
        parm.pageSize = pageSize
        this.props.getSupplierList(parm)
    }
    clearInput = () => {
        this.props.updateType({ key: '' })
        this.props.form.resetFields()
    }
    handleSubmit = () => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        this.props.getSupplierList(parm)
    }
    //单个修改
    singleRecom = id => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        this.props.recommendSupplier({
            demandId: this.props.match.params.id,
            supplierIds: id,
            parm: parm,
        })
    }
    // 批量推荐
    moreRecom = () => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        this.props.recommendSupplier({
            demandId: this.props.match.params.id,
            supplierIds: this.state.selectRow.join(','),
            parm: parm,
        })
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
        let that = this
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                that.setState({ selectRow: selectedRowKeys })
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
                title: '供应商类型',
                dataIndex: 'type_name',
                key: 'type_name',
                align: 'center',
            },
            {
                title: '供应商名称',
                dataIndex: 'supplier',
                key: 'supplier',
                align: 'center',
            },
            {
                title: '服务的次数',
                dataIndex: 'serviceTimes',
                key: 'serviceTimes',
                align: 'center',
            },
            // {
            //     title: '总评分(满分5分)',
            //     dataIndex: 'totalScore',
            //     key: 'totalScore',
            //     align: 'center',
            // },
            {
                title: '提供的服务',
                dataIndex: 'category',
                key: 'category',
                align: 'center',
            },
            {
                title: '供应商联系人',
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
                title: '操作',
                dataIndex: 'handle',
                key: 'handle',
                align: 'center',
                render: (text, record) => (
                    <span key={record}>
                        <span
                            style={{ color: '#0099CC', cursor: 'pointer' }}
                            onClick={() => {
                                this.singleRecom(record.id)
                            }}
                        >
                            推荐
                        </span>
                        <Divider type="vertical" />
                        <Link to={`/agency/supplierDetail/${record.id}`}>详情</Link>
                    </span>
                ),
            },
        ]
        let id = parseFloat(this.props.match.params.id)
        console.log('////////', this.props.demandList.typeId)
        return (
            <div className={styles.handleContainer}>
                <Card
                    title={
                        <div>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to="/agency/companyRequire">企业需求</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to={`/agency/goHandle/${id}`}>办理</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ marginTop: 15 }}>办理进度</div>
                        </div>
                    }
                    bordered={false}
                >
                    <Steps current={1} className={styles.commonLeft} style={{ paddingRight: 10 }}>
                        <Step title="下单" />
                        <Step title="服务" />
                        <Step title="完成" />
                    </Steps>
                </Card>
                <Card title="订单信息" bordered={false}>
                    <Form {...formItemLayout}>
                        <Form.Item {...formItemLayout} label="中介服务类型:">
                            {getFieldDecorator('cateTemp', {
                                rules: [{ required: true, message: '请输入中介服务类型' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="服务数目:">
                            {getFieldDecorator('item', {
                                rules: [{ required: true, message: '请输入服务数目' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业名称:">
                            {getFieldDecorator('enterpriseName', {
                                rules: [{ required: true, message: '请输入企业名称' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业邮箱:">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入企业邮箱' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业地址:">
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: '请输入企业地址' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="官网:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入官网地址' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系人:">
                            {getFieldDecorator('nameTemp', {
                                rules: [{ required: true, message: '请输入联系人名字' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系方式:">
                            {getFieldDecorator('telephone', {
                                rules: [{ required: true, message: '请输入联系方式' }],
                            })(<Input className={styles.inputStyle} disabled />)}
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="匹配的供应商" bordered={false}>
                    <Form layout="inline" style={{ position: 'relative' }}>
                        <Form.Item {...formItemLayout} label="供应商分类:">
                            {getFieldDecorator('typeId')(
                                <TreeSelect
                                    showSearch
                                    style={{ width: 200 }}
                                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                    placeholder="请选择"
                                    allowClear
                                    treeDefaultExpandAll
                                >
                                    {this.nodeText().map(item => {
                                        return (
                                            <TreeNode
                                                value={item.parent.key}
                                                title={item.parent.typeName}
                                                key={item.parent.key}
                                            />
                                        )
                                    })}
                                </TreeSelect>,
                            )}
                        </Form.Item>
                        <Form.Item label="供应商名称：">
                            {getFieldDecorator('supplier')(
                                <Input placeholder="请输入" style={{ width: 200 }} />,
                            )}
                        </Form.Item>
                        <Form.Item label="供应商联系人：">
                            {getFieldDecorator('contract')(
                                <Input placeholder="请输入" style={{ width: 200 }} />,
                            )}
                        </Form.Item>
                        <div className={styles.btnStyle}>
                            <Button onClick={this.clearInput}>清空</Button>
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                                style={{ margin: '0 10px' }}
                            >
                                查询
                            </Button>
                            <Button type="primary" onClick={this.moreRecom}>
                                批量推荐
                            </Button>
                        </div>
                    </Form>
                    <Table
                        className={styles.commonLeft}
                        style={{ margin: '20px 0' }}
                        columns={columns}
                        rowSelection={rowSelection}
                        rowKey={(record, index) => `${record.id}`}
                        dataSource={this.props.supperList}
                        pagination={{
                            // current: 1,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: this.props.supperListTotal,
                            onShowSizeChange: this.onShowSizeChange.bind(this),
                            onChange: this.onChange.bind(this),
                        }}
                    />
                </Card>
            </div>
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        return {
            cateTemp: Form.createFormField({ value: props.demandList.category }),
            typeId: Form.createFormField({ value: props.demandList.typeId }),
            telephone: Form.createFormField({ value: props.demandList.telephone }),
            address: Form.createFormField({ value: props.demandList.address }),
            email: Form.createFormField({ value: props.demandList.email }),
            enterpriseName: Form.createFormField({ value: props.demandList.enterpriseName }),
            nameTemp: Form.createFormField({ value: props.demandList.contract }),
            item: Form.createFormField({ value: props.demandList.item }),
        }
    },
})(GoHandle)
