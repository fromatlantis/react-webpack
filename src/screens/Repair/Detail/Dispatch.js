import React, { PureComponent, Fragment } from 'react'

import { Descriptions } from 'antd'
export default class Dispatch extends PureComponent {
    render() {
        const { detail } = this.props
        const status = parseInt(detail.repairStatus)
        if (status > 0) {
            return (
                <Fragment>
                    <div style={{ margin: '15px 0' }}>{detail.reportTime}</div>
                    <Descriptions title="" column={1} size="small">
                        <Descriptions.Item label="报修类型">{detail.category}</Descriptions.Item>
                        <Descriptions.Item label="服务类型">{detail.serviceType}</Descriptions.Item>
                        <Descriptions.Item label="维修/跟踪人">
                            {detail.maintainerName}
                        </Descriptions.Item>
                        <Descriptions.Item label="派工说明">
                            <div style={{ width: '500px' }}>{detail.dispatchDesc}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="派工人">
                            {detail.dispatcherName}
                        </Descriptions.Item>
                        <Descriptions.Item label="联系方式">{detail.category}</Descriptions.Item>
                    </Descriptions>
                </Fragment>
            )
        } else {
            return <div />
        }
    }
}
