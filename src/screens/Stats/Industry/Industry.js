import React, { PureComponent, Fragment } from 'react'
import { Alert, Button, Card, DatePicker, Table, Divider, message } from 'antd'
import { YearPicker } from 'components'
import { PieChart } from 'components/Charts'
import moment from 'moment'
import styles from '../Stats.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/parkStaff'
const columns = [
    {
        title: '行业类型',
        dataIndex: 'label',
        key: 'label',
    },
    {
        title: '企业数量',
        dataIndex: 'totalCount',
        key: 'totalCount',
        align: 'center',
    },
    {
        title: '本年新增企业数',
        dataIndex: 'currentCount',
        key: 'currentCount',
        align: 'center',
    },
    {
        title: '行业环比',
        dataIndex: 'chainRatio',
        key: 'chainRatio',
        align: 'center',
    },
]
const detailColumns = [
    {
        title: '行业类型',
        dataIndex: 'label',
        key: 'label',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '企业类型',
        dataIndex: 'category',
        key: 'category',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '所属行业',
        dataIndex: 'industy',
        key: 'industy',
        align: 'center',
        render: (text, record) => <span>{text ? text : '--'}</span>,
    },
    {
        title: '成立时间',
        dataIndex: 'estiblishTme',
        key: 'estiblishTme',
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
        industryDistribute: state.parkStaff.industryDistribute.map(item => ({
            name: item.name,
            value: item.count,
        })),
        industryCountList: state.parkStaff.industryCountList,
        industryDetailList: state.parkStaff.industryDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getIndustryDistribute: actions('getIndustryDistribute'),
            getIndustryCountList: actions('getIndustryCountList'),
            getIndustryDetailList: actions('getIndustryDetailList'),
            exportIndustryCountList: actions('exportIndustryCountList'),
            exportIndustryDetailList: actions('exportIndustryDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Industry extends PureComponent {
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
        industry: '',
    }
    componentDidMount() {
        const year = this.state.year
        this.renderData({ year })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.industryCountList !== nextProps.industryCountList) {
            const [first] = nextProps.industryCountList.list
            if (first) {
                this.renderDetailData(first.label) //默认获取选中第一条数据的详情
            }
        }
    }
    renderData = params => {
        const { countPager } = this.state
        const { getIndustryDistribute, getIndustryCountList } = this.props
        getIndustryDistribute(params)
        getIndustryCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = industry => {
        this.setState({ industry: industry })
        const year = this.state.year
        this.props.getIndustryDetailList({
            industry,
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
        this.props.getIndustryCountList(parm)
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
        this.props.getIndustryCountList(parm)
    }
    // 详情列表的pageNo改变
    onDetailPageNoChange = (pageNo, pageSize) => {
        const industry = this.state.industry
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year, industry }
        this.props.getIndustryDetailList(parm)
    }
    // 详情列表的pageSize改变
    onDetailPageSizeChange = (pageNo, pageSize) => {
        const industry = this.state.industry
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year, industry }
        this.props.getIndustryDetailList(parm)
    }
    //导出基本列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportIndustryCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportIndustryCountList({
                year: year,
            })
        }
    }
    //导出详情列表
    exportTableDetail = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            this.props.exportIndustryDetailList({
                industry: this.state.industry,
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportIndustryDetailList({
                industry: this.state.industry,
                year: year,
            })
        }
    }
    render() {
        const { countPager, detailPager } = this.state
        const { industryDistribute, industryCountList, industryDetailList } = this.props
        return (
            <Fragment>
                <div className={styles.selectYear}>
                    <b className={styles.yearStyle}>选择年份：</b>
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
                <div className={styles.rectangle}>
                    <div className={styles.titleFont}>
                        <Divider
                            style={{
                                width: '4px',
                                height: '24px',
                                background: 'rgba(64,152,255,1)',
                            }}
                            type="vertical"
                        />
                        园区行业统计
                    </div>
                    <div className={styles.card} style={{ paddingLeft: '0.4rem' }}>
                        <PieChart data={industryDistribute} />
                    </div>
                    <div style={{ display: 'flex' }} className={styles.distance}>
                        <Alert
                            message={`共${industryCountList.totalCount || 0}项`}
                            type="info"
                            showIcon
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="primary"
                            style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
                            onClick={() => this.exportTable(0)}
                        >
                            导出当前页
                        </Button>
                        <Button type="primary" onClick={() => this.exportTable(0)}>
                            导出全部
                        </Button>
                    </div>
                    <Table
                        className={`${styles.tableTop} ${styles.distance}`}
                        dataSource={industryCountList.list}
                        columns={columns}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '30'],
                            total: industryCountList.totalCount,
                            onShowSizeChange: this.onCountPageSizeChange,
                            onChange: this.onCountPageNoChange,
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    this.setState({
                                        rowIndex: index,
                                    })
                                    this.renderDetailData(record.label)
                                }, // 点击行
                            }
                        }}
                    />
                    <div style={{ display: 'flex' }} className={styles.distance}>
                        <Alert
                            message={`共${industryDetailList.totalCount || 0}项`}
                            type="info"
                            showIcon
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="primary"
                            style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
                            onClick={() => this.exportTableDetail(0)}
                        >
                            导出当前页
                        </Button>
                        <Button type="primary" onClick={() => this.exportTableDetail(1)}>
                            导出全部
                        </Button>
                    </div>
                    <Table
                        className={`${styles.tableTop} ${styles.distance}`}
                        style={{ paddingBottom: '0.4rem' }}
                        dataSource={industryDetailList.list}
                        columns={detailColumns}
                        pagination={{
                            current: detailPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '30'],
                            total: industryDetailList.totalCount,
                            onShowSizeChange: this.onDetailPageSizeChange,
                            onChange: this.onDetailPageNoChange,
                        }}
                    />
                </div>
            </Fragment>
        )
    }
}
export default Industry
