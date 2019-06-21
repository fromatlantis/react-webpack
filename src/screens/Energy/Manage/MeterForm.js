import React, { PureComponent } from 'react'
import { FormView } from 'components'
import { Input, Select, Radio } from 'antd'

const { Option } = Select

export default class MeterForm extends PureComponent {
    state = {
        values: {
            areaType: 1,
        },
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.meterDetail !== nextProps.meterDetail) {
            this.setState({
                values: nextProps.meterDetail,
            })
        }
    }
    areaTypeChange = e => {
        const { form } = this.wrappedForm.props
        this.setState({
            values: {
                ...this.state.values,
                ...form.getFieldsValue(),
                areaType: e.target.value,
            },
        })
    }
    render() {
        const { values } = this.state
        const items = [
            {
                label: '表类型',
                field: 'category',
                component: (
                    <Select placeholder="表类型" style={{ width: 160 }}>
                        <Option value="water">水表</Option>
                        <Option value="ammeter">电表</Option>
                        <Option value="fuelgas">燃气表</Option>
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择表类型',
                    },
                ],
            },
            {
                label: '表编号',
                field: 'meterNo',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请填写编号',
                    },
                ],
            },
            {
                label: '安装地址',
                field: 'location',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请填写地址',
                    },
                ],
            },
            {
                label: '类型',
                field: 'areaType',
                component: (
                    <Radio.Group onChange={this.areaTypeChange}>
                        <Radio value={1}>公区</Radio>
                        <Radio value={2}>企业</Radio>
                        <Radio value={3}>个人</Radio>
                        <Radio value={4}>其他</Radio>
                    </Radio.Group>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择类型',
                    },
                ],
            },
            {
                label: '企业名称',
                field: 'customerName',
                visible: values.areaType !== 2 ? false : true,
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请输入企业名称',
                    },
                ],
            },
            {
                label: '企业地址',
                field: 'customerAddr',
                visible: values.areaType !== 2 ? false : true,
                component: <Input />,
            },
            {
                label: '客户地址',
                field: 'customerAddr',
                visible: values.areaType !== 3 ? false : true,
                component: <Input />,
            },
            {
                label: '联系人',
                field: 'contacts',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请填写联系人',
                    },
                ],
            },
            {
                label: '联系电话',
                field: 'contactsWay',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        pattern: /^1\d{10}$/,
                        message: '请填写正确的联系电话',
                    },
                ],
            },
            {
                label: '备注说明',
                field: 'remarks',
                component: <Input />,
                rules: [
                    {
                        max: 300,
                        message: '最多输入3000个字符',
                    },
                ],
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        const { forwardedRef } = this.props //传递ref
        return (
            <FormView
                ref={forwardedRef}
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={formItemLayout}
                data={values}
                items={items}
                saveBtn={false}
            />
        )
    }
}
