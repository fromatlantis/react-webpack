import React, { PureComponent, Fragment } from 'react'

import { Input, Rate, Descriptions } from 'antd'

import { FormView } from 'components'
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
            repairEvaluate: actions('repairEvaluate'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Evaluate extends PureComponent {
    onSubmit = values => {
        const { detail } = this.props
        values.repairId = detail.id
        this.props.repairEvaluate(values)
    }
    render() {
        const { detail, type } = this.props
        const status = parseInt(detail.repairStatus)
        if (status === 3 && type === 'repair') {
            //已完成，待评价
            const items = [
                {
                    label: '评分',
                    field: 'evaluateLevel',
                    initialValue: 2.5,
                    component: <Rate allowHalf />,
                },
                {
                    label: '评价描述',
                    field: 'evaluateDesc',
                    component: <Input.TextArea autosize={{ minRows: 4 }} />,
                },
            ]
            const formItemLayout = {
                labelCol: { span: 3 },
                wrapperCol: { span: 14 },
            }
            return (
                <FormView onSubmit={this.onSubmit} formItemLayout={formItemLayout} items={items} />
            )
        } else if (status > 3) {
            // 已评价
            const { detail } = this.props
            return (
                <Fragment>
                    <div style={{ marginBottom: '10px' }}>
                        <Rate disabled defaultValue={detail.evaluateLevel} />
                        {detail.evaluateLevel}星
                    </div>
                    <Descriptions title="" column={1} size="small">
                        <Descriptions.Item label="评价描述">
                            <div style={{ width: '500px' }}>{detail.evaluateDesc}</div>
                        </Descriptions.Item>
                    </Descriptions>
                </Fragment>
            )
        } else {
            return <div />
        }
    }
}
export default Evaluate
