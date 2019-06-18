import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Card, Steps, Breadcrumb, Icon } from 'antd'

import Repair from './Repair'
import Dispatch from './Dispatch'
import Feedback from './Feedback'
import Confirm from './Confirm'
import Evaluate from './Evaluate'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/repair'

const { Step } = Steps

const mapStateToProps = state => {
    return {
        repairDetail: state.repair.repairDetail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRepairDetail: actions('getRepairDetail'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Detail extends PureComponent {
    componentDidMount() {
        const { params } = this.props.match
        this.props.getRepairDetail({
            repairId: params.id,
        })
    }
    render() {
        const { repairDetail } = this.props
        const status = parseInt(repairDetail.repairStatus) + 1
        const { params } = this.props.match
        let crumb = {}
        if (params.type === 'repair') {
            crumb = {
                title: '报修记录',
                link: '/repair/record',
            }
        } else if (params.type === 'dispatch') {
            crumb = {
                title: '我的派工',
                link: '/dispatch/work',
            }
        } else if (params.type === 'feedback') {
            crumb = {
                title: '报修反馈',
                link: '/feedback/repair',
            }
        }
        return (
            <Card
                title={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/repair">
                                <Icon type="home" />
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <Link to={crumb.link}>{crumb.title}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>工单详情</Breadcrumb.Item>
                    </Breadcrumb>
                }
                bordered={false}
            >
                <Steps direction="vertical" size="small" current={status}>
                    <Step title="物业报修" description={<Repair detail={repairDetail} />} />
                    <Step
                        title="物业派工"
                        description={<Dispatch detail={repairDetail} />}
                        id="dispatch"
                    />
                    <Step
                        title="物业反馈"
                        description={<Feedback detail={repairDetail} type={params.type} />}
                    />
                    <Step
                        title="账单确认"
                        description={<Confirm detail={repairDetail} type={params.type} />}
                    />
                    <Step
                        title="用户评价"
                        description={<Evaluate detail={repairDetail} type={params.type} />}
                    />
                </Steps>
            </Card>
        )
    }
}
export default Detail
