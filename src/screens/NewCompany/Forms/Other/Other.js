import React, { PureComponent } from 'react'
import { Card, Input } from 'antd'

import formView from '../FormView'

const { TextArea } = Input

export default class Other extends PureComponent {
    search = () => {
        alert('11')
    }
    render() {
        const items = [
            {
                label: '其他信息',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请填写其他信息',
                    },
                ],
                component: <TextArea autosize={{ minRows: 6 }} />,
            },
        ]
        const FormView = formView({ items, data: { name: '123' } })
        return (
            <Card title="其他信息" bordered={false}>
                <FormView url="123" />
            </Card>
        )
    }
}
