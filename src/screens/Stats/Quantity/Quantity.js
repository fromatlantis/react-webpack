import React, { PureComponent, Fragment } from 'react'
import { Divider, Button, Alert, Table, Tooltip, DatePicker, message } from 'antd'
import { BarChart } from 'components/Charts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'reduxDir/qualification'
import moment from 'moment'
import styles from '../Stats.module.css'

const columnsCount = [
    {
        title: '年份',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: '企业数量',
        dataIndex: 'totalCount',
        key: 'totalCount',
        align: 'center',
    },
    {
        title: '新增企业数量',
        dataIndex: 'currentCount',
        key: 'currentCount',
        align: 'center',
    },
    {
        title: '企业数量环比',
        dataIndex: 'chainRatio',
        key: 'chainRatio',
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
        title: '法人',
        dataIndex: 'legalPersonName',
        key: 'legalPersonName',
        align: 'center',
        render: legalPersonName => (
            <Tooltip placement="right" title={legalPersonName}>
                {legalPersonName.length > 4
                    ? legalPersonName.substring(0, 4) + '...'
                    : legalPersonName}
            </Tooltip>
        ),
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
        title: '企业地址',
        dataIndex: 'regLocation',
        key: 'regLocation',
        align: 'center',
        render: regLocation => (
            <Tooltip placement="right" title={regLocation}>
                {regLocation.length > 20 ? regLocation.substring(0, 20) + '...' : regLocation}
            </Tooltip>
        ),
    },
]
const mapStateToProps = state => {
    return {
        introducedCompanyCount: state.qualification.introducedCompanyCount.map(item => ({
            name: item.year,
            value: item.count,
        })),
        companyCountList: state.qualification.companyCountList,
        companyDetailList: state.qualification.companyDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getIntroducedCompanyCount: actions('getIntroducedCompanyCount'),
            getCompanyCountCountList: actions('getCompanyCountCountList'),
            getCompanyCountDetailList: actions('getCompanyCountDetailList'),
            exportCompanyCountCountList: actions('exportCompanyCountCountList'),
            exportCompanyCountDetailList: actions('exportCompanyCountDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Quantity extends PureComponent {
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
        if (this.props.companyCountList !== nextProps.companyCountList) {
            const [first] = nextProps.companyCountList.list
            if (first) {
                this.renderDetailData(first.year) //默认获取选中第一条数据的详情
            }
        }
    }
    renderData = params => {
        const { countPager } = this.state
        const { getIntroducedCompanyCount, getCompanyCountCountList } = this.props
        getIntroducedCompanyCount(params)
        getCompanyCountCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = year => {
        this.setState({ yearDetail: year })
        this.props.getCompanyCountDetailList({
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

    // 企业数量数量列表的pageNo改变
    onChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize,
                pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getCompanyCountCountList(parm)
    }
    // 企业数量数量列表的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getCompanyCountCountList(parm)
    }
    // 企业数量详情列表的pageNo改变
    onDetailPageNoChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        const year = this.state.yearDetail
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getCompanyCountDetailList(parm)
    }
    // 企业数量详情列表的pageSize改变
    onDetailPageSizeChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.yearDetail
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getCompanyCountDetailList(parm)
    }
    //导出基本列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportCompanyCountCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportCompanyCountCountList({
                year: year,
            })
        }
    }
    //导出详情列表
    exportTableDetail = flag => {
        const year = this.state.yearDetail
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            this.props.exportCompanyCountDetailList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportCompanyCountDetailList({
                year: year,
            })
        }
    }
    render() {
        const { countPager, detailPager } = this.state
        const { introducedCompanyCount, companyCountList, companyDetailList } = this.props
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
                        企业数量统计
                    </div>
                    <div className={`${styles.card} ${styles.distance}`}>
                        <BarChart data={introducedCompanyCount} />
                    </div>
                    <div style={{ display: 'flex' }} className={styles.distance}>
                        <Alert
                            message={`共${companyCountList.totalCount || 0}项`}
                            type="info"
                            showIcon
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="primary"
                            onClick={() => this.exportTable(0)}
                            style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
                        >
                            导出当前页
                        </Button>
                        <Button type="primary" onClick={() => this.exportTable(1)}>
                            导出全部
                        </Button>
                    </div>
                    <Table
                        className={`${styles.tableTop} ${styles.distance}`}
                        dataSource={companyCountList.list}
                        columns={columnsCount}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: companyCountList.totalCount,
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
                    <div style={{ display: 'flex' }} className={styles.distance}>
                        <Alert
                            message={`共${companyDetailList.totalCount || 0}项`}
                            type="info"
                            showIcon
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="primary"
                            onClick={() => this.exportTableDetail(0)}
                            style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
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
                        columns={columnsDetail}
                        dataSource={companyDetailList.list}
                        pagination={{
                            current: detailPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: companyDetailList.totalCount,
                            onShowSizeChange: this.onDetailPageSizeChange,
                            onChange: this.onDetailPageNoChange,
                        }}
                    />
                </div>
            </Fragment>
        )
    }
}
export default Quantity
