import React, { PureComponent } from 'react'
import { Card, Input } from 'antd'
import { FormView } from 'components'
import Toolbar from '../../Toolbar/Toolbar'
const { TextArea } = Input

export default class Suggest extends PureComponent {
    search = () => {
        alert('11')
    }
    render() {
        const items = [
            {
                label: '改进建议',
                field: 'logo',
                rules: [
                    {
                        required: true,
                        message: '请填写改进建议',
                    },
                ],
                component: <TextArea autosize={{ minRows: 6 }} />,
            },
        ]
        return (
            <Card title="改进建议" bordered={false} extra={<Toolbar />}>
                <FormView items={items} />
            </Card>
        )
    }
}
