import React, { PureComponent } from 'react'
import { FormView } from 'components'
import { Input, Select } from 'antd'
const { Option } = Select
const days = Array.from({ length: 31 }, (v, k) => k + 1)
export default class SetForm extends PureComponent {
    render() {
        const items = [
            {
                label: '表类型',
                field: 'cycle',
                initialValue: 'month',
                component: (
                    <Select placeholder="抄表周期" style={{ width: 160 }}>
                        <Option value="month">按月抄表</Option>
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择抄表周期',
                    },
                ],
            },
            {
                label: '截止时间',
                field: 'deadlineDay',
                component: (
                    <Select placeholder="截止时间" style={{ width: 160 }} showSearch>
                        {days.map(day => (
                            <Option value={day} key={day}>{`${day}号`}</Option>
                        ))}
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                        message: '请选择截止时间',
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
                items={items}
                saveBtn={false}
            />
        )
    }
}
