/**
 * 物料管理 ==> 物料管理
 */
import React, { PureComponent } from 'react'
import { Alert, Button, Table, Input, Modal, Divider, Select, Form, InputNumber, Radio } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Material.module.css'

import AddMaterial from './AddMaterial'

const Option = Select.Option

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

@connect(
    state => {
        return {
            MaterialList: state.materialManager.MaterialList, //企业详情信息
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialList: actions('getMaterialList'),
            },
            dispatch,
        )
    },
)
class Manager extends PureComponent {
    state = {
        // 出入库的对话框-参数
        visible: false,
        // 出入库的状态-单选radio的参数
        value: 1,
    }
    //生命周期
    componentDidMount = () => {}
    // 出入库的对话框-三个方法
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = e => {
        console.log(e)
        this.setState({ visible: false })
    }
    handleCancel = e => {
        this.setState({ visible: false })
    }
    // 出入库-radio状态的改变回调
    radioOnChange = e => {
        console.log('radio状态值', e.target.value)
        this.setState({
            value: e.target.value,
        })
    }

    renderForm = type => {
        const items = [
            {
                label: '物料名称：',
                field: 'name',
                component: <Input placeholder="请输入" />,
            },
            {
                label: '物料类型：',
                field: 'type',
                component: (
                    <Select style={{ width: '200px' }} placeholder="请选择类型">
                        <Option value="0">全部</Option>
                        <Option value="1">工具类</Option>
                        <Option value="2">一次性消耗品</Option>
                    </Select>
                ),
            },
            {
                label: '物料型号：',
                field: 'size',
                component: <Input placeholder="请输入" />,
            },
        ]
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
                align: 'center',
                render: (text, record, index) => <span>{index + 1}</span>,
            },
            {
                title: '物料类型',
                dataIndex: 'type',
                key: 'type',
                align: 'center',
            },
            {
                title: '物料名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            },
            {
                title: '物料型号',
                dataIndex: 'size',
                key: 'size',
                align: 'center',
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                align: 'center',
            },
            {
                title: '用途说明',
                dataIndex: 'remark',
                key: 'remark',
                align: 'center',
            },
            {
                title: '库存',
                dataIndex: 'count',
                key: 'count',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <Link to={{ pathname: `/material/materialDetails` }}>详情</Link>
                        <Divider type="vertical" />
                        <Link to={{ pathname: `/material/compileMaterial` }}>编辑</Link>
                        <Divider type="vertical" />
                        <Link to={{}} onClick={this.showModal}>
                            出入库
                        </Link>
                    </span>
                ),
            },
        ]

        return (
            <div>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar2}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清空
                        </Button>
                        <Divider type="vertical" className={styles.dividerSty} />
                        <Button type="primary" onClick={this.newInfo}>
                            查询
                        </Button>
                        <Divider type="vertical" className={styles.dividerSty} />
                        <AddMaterial />
                        <Divider type="vertical" className={styles.dividerSty} />
                        <Button type="primary">批量导入</Button>
                    </div>
                    <Alert message="共0项" type="info" showIcon />
                </div>
                <Table dataSource={dataSource} columns={columns} />
                <Modal
                    title={
                        <p>
                            <span className={styles.marModalL}>物料出入库</span>
                            <span className={styles.marModalR}>物料管理</span>
                        </p>
                    }
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="状态：">
                            <Radio.Group onChange={this.radioOnChange} value={this.state.value}>
                                <Radio value={1}>入库</Radio>
                                <Radio value={2}>出库</Radio>
                                <Radio value={3}>报废</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="数量：">
                            {getFieldDecorator('numner')(
                                <InputNumber min={1} defaultValue={1} onChange={this.onChange} />,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="库存：">
                            {getFieldDecorator('count')(
                                <InputNumber
                                    disabled
                                    min={0}
                                    defaultValue={233}
                                    onChange={this.onChange}
                                />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(Manager)
