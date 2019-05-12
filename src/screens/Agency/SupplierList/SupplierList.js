import React, { PureComponent } from 'react'
import { Menu, Form, Input, Button, Table, Select, Divider, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styles from './SupplierList.module.css'

class Agency extends PureComponent {
    state = {
        activeKey: '',
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            // let rangeTime = fieldsValue.publishTime
            // if( rangeTime ) {
            //     fieldsValue.publishTime = rangeTime.map(x=>x.format('YYYY-MM-DD')).join(',')
            // }
            // fieldsValue.pageNo = 1 //重置分页
            // this.props.getParkNoticeList(fieldsValue)
        })
    }
    supplierList = i => {
        this.setState({
            activeKey: i,
        })
    }
    render() {
        const supplierType = ['知识产权', '法律服务', '人资服务', '代理记账']
        const { getFieldDecorator } = this.props.form
        const Option = Select.Option
        const data = [
            {
                key: 1,
                supplierType: '知识产权',
                money: '启迪智慧',
                companyType: '杀杀服务',
                companyName: '123',
                companyRelative: '4.96',
                supplierName: '无名人',
                companyPhone: 'dzf',
                time: '11943675111',
            },
            {
                key: 2,
                supplierType: '知识产权',
                money: '启迪智慧',
                companyType: '杀杀服务',
                companyName: '123',
                companyRelative: '4.96',
                supplierName: '无名人',
                companyPhone: 'dzf',
                time: '11943675111',
            },
            {
                key: 3,
                supplierType: '知识产权',
                money: '启迪智慧',
                companyType: '杀杀服务',
                companyName: '123',
                companyRelative: '4.96',
                companyPhone: 'dzf',
                supplierName: '无名人',
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
                title: '提供的服务',
                dataIndex: 'companyPhone',
                key: 'companyPhone',
                align: 'center',
            },
            {
                title: '供应商联系人',
                dataIndex: 'supplierName',
                key: 'supplierName',
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
                        <Link to="/agency/supplierEdit">编辑</Link>
                        <Divider type="vertical" />
                        <Link to="/agency/supplierDetail">详情</Link>
                        <Divider type="vertical" />
                        <span>下架</span>
                    </span>
                ),
            },
        ]
        return (
            <div style={{ position: 'relative' }} className={styles.container}>
                {/* <div>供应商列表</div> */}
                <Breadcrumb>
                    <Breadcrumb.Item>供应商列表</Breadcrumb.Item>
                </Breadcrumb>
                <Divider />
                <div style={{ paddingLeft: 8 }}>
                    <div className={styles.typeTitle}>
                        <span>供应商类型：</span>
                        <div>
                            {supplierType.map((item, i) => {
                                return (
                                    <span
                                        key={i}
                                        onClick={() => {
                                            this.supplierList(i)
                                        }}
                                        className={`${styles.typeBut} ${
                                            this.state.activeKey === i ? styles.active : ''
                                        }`}
                                    >
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <Form className={styles.formList} layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item label="供应商名称：">
                            {getFieldDecorator('companyName')(
                                <Input className={styles.inputWidth} placeholder="请输入" />,
                            )}
                        </Form.Item>
                        <Form.Item label="联系人：">
                            {getFieldDecorator('name')(
                                <Input className={styles.inputWidth} placeholder="请输入" />,
                            )}
                        </Form.Item>
                        <Form.Item className={styles.totalBtn}>
                            <Button className={styles.addBtn}>清空</Button>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Divider type="vertical" />
                            <Button type="primary" className={styles.addBtn}>
                                新增
                            </Button>
                        </Form.Item>
                    </Form>
                    <Table
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
                </div>
            </div>
        )
    }
}
export default Form.create()(Agency)
