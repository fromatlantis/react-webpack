/**
 * 物料管理 ==> 物料管理/物料编辑
 */
import React, { PureComponent } from 'react'
import { Form, Button, Breadcrumb, Input, InputNumber, Select } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/materialManager'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

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
class CompileMaterial extends PureComponent {
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
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={`/material/manager`}>物料管理</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>物料编辑</Breadcrumb.Item>
                </Breadcrumb>
                {this.renderForm()}
                <Button type="ghost" onClick={this.handleReset}>
                    清空
                </Button>
                <Button type="primary" onClick={this.newInfo}>
                    查询
                </Button>
            </div>
        )
    }
}
export default Form.create()(CompileMaterial)
