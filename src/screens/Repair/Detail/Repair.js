import React, { PureComponent, Fragment } from 'react'
import { ImageView } from 'components'
import { Descriptions } from 'antd'
export default class Repair extends PureComponent {
    render() {
        const { current } = this.props
        if (current) {
            return <div />
        } else {
            const { detail } = this.props
            return (
                <Fragment>
                    <div style={{ margin: '15px 0' }}>{detail.reportTime}</div>
                    <Descriptions title="" column={1} size="small">
                        <Descriptions.Item label="报修地址">
                            {detail.repairLocation}
                        </Descriptions.Item>
                        <Descriptions.Item label="详细地址">
                            {detail.repairAddress}
                        </Descriptions.Item>
                        <Descriptions.Item label="报修人">{detail.reporterName}</Descriptions.Item>
                        <Descriptions.Item label="联系方式">
                            {detail.reporterContactWay}
                        </Descriptions.Item>
                        <Descriptions.Item label="报修类型">{detail.category}</Descriptions.Item>
                        <Descriptions.Item label="故障描述">
                            <div style={{ width: '500px' }}>{detail.faultDesc}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="故障图片">
                            <ImageView
                                fileList={detail.faultImages && detail.faultImages.split(',')}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                </Fragment>
            )
        }
    }
}
