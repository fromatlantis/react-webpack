import React, { PureComponent } from 'react'

import { Descriptions } from 'antd'
export default class RepairDetail extends PureComponent {
    render() {
        return (
            <Descriptions title="" column={2} size="small">
                <Descriptions.Item label="故障描述">创新大厦A座1001室</Descriptions.Item>
                <Descriptions.Item label="故障图片">1810000000</Descriptions.Item>
                <Descriptions.Item label="报修地址">创新大厦A座1001室</Descriptions.Item>
                <Descriptions.Item label="详细地址">1810000000</Descriptions.Item>
                <Descriptions.Item label="报修时间">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="报修人">empty</Descriptions.Item>
                <Descriptions.Item label="联系方式">empty</Descriptions.Item>
                <Descriptions.Item label="报修类型">empty</Descriptions.Item>
            </Descriptions>
        )
    }
}
