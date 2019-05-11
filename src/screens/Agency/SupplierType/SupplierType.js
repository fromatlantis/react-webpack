import React, { PureComponent } from 'react'
import { Tree, Input, Divider, Icon, Modal, Button, Form, Radio, Breadcrumb } from 'antd'
import styles from './SupplierType.module.css'
import UploadImg from '../../../components/UploadImg/UploadImg'

const { TreeNode } = Tree
const Search = Input.Search
const { TextArea } = Input
const RadioGroup = Radio.Group

const x = 3
const y = 2
const z = 0
const gData = []

const lian = [
    {
        title: '知识产权',
        key: '知识产权',
        children: [
            { title: '知识产权1', key: '知识产权1' },
            { title: '知识产权2', key: '知识产权2' },
            { title: '知识产权3', key: '知识产权3' },
        ],
    },
    {
        title: '法律服务',
        key: '法律服务',
        children: [
            { title: '法律服务1', key: '法律服务1' },
            { title: '法律服务2', key: '法律服务2' },
            { title: '法律服务3', key: '法律服务3' },
        ],
    },
    {
        title: '人力资源',
        key: '人力资源',
        children: [
            { title: '人力资源1', key: '人力资源1' },
            { title: '人力资源2', key: '人力资源2' },
            { title: '人力资源3', key: '人力资源3' },
        ],
    },
]

// 创建树上的节点
const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0'
    const tns = _tns || gData
    const children = []
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`
        tns.push({ title: key, key })
        if (i < y) {
            children.push(key)
        }
    }
    if (_level < 0) {
        return tns
    }
    const level = _level - 1
    children.forEach((key, index) => {
        tns[index].children = []
        return generateData(level, key, tns[index].children)
    })
}
generateData(z)

//获取树上所有的节点
const dataList = []
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        dataList.push({ key, title: key })
        if (node.children) {
            generateList(node.children)
        }
    }
}
generateList(lian)

// 点击搜索之后，符合的，则自动展开
const getParentKey = (key, tree) => {
    console.log('穿过来的key', key)
    let parentKey
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children)
            }
        }
    }
    return parentKey
}

class SearchTree extends React.Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        visible: false,
        oneVis: true,
    }
    editModalOne = e => {
        e.stopPropagation()
        this.setState({
            visible: true,
            oneVis: false,
        })
    }
    editModalChild = e => {
        console.log('二级目录，显示的内容应该多一点哦')
        this.setState({
            visible: true,
            oneVis: true,
        })
    }

    handleOk = e => {
        console.log(e)
        this.setState({
            visible: false,
        })
    }

    handleCancel = e => {
        console.log(e)
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

    onChange = e => {
        const value = e.target.value
        console.log('搜索的内容是：', value)
        const expandedKeys = lian
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, lian)
                }
                return null
            })
            .filter((item, i, self) => item && self.indexOf(item) === i)
        let haha = lian.map(item => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, lian)
            }
            return null
        })
        console.log('展开的是', haha)
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        })
    }
    render() {
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
                const index = item.title.indexOf(searchValue)
                const beforeStr = item.title.substr(0, index)
                const afterStr = item.title.substr(index + searchValue.length)
                const title =
                    index > -1 ? (
                        <div>
                            <span className={styles.treeName}>
                                {beforeStr}
                                <span style={{ color: '#f50' }}>{searchValue}</span>
                                {afterStr}
                            </span>
                            <Icon type="edit" onClick={this.editModalChild} />
                            <Icon className={styles.iconMinus} type="minus-circle" />
                            <Icon onClick={this.editModalChild} type="bars" />
                        </div>
                    ) : (
                        <div>
                            <span className={styles.treeName}>
                                {beforeStr}
                                <span style={{ color: '#f50' }}>{item.title}</span>
                                {afterStr}
                            </span>
                            <Icon type="edit" onClick={this.editModalChild} />
                            <Icon className={styles.iconMinus} type="minus-circle" />
                            <Icon onClick={this.editModalChild} type="bars" />
                        </div>
                    )
                if (item.children) {
                    let title =
                        index > -1 ? (
                            <div>
                                <span className={styles.treeName}>
                                    {beforeStr}
                                    <span style={{ color: '#f50' }}>{searchValue}</span>
                                    {afterStr}
                                </span>
                                <Icon type="edit" onClick={this.editModalOne} />
                                <Icon className={styles.iconMinus} type="minus-circle" />
                                <Icon onClick={this.editModalOne} type="plus-circle" />
                            </div>
                        ) : (
                            <div>
                                <span className={styles.treeName}>
                                    {beforeStr}
                                    <span style={{ color: '#f50' }}>{item.title}</span>
                                    {afterStr}
                                </span>
                                <Icon type="edit" onClick={this.editModalOne} />
                                <Icon className={styles.iconMinus} type="minus-circle" />
                                <Icon onClick={this.editModalOne} type="plus-circle" />
                            </div>
                        )
                    return (
                        <TreeNode key={item.key} title={title}>
                            {lianLoop(item.children)}
                        </TreeNode>
                    )
                }
                return <TreeNode key={item.key} title={title} />
            })

        // const loop = data =>
        //     data.map(item => {
        //         const index = item.title.indexOf(searchValue)
        //         const beforeStr = item.title.substr(0, index)
        //         const afterStr = item.title.substr(index + searchValue.length)
        //         const title =
        //             index > -1 ? (
        //                 <div>
        //                     <span className={styles.treeName}>
        //                         {beforeStr}
        //                         <span style={{ color: '#f50' }}>{searchValue}</span>
        //                         {afterStr}
        //                     </span>
        //                     <Icon type="edit" onClick={this.editModalOne} />
        //                     <Icon className={styles.iconMinus} type="minus-circle" />
        //                     <Icon onClick={this.editModalOne} type="plus-circle" />
        //                 </div>
        //             ) : (
        //                 <div>
        //                     <span className={styles.treeName}>
        //                         {beforeStr}
        //                         <span style={{ color: '#f50' }}>{item.title}</span>
        //                         {afterStr}
        //                     </span>
        //                     <Icon type="edit" onClick={this.editModalOne} />
        //                     <Icon className={styles.iconMinus} type="minus-circle" />
        //                     <Icon onClick={this.editModalOne} type="plus-circle" />
        //                 </div>
        //             )
        //         if (item.children) {
        //             return (
        //                 <TreeNode key={item.key} title={title}>
        //                     {loop(item.children)}
        //                 </TreeNode>
        //             )
        //         }
        //         return <TreeNode key={item.key} title={title} />
        //     })
        return (
            <div className={styles.container}>
                <Breadcrumb className={styles.title}>
                    <Breadcrumb.Item>供应商类型</Breadcrumb.Item>
                </Breadcrumb>
                <Divider />
                <div style={{ paddingLeft: 10 }}>
                    <Search
                        style={{ marginBottom: 8, width: 350 }}
                        placeholder="Search"
                        onChange={this.onChange}
                    />
                    <Tree
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                    >
                        {lianLoop(lian)}
                    </Tree>
                </div>
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
                            {getFieldDecorator('title', {
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
                                    {getFieldDecorator('title', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择是否显示金额',
                                            },
                                        ],
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>是</Radio>
                                            <Radio value={2}>否</Radio>
                                        </RadioGroup>,
                                    )}
                                </Form.Item>
                                <Form.Item {...formItemLayout} label="金额：" layout="inline">
                                    {getFieldDecorator('title', {
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
                                <Form.Item {...formItemLayout} label="服务描述:" layout="inline">
                                    {getFieldDecorator('synopsis', {
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
            </div>
        )
    }
}

export default Form.create()(SearchTree)
