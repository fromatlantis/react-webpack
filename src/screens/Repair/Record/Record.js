import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Input, DatePicker, Divider } from 'antd'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Repair.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/repair'

const mapStateToProps = state => {
    return {
        repair: state.repair.repair,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRepairList: actions('getRepairList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Record extends PureComponent {
    componentDidMount() {
        this.props.getRepairList({
            pageNo: 1,
            pageSize: 10,
        })
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
                title: '报修类型',
                dataIndex: 'categories',
                key: 'categories',
            },
            {
                title: '故障描述',
                dataIndex: 'faultDesc',
                key: 'faultDesc',
            },
            {
                title: '报修地址',
                dataIndex: 'repairLocation',
                key: 'repairLocation',
            },
            {
                title: '报修时间',
                dataIndex: 'reportTime',
                key: 'reportTime',
            },
            {
                title: '评价分值',
                dataIndex: 'evaluateLevel',
                key: 'evaluateLevel',
            },
            {
                title: '工单状态',
                dataIndex: 'statusName',
                key: 'statusName',
            },
            {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                render: (_, record) => (
                    <Link to={`/repair/detail/${record.repairId}/repair`}>详情</Link>
                ),
            },
        ]
        const { repair } = this.props
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
                    <Alert message={`共${repair.totalCount || 0}条数据`} type="info" showIcon />
                </div>
                <Table dataSource={repair.list} columns={columns} />
            </Card>
        )
    }
}
export default Record
