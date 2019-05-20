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
import FormView, { SearchView } from '../../../../components/FormView/FormView'

const Step = Steps.Step
const TreeNode = TreeSelect.TreeNode
let page = { pageNo: 1, pageSize: 10 }
class GoHandle extends PureComponent {
    state = {
        selectRow: [],
        // lian: true,
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getDemandList({ id: id, handleList: true })
        this.props.getSupplierList(page)
        this.props.getServiceTypeList()
    }

    renderForm = type => {
        const items = [
            {
                label: '供应商分类',
                field: 'typeId',
                initialValue: this.props.demandList.typeId,
                component: (
                    <TreeSelect
                        showSearch
                        style={{ width: 160 }}
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
                    </TreeSelect>
                ),
            },
            {
                label: '供应商名称',
                field: 'supplier',
                component: <Input />,
            },
            {
                label: '供应商联系人',
                field: 'contract',
                component: <Input />,
            },
            {
                component: <Button onClick={this.clearInput}>清空</Button>,
            },
            {
                component: (
                    <Button type="primary" onClick={this.handleSubmit} style={{ margin: '0 10px' }}>
                        查询
                    </Button>
                ),
            },
            {
                component: (
                    <Button type="primary" onClick={this.moreRecom}>
                        批量推荐
                    </Button>
                ),
            },
        ]
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        }
        return (
            <SearchView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                items={items}
                type="seacrhForm"
                saveBtn={false}
            />
        )
    }

    formParms = () => {
        let params = {}
        this.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            params = fieldsValue
            params.typeId = fieldsValue.typeId
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
        // this.setState({ lian: false })
        this.form.resetFields()
        // let parm = this.formParms()
        // parm.pageNo = 1
        // parm.pageSize = 10
        this.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            fieldsValue.pageNo = 1
            fieldsValue.pageSize = 10
            fieldsValue.typeId = this.props.demandList.typeId
            this.props.getSupplierList(fieldsValue)
        })
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
            {
                title: '总评分(满分5分)',
                dataIndex: 'score',
                key: 'score',
                align: 'center',
                render: (text, record) => <span key={record}>{text ? text : '-'}</span>,
            },
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
                            {getFieldDecorator('cateTemp')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="服务数目:">
                            {getFieldDecorator('item')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业名称:">
                            {getFieldDecorator('enterpriseName')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业邮箱:">
                            {getFieldDecorator('email')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业地址:">
                            {getFieldDecorator('address')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="官网:">
                            {getFieldDecorator('spaceName')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系人:">
                            {getFieldDecorator('nameTemp')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系方式:">
                            {getFieldDecorator('telephone')(
                                <Input className={styles.inputStyle} disabled />,
                            )}
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="匹配的供应商" bordered={false}>
                    {this.renderForm('search')}
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
            telephone: Form.createFormField({ value: props.demandList.telephone }),
            address: Form.createFormField({ value: props.demandList.address }),
            email: Form.createFormField({ value: props.demandList.email }),
            enterpriseName: Form.createFormField({ value: props.demandList.enterpriseName }),
            nameTemp: Form.createFormField({ value: props.demandList.contract }),
            item: Form.createFormField({ value: props.demandList.item }),
        }
    },
})(GoHandle)
