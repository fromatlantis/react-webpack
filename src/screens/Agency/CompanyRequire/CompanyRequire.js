import React, { PureComponent } from 'react'
import { Menu, Icon, Form, Input, Button, Table, Select, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import styles from './CompanyRequire.module.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/agencyRequire'

const MenuItemGroup = Menu.ItemGroup
const TabPane = Tabs.TabPane
const page = {
    pageSize: 10,
    pageNo: 1,
}
class Agency extends PureComponent {
    state = {
        tabKey: '0',
        addTypes: [],
        allActive: true,
    }
    componentDidMount = () => {
        this.props.getServiceTypeList()
        page.processStatus = '0'
        this.props.getDemandList(page)
    }
    formParms = () => {
        let params = {}
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            params = fieldsValue
            params.processStatus = this.state.tabKey
            if (this.state.addTypes.length > 0) {
                params.typeId = this.state.addTypes.join(',')
            }
        })
        return params
    }
    handleSubmit = e => {
        e.preventDefault()
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        this.props.getDemandList(parm)
    }
    Tabscallback = key => {
        this.setState({ tabKey: key })
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        if (key === '0') {
            parm.processStatus = '0'
            this.props.getDemandList(parm)
        } else {
            parm.processStatus = '3'
            this.props.getDemandList(parm)
        }
    }
    // 点击清除按钮
    clearInput = () => {
        this.setState({ allActive: true, addTypes: [] })
        this.props.form.resetFields()
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        parm.typeId = undefined
        this.props.getDemandList(parm)
    }
    // table的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = pageSize
        this.props.getDemandList(parm)
    }
    // table的pageNo改变
    onChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = pageNo
        parm.pageSize = pageSize
        this.props.getDemandList(parm)
    }
    addServeType = id => {
        this.setState({ allActive: false })
        let type = true
        let { addTypes } = this.state
        let oldaddTypes = []
        let newaddTypes = []
        for (let i in addTypes) {
            if (addTypes[i] == id) {
                type = false
            } else {
                newaddTypes.push(addTypes[i])
            }
            oldaddTypes.push(addTypes[i])
        }
        if (type) {
            oldaddTypes.push(id)
            this.setState({
                addTypes: oldaddTypes,
            })
        } else {
            this.setState({
                addTypes: newaddTypes,
            })
        }
    }
    allType = () => {
        this.setState({ addTypes: [], allActive: !this.state.allActive })
    }
    gotoDetail = name => {
        this.props.getCompanyIdByName(name)
    }
    render() {
        let that = this
        const { getFieldDecorator } = this.props.form
        const { addTypes, allActive } = this.state
        const serList = this.props.ServiceTypeList.filter(item => {
            return item.level === '1'
        })
        const Option = Select.Option
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
                dataIndex: 'category',
                key: 'category',
                align: 'center',
            },
            {
                title: '总金额',
                dataIndex: 'amount',
                key: 'amount',
                align: 'center',
                render: (text, record) => <span key={text}>{record.item * parseFloat(text)}</span>,
            },
            {
                title: '企业名称',
                dataIndex: 'enterpriseName',
                key: 'enterpriseName',
                align: 'center',
                render: (text, record) => (
                    <Button
                        type="link"
                        onClick={() => {
                            this.gotoDetail(text)
                        }}
                    >
                        {text}
                    </Button>
                ),
            },
            {
                title: '企业联系人',
                dataIndex: 'contract',
                key: 'contract',
                align: 'center',
            },
            {
                title: '企业联系方式',
                dataIndex: 'telephone',
                key: 'telephone',
                align: 'center',
            },
            {
                title: '请求时间',
                dataIndex: 'requestTime',
                key: 'requestTime',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'handle',
                key: 'handle',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={`/agency/goHandle/${record.id}`}>办理</Link>
                    </span>
                ),
            },
        ]
        const isColumns = [
            {
                title: '序号',
                key: 'num',
                dataIndex: 'num',
                align: 'center',
                render: (text, record, index) => <span key={text}>{index + 1}</span>,
            },
            {
                title: '供应商类型',
                dataIndex: 'category',
                key: 'category',
                align: 'center',
            },
            {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                align: 'center',
                render: (text, record) => <span key={text}>{record.item * parseFloat(text)}</span>,
            },
            {
                title: '企业名称',
                dataIndex: 'enterpriseName',
                key: 'enterpriseName',
                align: 'center',
                render: (text, record) => (
                    <Button
                        type="link"
                        onClick={() => {
                            this.gotoDetail(text)
                        }}
                    >
                        {text}
                    </Button>
                ),
            },
            {
                title: '企业联系人',
                dataIndex: 'contract',
                key: 'contract',
                align: 'center',
            },
            {
                title: '企业联系方式',
                dataIndex: 'telephone',
                key: 'telephone',
                align: 'center',
            },
            {
                title: '状态',
                dataIndex: 'processStatus',
                key: 'processStatus',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <span>{text === '1' ? '已办理' : '已完成'}</span>
                    </div>
                ),
            },
            {
                title: '操作',
                dataIndex: 'handle',
                key: 'handle',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={`/agency/goView/${record.id}`}>查看</Link>
                    </span>
                ),
            },
        ]
        return (
            <div className={styles.containerR}>
                <div className={styles.typeTitle}>
                    <span style={{ marginRight: 5 }}>供应商类型：</span>
                    <span
                        className={`${styles.typeBut} ${allActive ? styles.active : ''}`}
                        onClick={this.allType}
                    >
                        全部
                    </span>
                    {serList.map((item, i) => {
                        let newitem = addTypes.filter(itemType => {
                            return item.id == itemType
                        })
                        if (!newitem.length) {
                            return (
                                <span
                                    key={i}
                                    onClick={() => that.addServeType(item.id)}
                                    className={styles.typeBut}
                                >
                                    {item.typeName}
                                </span>
                            )
                        } else {
                            return (
                                <span
                                    key={i}
                                    onClick={() => that.addServeType(item.id)}
                                    className={`${styles.active} ${styles.typeBut}`}
                                >
                                    {item.typeName}
                                </span>
                            )
                        }
                    })}
                </div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item label="企业名称：">
                        {getFieldDecorator('enterpriseName')(
                            <Input placeholder="请输入" style={{ width: 220 }} />,
                        )}
                    </Form.Item>
                    <Form.Item label="企业联系人：">
                        {getFieldDecorator('contract', { initialValue: '' })(
                            <Input placeholder="请输入" style={{ width: 220 }} />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{ marginRight: 10, marginLeft: 10 }}
                            onClick={this.clearInput}
                        >
                            清空
                        </Button>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                </Form>
                <Tabs type="card" style={{ marginTop: 20 }} onChange={this.Tabscallback}>
                    <TabPane tab="未办理需求" key="0">
                        <Table
                            columns={columns}
                            dataSource={this.props.demandList}
                            rowKey={(record, index) => `complete${record.id}${index}`}
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
                    </TabPane>
                    <TabPane tab="已办理需求" key="3">
                        <Table
                            columns={isColumns}
                            dataSource={this.props.demandList}
                            rowKey={(record, index) => `complete${record.id}${index}`}
                        />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        demandList: state.agencyRequire.demandList,
        demandTotal: state.agencyRequire.demandTotal,
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDemandList: actions('getDemandList'),
            getServiceTypeList: actions('getServiceTypeList'),
            getCompanyIdByName: actions('getCompanyIdByName'),
        },
        dispatch,
    )
}
export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Agency),
)
