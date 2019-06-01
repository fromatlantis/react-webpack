/**
 * 物料管理 ==> 物料管理/物料编辑
 */
import React, { PureComponent } from 'react'
import { Form, Button, Breadcrumb, Input, InputNumber, Select, Card } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Material.module.css'

const Option = Select.Option
const { TextArea } = Input

@connect(
    state => {
        return {
            MaterialDetail: state.materialManager.MaterialDetail, //物料详情信息
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getMaterialDetail: actions('getMaterialDetail'),
                updateMaterial: actions('updateMaterial'),
            },
            dispatch,
        )
    },
)
class CompileMaterial extends PureComponent {
    state = {
        // “新增”的对话框-参数
        visible: false,
        //物料id
        id: '',
    }
    //生命周期
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.setState({ id })
        //获取物料详情
        this.props.getMaterialDetail(id)
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
    //提交方法
    handleSubmit = () => {
        this.form.validateFields((error, values) => {
            if (!error) {
                values.id = this.state.id
                console.log('values', values)
                this.props.updateMaterial(values)
            }
        })
    }
    //表单
    renderForm = type => {
        const detail = this.props.MaterialDetail
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
                initialValue: detail.type,
                rules: [{ required: true, message: '请选择客户类型' }],
            },
            {
                label: '物料名称：',
                field: 'name',
                component: <Input placeholder="请输入" />,
                initialValue: detail.name,
                rules: [{ required: true, message: '请输入物料名称' }],
            },
            {
                label: '物料型号：',
                field: 'size',
                component: <Input placeholder="请输入" />,
                initialValue: detail.size,
                rules: [{ required: true, message: '请输入物料型号' }],
            },
            {
                label: '物料价格：',
                field: 'price',
                component: <Input placeholder="请输入" />,
                initialValue: detail.price,
                rules: [{ required: true, message: '请输入价格' }],
            },
            {
                label: '用途说明：',
                field: 'remark',
                initialValue: detail.remark,
                component: <TextArea autosize={{ minRows: 5 }} />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
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
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={`/material/manager`}>物料管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>物料编辑</Breadcrumb.Item>
                    </Breadcrumb>
                }
                bordered={false}
            >
                {this.renderForm()}

                <Button type="primary" onClick={this.handleSubmit} style={{ marginLeft: '35%' }}>
                    提交
                </Button>
                <Button type="ghost" style={{ marginLeft: 10 }}>
                    <Link to={`/material/manager`}>取消</Link>
                </Button>
            </Card>
        )
    }
}
export default Form.create()(CompileMaterial)
