import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Card, Table, Input, DatePicker, Divider, Tooltip } from 'antd'
import { FormView } from 'components'

import styles from '../Dispatch.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'

const mapStateToProps = state => {
    return {
        myDispatch: state.dispatch.myDispatch,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMyDispatchList: actions('getMyDispatchList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Work extends PureComponent {
    componentDidMount() {
        this.props.getMyDispatchList()
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
                label: '维修人',
                field: 'applicationTime',
                component: <Input />,
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
                title: '报修人',
                dataIndex: 'maintainers',
                key: 'maintainers',
            },
            {
                title: '评价',
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
                    <Link to={`/repair/detail/${record.repairId}/dispatch`}>详情</Link>
                ),
            },
        ]
        const { myDispatch } = this.props
        return (
            <Card title="我的派工" bordered={false}>
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
                    <Alert message={`共${myDispatch.totalCount || 0}条数据`} type="info" showIcon />
                </div>
                <Table dataSource={myDispatch.list} columns={columns} />
            </Card>
        )
    }
}
export default Work
