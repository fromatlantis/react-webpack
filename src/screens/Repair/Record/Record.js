import React, { PureComponent } from 'react'
import { Alert, Button, Card, Table, Select, DatePicker, Divider, Cascader } from 'antd'
import { Link } from 'react-router-dom'
import { FormView } from 'components'

import styles from '../Repair.module.css'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/repair'

const { Option } = Select
const { RangePicker } = DatePicker

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
        searchParams: state.repair.searchParams,
        repair: state.repair.repair,
        repairsType: buildTree(state.repair.repairsType),
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getRepairsType: actions('getRepairsType'),
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
        this.props.getRepairsType({
            level: '3',
        })
        this.props.getRepairList()
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
                        <Option value="0">待派工</Option>
                        <Option value="1">待反馈</Option>
                        <Option value="2">待确认</Option>
                        <Option value="3">已完成</Option>
                        <Option value="4">已评价</Option>
                    </Select>
                ),
            },
            {
                label: '报修时间',
                field: 'applicationTime',
                component: <RangePicker />,
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
        this.props.getRepairList(values)
    }
    reset = () => {
        const { form } = this.wrappedForm.props
        form.resetFields()
        this.search()
    }
    // 分页
    onPageChange = pageNo => {
        this.props.getRepairList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getRepairList({ pageNo: 1, pageSize })
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
                render: (_, record) => {
                    if (record.statusName === '待确认') {
                        return <Link to={`/repair/detail/${record.repairId}/repair`}>确认</Link>
                    } else if (record.statusName === '已完成') {
                        return <Link to={`/repair/detail/${record.repairId}/repair`}>评价</Link>
                    } else {
                        return <Link to={`/repair/detail/${record.repairId}/repair`}>详情</Link>
                    }
                },
            },
        ]
        const { repair, searchParams } = this.props
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
                    <Alert message={`共${repair.totalCount || 0}条数据`} type="info" showIcon />
                </div>
                <Table
                    dataSource={repair.list}
                    columns={columns}
                    pagination={{
                        current: searchParams.pageNo,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['10', '20', '30'],
                        total: repair.totalCount,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.onPageChange,
                    }}
                />
            </Card>
        )
    }
}
export default Record
