import React, { PureComponent } from 'react'

import { Input, Select } from 'antd'
import { FormView } from 'components'
const { Option } = Select

export default class TransferForm extends PureComponent {
    render() {
        const { repairs } = this.props
        const items = [
            {
                label: '接收人员',
                field: 'patentName',
                component: (
                    <Select style={{ width: 200 }} placeholder="请选择接受人员">
                        {repairs.map(item => (
                            <Option value={item.userId}>{item.userName}</Option>
                        ))}
                    </Select>
                ),
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '转办说明',
                field: 'patentName',
                component: <Input.TextArea autosize={{ minRows: 4 }} />,
            },
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }
        return <FormView formItemLayout={formItemLayout} items={items} saveBtn={false} />
    }
}
