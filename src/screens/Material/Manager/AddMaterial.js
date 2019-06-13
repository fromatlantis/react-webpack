/**
 * 物料管理 ==> 物料管理/新增物料
 */
import React, { PureComponent } from 'react'
import { Form, Button, Modal, Input, InputNumber, Select } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { FormView, UploadImg } from 'components'

import styles from '../Material.module.css'

const Option = Select.Option
const { TextArea } = Input

@connect(
    state => {
        return {}
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                addMaterial: actions('addMaterial'),
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
    handleOk = () => {
        this.form.validateFields((errors, values) => {
            if (!errors) {
                console.log('values', values)
                this.props.addMaterial(values)
                this.setState({ visible: false })
            }
        })
    }
    handleCancel = e => {
        this.setState({ visible: false })
    }
    //'新增'表单
    renderForm = type => {
        const items = [
            {
                label: '物料类型：',
                field: 'type',
                component: (
                    <Select style={{ width: '200px' }} placeholder="请选择类型">
                        <Option value="工具类">工具类</Option>
                        <Option value="一次性消耗品">一次性消耗品</Option>
                    </Select>
                ),
                rules: [{ required: true, message: '请选择物料类型' }],
            },
            {
                label: '物料名称：',
                field: 'name',
                component: <Input placeholder="请输入" />,
                rules: [{ required: true, message: '请输入物料名称' }],
            },
            {
                label: '物料型号：',
                field: 'size',
                component: <Input placeholder="请输入" />,
                rules: [{ required: true, message: '请输入物料型号' }],
            },
            {
                label: '物料价格：',
                field: 'price',
                component: <Input placeholder="请输入" />,
                rules: [{ required: true, message: '请输入价格' }],
            },
            {
                label: '物料图片',
                field: 'image',
                rules: [{ required: true, message: '请添加物料图片' }],
                component: <UploadImg />,
            },
            {
                label: '数量：',
                field: 'count',
                component: <InputNumber min={0} />,
                initialValue: this.state.valueStr,
            },
            {
                label: '用途说明：',
                field: 'remark',
                component: <TextArea autosize={{ minRows: 5 }} />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        }
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={formItemLayout}
                // layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }

    render() {
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
                    {this.renderForm()}
                </Modal>
            </div>
        )
    }
}
export default Form.create()(AddMaterial)
