/**
 * 物料管理 ==> 物料管理/新增物料
 */
import React, { PureComponent } from 'react'
import { Form, Button, Modal, Input, InputNumber, Select } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'

import styles from '../Material.module.css'

const Option = Select.Option

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
class AddMaterial extends PureComponent {
    state = {
        // “新增”的对话框-参数
        visible: false,
        //物料类型select参数
        valueStr: '1',
    }
    // “新增”的对话框-三个方法
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

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    新增
                </Button>
                <Modal
                    title={<span className={styles.marModalL}>新增物料</span>}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item {...formItemLayout} label="客户类型：">
                            {getFieldDecorator(
                                'customerType',
                                { initialValue: this.state.valueStr },
                                {
                                    rules: [{ required: true, message: '请选择客户类型' }],
                                },
                            )(
                                <Select
                                    style={{ width: '300px' }}
                                    placeholder="类型"
                                    onChange={this.changeCustomerType}
                                >
                                    <Option value="1">工具类</Option>
                                    <Option value="2">一次性消耗品</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="物料名称：">
                            {getFieldDecorator('applyUserName', {
                                rules: [{ required: true, message: '请输入物料名称' }],
                            })(<Input style={{ width: '300px' }} placeholder="请输入" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="物料型号：">
                            {getFieldDecorator('applyUserName', {
                                rules: [{ required: true, message: '请输入物料型号' }],
                            })(<Input style={{ width: '300px' }} placeholder="请输入" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="价格：">
                            {getFieldDecorator('applyUserName', {
                                rules: [{ required: true, message: '请输入价格' }],
                            })(<Input style={{ width: '300px' }} placeholder="请输入" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="数量：">
                            {getFieldDecorator('houseName', { initialValue: 0 })(
                                <InputNumber min={0} />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddMaterial)
