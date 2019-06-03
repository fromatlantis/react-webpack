import React, { PureComponent } from 'react'
import { Tree, Input, Modal, Button, Card, Icon, Select } from 'antd'
import styles from './RepairAddressSet.module.css'
import FormView from '../../../components/FormView/FormView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/configuration'

const { TreeNode } = Tree
const Search = Input.Search
const Option = Select.Option
class RepairAddressSet extends PureComponent {
    componentDidMount = () => {
        this.props.getAddressType()
    }
    // 处理接口返回的数据形式
    nodeText = () => {
        let list = this.props.repairsAddressList
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
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        visible: false,
        nodeNum: '1',
        addOrEdit: '', //1是添加，2为编辑
        isParent: true, //是否只能添加一级标题
        dataList: [],
    }
    // 添加之前先选择添加一级还是二级
    selectHandle = value => {
        this.setState({ nodeNum: value })
    }
    // 添加节点
    addModalForm = type => {
        const items = [
            {
                label: '节点级别',
                component: (
                    <Select
                        value={this.state.nodeNum}
                        style={{ width: 120 }}
                        onChange={this.selectHandle}
                    >
                        <Option value="1">同级</Option>
                        <Option value="2">子级</Option>
                    </Select>
                ),
                style: { display: this.state.isParent ? 'block' : 'none' },
            },
            {
                label: '报修类型名称:',
                field: 'typeName',
                rules: [
                    {
                        required: true,
                        message: '请输入名称',
                    },
                    // {
                    //     pattern: /(^[\u4e00-\u9fa5]{1,20}$)/,
                    //     message: '报修类型名称最多为20个字',
                    // },
                ],
                component: <Input placeholder="输入名称" />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return (
            <FormView
                ref={form => {
                    this.addform = form
                }}
                // onChange={this.handleFormChange}
                formItemLayout={formItemLayout}
                items={items}
                saveBtn={false}
            />
        )
    }
    // 编辑节点
    editModalForm = type => {
        const items = [
            {
                label: '报修类型名称:',
                field: 'typeName',
                rules: [
                    {
                        required: true,
                        message: '请输入名称',
                    },
                ],
                component: <Input placeholder="输入名称" />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        const dataList = this.state.dataList
        return (
            <FormView
                ref={form => {
                    this.editform = form
                }}
                // onChange={this.handleFormChange}
                data={dataList}
                formItemLayout={formItemLayout}
                items={items}
                saveBtn={false}
            />
        )
    }
    onChange = e => {
        const value = e.target.value
        const expandedKeys = []
        this.props.repairsAddressList.map(item => {
            if (item.typeName.indexOf(value) > -1) {
                expandedKeys.push(item.id)
            }
        })
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        })
    }
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        })
    }
    treeCreated = (data, i) => {
        let searchValue = this.state.searchValue
        let text = data.typeName
        const indexF = text.indexOf(searchValue)
        const beforeStrF = text.substr(0, indexF)
        const afterStrF = text.substr(indexF + searchValue.length)
        if (indexF > -1) {
            return (
                <div>
                    <span className={styles.treeName}>
                        {beforeStrF}
                        <span style={{ color: '#f50' }}>{searchValue}</span>
                        {afterStrF}
                    </span>
                    <Icon type="edit" onClick={() => this.Modalhandle(data, 'edit')} />
                    <Icon
                        className={styles.iconMinus}
                        type="minus-circle"
                        onClick={() => {
                            this.deleteTreeNode(data)
                        }}
                    />
                    <Icon
                        style={{ display: i !== '3' ? 'inline-block' : 'none' }}
                        type="plus-circle"
                        onClick={() => this.Modalhandle(data, 'add')}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <span className={styles.treeName}>{text}</span>
                    <Icon type="edit" onClick={() => this.Modalhandle(data, 'edit')} />
                    <Icon className={styles.iconMinus} type="minus-circle" />
                    <Icon type="plus-circle" onClick={() => this.Modalhandle(data, 'add')} />
                </div>
            )
        }
    }
    // 删除节点操作
    deleteTreeNode = data => {
        this.props.deleteAddressTypeNode(data.id)
    }
    addShowModal = () => {
        this.setState({
            visible: true,
            addOrEdit: '1',
            isParent: false,
        })
    }
    addHandleOk = e => {
        //1.编辑 2.添加 3.添加的是否是创建按钮点击的，默认是添加一级节点
        if (this.state.addOrEdit === '1') {
            // 添加
            this.addform.validateFields((err, fieldsValue) => {
                if (!err) {
                    this.setState({
                        visible: false,
                    })
                    let dataList = this.state.dataList
                    if (!this.state.isParent) {
                        fieldsValue.pid = '0'
                        fieldsValue.level = '1'
                    } else {
                        fieldsValue.pid = dataList.pid
                        fieldsValue.level = dataList.level
                    }
                    this.props.seAddressTypeNode(fieldsValue)
                }
            })
        } else {
            // 编辑
            this.editform.validateFields((err, fieldsValue) => {
                if (!err) {
                    this.setState({
                        visible: false,
                    })
                    fieldsValue.id = this.state.dataList.id
                    this.props.updateAddressTypeNode(fieldsValue)
                }
            })
        }
    }
    addHandleCancel = e => {
        this.setState({
            visible: false,
        })
    }
    Modalhandle = (data, type) => {
        // 传过来的data是个对象
        this.setState({ isParent: true, dataList: data })
        if (type === 'edit') {
            //编辑
            this.setState({ addOrEdit: '2', visible: true })
        } else {
            //添加
            this.setState({ addOrEdit: '1', visible: true })
        }
    }
    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state
        const treeNodeData = data => {
            let that = this
            return data.map(item => {
                if (item.child.length > 0) {
                    return (
                        <TreeNode key={item.parent.id} title={that.treeCreated(item.parent, '1')}>
                            {item.child.map(child1 => {
                                if (child1.finChild.length > 0) {
                                    return (
                                        <TreeNode
                                            key={child1.temp.id}
                                            title={that.treeCreated(child1.temp, '2')}
                                        >
                                            {child1.finChild.map(child2 => {
                                                return (
                                                    <TreeNode
                                                        key={child2.id}
                                                        title={that.treeCreated(child2, '3')}
                                                    />
                                                )
                                            })}
                                        </TreeNode>
                                    )
                                } else {
                                    return (
                                        <TreeNode
                                            key={child1.temp.id}
                                            title={that.treeCreated(child1.temp, '2')}
                                        />
                                    )
                                }
                            })}
                        </TreeNode>
                    )
                } else {
                    return (
                        <TreeNode key={item.parent.id} title={that.treeCreated(item.parent, '1')} />
                    )
                }
            })
        }
        let repairList = this.props.repairsAddressList
        return (
            <Card title="" bordered={false}>
                <Search
                    style={{ marginBottom: 8, width: 350 }}
                    placeholder="Search"
                    onChange={this.onChange}
                />
                {repairList.length ? (
                    <Button
                        type="primary"
                        style={{
                            display: repairList.length === 0 ? 'inline-block' : 'none',
                            marginLeft: 20,
                        }}
                        onClick={this.addShowModal}
                    >
                        创建类型
                    </Button>
                ) : (
                    ''
                )}
                {repairList ? (
                    <Tree
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                    >
                        {treeNodeData(this.nodeText())}
                    </Tree>
                ) : (
                    ''
                )}
                {/* 添加类型 */}
                <Modal
                    title={this.state.addOrEdit === '1' ? '创建类型' : '修改类型'}
                    visible={this.state.visible}
                    onOk={this.addHandleOk}
                    onCancel={this.addHandleCancel}
                >
                    {this.state.addOrEdit === '1' ? this.addModalForm() : this.editModalForm()}
                </Modal>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        repairsAddressList: state.configuration.repairsAddressList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAddressType: actions('getAddressType'),
            seAddressTypeNode: actions('seAddressTypeNode'), //添加
            updateAddressTypeNode: actions('updateAddressTypeNode'), //编辑
            deleteAddressTypeNode: actions('deleteAddressTypeNode'), //删除
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepairAddressSet)
