import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Input, DatePicker, Divider, Tooltip } from 'antd'
import { FormView } from 'components'
import { Link } from 'react-router-dom'
import styles from '../Feedback.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'

const mapStateToProps = state => {
    return {
        feedback: state.dispatch.feedback,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFeedbackList: actions('getFeedbackList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Repair extends PureComponent {
    componentDidMount() {
        this.props.getFeedbackList({})
    }

    renderForm = type => {
        const items = [
            {
                label: '报修类型',
                field: 'patentName',
                component: <Input />,
            },
            {
                label: '工单状态',
                field: 'appnumber',
                component: <Input />,
            },
            {
                label: '报修时间',
                field: 'applicationTime',
                component: <DatePicker />,
            },
        ]
        return (
            <FormView
                ref={form => {
                    this.form = form
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    render() {
        const columns = [
            {
                title: '故障描述',
                dataIndex: 'faultDesc',
                key: 'faultDesc',
                render: faultDesc => (
                    <Tooltip placement="right" title={faultDesc}>{`${faultDesc.substring(
                        0,
                        12,
                    )}...`}</Tooltip>
                ),
            },
            {
                title: '派工时间',
                dataIndex: 'dispatchTime',
                key: 'dispatchTime',
            },
            {
                title: '报修类型',
                dataIndex: 'categories',
                key: 'categories',
            },
            {
                title: '评价',
                dataIndex: 'evaluateLevel',
                key: 'evaluateLevel',
            },
            {
                title: '工单状态',
                dataIndex: 'repairStatus',
                key: 'repairStatus',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <Link to={`/repair/detail/${record.repairId}/feedback`}>详情</Link>
                ),
            },
        ]
        const { feedback } = this.props
        return (
            <Card title="申请报修" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar}>
                        <Button type="ghost" onClick={this.handleReset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.newInfo}>
                            查询
                        </Button>
                    </div>
                    <Alert message={`共${feedback.totalCount || 0}条数据`} type="info" showIcon />
                </div>
                <Table dataSource={feedback.list} columns={columns} />
            </Card>
        )
    }
}
export default Repair
