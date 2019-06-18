import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Cascader, DatePicker, Divider, Tooltip, Select } from 'antd'
import { FormView } from 'components'
import { Link } from 'react-router-dom'
import styles from '../Feedback.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/feedback'
import { actions as dispatchActions } from 'reduxDir/dispatch'
import { actions as repairActions } from 'reduxDir/repair'
const { Option } = Select
const buildTree = data => {
    let result = data
        .map(item => ({
            value: item.typeName,
            label: item.typeName,
            id: item.id,
            pid: item.pid,
        }))
        .reduce((prev, item) => {
            prev[item.pid] ? prev[item.pid].push(item) : (prev[item.pid] = [item])
            return prev
        }, {})
    for (let prop in result) {
        result[prop].forEach(function(item, i) {
            //console.log(item)
            if (result[item.id]) {
                item.children = result[item.id]
            }
        })
    }
    return result[0]
}
const mapStateToProps = state => {
    return {
        auths: state.authUser.auths,
        feedback: state.feedback.feedback,
        searchParams: state.feedback.searchParams,
        repairsType: buildTree(state.repair.repairsType),
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFeedbackList: actions('getFeedbackList'),
            getRepairsType: repairActions('getRepairsType'),
            hastening: dispatchActions('hastening'), //催办
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Repair extends PureComponent {
    state = {
        isHasten: this.props.auths.includes('派工催办') ? 'Y' : 'N',
    }
    componentDidMount() {
        this.props.getFeedbackList({
            isHasten: this.state.isHasten,
        })
        this.props.getRepairsType({
            level: '3',
        })
    }

    renderForm = type => {
        const items = [
            {
                label: '报修类型',
                field: 'applyType',
                component: (
                    <Cascader
                        placeholder="请选择报修类型"
                        options={this.props.repairsType}
                        changeOnSelect
                    />
                ),
            },
            {
                label: '工单状态',
                field: 'repairStatus',
                component: (
                    <Select placeholder="工单状态" style={{ width: 120 }}>
                        <Option value="1">待反馈</Option>
                        <Option value="2">待确认</Option>
                        <Option value="3">已完成</Option>
                        <Option value="4">已评价</Option>
                    </Select>
                ),
            },
        ]
        return (
            <FormView
                wrappedComponentRef={ref => {
                    this.wrappedForm = ref
                }}
                formItemLayout={{}}
                layout="inline"
                items={items}
                data={this.props.searchParams}
                saveBtn={false}
            />
        )
    }
    search = () => {
        const { form } = this.wrappedForm.props
        const values = form.getFieldsValue()
        this.props.getFeedbackList({
            isHasten: this.state.isHasten,
            ...values,
        })
    }
    reset = () => {
        const { form } = this.wrappedForm.props
        form.resetFields()
        this.search()
    }
    // 分页
    onPageChange = pageNo => {
        this.props.getFeedbackList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getFeedbackList({ pageNo: 1, pageSize })
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
                title: '工单状态',
                dataIndex: 'statusName',
                key: 'statusName',
            },
            {
                title: '评价',
                dataIndex: 'evaluateLevel',
                key: 'evaluateLevel',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <div>
                        <Link to={`/feedback/detail/${record.repairId}/feedback`}>
                            {record.repairStatus === '1' ? '反馈' : '查看'}
                        </Link>
                        {record.repairStatus === '1' &&
                            record.status === '反馈超时' &&
                            this.state.isHasten === 'Y' && (
                                <Button
                                    onClick={() => {
                                        this.props.hastening({
                                            repairId: record.repairId,
                                            hastenType: 'feedback',
                                        })
                                    }}
                                    type="link"
                                    size="small"
                                >
                                    催办
                                </Button>
                            )}
                    </div>
                ),
            },
        ]
        const { feedback, searchParams } = this.props
        return (
            <Card title="申请报修" bordered={false}>
                <div className={styles.searchCard}>
                    {this.renderForm()}
                    <div className={styles.toolbar}>
                        <Button type="ghost" onClick={this.reset}>
                            清除
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                    </div>
                </div>
                <Alert
                    style={{ margin: '10px 0' }}
                    message={`共${feedback.totalCount || 0}条数据`}
                    type="info"
                    showIcon
                />
                <Table
                    dataSource={feedback.list}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: feedback.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
            </Card>
        )
    }
}
export default Repair
