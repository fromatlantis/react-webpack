import React, { PureComponent } from 'react'

import { Button } from 'antd'

export default class Confirm extends PureComponent {
    render() {
        const { current } = this.props
        if (current) {
            return (
                <div>
                    <Button type="primary">确认</Button>
                </div>
            )
        } else {
            return <div>报修人已确认</div>
        }
    }
}
