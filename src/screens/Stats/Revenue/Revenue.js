import React, { PureComponent } from 'react'
import { Card, Button, Alert, Table, DatePicker, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'reduxDir/revenueAndFinancing'
import moment from 'moment'
import LineChart from './RevenueCharts'

const columnsCount = [
    {
        title: '年份',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: '企业数量',
        dataIndex: 'companyCount',
        key: 'companyCount',
        align: 'center',
    },
    {
        title: '营业收入（元）',
        dataIndex: 'revenue',
        key: 'revenue',
        align: 'center',
    },
    {
        title: '营收环比',
        dataIndex: 'chainRatio',
        key: 'chainRatio',
        align: 'center',
    },
    {
        title: '上缴税金（元）',
        dataIndex: 'taxes',
        key: 'taxes',
        align: 'center',
    },
    {
        title: '税金环比',
        dataIndex: 'taxesChainRatio',
        key: 'taxesChainRatio',
        align: 'center',
    },
]
const columnsDetail = [
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '企业类型',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
    },
    {
        title: '所属行业',
        dataIndex: 'industry',
        key: 'industry',
        align: 'center',
    },
    {
        title: '成立时间',
        dataIndex: 'estiblishTime',
        key: 'estiblishTime',
        align: 'center',
    },
    {
        title: '营业收入（元）',
        dataIndex: 'operatingRevenue',
        key: 'operatingRevenue',
        align: 'center',
    },
    {
        title: '上缴税金（元）',
        dataIndex: 'taxes',
        key: 'taxes',
        align: 'center',
    },
]
const mapStateToProps = state => {
    return {
        financialStatus: state.revenueAndFinancing.financialStatus,
        financeCountList: state.revenueAndFinancing.financeCountList,
        financeDetailList: state.revenueAndFinancing.financeDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFinancialStatus: actions('getFinancialStatus'),
            getFinanceCountList: actions('getFinanceCountList'),
            getFinanceDetailList: actions('getFinanceDetailList'),
            exportFinanceCountList: actions('exportFinanceCountList'),
            exportFinanceDetailList: actions('exportFinanceDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Revenue extends PureComponent {
    state = {
        isopen: false,
        time: null,
        rowIndex: 0,
        year: moment().year(),
        countPager: {
            pageNo: 1,
            pageSize: 10,
        },
        detailPager: {
            pageNo: 1,
            pageSize: 10,
        },
        yearDetail: '',
    }
    componentDidMount = () => {
        const year = this.state.year
        this.renderData({ year })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.financeCountList !== nextProps.financeCountList) {
            const [first] = nextProps.financeCountList.list
            if (first) {
                this.renderDetailData(first.year) //默认获取选中第一条数据的详情
            }
        }
    }
    renderData = params => {
        console.log('sdfds')
        const { countPager } = this.state
        const { getFinancialStatus, getFinanceCountList } = this.props
        getFinancialStatus(params)
        getFinanceCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = year => {
        this.setState({ yearDetail: year })
        this.props.getFinanceDetailList({
            year,
            ...this.state.detailPager,
            pageNo: 1,
        })
    }
    setRowClassName = (_, index) => {
        return index === this.state.rowIndex ? 'row-active' : ''
    }
    handlePanelChange = value => {
        if (value.year() > moment().year()) {
            message.info('选择的年份不能大于当前年份')
        } else {
            this.setState({
                time: value,
                isopen: false,
                year: value.year(),
            })
            this.renderData({ year: value.year() })
        }
    }
    handleOpenChange = status => {
        if (status) {
            this.setState({ isopen: true })
        } else {
            this.setState({ isopen: false })
        }
    }
    // 园区营收统计-数量列表的pageNo改变
    onChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize,
                pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getFinanceCountList(parm)
    }
    // 园区营收统计-数量列表的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getFinanceCountList(parm)
    }
    // 园区营收统计-详情列表的pageNo改变
    onDetailPageChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        const year = this.state.yearDetail
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getFinanceDetailList(parm)
    }
    // 园区营收统计-详情列表的pageSize改变
    onDetailChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.yearDetail
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getFinanceDetailList(parm)
    }
    //导出数量列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportFinanceCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportFinanceCountList({
                year: year,
            })
        }
    }
    //导出详情列表
    exportTableDetail = flag => {
        const year = this.state.yearDetail
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            this.props.exportFinanceDetailList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportFinanceDetailList({
                year: year,
            })
        }
    }
    render() {
        const { countPager, detailPager } = this.state
        const { financialStatus, financeCountList, financeDetailList } = this.props
        return (
            <Card title="园区营收统计" bordered={false} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: '30px', top: '15px' }}>
                    <b>选择年份：</b>
                    <DatePicker
                        value={this.state.time}
                        open={this.state.isopen}
                        mode="year"
                        placeholder="请选择年份"
                        format="YYYY"
                        onOpenChange={this.handleOpenChange}
                        onPanelChange={this.handlePanelChange}
                    />
                </div>
                <div style={{ height: '400px', marginTop: '30px' }}>
                    <LineChart data={financialStatus} />
                </div>
                <div style={{ position: 'absolute', right: '10px', margin: '20px' }}>
                    <Button
                        type="primary"
                        onClick={() => this.exportTable(0)}
                        style={{ marginRight: '20px' }}
                    >
                        导出当前页
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.exportTable(1)}
                        style={{ marginRight: '10px' }}
                    >
                        导出全部
                    </Button>
                </div>
                <Alert
                    message={`共${financeCountList.totalCount || 0}项`}
                    type="info"
                    showIcon
                    style={{ marginTop: '70px' }}
                />
                <div style={{ marginTop: '10px' }}>
                    <Table
                        dataSource={financeCountList.list}
                        columns={columnsCount}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: financeCountList.totalCount,
                            onShowSizeChange: this.onDetailChange,
                            onChange: this.onDetailPageChange,
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    this.setState({
                                        rowIndex: index,
                                    })
                                    this.renderDetailData(record.year)
                                }, // 点击行
                            }
                        }}
                    />
                </div>
                <div style={{ position: 'absolute', right: '30px' }}>
                    <Button
                        type="primary"
                        onClick={() => this.exportTableDetail(0)}
                        style={{ marginRight: '20px' }}
                    >
                        导出当前页
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.exportTableDetail(1)}
                        style={{ marginRight: '10px' }}
                    >
                        导出全部
                    </Button>
                </div>
                <Alert
                    message={`共${financeDetailList.totalCount || 0}项`}
                    type="info"
                    showIcon
                    style={{ marginTop: '50px' }}
                />
                <div style={{ marginTop: '10px' }}>
                    <Table
                        columns={columnsDetail}
                        dataSource={financeDetailList.list}
                        pagination={{
                            current: detailPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: financeDetailList.totalCount,
                            onShowSizeChange: this.onDetailChange,
                            onChange: this.onDetailPageChange,
                        }}
                    />
                </div>
            </Card>
        )
    }
}
export default Revenue
