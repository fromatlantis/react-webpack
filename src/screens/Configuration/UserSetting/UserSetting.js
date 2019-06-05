import React, { PureComponent } from 'react'
import { SearchView } from '../../../components/FormView/FormView'
import { Button, Input, Card, Table, Alert, Modal, TreeSelect, Tabs, message } from 'antd'
import styles from './UserSetting.module.css'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/configuration'

const TreeNode = TreeSelect.TreeNode
const { TabPane } = Tabs
let page = { pageNo: 1, pageSize: 10, appIdentity: 'HZYYGLPTWYFW0034' }
// let page = { pageNo: 1, pageSize: 10, appIdentity: 'HZYYGLPTZXGL0024' }
class UserSetting extends PureComponent {
    componentDidMount = () => {
        this.props.getUserList(page)
        this.props.getAddressType()
        this.props.getRepairsType(3)
    }
    state = {
        visible: false,
        userMess: {},
    }
    // 展示modal
    showModal = record => {
        this.setState({
            visible: true,
            userMess: record,
        })
        this.props.getAddressRelateList(record.userId)
        this.props.getRepairRelateList(record.userId)
    }

    handleOk = e => {
        this.setState({
            visible: false,
        })
    }
    // 处理接口返回的数据
    nodeText = list => {
        // let list = this.props.repairsTypeList
        let newList = []
        let grandText = list.filter(item => {
            return item.level === '1'
        })
        let parentText = list.filter(item => {
            return item.level === '2'
        })
        let childText = list.filter(item => {
            return item.level === '3'
        })
        grandText.forEach(parent => {
            let child = []
            parentText.forEach(item => {
                let temp = []
                if (parent.id == item.pid) {
                    let finChild = []
                    childText.forEach(self => {
                        if (item.id == self.pid) {
                            finChild.push(self)
                        }
                    })
                    temp = item
                    child.push({ temp, finChild })
                }
            })
            newList.push({ parent, child })
        })
        return newList
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
                field: 'role',
                component: <Input />,
            },
            {
                label: '姓名：',
                field: 'userName',
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
        this.props.getUserList(page)
    }
    handleSubmit = () => {
        let parm = this.formParms()
        parm.pageNo = 1
        parm.pageSize = 10
        parm.appIdentity = page.appIdentity
        this.props.getUserList(parm)
    }
    // 设置-楼宇信息
    modalBuild = type => {
        const items = [
            {
                label: '楼宇信息：',
                field: 'buildRle',
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
                        {this.createTypeTree(this.props.repairsAddressList, 0)}
                    </TreeSelect>
                ),
            },
            {
                component: (
                    <Button type="primary" onClick={this.addBuildRle}>
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
    addBuildRle = () => {
        this.addBuild.validateFields((err, fieldsValue) => {
            if (!err) {
                if (!fieldsValue.buildRle) {
                    message.warning('请选择楼宇信息')
                    return
                }
                let parm = {}
                parm.userId = this.state.userMess.userId
                parm.userName = this.state.userMess.userName
                parm.phone = this.state.userMess.phone
                parm.id = fieldsValue.buildRle.join(',')
                this.props.addAddressRelate(parm)
                this.addBuild.resetFields()
            }
        })
    }
    // 报修类型树的创建
    createTypeTree = (list, num) => {
        let rapairList = this.props.repairTypeRelateList.map(item => {
            return item.relate_id
        })
        let data = this.nodeText(list)
        return data.map(item => {
            if (item.child.length > 0) {
                return (
                    <TreeNode
                        value={item.parent.id}
                        title={item.parent.typeName}
                        key={item.parent.id}
                        disabled={
                            !num
                                ? item.parent.isRelate === 1
                                    ? true
                                    : false
                                : rapairList.indexOf(item.parent.id) > -1
                                ? true
                                : false
                        }
                    >
                        {item.child.map(child1 => {
                            if (child1.finChild.length > 0) {
                                return (
                                    <TreeNode
                                        value={child1.temp.id}
                                        title={child1.temp.typeName}
                                        key={child1.temp.id}
                                        disabled={
                                            !num
                                                ? child1.temp.isRelate === 1
                                                    ? true
                                                    : false
                                                : rapairList.indexOf(child1.temp.id) > -1
                                                ? true
                                                : false
                                        }
                                    >
                                        {child1.finChild.map(self => {
                                            return (
                                                <TreeNode
                                                    value={self.id}
                                                    title={self.typeName}
                                                    key={self.id}
                                                    disabled={
                                                        !num
                                                            ? self.isRelate === 1
                                                                ? true
                                                                : false
                                                            : rapairList.indexOf(self.id) > -1
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            )
                                        })}
                                    </TreeNode>
                                )
                            } else {
                                return (
                                    <TreeNode
                                        value={child1.temp.id}
                                        title={child1.temp.typeName}
                                        key={child1.temp.id}
                                        disabled={
                                            !num
                                                ? child1.temp.isRelate === 1
                                                    ? true
                                                    : false
                                                : rapairList.indexOf(child1.temp.id) > -1
                                                ? true
                                                : false
                                        }
                                    />
                                )
                            }
                        })}
                    </TreeNode>
                )
            } else {
                return (
                    <TreeNode
                        value={item.parent.id}
                        title={item.parent.typeName}
                        key={item.parent.id}
                        disabled={
                            !num
                                ? item.parent.isRelate === 1
                                    ? true
                                    : false
                                : rapairList.indexOf(item.parent.id) > -1
                                ? true
                                : false
                        }
                    />
                )
            }
        })
    }
    // 设置-维修类型
    modalRepair = type => {
        const items = [
            {
                label: '报修类型：',
                field: 'repairTypeRel',
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
                        {this.createTypeTree(this.props.repairsTypeList, 1)}
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
                if (!fieldsValue.repairTypeRel) {
                    message.warning('请选择报修类型')
                    return
                }
                let parm = {}
                parm.userId = this.state.userMess.userId
                parm.userName = this.state.userMess.userName
                parm.phone = this.state.userMess.phone
                parm.id = fieldsValue.repairTypeRel.join(',')
                this.props.addRepairRelate(parm)
                this.addRepairType.resetFields()
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
        parm.appIdentity = page.appIdentity
        this.props.getUserList(parm)
    }
    // table的pageNo改变
    onChange = (pageNo, pageSize) => {
        let parm = this.formParms()
        parm.pageNo = pageNo
        parm.pageSize = pageSize
        parm.appIdentity = page.appIdentity
        this.props.getUserList(parm)
    }
    // 删除楼宇关联信息
    deleteBuildRle = id => {
        this.props.deleteAddressRelate({ id: id, userId: this.state.userMess.userId })
    }
    // 删除报修类型关联信息
    deleteTypeRel = id => {
        this.props.deleteRepairRelate({ id: id, userId: this.state.userMess.userId })
    }
    render() {
        const buildColumns = [
            {
                title: '区域',
                dataIndex: 'area',
                key: 'area',
                align: 'center',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                align: 'center',
                render: (text, record) => <span>{text ? text : '--'}</span>,
            },
            {
                title: '详细地址',
                dataIndex: 'detail',
                key: 'detail',
                align: 'center',
                render: (text, record) => <span>{text ? text : '--'}</span>,
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
                            onClick={() => this.deleteBuildRle(record.id)}
                        >
                            删除
                        </span>
                    </span>
                ),
            },
        ]
        const repairColumns = [
            {
                title: '报修类型',
                dataIndex: 'repairType',
                key: 'repairType',
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
                            onClick={() => this.deleteTypeRel(record.id)}
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
                dataIndex: 'account',
                key: 'account',
                align: 'center',
            },
            {
                title: '用户姓名',
                dataIndex: 'userName',
                key: 'userName',
                align: 'center',
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                key: 'phone',
                align: 'center',
            },
            {
                title: '角色',
                dataIndex: 'role',
                key: 'role',
                align: 'center',
                render: (text, record) => <span key={record}>{text ? text : '-'}</span>,
            },
            {
                title: '部门',
                dataIndex: 'deptName',
                key: 'deptName',
                align: 'center',
            },
            {
                title: '职责',
                dataIndex: 'duty',
                key: 'duty',
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
                            onClick={() => this.showModal(record)}
                        >
                            设置
                        </span>
                    </span>
                ),
            },
        ]
        return (
            <Card title="" bordered={false}>
                {this.renderForm('search')}
                <Alert
                    style={{ margin: '18px 0 8px' }}
                    message={`共${this.props.userTotal || 0}项`}
                    type="info"
                    showIcon
                />
                <Table
                    className={styles.commonLeft}
                    columns={columns}
                    // rowSelection={rowSelection}
                    rowKey={(record, index) => `${record.userId}`}
                    dataSource={this.props.userList}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '15', '20'],
                        total: this.props.userTotal,
                        onShowSizeChange: this.onShowSizeChange.bind(this),
                        onChange: this.onChange.bind(this),
                    }}
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
                                dataSource={this.props.addressRelateList}
                                columns={buildColumns}
                                pagination={false}
                                rowKey={(record, index) => `${record.id}`}
                            />
                        </TabPane>
                        <TabPane tab="关联维修类型" key="2">
                            {this.modalRepair('search')}
                            <div style={{ margin: '12px 0 5px' }}>已关联维修类型</div>
                            <Table
                                dataSource={this.props.repairTypeRelateList}
                                columns={repairColumns}
                                pagination={false}
                                rowKey={(record, index) => `${record.id}`}
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
        repairsTypeList: state.configuration.repairsTypeList,
        repairsAddressList: state.configuration.repairsAddressList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getUserList: actions('getUserList'),
            getAddressRelateList: actions('getAddressRelateList'), //获取楼宇关联
            getAddressType: actions('getAddressType'), //获取所有的报修地址
            getRepairsType: actions('getRepairsType'), //获取所有的报修类型
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
