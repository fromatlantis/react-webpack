import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Alert, Button, Card, DatePicker, Divider, Select, Table } from 'antd'
import { FormView } from 'components'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/feedback'
import { actions as dispatchActions } from 'reduxDir/dispatch'
import { actions as repairActions } from 'reduxDir/repair'

const { Option } = Select
const { MonthPicker } = DatePicker

const mapStateToProps = state => {
    return {
        feedback: state.feedback.feedback,
        searchParams: state.feedback.searchParams,
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
class Records extends PureComponent {
    componentDidMount() {
        this.props.getFeedbackList()
    }

    renderForm = () => {
        const items = [
            {
                label: '月份',
                field: 'applyType',
                component: <MonthPicker placeholder="月份" />,
            },
            {
                label: '表编号',
                field: 'repairStatus',
                component: (
                    <Select placeholder="表编号" style={{ width: 160 }}>
                        <Option value="1">待反馈</Option>
                        <Option value="2">待确认</Option>
                        <Option value="3">已完成</Option>
                        <Option value="4">已评价</Option>
                    </Select>
                ),
            },
            {
                label: '表类型',
                field: 'repairStatus',
                component: (
                    <Select placeholder="表类型" style={{ width: 160 }}>
                        <Option value="">全部</Option>
                        <Option value="2">水表</Option>
                        <Option value="3">电表</Option>
                        <Option value="4">燃气表</Option>
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
    render() {
        const columns = [
            {
                title: '故障描述',
                dataIndex: 'faultDesc',
                key: 'faultDesc',
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
                        <Link to={`/repair/detail/${record.repairId}/feedback`}>
                            {record.repairStatus === '1' ? '反馈' : '查看'}
                        </Link>
                    </div>
                ),
            },
        ]
        const { feedback, searchParams } = this.props
        return (
            <Card bordered={false}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {this.renderForm()}
                    <div>
                        <Button type="primary" onClick={this.search}>
                            查询
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            新增
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.search}>
                            导入
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
export default Records
