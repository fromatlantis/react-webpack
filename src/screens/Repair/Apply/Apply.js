import React, { PureComponent } from 'react'
import { Input, Cascader, Radio, message } from 'antd'
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

export default class Apply extends PureComponent {
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
        const items = [
            {
                label: '报修地址',
                field: 'address',
                rules: [
                    {
                        required: true,
                        message: '请选择地址',
                    },
                ],
                component: <Cascader placeholder="请选择地址" options={options} />,
            },
            {
                label: '详细地址',
                field: 'addressDes',
                component: <Input />,
            },
            {
                label: '报修类型',
                field: 'applyType',
                component: (
                    <Cascader placeholder="请选择报修类型" options={options} changeOnSelect />
                ),
            },
            {
                label: '故障描述',
                field: 'faultDes',
                rules: [
                    {
                        required: true,
                        message: '故障描述不能为空且不能多于500字',
                        max: 500,
                    },
                ],
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
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
                label: '故障图片',
                field: 'logo',
                component: <UploadImg />,
            },
        ]
        return (
            <FormView
                ref={ref => {
                    this.form = ref
                }}
                items={items}
                data={values}
                onChange={this.onChange}
            />
        )
    }
}
