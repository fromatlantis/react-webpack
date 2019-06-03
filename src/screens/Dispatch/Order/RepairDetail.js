import React, { PureComponent, Fragment } from 'react'

import { Descriptions } from 'antd'
export default class RepairDetail extends PureComponent {
    render() {
        const { detail } = this.props
        return (
            <Fragment>
                <Descriptions title="" column={2} size="small">
                    <Descriptions.Item label="报修地址">{detail.repairLocation}</Descriptions.Item>
                    <Descriptions.Item label="详细地址">{detail.repairAddress}</Descriptions.Item>
                    <Descriptions.Item label="报修时间">{detail.reportTime}</Descriptions.Item>
                    <Descriptions.Item label="报修人">{detail.reporterName}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">
                        {detail.reporterContactWay}
                    </Descriptions.Item>
                    <Descriptions.Item label="报修类型">{detail.category}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="" column={1} size="small">
                    <Descriptions.Item label="故障图片">{detail.faultImages}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="" column={1} size="small">
                    <Descriptions.Item label="故障描述">
                        <div style={{ width: '500px' }}>{detail.faultDesc}</div>
                    </Descriptions.Item>
                </Descriptions>
            </Fragment>
        )
    }
}
