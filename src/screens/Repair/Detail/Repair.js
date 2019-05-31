import React, { PureComponent } from 'react'

import { Descriptions } from 'antd'
export default class Repair extends PureComponent {
    render() {
        const { current } = this.props
        if (current) {
            return <div>123</div>
        } else {
            return (
                <Descriptions title="" column={1} size="small">
                    <Descriptions.Item label="报修地址">创新大厦A座1001室</Descriptions.Item>
                    <Descriptions.Item label="详细地址">1810000000</Descriptions.Item>
                    <Descriptions.Item label="报修人">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="联系方式">empty</Descriptions.Item>
                    <Descriptions.Item label="报修类型">empty</Descriptions.Item>
                    <Descriptions.Item label="故障描述">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    <Descriptions.Item label="故障图片">empty</Descriptions.Item>
                </Descriptions>
            )
        }
    }
}
