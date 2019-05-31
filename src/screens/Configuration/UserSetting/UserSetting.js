import React, { PureComponent } from 'react'
import { SearchView } from '../../../components/FormView/FormView'
import { Button, Input, Card, Table, Alert, Modal, TreeSelect, Tabs } from 'antd'
import styles from './UserSetting.module.css'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/configuration'

const TreeNode = TreeSelect.TreeNode
const { TabPane } = Tabs
class UserSetting extends PureComponent {
    state = {
        visible: false,
    }
    // 展示modal
    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = e => {
        this.setState({
            visible: false,
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        })
    }
    renderForm = type => {
        const items = [
            {
                label: '角色：',
                field: 'supplier',
                component: <Input />,
            },
            {
                label: '姓名：',
                field: 'contract',
                component: <Input />,
            },
            {
                component: <Button onClick={this.clearInput}>清空</Button>,
            },
            {
                component: (
                    <Button type="primary" onClick={this.handleSubmit}>
                        查询
                    </Button>
                ),
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
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
    clearInput = () => {
        this.form.resetFields()
        // this.props.getSupplierList({pageNo:1,pageSize:10})
    }
    handleSubmit = () => {
        // let parm = this.formParms()
        // parm.pageNo = 1
        // parm.pageSize = 10
        // this.props.getSupplierList(parm)
    }
    // 设置-楼宇信息
    modalBuild = type => {
        const items = [
            {
                label: '楼宇信息：',
                field: 'supplier',
                component: (
                    <TreeSelect
                        showSearch
                        style={{ width: 300 }}
                        dropdownStyle={{ maxHeight: 260, overflow: 'auto' }}
                        placeholder="请选择"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                    >
                        <TreeNode value="parent 1" title="parent 1" key="0-1">
                            <TreeNode value="parent 1-0" title="禁用" key="0-1-1" disabled>
                                <TreeNode value="leaf1" title="my leaf" key="random" />
                                <TreeNode value="leaf2" title="your leaf" key="random1" />
                            </TreeNode>
                            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                                <TreeNode
                                    value="sss"
                                    title={<b style={{ color: '#08c' }}>sss</b>}
                                    key="random3"
                                />
                            </TreeNode>
                        </TreeNode>
                    </TreeSelect>
                ),
            },
            {
                component: (
                    <Button type="primary" onClick={this.addBuild}>
                        添加
                    </Button>
                ),
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        }
        return (
            <SearchView
                ref={form => {
                    this.addBuild = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                items={items}
                type="seacrhForm"
                saveBtn={false}
            />
        )
    }
    // 点击添加楼宇按钮
    addBuild = () => {
        this.addBuild.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log('输入楼宇信息', fieldsValue)
            }
        })
    }
    // 设置-维修类型
    modalRepair = type => {
        const items = [
            {
                label: '报修类型：',
                field: 'supplier',
                component: (
                    <TreeSelect
                        showSearch
                        style={{ width: 300 }}
                        dropdownStyle={{ maxHeight: 260, overflow: 'auto' }}
                        placeholder="请选择"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                    >
                        <TreeNode value="parent 1" title="parent 1" key="0-1">
                            <TreeNode value="parent 1-0" title="禁用" key="0-1-1" disabled>
                                <TreeNode value="leaf1" title="my leaf" key="random" />
                                <TreeNode value="leaf2" title="your leaf" key="random1" />
                            </TreeNode>
                            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                                <TreeNode
                                    value="sss"
                                    title={<b style={{ color: '#08c' }}>sss</b>}
                                    key="random3"
                                />
                            </TreeNode>
                        </TreeNode>
                    </TreeSelect>
                ),
            },
            {
                component: (
                    <Button type="primary" onClick={this.addRepair}>
                        添加
                    </Button>
                ),
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        }
        return (
            <SearchView
                ref={form => {
                    this.addRepairType = form
                }}
                formItemLayout={formItemLayout}
                layout="inline"
                items={items}
                type="seacrhForm"
                saveBtn={false}
            />
        )
    }
    // 关联维修类型
    addRepair = () => {
        this.addRepairType.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log('关联保修泪从信息', fieldsValue)
            }
        })
    }
    formParms = () => {
        let params = {}
        this.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            params = fieldsValue
        })
        return params
    }
    // table的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = pageSize
        // this.props.getSupplierList(parm)
    }
    // table的pageNo改变
    onChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = pageNo
        parm.pageSize = pageSize
        // this.props.getSupplierList(parm)
    }
    render() {
        const buildData = [
            {
                key: '1',
                name: '胡彦斌',
                address: '西湖区湖底公园1号',
                addressDetail: '详细住址受打击反恐',
            },
            {
                key: '2',
                name: '胡彦祖',
                address: '西湖区湖底公园1号',
                addressDetail: '详细住址受打击反恐',
            },
        ]

        const buildColumns = [
            {
                title: '区域',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                align: 'center',
            },
            {
                title: '详细地址',
                dataIndex: 'addressDetail',
                key: 'addressDetail',
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
                            onClick={this.showModal}
                        >
                            删除
                        </span>
                    </span>
                ),
            },
        ]
        const repairData = [
            {
                key: '1',
                name: '电路/强电',
            },
            {
                key: '2',
                name: '电路/弱点',
            },
            {
                key: '3',
                name: '电路/弱点',
            },
            {
                key: '4',
                name: '电路/弱点',
            },
            {
                key: '5',
                name: '电路/弱点',
            },
        ]
        const repairColumns = [
            {
                title: '保修类型',
                dataIndex: 'name',
                key: 'name',
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
                            onClick={this.showModal}
                        >
                            删除
                        </span>
                    </span>
                ),
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
                title: '用户账号',
                dataIndex: 'type_name',
                key: 'type_name',
                align: 'center',
            },
            {
                title: '用户姓名',
                dataIndex: 'supplier',
                key: 'supplier',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'serviceTimes',
                key: 'serviceTimes',
                align: 'center',
            },
            {
                title: '角色',
                dataIndex: 'score',
                key: 'score',
                align: 'center',
                render: (text, record) => <span key={record}>{text ? text : '-'}</span>,
            },
            {
                title: '部门',
                dataIndex: 'category',
                key: 'category',
                align: 'center',
            },
            {
                title: '职责',
                dataIndex: 'contract',
                key: 'contract',
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
                            onClick={this.showModal}
                        >
                            设置
                        </span>
                    </span>
                ),
            },
        ]
        const dataSource = [
            {
                key: '1',
                type_name: 'z4524545',
                supplier: '胡彦斌',
                address: '西湖区湖底公园1号',
                serviceTimes: '11111111111',
                score: '派工人员',
                category: '部门1',
                contract: '描述',
            },
            {
                key: '2',
                type_name: 'z4524545',
                supplier: '胡彦斌',
                address: '西湖区湖底公园1号',
                serviceTimes: '11111111111',
                score: '派工人员',
                category: '部门1',
                contract: '描述',
            },
        ]
        return (
            <Card title="" bordered={false}>
                {this.renderForm('search')}
                <Alert style={{ margin: '18px 0 8px' }} message="共2项" type="info" showIcon />
                <Table
                    className={styles.commonLeft}
                    columns={columns}
                    // rowSelection={rowSelection}
                    // rowKey={(record, index) => `${record.id}`}
                    dataSource={dataSource}
                    // pagination={{
                    //     // current: 1,
                    //     showSizeChanger: true,
                    //     showQuickJumper: true,
                    //     pageSizeOptions: ['10', '15', '20'],
                    //     total: this.props.supperListTotal,
                    //     onShowSizeChange: this.onShowSizeChange.bind(this),
                    //     onChange: this.onChange.bind(this),
                    // }}
                />
                <Modal
                    title="用户设置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className={styles.modalStyle}
                    bodyStyle={{ maxHeight: '400px', overflowY: 'scroll' }}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="关联楼宇" key="1">
                            {this.modalBuild('search')}
                            <div style={{ margin: '12px 0 5px' }}>已关联区域</div>
                            <Table
                                dataSource={buildData}
                                columns={buildColumns}
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="关联维修类型" key="2">
                            {this.modalRepair('search')}
                            <div style={{ margin: '12px 0 5px' }}>已关联维修类型</div>
                            <Table
                                dataSource={repairData}
                                columns={repairColumns}
                                pagination={false}
                            />
                        </TabPane>
                    </Tabs>
                </Modal>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        userList: state.configuration.userList,
        userTotal: state.configuration.userTotal,
        addressRelateList: state.configuration.addressRelateList,
        repairTypeRelateList: state.configuration.repairTypeRelateList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserList: actions('getUserList'),
            getAddressRelateList: actions('getAddressRelateList'), //获取楼宇关联
            deleteAddressRelate: actions('deleteAddressRelate'), //删除楼宇关联
            addAddressRelate: actions('addAddressRelate'), //楼宇关联添加
            getRepairRelateList: actions('getRepairRelateList'), //获取保修类型关联
            addRepairRelate: actions('addRepairRelate'), //报修类型关联添加
            deleteRepairRelate: actions('deleteRepairRelate'), //报修类型关联删除
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserSetting)
