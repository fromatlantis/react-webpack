// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Card, Form, Input, Divider, Steps, Table, Select, Breadcrumb } from 'antd'
import styles from './GoView.module.css'
import { Link } from 'react-router-dom'

const Step = Steps.Step
class GoHandle extends PureComponent {
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getDemandList({ id: id, supplier: true })
    }
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
                dataIndex: 'supplierType',
                key: 'supplierType',
                align: 'center',
            },
            {
                title: '供应商名称',
                dataIndex: 'money',
                key: 'money',
                align: 'center',
            },
            {
                title: '提供的服务',
                dataIndex: 'companyType',
                key: 'companyType',
                align: 'center',
            },
            {
                title: '服务的次数',
                dataIndex: 'companyName',
                key: 'companyName',
                align: 'center',
            },
            {
                title: '总评分(满分5分)',
                dataIndex: 'companyRelative',
                key: 'companyRelative',
                align: 'center',
            },
            {
                title: '联系人',
                dataIndex: 'companyPhone',
                key: 'companyPhone',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'time',
                key: 'time',
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
                                this.props.finishOrder({
                                    demandId: this.props.match.params.id,
                                    supplierId: record.id,
                                })
                            }}
                        >
                            完成
                        </span>
                    </span>
                ),
            },
        ]
        const finishColumns = [
            {
                title: '序号',
                key: 'num',
                dataIndex: 'num',
                align: 'center',
                render: (text, record, index) => <span key={text}>{index + 1}</span>,
            },
            {
                title: '供应商类型',
                dataIndex: 'supplierType',
                key: 'supplierType',
                align: 'center',
            },
            {
                title: '供应商名称',
                dataIndex: 'money',
                key: 'money',
                align: 'center',
            },
            {
                title: '提供的服务',
                dataIndex: 'companyType',
                key: 'companyType',
                align: 'center',
            },
            {
                title: '服务的次数',
                dataIndex: 'companyName',
                key: 'companyName',
                align: 'center',
            },
            {
                title: '总评分(满分5分)',
                dataIndex: 'companyRelative',
                key: 'companyRelative',
                align: 'center',
            },
            {
                title: '联系人',
                dataIndex: 'companyPhone',
                key: 'companyPhone',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
            },
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            },
        }
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
                                    <Link to={`/agency/goView/${id}`}>查看</Link>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ marginTop: 15 }}>办理进度</div>
                        </div>
                    }
                    bordered={false}
                >
                    <Steps
                        current={parseInt(this.props.demandList.processStatus) + 1}
                        className={styles.commonLeft}
                        style={{ paddingRight: 10 }}
                    >
                        <Step title="下单" />
                        <Step title="服务" />
                        <Step title="完成" />
                    </Steps>
                </Card>
                <Card title="订单信息" bordered={false}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="中介服务类型:">
                            {getFieldDecorator('category', {
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
                            {getFieldDecorator('contract', {
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
                    <Table
                        className={styles.commonLeft}
                        style={{ margin: '20px 0' }}
                        columns={
                            this.props.demandList.processStatus === '1' ? columns : finishColumns
                        }
                        dataSource={this.props.supperList}
                    />
                </Card>
                {/* <Card title="评价结果" bordered={false}>

                </Card> */}
            </div>
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        return {
            category: Form.createFormField({ value: props.demandList.category }),
            telephone: Form.createFormField({ value: props.demandList.telephone }),
            contract: Form.createFormField({ value: props.demandList.contract }),
            address: Form.createFormField({ value: props.demandList.address }),
            email: Form.createFormField({ value: props.demandList.email }),
            enterpriseName: Form.createFormField({ value: props.demandList.enterpriseName }),
            item: Form.createFormField({ value: props.demandList.item }),
        }
    },
})(GoHandle)
