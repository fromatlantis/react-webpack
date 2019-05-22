// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Card, Form, Input, Divider, Steps, Table, Select, Breadcrumb, Rate } from 'antd'
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
    tableColumn = () => {
        let status = this.props.demandList.processStatus
        let recommend = this.props.demandList.recommendSupplier
        const publiccolumns = [
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
        ]
        let banHandle = [
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
        if (status === '1') {
            if (recommend) {
                return [...publiccolumns, ...banHandle]
            } else {
                return publiccolumns
            }
        } else {
            return publiccolumns
        }
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
        ]
        let id = parseFloat(this.props.match.params.id)
        let score = this.props.demandList.score
        let status = this.props.demandList.processStatus
        let recommend = this.props.demandList.recommendSupplier
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
                                    <Link to={`/agency/goView/${id}`}>
                                        {this.props.demandList.processStatus === '1'
                                            ? '已办理'
                                            : '完成'}
                                    </Link>
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
                            {getFieldDecorator('category')(
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
                            {getFieldDecorator('contract')(
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
                    <Table
                        className={styles.commonLeft}
                        style={{ margin: '20px 0' }}
                        rowKey={(record, index) => `${record.id}`}
                        columns={
                            // status === '1' ? columns : finishColumns
                            this.tableColumn()
                        }
                        dataSource={
                            status === '1' && !recommend
                                ? this.props.recommendList
                                : this.props.supperList
                        }
                        pagination={false}
                    />
                </Card>
                <Card
                    style={{
                        display: this.props.demandList.processStatus === '2' ? 'block' : 'none',
                    }}
                    title="评价结果"
                    bordered={false}
                >
                    <div style={{ marginBottom: 8 }}>
                        <span className={styles.finishSty}>评价分数:</span>
                        <Rate allowHalf value={score ? score : 0} disabled />
                        <span style={{ marginLeft: 3 }}>{score ? score + '分' : ''}</span>
                    </div>
                    <div>
                        <span className={styles.finishSty}>评价描述:</span>
                        <span>
                            {this.props.demandList.evaluate ? this.props.demandList.evaluate : '-'}
                        </span>
                    </div>
                </Card>
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
