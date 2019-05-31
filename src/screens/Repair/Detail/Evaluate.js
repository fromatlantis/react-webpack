import React, { PureComponent } from 'react'

import { Input, Rate, Typography } from 'antd'

import { FormView } from 'components'

const { Text } = Typography

export default class Evaluate extends PureComponent {
    render() {
        const { current } = this.props
        if (current) {
            const items = [
                {
                    label: '评分',
                    field: 'rate',
                    component: <Rate allowHalf defaultValue={2.5} />,
                },
                {
                    label: '评价描述',
                    field: 'ratedes',
                    component: <Input.TextArea autosize={{ minRows: 4 }} />,
                },
            ]
            const formItemLayout = {
                labelCol: { span: 3 },
                wrapperCol: { span: 14 },
            }
            return <FormView formItemLayout={formItemLayout} items={items} />
        } else {
            return <Text>报修人已确认</Text>
        }
    }
}
