// 企业需求/办理
import React, { PureComponent } from 'react'
import { Button, Card, Form, Input, Divider, Steps, Table, Select, Breadcrumb } from 'antd'
import styles from './GoHandle.module.css'
import { Link } from 'react-router-dom'

const Step = Steps.Step
class GoHandle extends PureComponent {
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
                supplierType: '知识产权',
                money: '启迪智慧',
                companyType: '杀杀服务',
                companyName: '123',
                companyRelative: '4.96',
                companyPhone: '张三',
                time: '11943675111',
            },
            {
                key: 2,
                supplierType: '知识产权',
                money: '启迪智慧',
                companyType: '杀杀服务',
                companyName: '123',
                companyRelative: '4.96',
                companyPhone: '张三',
                time: '11943675111',
            },
            {
                key: 3,
                supplierType: '知识产权',
                money: '启迪智慧',
                companyType: '杀杀服务',
                companyName: '123',
                companyRelative: '4.96',
                companyPhone: '张三',
                time: '11943675111',
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
                        <span>推荐</span>
                        <Divider type="vertical" />
                        <Link to="/agency/supplierDetail">详情</Link>
                    </span>
                ),
            },
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            },
        }
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/agency/companyRequire">企业需求</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/agency/goHandle">办理</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Card title="办理进度" bordered={false}>
                    <Steps current={1} className={styles.commonLeft} style={{ paddingRight: 10 }}>
                        <Step title="下单" />
                        <Step title="推荐" />
                        <Step title="服务" />
                        <Step title="评价" />
                        <Step title="完成" />
                    </Steps>
                </Card>
                <Card title="订单信息" bordered={false}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="中介服务类型:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入中介服务类型' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="服务数目:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入服务数目' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业类型:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入企业类型' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业名称:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入企业名称' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业邮箱:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入企业邮箱' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="企业地址:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入企业地址' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="官网:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入官网地址' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系人:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入联系人名字' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系方式:">
                            {getFieldDecorator('spaceName', {
                                rules: [{ required: true, message: '请输入联系方式' }],
                            })(<Input className={styles.inputStyle} />)}
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="匹配供应商" bordered={false}>
                    <Form
                        layout="inline"
                        style={{ position: 'relative' }}
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Item label="供应商类型：">
                            {getFieldDecorator('status', { initialValue: '' })(
                                <Select
                                    getPopupContainer={triggerNode => triggerNode.parentNode} //异常浮动
                                    style={{ width: 200 }}
                                    placeholder="请选择"
                                >
                                    <Option value="1">知识产权</Option>
                                    <Option value="2">代理记账</Option>
                                    <Option value="3">法律服务</Option>
                                    <Option value="4">人力资源服务</Option>
                                    <Option value="5">全部</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="供应商名称：">
                            {getFieldDecorator('companyName')(
                                <Input placeholder="请输入" style={{ width: 200 }} />,
                            )}
                        </Form.Item>
                        <Form.Item label="联系人：">
                            {getFieldDecorator('companyName')(
                                <Input placeholder="请输入" style={{ width: 200 }} />,
                            )}
                        </Form.Item>
                        <div className={styles.btnStyle}>
                            <Button htmlType="submit">清空</Button>
                            <Button type="primary" style={{ margin: '0 10px' }}>
                                查询
                            </Button>
                            <Button type="primary">批量推荐</Button>
                        </div>
                    </Form>
                    <Table
                        className={styles.commonLeft}
                        style={{ margin: '20px 0' }}
                        columns={columns}
                        dataSource={data}
                        rowSelection={rowSelection}
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
                </Card>
            </div>
        )
    }
}

export default Form.create()(GoHandle)
