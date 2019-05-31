import React, { PureComponent } from 'react'

import { Descriptions } from 'antd'
export default class Dispatch extends PureComponent {
    render() {
        const { current } = this.props
        if (current) {
            return <div>123</div>
        } else {
            return (
                <Descriptions title="" column={1} size="small">
                    <Descriptions.Item label="报修类型">创新大厦A座1001室</Descriptions.Item>
                    <Descriptions.Item label="服务类型">1810000000</Descriptions.Item>
                    <Descriptions.Item label="维修/跟踪人">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="派工说明">empty</Descriptions.Item>
                    <Descriptions.Item label="派工人">empty</Descriptions.Item>
                    <Descriptions.Item label="联系方式">empty</Descriptions.Item>
                </Descriptions>
            )
        }
    }
}
