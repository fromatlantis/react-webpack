import React, { PureComponent } from 'react'
import { Card, Button, Alert, Table, DatePicker, message } from 'antd'
import { LineChart } from 'components/Charts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'reduxDir/revenueAndFinancing'
import moment from 'moment'

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
        title: '融资情况（元）',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        align: 'center',
    },
    {
        title: '新增融资（元）',
        dataIndex: 'currentAmount',
        key: 'currentAmount',
        align: 'center',
    },
    {
        title: '融资环比',
        dataIndex: 'chainRatio',
        key: 'chainRatio',
        align: 'center',
    },
]
const columnsDetail = [
    {
        title: '年份',
        dataIndex: 'year',
        key: 'year',
    },
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
        title: '引入时间',
        dataIndex: 'introduceTime',
        key: 'introduceTime',
        align: 'center',
    },
    {
        title: '融资情况（元）',
        dataIndex: 'money',
        key: 'money',
        align: 'center',
    },
]
const mapStateToProps = state => {
    return {
        financingTrend: state.revenueAndFinancing.financingTrend
            .map(item => ({
                name: item.year,
                value: item.totalAmount,
            }))
            .reverse(),
        financingHisCountList: state.revenueAndFinancing.financingHisCountList,
        financingHisDetailList: state.revenueAndFinancing.financingHisDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFinancingTrend: actions('getFinancingTrend'),
            getFinancingHisCountList: actions('getFinancingHisCountList'),
            getFinancingHisDetailList: actions('getFinancingHisDetailList'),
            exportFinancingHisCountList: actions('exportFinancingHisCountList'),
            exportFinancingHisDetailList: actions('exportFinancingHisDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Financing extends PureComponent {
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
        if (this.props.financingHisCountList !== nextProps.financingHisCountList) {
            const [first] = nextProps.financingHisCountList.list
            if (first) {
                this.renderDetailData(first.year) //默认获取选中第一条数据的详情
            }
        }
    }
    renderData = params => {
        const { countPager } = this.state
        const { getFinancingTrend, getFinancingHisCountList } = this.props
        getFinancingTrend(params)
        getFinancingHisCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = year => {
        this.setState({ yearDetail: year })
        this.props.getFinancingHisDetailList({
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
    // 融资情况统计-数量列表的pageNo改变
    onChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize,
                pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getFinancingHisCountList(parm)
    }
    // 融资情况统计-数量列表的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getFinancingHisCountList(parm)
    }
    // 融资情况统计-详情列表的pageNo改变
    onDetailPageNoChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        const year = this.state.yearDetail
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getFinancingHisDetailList(parm)
    }
    // 融资情况统计-详情列表的pageSize改变
    onDetailPageSizeChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.yearDetail
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getFinancingHisDetailList(parm)
    }
    //导出数量列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportFinancingHisCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportFinancingHisCountList({
                year: year,
            })
        }
    }
    //导出详情列表
    exportTableDetail = flag => {
        const year = this.state.yearDetail
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            this.props.exportFinancingHisDetailList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportFinancingHisDetailList({
                year: year,
            })
        }
    }
    render() {
        const { countPager, detailPager } = this.state
        const { financingTrend, financingHisCountList, financingHisDetailList } = this.props
        return (
            <Card title="融资情况统计" bordered={false} style={{ position: 'relative' }}>
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
                <div style={{ height: '400px' }}>
                    <LineChart titleTop styleFlge data={financingTrend} />
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
                    message={`共${financingHisCountList.totalCount || 0}项`}
                    type="info"
                    showIcon
                    style={{ marginTop: '70px' }}
                />
                <div style={{ marginTop: '10px' }}>
                    <Table
                        dataSource={financingHisCountList.list}
                        columns={columnsCount}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: financingHisCountList.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
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
                    message={`共${financingHisDetailList.totalCount || 0}项`}
                    type="info"
                    showIcon
                    style={{ marginTop: '50px' }}
                />
                <div style={{ marginTop: '10px' }}>
                    <Table
                        columns={columnsDetail}
                        dataSource={financingHisDetailList.list}
                        pagination={{
                            current: detailPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: financingHisDetailList.totalCount,
                            onShowSizeChange: this.onDetailPageSizeChange,
                            onChange: this.onDetailPageNoChange,
                        }}
                    />
                </div>
            </Card>
        )
    }
}
export default Financing
