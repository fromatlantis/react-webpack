import React, { PureComponent, Fragment } from 'react'
import { Button, Alert, Table, DatePicker, Divider, message } from 'antd'
import { BarChart } from 'components/Charts'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'reduxDir/qualification'
import moment from 'moment'
import styles from '../Stats.module.css'

const columnsCount = [
    {
        title: '资质名称',
        dataIndex: 'label',
        key: 'label',
    },
    {
        title: '累计数量',
        dataIndex: 'totalCount',
        key: 'totalCount',
        align: 'center',
    },
    {
        title: '占比',
        dataIndex: 'ratio',
        key: 'ratio',
        align: 'center',
    },
    {
        title: '当年新增数量',
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
const columnsDetail = [
    {
        title: '资质名称',
        dataIndex: 'label',
        key: 'label',
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
]
const mapStateToProps = state => {
    return {
        intelligenceCompanyCount: state.qualification.intelligenceCompanyCount.map(item => ({
            name: item.name,
            value: item.count,
        })),
        qualificationCountList: state.qualification.qualificationCountList,
        qualificationDetailList: state.qualification.qualificationDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getIntelligenceCompanyCount: actions('getIntelligenceCompanyCount'),
            getCompanyQualificationCountList: actions('getCompanyQualificationCountList'),
            getCompanyQualificationDetailList: actions('getCompanyQualificationDetailList'),
            exportCompanyQualificationCountList: actions('exportCompanyQualificationCountList'),
            exportCompanyQualificationDetailList: actions('exportCompanyQualificationDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Qualifications extends PureComponent {
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
        qualification: '',
    }
    componentDidMount = () => {
        const year = this.state.year
        this.renderData({ year })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.qualificationCountList !== nextProps.qualificationCountList) {
            const [first] = nextProps.qualificationCountList.list
            if (first) {
                this.renderDetailData(first.label) //默认获取选中第一条数据的详情
            }
        }
    }
    renderData = params => {
        const { countPager } = this.state
        const { getIntelligenceCompanyCount, getCompanyQualificationCountList } = this.props
        getIntelligenceCompanyCount({ ...params, limit: 5 })
        getCompanyQualificationCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = qualification => {
        this.setState({ qualification })
        const year = this.state.year
        this.props.getCompanyQualificationDetailList({
            qualification,
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
    // 企业资质列表的pageNo改变
    onChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize,
                pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getCompanyQualificationCountList(parm)
    }
    //企业资质列表的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getCompanyQualificationCountList(parm)
    }
    // 企业资质详情的pageNo改变
    onDetailPageNoChange = (pageNo, pageSize) => {
        const qualification = this.state.qualification
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year, qualification }
        this.props.getCompanyQualificationDetailList(parm)
    }
    // 企业资质详情的pageSize改变
    onDetailPageSizeChange = (pageNo, pageSize) => {
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const qualification = this.state.qualification
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year, qualification }
        this.props.getCompanyQualificationDetailList(parm)
    }
    //导出基本列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportCompanyQualificationCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportCompanyQualificationCountList({
                year: year,
            })
        }
    }
    //导出详情列表
    exportTableDetail = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            this.props.exportCompanyQualificationDetailList({
                qualification: this.state.qualification,
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportCompanyQualificationDetailList({
                qualification: this.state.qualification,
                year: year,
            })
        }
    }
    render() {
        const { countPager, detailPager } = this.state
        const {
            intelligenceCompanyCount,
            qualificationCountList,
            qualificationDetailList,
        } = this.props
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
                        企业资质统计
                    </div>
                    <div className={`${styles.card} ${styles.distance}`}>
                        <BarChart data={intelligenceCompanyCount} />
                    </div>
                    <div style={{ display: 'flex' }} className={styles.distance}>
                        <Alert
                            message={`共${qualificationCountList.totalCount || 0}项`}
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
                        dataSource={qualificationCountList.list}
                        columns={columnsCount}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            total: qualificationCountList.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
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
                            message={`共${qualificationDetailList.totalCount || 0}项`}
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
                        dataSource={qualificationDetailList.list}
                        pagination={{
                            current: detailPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '30'],
                            total: qualificationDetailList.totalCount,
                            onShowSizeChange: this.onDetailPageSizeChange,
                            onChange: this.onDetailPageNoChange,
                        }}
                    />
                </div>
            </Fragment>
        )
    }
}
export default Qualifications
