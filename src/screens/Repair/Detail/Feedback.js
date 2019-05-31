import React, { PureComponent } from 'react'

import { Descriptions } from 'antd'
export default class Feedback extends PureComponent {
    render() {
        const { current } = this.props
        if (current) {
            return <div>123</div>
        } else {
            return (
                <Descriptions title="" column={1} size="small">
                    <Descriptions.Item label="维修结果">创新大厦A座1001室</Descriptions.Item>
                    <Descriptions.Item label="维修说明">1810000000</Descriptions.Item>
                    <Descriptions.Item label="反馈图片">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="是否付费">empty</Descriptions.Item>
                    <Descriptions.Item label="物料使用">empty</Descriptions.Item>
                    <Descriptions.Item label="维修时长">empty</Descriptions.Item>
                    <Descriptions.Item label="物料费总计">empty</Descriptions.Item>
                    <Descriptions.Item label="人工费总计">empty</Descriptions.Item>
                    <Descriptions.Item label="付款方式">empty</Descriptions.Item>
                    <Descriptions.Item label="维修费总计">empty</Descriptions.Item>
                </Descriptions>
            )
        }
    }
}
