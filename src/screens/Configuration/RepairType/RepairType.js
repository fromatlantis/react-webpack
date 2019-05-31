import React, { PureComponent } from 'react'
import { Tree, Input, Modal, Button, Card, Icon, Select } from 'antd'
import styles from './RepairType.module.css'
import FormView from '../../../components/FormView/FormView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/configuration'

const { TreeNode } = Tree
const Search = Input.Search
const Option = Select.Option
const temp = [
    {
        pName: '电路',
        id: '1',
        child: [
            {
                pName: '电路小',
                pid: '1',
                id: '10',
                child: [{ pName: '电话小小', id: '100', pid: '10', child: [] }],
            },
        ],
    },
    { pName: '水管', id: '2', child: [{ pName: '水管小', pid: '2', id: '20', child: [] }] },
    { pName: '闸', id: '3', child: [] },
]
class RepairType extends PureComponent {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        visible: false,
        nodeNum: '1',
        addOrEdit: '', //1是添加，2为编辑
        isParent: true, //是否只能添加一级标题
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
        // const parentFilter = this.state.parentFilter
        return (
            <FormView
                ref={form => {
                    this.editform = form
                }}
                // onChange={this.handleFormChange}
                // data={parentFilter}
                formItemLayout={formItemLayout}
                items={items}
                saveBtn={false}
            />
        )
    }
    onChange = e => {
        const value = e.target.value
        const expandedKeys = []
        // this.props.ServiceTypeList.map(item => {
        //     if (item.typeName.indexOf(value) > -1) {
        //         expandedKeys.push(item.id)
        //     }
        // })
        // this.setState({
        //     expandedKeys,
        //     searchValue: value,
        //     autoExpandParent: true,
        // })
    }
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        })
    }
    treeCreated = (data, i) => {
        let searchValue = this.state.searchValue
        let text = data.pName
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
                    <Icon className={styles.iconMinus} type="minus-circle" />
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
    addShowModal = () => {
        this.setState({
            visible: true,
            addOrEdit: '1',
            isParent: false,
        })
    }
    addHandleOk = e => {
        //1.编辑 2.添加 3.添加的是否是创建按钮点击的，默认是添加一级节点
        this.setState({
            visible: false,
        })
    }
    addHandleCancel = e => {
        this.setState({
            visible: false,
        })
    }
    Modalhandle = (data, type) => {
        // 传过来的data是个对象，data.pic存在的话就是子节点，不存在的话就是一级节点
        this.setState({ isParent: true })
        if (type === 'edit') {
            //编辑
            this.setState({ addOrEdit: '2', visible: true })
            console.log('编辑')
        } else {
            //添加
            this.setState({ addOrEdit: '1', visible: true })
            console.log('添加')
        }
    }
    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state
        const treeNodeData = data => {
            let that = this
            return data.map(item => {
                if (item.child.length > 0) {
                    return (
                        <TreeNode key={item.id} title={that.treeCreated(item, '1')}>
                            {item.child.map(child1 => {
                                if (child1.child.length > 0) {
                                    return (
                                        <TreeNode
                                            key={child1.id}
                                            title={that.treeCreated(child1, '2')}
                                        >
                                            {child1.child.map(child2 => {
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
                                            key={child1.id}
                                            title={that.treeCreated(child1, '2')}
                                        />
                                    )
                                }
                            })}
                        </TreeNode>
                    )
                } else {
                    return <TreeNode key={item.id} title={that.treeCreated(item, '1')} />
                }
            })
        }
        return (
            <Card title="" bordered={false}>
                <Search
                    style={{ marginBottom: 8, width: 350 }}
                    placeholder="Search"
                    onChange={this.onChange}
                />
                <Button type="primary" onClick={this.addShowModal} style={{ marginLeft: 20 }}>
                    创建类型
                </Button>
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                >
                    {treeNodeData(temp)}
                </Tree>
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
        repairsTypeList: state.configuration.repairsTypeList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRepairsType: actions('getRepairsType'),
            setRepairsTypeNode: actions('setRepairsTypeNode'), //添加
            updateRepairsTypeNode: actions('updateRepairsTypeNode'), //编辑
            deleteRepairsTypeNode: actions('deleteRepairsTypeNode'), //删除
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RepairType)
