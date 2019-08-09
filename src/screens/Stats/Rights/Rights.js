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

// 知识产权统计-数量列表
const columns = [
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
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
// 知识产权统计-详情列表-商标
const markColumns = [
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '商标名称',
        dataIndex: 'tmName',
        key: 'tmName',
        align: 'center',
    },
    {
        title: '商标类型',
        dataIndex: 'intCls',
        key: 'intCls',
        align: 'center',
    },
    {
        title: '注册号',
        dataIndex: 'regNo',
        key: 'regNo',
        align: 'center',
    },
    {
        title: '申请时间',
        dataIndex: 'appDate',
        key: 'appDate',
        align: 'center',
    },
    {
        title: '公司',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '申请进度',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
    },
]
// 知识产权统计-详情列表-专利
const patentColumns = [
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '专利名称',
        dataIndex: 'patentName',
        key: 'patentName',
        align: 'center',
    },
    {
        title: '专利类型',
        dataIndex: 'patentType',
        key: 'patentType',
        align: 'center',
    },
    {
        title: '申请号',
        dataIndex: 'appnumber',
        key: 'appnumber',
        align: 'center',
    },
    {
        title: '申请日期',
        dataIndex: 'applicationTime',
        key: 'applicationTime',
        align: 'center',
    },
    {
        title: '授权日期',
        dataIndex: 'impowerDate',
        key: 'impowerDate',
        align: 'center',
    },
    {
        title: '专利发明人',
        dataIndex: 'inventor',
        key: 'inventor',
        align: 'center',
    },
    {
        title: '专利申请人',
        dataIndex: 'applicantname',
        key: 'applicantname',
        align: 'center',
    },
    {
        title: '专利代理机构',
        dataIndex: 'agency',
        key: 'agency',
        align: 'center',
    },
    {
        title: '公开（公告号）',
        dataIndex: 'pubnumber',
        key: 'pubnumber',
        align: 'center',
    },
    {
        title: '专利说明',
        dataIndex: 'abstracts',
        key: 'abstracts',
        align: 'center',
    },
]
// 知识产权统计-详情列表-软件著作权
const softwareColumns = [
    {
        title: '著作权名称',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: '简称',
        dataIndex: 'simplename',
        key: 'simplename',
        align: 'center',
    },
    {
        title: '登记号',
        dataIndex: 'regnum',
        key: 'regnum',
        align: 'center',
    },
    {
        title: '登记日期',
        dataIndex: 'regtime',
        key: 'regtime',
        align: 'center',
    },
    {
        title: '分类号',
        dataIndex: 'catnum',
        key: 'catnum',
        align: 'center',
    },
]
// 知识产权统计-详情列表-作品著作权
const productColumns = [
    {
        title: '著作权名称',
        dataIndex: 'fullname',
        key: 'fullname',
    },
    {
        title: '著作权类别',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
    },
    {
        title: '登记号',
        dataIndex: 'regnum',
        key: 'regnum',
        align: 'center',
    },
    {
        title: '著作权人',
        dataIndex: 'authorNationality',
        key: 'authorNationality',
        align: 'center',
    },
    {
        title: '登记日期',
        dataIndex: 'regtime',
        key: 'regtime',
        align: 'center',
    },
    {
        title: '完成创作时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
        align: 'center',
    },
]
// 知识产权统计-详情列表-网站域名
const websiteColumns = [
    {
        title: '主办单位/域名/网站',
        dataIndex: 'ym',
        key: 'ym',
    },
    {
        title: '主办单位性质',
        dataIndex: 'companyType',
        key: 'companyType',
        align: 'center',
    },
    {
        title: '备案号',
        dataIndex: 'liscense',
        key: 'liscense',
        align: 'center',
    },
    {
        title: '审核时间',
        dataIndex: 'examineDate',
        key: 'examineDate',
        align: 'center',
    },
    {
        title: '网站首页',
        dataIndex: 'webSite',
        key: 'webSite',
        align: 'center',
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
class Rights extends PureComponent {
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
                    title="知识产权统计"
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
                        message={`共${0}项`}
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
                        message={`共${0}项`}
                        type="info"
                        showIcon
                        style={{ marginBottom: '15px' }}
                    />
                    <Table
                        dataSource={[]}
                        columns={patentColumns}
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
export default Rights
