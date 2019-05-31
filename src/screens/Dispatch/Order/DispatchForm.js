import React, { PureComponent } from 'react'

import { Input } from 'antd'
import { FormView } from 'components'
export default class DispatchForm extends PureComponent {
    render() {
        const items = [
            {
                label: '派工类型',
                field: 'patentName',
                component: <Input />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '服务类型',
                field: 'patentName',
                component: <Input />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '维修/跟踪人',
                field: 'patentName',
                component: <Input />,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
            {
                label: '派工说明',
                field: 'patentName',
                rules: [
                    {
                        message: '不能多于500字',
                        max: 500,
                    },
                ],
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
