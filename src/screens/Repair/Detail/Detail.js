import React, { PureComponent } from 'react'

import { Card, Steps } from 'antd'

import Repair from './Repair'
import Dispatch from './Dispatch'
import Feedback from './Feedback'
import Confirm from './Confirm'
import Evaluate from './Evaluate'

const { Step } = Steps

export default class Detail extends PureComponent {
    render() {
        return (
            <Card title="详情" bordered={false}>
                <Steps direction="vertical" size="small" current={4}>
                    <Step title="物业报修" description={<Repair />} />
                    <Step title="物业派工" description={<Dispatch />} />
                    <Step title="物业反馈" description={<Feedback />} />
                    <Step title="账单确认" description={<Confirm current={false} />} />
                    <Step title="用户评价" description={<Evaluate current={true} />} />
                </Steps>
            </Card>
        )
    }
}
