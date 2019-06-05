import React, { PureComponent } from 'react'

import { Button } from 'antd'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/repair'

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            repairOrderConfirm: actions('repairOrderConfirm'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Confirm extends PureComponent {
    confirm = () => {
        const { detail } = this.props
        this.props.repairOrderConfirm({
            repairId: detail.id,
        })
    }
    render() {
        const { detail } = this.props
        const status = parseInt(detail.repairStatus)
        if (status === 2) {
            // 待确认
            return (
                <div style={{ paddingTop: '10px' }}>
                    <Button type="primary" onClick={this.confirm}>
                        确认
                    </Button>
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
export default Confirm
