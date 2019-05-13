import React, { PureComponent } from 'react'
import { Menu, Icon, Form, Input, Button, Table, Select, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import styles from './CompanyRequire.module.css'

const MenuItemGroup = Menu.ItemGroup
const TabPane = Tabs.TabPane

class Agency extends PureComponent {
    state = {
        activeKey: '',
    }
    supplierList = i => {
        this.setState({
            activeKey: i,
        })
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
    render() {
        const { getFieldDecorator } = this.props.form
        const Option = Select.Option
        const data = [
            {
                key: '1',
                supplierType: '知识产权',
                money: '200',
                companyType: '实驻企业',
                companyName: '启迪智慧',
                companyRelative: '张三',
                companyPhone: '13171784045',
                time: '2019-12-05',
            },
            {
                key: '2',
                supplierType: '知识产权',
                money: '200',
                companyType: '实驻企业',
                companyName: '启迪智慧',
                companyRelative: '张三',
                companyPhone: '13171784045',
                time: '2019-12-05',
            },
            {
                key: '3',
                supplierType: '知识产权',
                money: '200',
                companyType: '实驻企业',
                companyName: '启迪智慧',
                companyRelative: '张三',
                companyPhone: '13171784045',
                time: '2019-12-05',
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
                title: '金额',
                dataIndex: 'money',
                key: 'money',
                align: 'center',
            },
            {
                title: '企业类型',
                dataIndex: 'companyType',
                key: 'companyType',
                align: 'center',
            },
            {
                title: '企业名称',
                dataIndex: 'companyName',
                key: 'companyName',
                align: 'center',
            },
            {
                title: '企业联系人',
                dataIndex: 'companyRelative',
                key: 'companyRelative',
                align: 'center',
            },
            {
                title: '企业联系方式',
                dataIndex: 'companyPhone',
                key: 'companyPhone',
                align: 'center',
            },
            {
                title: '请求时间',
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
                    <span>
                        <Link to="/agency/goHandle">办理</Link>
                    </span>
                ),
            },
        ]
        const supplierType = ['知识产权', '法律服务', '人资服务', '代理记账']
        return (
            <div className={styles.container}>
                <div className={styles.typeTitle}>
                    <span>供应商类型：</span>
                    <div className={styles.typeList}>
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
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item label="企业名称：">
                        {getFieldDecorator('companyName')(
                            <Input placeholder="请输入" style={{ width: 220 }} />,
                        )}
                    </Form.Item>
                    <Form.Item label="类型：">
                        {getFieldDecorator('status', { initialValue: '' })(
                            <Select
                                getPopupContainer={triggerNode => triggerNode.parentNode} //异常浮动
                                style={{ width: 220 }}
                                placeholder="请选择"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">企业实驻</Option>
                                <Option value="2">虚拟企业</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" style={{ marginRight: 10, marginLeft: 10 }}>
                            清空
                        </Button>
                        <Button type="primary">查询</Button>
                    </Form.Item>
                </Form>
                <Tabs type="card" style={{ marginTop: 20 }}>
                    <TabPane tab="未办理需求" key="1">
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
                    </TabPane>
                    <TabPane tab="已办理需求" key="2">
                        <Table columns={columns} dataSource={data} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default Form.create()(Agency)
