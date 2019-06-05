import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Card, Table, Input, Cascader, Divider, Tooltip, Select } from 'antd'
import { FormView } from 'components'
import moment from 'moment'
import styles from '../Dispatch.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/dispatch'
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
        myDispatch: state.dispatch.myDispatch,
        dispatchParams: state.dispatch.dispatchParams,
        repairsType: buildTree(state.repair.repairsType),
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getMyDispatchList: actions('getMyDispatchList'),
            getRepairsType: repairActions('getRepairsType'),
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
            {
                label: '维修人',
                field: 'maintainerId',
                component: <Input />,
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
                data={this.props.dispatchParams}
                saveBtn={false}
            />
        )
    }
    search = () => {
        const { form } = this.wrappedForm.props
        const values = form.getFieldsValue()
        this.props.getMyDispatchList(values)
    }
    reset = () => {
        const { form } = this.wrappedForm.props
        form.resetFields()
        this.search()
    }
    // 分页
    onPageChange = pageNo => {
        this.props.getMyDispatchList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getMyDispatchList({ pageNo: 1, pageSize })
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
                title: '维修人',
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
                    <Fragment>
                        <Link to={`/repair/detail/${record.repairId}/dispatch`}>详情</Link>
                        {moment().diff(moment(record.dispatchTime), 'minutes') <= 15 && (
                            <Button type="link">撤回</Button>
                        )}
                    </Fragment>
                ),
            },
        ]
        const { myDispatch, dispatchParams } = this.props
        return (
            <Card title="我的派工" bordered={false}>
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
                    <Alert message={`共${myDispatch.totalCount || 0}条数据`} type="info" showIcon />
                </div>
                <Table
                    dataSource={myDispatch.list}
                    columns={columns}
                    pagination={{
                        current: dispatchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: myDispatch.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
            </Card>
        )
    }
}
export default Work
