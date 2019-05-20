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
import FormView, { SearchView } from '../../../components/FormView/FormView'

const { TreeNode } = Tree
const Search = Input.Search
const { TextArea } = Input
const RadioGroup = Radio.Group
const confirm = Modal.confirm
class SearchTree extends React.Component {
    componentDidMount = () => {
        this.props.getServiceTypeList()
    }
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        visible: false,
        visibleF: false,
        parentEditvisible: false,
        icon: null,
        childEditIcon: null,
        parentEditIcon: null,
        parentId: '',
        childFilter: '',
        parentFilter: '',
        selfId: '',
        disabledModal: false,
        priceVisi: '',
    }
    // 编辑父节点表单
    parentForm = type => {
        const { logo } = this.state.parentFilter
        const items = [
            {
                label: '服务LOGO:',
                // field: 'icon',
                rules: [
                    {
                        required: true,
                        message: '请输入服务的LOGO',
                    },
                ],
                component: <UploadImg key={logo} onUpload={this.parentEditClick} url={logo} />,
            },
            {
                label: '名称:',
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
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const parentFilter = this.state.parentFilter
        return (
            <FormView
                ref={form => {
                    this.parentEditForm = form
                }}
                formItemLayout={formItemLayout}
                items={items}
                data={parentFilter}
                saveBtn={false}
            />
        )
    }
    // (编辑/详情)子节点表单
    renderNewForm = type => {
        const { logo } = this.state.childFilter
        const priceVisi = this.state.priceVisi
        let temp = this.state.disabledModal
        const items = [
            {
                label: '服务LOGO:',
                // field: 'icon',
                rules: [
                    {
                        required: true,
                        message: '请输入服务的LOGO',
                    },
                ],
                component: temp ? (
                    <img src={logo} alt="" className={styles.detailImg} />
                ) : (
                    <UploadImg key={logo} onUpload={this.childEditImg} url={logo} />
                ),
            },
            {
                label: '名称:',
                field: 'typeName',
                rules: [
                    {
                        required: true,
                        message: '请输入名称',
                    },
                ],
                component: <Input placeholder="输入名称" disabled={this.state.disabledModal} />,
            },
            {
                label: '是否显示金额:',
                // field: 'priceVisitable',
                rules: [
                    {
                        required: true,
                        message: '请选择是否显示金额',
                    },
                ],
                component: (
                    <RadioGroup value={priceVisi}>
                        <Radio
                            value="1"
                            onChange={e => {
                                this.setState({ priceVisi: '1' })
                            }}
                            disabled={this.state.disabledModal}
                        >
                            是
                        </Radio>
                        <Radio
                            onChange={e => {
                                this.setState({ priceVisi: '*' })
                            }}
                            value="*"
                            disabled={this.state.disabledModal}
                        >
                            否
                        </Radio>
                    </RadioGroup>
                ),
            },
            {
                label: '金额:',
                rules:
                    priceVisi === '1'
                        ? [
                              {
                                  required: true,
                                  message: '请输入金额',
                              },
                          ]
                        : '',
                field: 'price',
                component: <Input disabled={this.state.disabledModal || priceVisi !== '1'} />,
            },
            {
                label: '服务描述:',
                rules: [
                    {
                        required: true,
                        message: '请输入服务描述',
                    },
                ],
                field: 'description',
                style: { marginTop: '5px' },
                component: (
                    <Input.TextArea
                        disabled={this.state.disabledModal}
                        autosize={{ minRows: 4, maxRows: 6 }}
                    />
                ),
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const childFilter = this.state.childFilter
        return (
            <FormView
                ref={form => {
                    this.newForm = form
                }}
                formItemLayout={formItemLayout}
                items={items}
                data={childFilter}
                saveBtn={false}
            />
        )
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
            icon: null,
        })
    }
    // 点击编辑父节点弹窗
    editModalOne = id => {
        let parentFilter = this.props.ServiceTypeList.filter(item => {
            return item.id === id
        })
        this.setState({
            parentEditvisible: true,
            parentFilter: parentFilter[0],
            selfId: id,
            disabledModal: false,
            parentEditIcon: null,
        })
    }
    // 点击编辑子节点弹窗
    editModalChild = (selfId, pic) => {
        let childFilter = this.props.ServiceTypeList.filter(item => {
            return item.id === selfId
        })
        this.setState({
            visible: true,
            parentId: pic,
            childFilter: childFilter[0],
            selfId: selfId,
            disabledModal: false,
            childEditIcon: null,
            priceVisi: childFilter[0].priceVisitable,
        })
    }
    // 子节点详情
    detailModal = (selfId, pic) => {
        let childFilter = this.props.ServiceTypeList.filter(item => {
            return item.id === selfId
        })
        this.setState({
            parentId: pic,
            childFilter: childFilter[0],
            disabledModal: true,
            visible: true,
        })
    }
    // 父节点添加Ok
    addHandleOk = () => {
        let logo = this.state.icon
        if (logo === null) {
            this.openNotification()
            return
        }
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                this.setState({
                    visibleF: false,
                })
                fieldsValue.priceVisitable = '*'
                fieldsValue.price = '*'
                fieldsValue.description = '*'
                fieldsValue.level = '1'
                fieldsValue.pid = '0'
                fieldsValue.logo = logo
                this.props.addServiceType(fieldsValue)
            }
        })
    }
    // 子节点编辑/详情的OK
    handleOk = e => {
        // 详情
        if (this.state.disabledModal) {
            this.setState({
                visible: false,
            })
            return
        }
        let logo = this.state.childEditIcon
        let parentId = this.state.parentId
        let id = this.state.selfId
        let priceVisi = this.state.priceVisi
        // 子节点编辑
        this.newForm.validateFields((err, fieldsValue) => {
            if (!err) {
                this.setState({
                    visible: false,
                })
                fieldsValue.level = '2'
                fieldsValue.logoFile = logo
                fieldsValue.pic = parentId
                fieldsValue.id = id
                fieldsValue.priceVisitable = priceVisi
                this.props.updateServiceType(fieldsValue)
            }
        })
    }
    addHandleCancel = () => {
        this.setState({
            visibleF: false,
        })
    }
    // 父节点编辑OK
    parentEditOk = () => {
        let logo = this.state.parentEditIcon
        let selfId = this.state.selfId
        this.parentEditForm.validateFields((err, fieldsValue) => {
            if (!err) {
                this.setState({
                    parentEditvisible: false,
                })
                fieldsValue.priceVisitable = '*'
                fieldsValue.price = '*'
                fieldsValue.description = '*'
                fieldsValue.level = '1'
                fieldsValue.pid = '0'
                fieldsValue.logoFile = logo
                fieldsValue.id = selfId
                this.props.updateServiceType(fieldsValue)
            }
        })
    }
    // 父节点编辑OK
    parentEditCancel = () => {
        this.setState({
            parentEditvisible: false,
        })
    }

    handleCancel = e => {
        // console.log(e)
        this.setState({
            visible: false,
        })
    }
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        })
    }
    //提醒用户上传图片
    openNotification = () => {
        notification.open({
            message: '智慧园区提醒您：',
            description: '请上传服务LOGO！',
            placement: 'topLeft',
            duration: 2,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        })
    }
    // 添加父节点时，上传图片
    addImgOnClick = file => {
        this.setState({
            icon: file,
        })
    }
    // 子节点编辑上传图片
    childEditImg = file => {
        this.setState({
            childEditIcon: file,
        })
    }
    // 父节点编辑上传图片
    parentEditClick = file => {
        this.setState({
            parentEditIcon: file,
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
        let that = this
        confirm({
            title: '确定要删除吗',
            onOk() {
                that.props.deleteServiceType({ id: id })
            },
            onCancel() {},
        })
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
                                            <Icon
                                                onClick={() =>
                                                    this.detailModal(type.id, item.parent.key)
                                                }
                                                type="bars"
                                            />
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
                                            <Icon
                                                onClick={() =>
                                                    this.detailModal(type.id, item.parent.key)
                                                }
                                                type="bars"
                                            />
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
                                {this.state.visibleF ? (
                                    <UploadImg
                                        onUpload={that.addImgOnClick}
                                        //  url={coverPlot}
                                    />
                                ) : null}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="名称：" layout="inline">
                                {getFieldDecorator('typeName', {
                                    rules: [{ required: true, message: '请输入名称' }],
                                })(<Input placeholder="输入名称" className={styles.inputChip} />)}
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/* 子节点编辑和详情 */}
                    <Modal
                        style={{ width: 250 }}
                        title="供应商类型"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        {this.renderNewForm()}
                    </Modal>
                    {/* 父节点编辑 */}
                    <Modal
                        style={{ width: 250 }}
                        title="供应商类型"
                        visible={this.state.parentEditvisible}
                        onOk={this.parentEditOk}
                        onCancel={this.parentEditCancel}
                    >
                        {this.parentForm()}
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
