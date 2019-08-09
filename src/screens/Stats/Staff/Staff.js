import React, { PureComponent, Fragment } from 'react'
import { Alert, Button, Card, DatePicker, Table, message } from 'antd'
import { PieChart } from 'components/Charts'
import moment from 'moment'
import styles from '../Stats.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/parkStaff'

const columns = [
    {
        title: '学历',
        dataIndex: 'academic',
        key: 'academic',
    },
    {
        title: '人数',
        dataIndex: 'totalCount',
        key: 'totalCount',
        align: 'center',
    },
    {
        title: '当年新增人数',
        dataIndex: 'currentCount',
        key: 'currentCount',
        align: 'center',
    },
    {
        title: '环比',
        dataIndex: 'chainRatio',
        key: 'chainRatio',
        align: 'center',
    },
]
const detailColumns = [
    {
        title: '排名',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        render: (text, record, index) => <span key={text}>{index + 1}</span>,
    },
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '学历',
        dataIndex: 'academic',
        key: 'academic',
        align: 'center',
    },
    {
        title: '人数',
        dataIndex: 'staffCount',
        key: 'staffCount',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '所属行业',
        dataIndex: 'industry',
        key: 'industry',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '企业类型',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '引入时间',
        dataIndex: 'introduceTime',
        key: 'introduceTime',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
]
const mapStateToProps = state => {
    return {
        staffDistribute: state.parkStaff.staffDistribute.map(item => ({
            name: item.name,
            value: item.count,
        })),
        staffCountList: state.parkStaff.staffCountList,
        staffDetailList: state.parkStaff.staffDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getStaffDistribute: actions('getStaffDistribute'),
            getStaffCountList: actions('getStaffCountList'),
            getStaffDetailList: actions('getStaffDetailList'),
            exportStaffCountList: actions('exportStaffCountList'),
            exportStaffDetailList: actions('exportStaffDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Staff extends PureComponent {
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
        academic: '',
    }
    componentDidMount() {
        const year = this.state.year
        this.renderData({ year })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.staffCountList !== nextProps.staffCountList) {
            const [first] = nextProps.staffCountList.list
            if (first) {
                this.renderDetailData(first.academic) //默认获取选中第一条数据的详情
            }
        }
    }
    renderData = params => {
        const { countPager } = this.state
        const { getStaffDistribute, getStaffCountList } = this.props
        getStaffDistribute(params)
        getStaffCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = academic => {
        this.setState({ academic: academic })
        const year = this.state.year
        this.props.getStaffDetailList({
            academic,
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
    // 分页
    // 数量列表的pageNo改变
    onCountPageNoChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize,
                pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getStaffCountList(parm)
    }
    // 数量列表的pageSize改变
    onCountPageSizeChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getStaffCountList(parm)
    }
    // 详情列表的pageNo改变
    onDetailPageNoChange = (pageNo, pageSize) => {
        const academic = this.state.academic
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year, academic }
        this.props.getStaffDetailList(parm)
    }
    // 详情列表的pageSize改变
    onDetailPageSizeChange = (pageNo, pageSize) => {
        const academic = this.state.academic
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year, academic }
        this.props.getStaffDetailList(parm)
    }
    //导出基本列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportStaffCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportStaffCountList({
                year: year,
            })
        }
    }
    //导出详情列表
    exportTableDetail = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            this.props.exportStaffDetailList({
                academic: this.state.academic,
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportStaffDetailList({
                academic: this.state.academic,
                year: year,
            })
        }
    }
    render() {
        const { countPager, detailPager } = this.state
        const { staffDistribute, staffCountList, staffDetailList } = this.props
        return (
            <Fragment>
                <Card
                    title="园区人员统计"
                    bordered={false}
                    style={{ marginTop: '5px' }}
                    extra={
                        <Fragment>
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
                        </Fragment>
                    }
                >
                    <div className={styles.card}>
                        <PieChart name="circle" data={staffDistribute} />
                    </div>
                </Card>
                <Card
                    title="详细信息"
                    bordered={false}
                    extra={
                        <div>
                            <Button type="primary" size="small" onClick={() => this.exportTable(0)}>
                                导出当前页
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type="primary"
                                size="small"
                                onClick={() => this.exportTable(1)}
                            >
                                导出全部
                            </Button>
                        </div>
                    }
                >
                    <Alert
                        message={`共${staffCountList.totalCount || 0}项`}
                        type="info"
                        showIcon
                        style={{ marginBottom: '15px' }}
                    />
                    <Table
                        dataSource={staffCountList.list}
                        columns={columns}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: staffCountList.totalCount,
                            onShowSizeChange: this.onCountPageSizeChange,
                            onChange: this.onCountPageNoChange,
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    this.setState({
                                        rowIndex: index,
                                    })
                                    this.renderDetailData(record.academic)
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
                            <Button
                                type="primary"
                                size="small"
                                onClick={() => {
                                    this.exportTableDetail(0)
                                }}
                            >
                                导出当前页
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                type="primary"
                                size="small"
                                onClick={() => this.exportTableDetail(1)}
                            >
                                导出全部
                            </Button>
                        </div>
                    }
                >
                    <Alert
                        message={`共${staffDetailList.totalCount || 0}项`}
                        type="info"
                        showIcon
                        style={{ marginBottom: '15px' }}
                    />
                    <Table
                        dataSource={staffDetailList.list}
                        columns={detailColumns}
                        pagination={{
                            current: detailPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '30'],
                            total: staffDetailList.totalCount,
                            onShowSizeChange: this.onDetailPageSizeChange,
                            onChange: this.onDetailPageNoChange,
                        }}
                    />
                </Card>
            </Fragment>
        )
    }
}
export default Staff
