import React, { PureComponent } from 'react'

import { Button } from 'antd'

export default class Confirm extends PureComponent {
    render() {
        const { detail } = this.props
        const status = parseInt(detail.repairStatus)
        if (status === 2) {
            // 待确认
            return (
                <div style={{ paddingTop: '10px' }}>
                    <Button type="primary">确认</Button>
                </div>
            )
        } else if (status > 2) {
            return (
                <div style={{ paddingTop: '10px', color: 'rgba(0, 0, 0, 0.65)' }}>报修人已确认</div>
            )
        } else {
            return <div />
        }
    }
}
