import React, { PureComponent } from 'react'
import { Input, Cascader, Radio } from 'antd'
import { FormView, UploadImg } from 'components'

const options = [
    {
        value: '电梯',
        label: '电梯',
        children: [
            {
                value: 'hangzhou',
                label: 'Hanzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: '电路',
        label: '电路',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
]

export default class NewOrder extends PureComponent {
    state = {
        lift: false, //电梯
        trappedFlag: false,
        values: {},
    }
    onChange = changedFields => {
        // 报修类型联动
        if (changedFields.applyType) {
            const { applyType } = changedFields
            // 存放当前表单值
            this.setState({
                values: this.form.getFieldsValue(),
            })
            // 报修类型包含电梯
            if (applyType.value.includes('电梯')) {
                this.setState({
                    lift: true,
                    trappedFlag: false,
                })
            } else {
                this.setState({
                    lift: false,
                    trappedFlag: false,
                })
            }
        }
        // 是否困人
        if (changedFields.trapped) {
            const { trapped } = changedFields
            console.log(this.form.getFieldsValue())
            // 存放当前表单值
            this.setState({
                values: this.form.getFieldsValue(),
            })
            // 是否困人
            if (trapped.value === 1) {
                this.setState({
                    trappedFlag: true,
                })
            } else {
                this.setState({
                    trappedFlag: false,
                })
            }
        }
    }
    render() {
        const { lift, trappedFlag, values } = this.state
        console.log(lift && trappedFlag)
        const items = [
            {
                label: '报修地点',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '派工说明',
                field: 'appnumber',
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
                rules: [
                    {
                        message: '不能多于500字',
                        max: 500,
                    },
                ],
            },
            {
                label: '图片',
                field: 'logo',
                component: <UploadImg />,
            },
            {
                label: '派工类型',
                field: 'applyType',
                component: (
                    <Cascader placeholder="请选择派工类型" options={options} changeOnSelect />
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择派工类型',
                    },
                ],
            },
            {
                label: '是否困人',
                field: 'trapped',
                visible: lift,
                //initialValue: 1,
                component: (
                    <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                ),
            },
            {
                label: '被困人数',
                field: 'trappedNum',
                visible: lift && trappedFlag,
                component: <Input />,
            },
            {
                label: '服务类型',
                field: 'serviceType',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请选择地址',
                    },
                ],
            },
            {
                label: '维修/跟踪人',
                field: 'person',
                component: <Input />,
                rules: [
                    {
                        required: true,
                        message: '请选择地址',
                    },
                ],
            },
            {
                label: '派工人',
                field: 'orderPerson',
                component: <Input />,
            },
            {
                label: '联系方式',
                field: 'contact',
                component: <Input />,
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
                items={items}
                data={values}
                onChange={this.onChange}
                saveBtn={false}
            />
        )
    }
}
