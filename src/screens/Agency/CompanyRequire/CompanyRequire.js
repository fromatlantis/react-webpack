import React, { PureComponent } from 'react'
import { Menu, Icon, Form, Input, Button, Table, Select, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import styles from './CompanyRequire.module.css'
import ListClick from '../../../components/ListClick/ListClick'

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
        typeId: '',
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
            if (this.state.typeId && this.state.typeId !== 'undefined') {
                params.typeId = this.state.typeId
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
        this.listClick.updateAll()
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
    getTypeId = num => {
        this.setState({
            typeId: num,
        })
    }
    onRef = ref => {
        this.listClick = ref
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const serList = this.props.ServiceTypeList.filter(item => {
            return item.level === '1'
        })
        serList.unshift({ typeName: '全部', id: 'undefined' })
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
            },
            {
                title: '企业名称',
                dataIndex: 'enterpriseName',
                key: 'enterpriseName',
                align: 'center',
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
            },
            {
                title: '企业名称',
                dataIndex: 'enterpriseName',
                key: 'enterpriseName',
                align: 'center',
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
                    <ListClick
                        onRef={this.onRef}
                        data={serList}
                        getId={id => this.getTypeId(id)}
                        title="供应商类型："
                    />
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
