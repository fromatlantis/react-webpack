import React, { PureComponent, Fragment } from 'react'
import { Alert, Button, Card, DatePicker, Statistic, Table, message } from 'antd'
import { YearPicker } from 'components'
import { PieChart } from 'components/Charts'
import moment from 'moment'
import styles from '../Stats.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { actions } from 'reduxDir/statOrder'
const columns = [
    {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '报修单数',
        dataIndex: 'total',
        key: 'total',
        align: 'center',
    },
    {
        title: '当日报修单完成数',
        dataIndex: 'finished',
        key: 'finished',
        align: 'center',
    },
    {
        title: '当日报修单未完成数',
        dataIndex: 'unfinished',
        key: 'unfinished',
        align: 'center',
    },
    {
        title: '报修单延误数',
        dataIndex: 'delay',
        key: 'delay',
        align: 'center',
    },
    {
        title: '有偿服务单数',
        dataIndex: 'paid',
        key: 'paid',
        align: 'center',
    },
    {
        title: '无偿服务单数',
        dataIndex: 'unpaid',
        key: 'unpaid',
        align: 'center',
    },
    {
        title: '维修费用',
        dataIndex: 'cost',
        key: 'cost',
        align: 'center',
        render: (cost, record) => <span>{cost ? cost : '--'}</span>,
    },
]
const detailColumns = [
    {
        title: '报修地址',
        dataIndex: 'repairLocation',
        key: 'repairLocation',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '报修大类',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
    },
    {
        title: '报修小类',
        dataIndex: 'classify',
        key: 'classify',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '报修时间',
        dataIndex: 'reportTime',
        key: 'reportTime',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '当日是否完成',
        dataIndex: 'finished',
        key: 'finished',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '当日是否延误',
        dataIndex: 'delay',
        key: 'delay',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '维修时长',
        dataIndex: 'fixDuration',
        key: 'fixDuration',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '维修费用',
        dataIndex: 'totalCosts',
        key: 'totalCosts',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
]
const { RangePicker } = DatePicker
const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Staff extends PureComponent {
    state = {
        rowIndex: 0,
        dateRange: [
            moment()
                .subtract(7, 'days')
                .format('YYYY-MM-DD'),
            moment().format('YYYY-MM-DD'),
        ],
        countPager: {
            pageNo: 1,
            pageSize: 10,
        },
        detailPager: {
            pageNo: 1,
            pageSize: 10,
        },
        date: '',
    }
    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}
    onChange = (data, dateStr) => {}
    renderData = params => {}
    renderDetailData = date => {}
    setRowClassName = (_, index) => {
        return index === this.state.rowIndex ? 'row-active' : ''
    }
    // 分页
    onCountPageChange = (pageNo, _) => {
        this.setState({
            countPager: {
                ...this.state.countPager,
                pageNo,
            },
        })
    }
    onDetailPageChange = (pageNo, _) => {
        this.setState({
            detailPager: {
                ...this.state.detailPager,
                pageNo,
            },
        })
    }
    //导出详细
    exportBig = () => {}
    exportAllbig = () => {}
    //导出明细
    exportDetail = () => {}
    exportAllDetail = () => {}
    render() {
        const { countPager, detailPager } = this.state
        const [beginDate, endDate] = this.state.dateRange
        const { dailyRepairsOrders, dateCount, dateDetail } = this.props
        return (
            <Fragment>
                <Card
                    title="园区人员统计"
                    bordered={false}
                    style={{ marginTop: '5px' }}
                    extra={
                        <Fragment>
                            <b>选择年份：</b>
                            <YearPicker />
                        </Fragment>
                    }
                >
                    <div className={styles.card}>
                        <PieChart data={[]} />
                    </div>
                </Card>
                <Card
                    title="详细信息"
                    bordered={false}
                    extra={
                        <div>
                            <Button type="primary" size="small" onClick={this.exportBig}>
                                导出当前页
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type="primary"
                                size="small"
                                onClick={this.exportAllbig}
                            >
                                导出全部
                            </Button>
                        </div>
                    }
                >
                    <Alert
                        message={`报修单数共${0}项`}
                        type="info"
                        showIcon
                        style={{ marginBottom: '15px' }}
                    />
                    <Table
                        dataSource={[]}
                        columns={columns}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            // showSizeChanger: true,
                            showQuickJumper: true,
                            // pageSizeOptions: ['10', '20', '30'],
                            total: 30,
                            // onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onCountPageChange,
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    this.setState({
                                        rowIndex: index,
                                    })
                                    this.renderDetailData(record.date)
                                }, // 点击行
                            }
                        }}
                    />
                </Card>
                <Card
                    title="明细信息"
                    bordered={false}
                    extra={
                        <div>
                            <Button type="primary" size="small" onClick={this.exportDetail}>
                                导出当前页
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type="primary"
                                size="small"
                                onClick={this.exportAllDetail}
                            >
                                导出全部
                            </Button>
                        </div>
                    }
                >
                    <Alert
                        message={`报修单数共${0}项`}
                        type="info"
                        showIcon
                        style={{ marginBottom: '15px' }}
                    />
                    <Table
                        dataSource={[]}
                        columns={detailColumns}
                        pagination={{
                            current: detailPager.pageNo,
                            // showSizeChanger: true,
                            showQuickJumper: true,
                            // pageSizeOptions: ['10', '20', '30'],
                            total: 30,
                            // onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onDetailPageChange,
                        }}
                    />
                </Card>
            </Fragment>
        )
    }
}
export default Staff
