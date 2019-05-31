import React, { PureComponent } from 'react'

import { Input } from 'antd'
import { FormView } from 'components'
export default class TransferForm extends PureComponent {
    render() {
        const items = [
            {
                label: '接收人员',
                field: 'patentName',
                component: <Input />,
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
