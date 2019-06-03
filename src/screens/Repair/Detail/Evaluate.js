import React, { PureComponent, Fragment } from 'react'

import { Input, Rate, Descriptions } from 'antd'

import { FormView } from 'components'

export default class Evaluate extends PureComponent {
    render() {
        const { detail } = this.props
        const status = parseInt(detail.repairStatus)
        if (status === 3) {
            //已完成，待评价
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
        } else if (status > 3) {
            // 已评价
            const { detail } = this.props
            return (
                <Fragment>
                    <div style={{ marginBottom: '10px' }}>
                        <Rate disabled defaultValue={detail.evaluateLevel} />
                        {detail.evaluateLevel}星
                    </div>
                    <Descriptions title="" column={1} size="small">
                        <Descriptions.Item label="评价描述">
                            <div style={{ width: '500px' }}>{detail.evaluateDesc}</div>
                        </Descriptions.Item>
                    </Descriptions>
                </Fragment>
            )
        } else {
            return <div />
        }
    }
}
