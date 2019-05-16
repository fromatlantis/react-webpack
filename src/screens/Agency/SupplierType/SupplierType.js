import React, { PureComponent } from 'react'
import {
    Tree,
    Input,
    Divider,
    Icon,
    Modal,
    Button,
    notification,
    Form,
    Radio,
    Breadcrumb,
    Card,
} from 'antd'
import styles from './SupplierType.module.css'
import UploadImg from '../../../components/UploadImg/UploadImg'

const { TreeNode } = Tree
const Search = Input.Search
const { TextArea } = Input
const RadioGroup = Radio.Group

function lian(treeId) {
    console.log('lian这里执行了', treeId)
    return Form.create({
        mapPropsToFields(props) {
            console.log('这里失踪了吗')
            return {
                description: Form.createFormField({ value: treeId.description }),
                price: Form.createFormField({ value: treeId.price }),
                priceVisitable: Form.createFormField({
                    value: treeId.priceVisitable,
                }),
                typeName: Form.createFormField({ value: treeId.typeName }),
            }
        },
    })(SearchTree)
}
class SearchTree extends React.Component {
    componentDidMount = () => {
        this.props.getServiceTypeList()
    }
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        visible: false,
        oneVis: true, //是否显示后三个字段(父节点不显示，子节点显示)
        visibleF: false,
        icon: null,
        parentId: '',
    }
    // 处理接口返回的数据
    nodeText = () => {
        let ServiceTypeList = this.props.ServiceTypeList
        let keys = [],
            newList = []
        ServiceTypeList.filter(item => {
            return item.level === '1'
        }).map(child => {
            if (keys.indexOf(child.id) < 0) {
                keys.push({ key: child.id, typeName: child.typeName })
            }
            return true
        })
        let temp = ServiceTypeList.filter(item => {
            return item.level === '2'
        })
        keys.forEach(parent => {
            let items = []
            temp.forEach(child => {
                if (parent.key === child.pid) {
                    items.push(child)
                }
            })
            newList.push({ parent, items })
        })
        return newList
    }
    // 父节点添加
    addModalOne = () => {
        this.setState({
            visibleF: true,
        })
    }
    editModalOne = id => {
        this.setState({
            visible: true,
            oneVis: false,
        })
        let treeId = this.props.ServiceTypeList.filter(item => {
            return item.id === id
        })
        treeId = treeId[0]
        lian(treeId)
    }
    editModalChild = (selfId, pic) => {
        // treeId = this.props.ServiceTypeList.filter(item => {
        //     return item.id === selfId
        // })
        this.setState({
            visible: true,
            oneVis: true,
            parentId: pic,
        })
    }
    // 父节点添加Ok
    addHandleOk = () => {
        this.setState({
            visibleF: false,
        })
        let logo = this.state.icon
        if (logo === 'null') {
            this.notification()
            return
        }
        this.props.form.validateFields((err, fieldsValue) => {
            // if (err) {
            //     console.log('哪里出错了')
            //     return
            // }
            fieldsValue.priceVisitable = '*'
            fieldsValue.price = '*'
            fieldsValue.description = '*'
            fieldsValue.level = '1'
            fieldsValue.pid = '0'
            fieldsValue.logo = logo
            this.props.addServiceType(fieldsValue)
        })
    }
    // 编辑
    handleOk = e => {
        this.setState({
            visible: false,
        })
        let logo = this.state.icon
        if (logo === 'null') {
            this.notification()
            return
        }
        if (this.state.oneVis) {
            let parentId = this.state.parentId
            // 子节点编辑
            this.props.form.validateFields((err, fieldsValue) => {
                if (!err) {
                    fieldsValue.level = '2'
                    fieldsValue.logo = logo
                    fieldsValue.pic = parentId
                    this.props.updateServiceType(fieldsValue)
                }
            })
        } else {
            // 父节点编辑
            this.props.form.validateFields((err, fieldsValue) => {
                fieldsValue.priceVisitable = '*'
                fieldsValue.price = '*'
                fieldsValue.description = '*'
                fieldsValue.level = '1'
                fieldsValue.pid = '0'
                fieldsValue.logo = logo
                this.props.updateServiceType(fieldsValue)
            })
        }
    }
    addHandleCancel = () => {
        this.setState({
            visibleF: false,
        })
    }
    handleCancel = e => {
        // console.log(e)
        this.setState({
            visible: false,
        })
    }
    onExpand = expandedKeys => {
        console.log('展开或者收起时触发', expandedKeys)
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        })
    }
    //提醒用户上传图片
    openNotification = () => {
        notification.open({
            message: '智慧园区提醒您：',
            description: '请上传封面图！',
            placement: 'topLeft',
            duration: 2,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
    }
    // 添加父节点时，上传图片
    addImgOnClick = file => {
        console.log('icon为啥为undefined', file)
        this.setState({
            icon: file,
        })
    }
    onChange = e => {
        const value = e.target.value
        const expandedKeys = []
        this.props.ServiceTypeList.map(item => {
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
    // 删除节点
    deleteNode = id => {
        this.props.deleteServiceType({ id: id })
    }
    render() {
        const that = this
        const { searchValue, expandedKeys, autoExpandParent } = this.state
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        }
        const lianLoop = data =>
            data.map(item => {
                let text = item.parent.typeName
                const indexF = text.indexOf(searchValue)
                const beforeStrF = text.substr(0, indexF)
                const afterStrF = text.substr(indexF + searchValue.length)
                const title =
                    indexF > -1 ? (
                        <div>
                            <span className={styles.treeName}>
                                {beforeStrF}
                                <span style={{ color: '#f50' }}>{searchValue}</span>
                                {afterStrF}
                            </span>
                            <Icon type="edit" onClick={() => this.editModalOne(item.parent.key)} />
                            <Icon
                                className={styles.iconMinus}
                                onClick={() => {
                                    this.deleteNode(item.parent.key)
                                }}
                                type="minus-circle"
                            />
                            <Icon onClick={this.addModalOne} type="plus-circle" />
                        </div>
                    ) : (
                        <div>
                            <span className={styles.treeName}>{item.parent.typeName}</span>
                            <Icon type="edit" onClick={() => this.editModalOne(item.parent.key)} />
                            <Icon
                                className={styles.iconMinus}
                                onClick={() => {
                                    this.deleteNode(item.parent.key)
                                }}
                                type="minus-circle"
                            />
                            <Icon onClick={this.addModalOne} type="plus-circle" />
                        </div>
                    )
                if (item.items.length > 0) {
                    return (
                        <TreeNode key={item.parent.key} title={title}>
                            {item.items.map(type => {
                                let text = type.typeName
                                let indexChild = text.indexOf(searchValue)
                                let beforeStrChild = text.substr(0, indexChild)
                                let afterStrChild = text.substr(indexChild + searchValue.length)
                                const childTitle =
                                    indexChild > -1 ? (
                                        <div>
                                            <span className={styles.treeName}>
                                                {beforeStrChild}
                                                <span style={{ color: '#f50' }}>{searchValue}</span>
                                                {afterStrChild}
                                            </span>
                                            <Icon
                                                type="edit"
                                                onClick={() =>
                                                    this.editModalChild(type.id, item.parent.key)
                                                }
                                            />
                                            <Icon
                                                className={styles.iconMinus}
                                                onClick={() => this.deleteNode(type.id)}
                                                type="minus-circle"
                                            />
                                            <Icon onClick={this.editModalOne} type="bars" />
                                        </div>
                                    ) : (
                                        <div>
                                            <span className={styles.treeName}>{type.typeName}</span>
                                            <Icon
                                                type="edit"
                                                onClick={() =>
                                                    this.editModalChild(type.id, item.parent.key)
                                                }
                                            />
                                            <Icon
                                                className={styles.iconMinus}
                                                onClick={() => this.deleteNode(type.id)}
                                                type="minus-circle"
                                            />
                                            <Icon onClick={this.editModalOne} type="bars" />
                                        </div>
                                    )
                                return <TreeNode key={type.id} title={childTitle} />
                            })}
                        </TreeNode>
                    )
                } else {
                    return <TreeNode key={item.parent.key} title={title} />
                }
            })
        return (
            <div>
                <Card title="供应商类型" bordered={false}>
                    <div style={{ paddingLeft: 10 }}>
                        <Search
                            style={{ marginBottom: 8, width: 350 }}
                            placeholder="Search"
                            onChange={this.onChange}
                        />
                        {this.props.ServiceTypeList && (
                            <Tree
                                onExpand={this.onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                            >
                                {lianLoop(this.nodeText())}
                            </Tree>
                        )}
                    </div>
                    {/* 添加父节点 */}
                    <Modal
                        style={{ width: 250 }}
                        title="供应商类型"
                        visible={this.state.visibleF}
                        onOk={this.addHandleOk}
                        onCancel={this.addHandleCancel}
                    >
                        <Form>
                            <Form.Item label="服务LOGO：" {...formItemLayout}>
                                {getFieldDecorator('icon')(
                                    <UploadImg
                                        onUpload={that.addImgOnClick}
                                        //  url={coverPlot}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="名称：" layout="inline">
                                {getFieldDecorator('typeName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入名称',
                                        },
                                    ],
                                })(<Input placeholder="输入名称" className={styles.inputChip} />)}
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/* 编辑 */}
                    <Modal
                        style={{ width: 250 }}
                        title="供应商类型"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="封面图：" {...formItemLayout}>
                                {getFieldDecorator('icon')(
                                    <UploadImg
                                        onUpload={this.ImgOnClick}
                                        //  url={coverPlot}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="名称：" layout="inline">
                                {getFieldDecorator('typeName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入名称',
                                        },
                                    ],
                                })(<Input placeholder="输入名称" className={styles.inputChip} />)}
                            </Form.Item>
                            {this.state.oneVis ? (
                                <div>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="是否显示金额："
                                        layout="inline"
                                    >
                                        {getFieldDecorator('priceVisitable', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择是否显示金额',
                                                },
                                            ],
                                        })(
                                            <RadioGroup>
                                                <Radio value={1}>是</Radio>
                                                <Radio value={0}>否</Radio>
                                            </RadioGroup>,
                                        )}
                                    </Form.Item>
                                    <Form.Item {...formItemLayout} label="金额：" layout="inline">
                                        {getFieldDecorator('price', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入金额',
                                                },
                                            ],
                                        })(
                                            <Input
                                                placeholder="输入金额"
                                                className={styles.inputChip}
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="服务描述:"
                                        layout="inline"
                                    >
                                        {getFieldDecorator('description', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入服务描述！',
                                                },
                                            ],
                                        })(<TextArea rows={6} />)}
                                    </Form.Item>
                                </div>
                            ) : (
                                ''
                            )}
                        </Form>
                    </Modal>
                </Card>
            </div>
        )
    }
}
export default Form.create({
    mapPropsToFields(props) {
        return {
            // description: Form.createFormField({ value: treeId.description }),
            // price: Form.createFormField({ value: treeId.price }),
            // priceVisitable: Form.createFormField({
            //     value: treeId.priceVisitable,
            // }),
            // typeName: Form.createFormField({ value: treeId.typeName }),
        }
    },
})(SearchTree)
