import React, { PureComponent, Fragment } from 'react'
import { Alert, Button, Card, DatePicker, Table, Tooltip, message } from 'antd'
import { PieChart } from 'components/Charts'
import moment from 'moment'
import styles from '../Stats.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/knowledgeRight'

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
        width: '90px',
        fixed: 'left',
    },
    {
        title: '专利名称',
        dataIndex: 'patentName',
        key: 'patentName',
        align: 'center',
        width: '120px',
        render: patentName => (
            <Tooltip placement="right" title={patentName}>
                {patentName.length > 5 ? patentName.substring(0, 5) + '...' : patentName}
            </Tooltip>
        ),
    },
    {
        title: '专利类型',
        dataIndex: 'patentType',
        key: 'patentType',
        align: 'center',
        width: '120px',
        // render: patentType => (
        //     <Tooltip placement="right" title={patentType}>
        //         {patentType.length > 6 ? patentType.substring(0, 6) + '...' : patentType}
        //     </Tooltip>
        // ),
    },
    {
        title: '申请号',
        dataIndex: 'appnumber',
        key: 'appnumber',
        align: 'center',
        width: '100px',
        // render: appnumber => (
        //     <Tooltip placement="right" title={appnumber}>
        //         {appnumber.length > 10 ? appnumber.substring(0, 10) + '...' : appnumber}
        //     </Tooltip>
        // ),
    },
    {
        title: '申请日期',
        dataIndex: 'applicationTime',
        key: 'applicationTime',
        align: 'center',
        width: '120px',
    },
    {
        title: '授权日期',
        dataIndex: 'impowerDate',
        key: 'impowerDate',
        align: 'center',
        width: '120px',
    },
    {
        title: '专利发明人',
        dataIndex: 'inventor',
        key: 'inventor',
        align: 'center',
        width: '120px',
        render: inventor => (
            <Tooltip placement="right" title={inventor}>
                {inventor.length > 5 ? inventor.substring(0, 5) + '...' : inventor}
            </Tooltip>
        ),
    },
    {
        title: '专利申请人',
        dataIndex: 'applicantname',
        key: 'applicantname',
        align: 'center',
        width: '120px',
        render: applicantname => (
            <Tooltip placement="right" title={applicantname}>
                {applicantname.length > 5 ? applicantname.substring(0, 5) + '...' : applicantname}
            </Tooltip>
        ),
    },
    {
        title: '专利代理机构',
        dataIndex: 'agency',
        key: 'agency',
        align: 'center',
        width: '120px',
        render: agency => (
            <Tooltip placement="right" title={agency}>
                {agency.length > 5 ? agency.substring(0, 5) + '...' : agency}
            </Tooltip>
        ),
    },
    {
        title: '公开（公告号）',
        dataIndex: 'pubnumber',
        key: 'pubnumber',
        align: 'center',
        width: '120px',
    },
    {
        title: '专利说明',
        dataIndex: 'abstracts',
        key: 'abstracts',
        align: 'center',
        width: '200px',
        render: agency => (
            <Tooltip placement="right" title={agency}>
                {agency.length > 8 ? agency.substring(0, 8) + '...' : agency}
            </Tooltip>
        ),
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
const mapStateToProps = state => {
    return {
        knowledgeRightList: state.knowledgeRight.knowledgeRightList.map(item => ({
            name: item.name,
            value: item.count,
        })),
        knowledgeRightCountList: state.knowledgeRight.knowledgeRightCountList,
        trademarkDetailList: state.knowledgeRight.trademarkDetailList,
        patentDetailList: state.knowledgeRight.patentDetailList,
        softwareCopyrightDetailList: state.knowledgeRight.softwareCopyrightDetailList,
        productTrademarkDetailList: state.knowledgeRight.productTrademarkDetailList,
        websiteDetailList: state.knowledgeRight.websiteDetailList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getKnowledgeRightDistribute: actions('getKnowledgeRightDistribute'),
            getKnowledgeRightCountList: actions('getKnowledgeRightCountList'),
            exportKnowledgeRightCountList: actions('exportKnowledgeRightCountList'),
            getTrademarkDetailList: actions('getTrademarkDetailList'), //商标
            exportTrademarkDetailList: actions('exportTrademarkDetailList'),
            getPatentDetailList: actions('getPatentDetailList'), //专利
            exportPatentDetailList: actions('exportPatentDetailList'),
            getSoftwareCopyrightDetailList: actions('getSoftwareCopyrightDetailList'), //软件著作权
            exportSoftwareCopyrightDetailList: actions('exportSoftwareCopyrightDetailList'),
            getProductTrademarkDetailList: actions('getProductTrademarkDetailList'), //作品著作权
            exportProductTrademarkDetailList: actions('exportProductTrademarkDetailList'),
            getWebsiteDetailList: actions('getWebsiteDetailList'), //网站域名
            exportWebsiteDetailList: actions('exportWebsiteDetailList'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Rights extends PureComponent {
    state = {
        isopen: false,
        time: null,
        rowIndex: 0,
        type: '',
        year: moment().year(),
        columns: '',
        countPager: {
            pageNo: 1,
            pageSize: 10,
        },
        detailPager: {
            pageNo: 1,
            pageSize: 10,
        },
    }
    componentDidMount() {
        const year = this.state.year
        this.renderData({ year })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.knowledgeRightCountList !== nextProps.knowledgeRightCountList) {
            const [first] = nextProps.knowledgeRightCountList.list
            if (first) {
                this.renderDetailData(first.type) //默认获取选中第一条数据的详情
                this.setState({ type: first.type })
            }
        }
    }
    renderData = params => {
        const { countPager } = this.state
        const { getKnowledgeRightDistribute, getKnowledgeRightCountList } = this.props
        getKnowledgeRightDistribute(params)
        getKnowledgeRightCountList({
            ...params,
            ...countPager,
        })
    }
    renderDetailData = type => {
        const year = this.state.year
        if (type === '商标') {
            this.setState({ columns: markColumns })
            this.props.getTrademarkDetailList({
                year,
                ...this.state.detailPager,
                pageNo: 1,
            })
        } else if (type === '专利') {
            this.setState({ columns: patentColumns })
            this.props.getPatentDetailList({
                year,
                ...this.state.detailPager,
                pageNo: 1,
            })
        } else if (type === '软件著作权') {
            this.setState({ columns: softwareColumns })
            this.props.getSoftwareCopyrightDetailList({
                year,
                ...this.state.detailPager,
                pageNo: 1,
            })
        } else if (type === '作品著作权') {
            this.setState({ columns: productColumns })
            this.props.getProductTrademarkDetailList({
                year,
                ...this.state.detailPager,
                pageNo: 1,
            })
        } else if (type === '网站域名') {
            this.setState({ columns: websiteColumns })
            this.props.getWebsiteDetailList({
                year,
                ...this.state.detailPager,
                pageNo: 1,
            })
        }
    }
    getData = type => {
        if (type === '商标') {
            return this.props.trademarkDetailList
        } else if (type === '专利') {
            return this.props.patentDetailList
        } else if (type === '软件著作权') {
            return this.props.softwareCopyrightDetailList
        } else if (type === '作品著作权') {
            return this.props.productTrademarkDetailList
        } else if (type === '网站域名') {
            return this.props.websiteDetailList
        }
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
    // 知识产权 数量列表的pageNo改变
    onChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize,
                pageNo,
            },
        })
        const year = this.state.year
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        this.props.getKnowledgeRightCountList(parm)
    }
    // 知识产权 数量列表的pageSize改变
    onShowSizeChange = (pageNo, pageSize) => {
        this.setState({
            countPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        const year = this.state.year
        let parm = { pageNo: 1, pageSize: pageSize, year }
        this.props.getKnowledgeRightCountList(parm)
    }
    // 知识产权 详情列表的pageNo改变
    onDetailPageNoChange = (pageNo, pageSize) => {
        const type = this.state.type
        const year = this.state.year
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: pageNo,
            },
        })
        let parm = { pageNo: pageNo, pageSize: pageSize, year }
        if (type === '商标') {
            this.props.getTrademarkDetailList(parm)
        } else if (type === '专利') {
            this.props.getPatentDetailList(parm)
        } else if (type === '软件著作权') {
            this.props.getSoftwareCopyrightDetailList(parm)
        } else if (type === '作品著作权') {
            this.props.getProductTrademarkDetailList(parm)
        } else if (type === '网站域名') {
            this.props.getWebsiteDetailList(parm)
        }
    }
    // 企业资质详情的pageSize改变
    onDetailPageSizeChange = (pageNo, pageSize) => {
        const type = this.state.type
        const year = this.state.year
        this.setState({
            detailPager: {
                pageSize: pageSize,
                pageNo: 1,
            },
        })
        let parm = { pageNo: 1, pageSize: pageSize, year }
        if (type === '商标') {
            this.props.getTrademarkDetailList(parm)
        } else if (type === '专利') {
            this.props.getPatentDetailList(parm)
        } else if (type === '软件著作权') {
            this.props.getSoftwareCopyrightDetailList(parm)
        } else if (type === '作品著作权') {
            this.props.getProductTrademarkDetailList(parm)
        } else if (type === '网站域名') {
            this.props.getWebsiteDetailList(parm)
        }
    }
    // 导出
    //导出数量列表
    exportTable = flag => {
        const year = this.state.year
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.countPager
            this.props.exportKnowledgeRightCountList({
                year: year,
                pageNo: pageNo,
                pageSize: pageSize,
            })
        } else if (flag === 1) {
            this.props.exportKnowledgeRightCountList({
                year: year,
            })
        }
    }
    // 导出详情列表
    exportTableDetail = flag => {
        const year = this.state.year
        const type = this.state.type
        if (flag === 0) {
            const { pageNo, pageSize } = this.state.detailPager
            if (type === '商标') {
                this.props.exportTrademarkDetailList({
                    year: year,
                    pageNo: pageNo,
                    pageSize: pageSize,
                })
            } else if (type === '专利') {
                this.props.exportPatentDetailList({
                    year: year,
                    pageNo: pageNo,
                    pageSize: pageSize,
                })
            } else if (type === '软件著作权') {
                this.props.exportSoftwareCopyrightDetailList({
                    year: year,
                    pageNo: pageNo,
                    pageSize: pageSize,
                })
            } else if (type === '作品著作权') {
                this.props.exportProductTrademarkDetailList({
                    year: year,
                    pageNo: pageNo,
                    pageSize: pageSize,
                })
            } else if (type === '网站域名') {
                this.props.exportWebsiteDetailList({
                    year: year,
                    pageNo: pageNo,
                    pageSize: pageSize,
                })
            }
        } else if (flag === 1) {
            if (type === '商标') {
                this.props.exportTrademarkDetailList({
                    year: year,
                })
            } else if (type === '专利') {
                this.props.exportPatentDetailList({
                    year: year,
                })
            } else if (type === '软件著作权') {
                this.props.exportSoftwareCopyrightDetailList({
                    year: year,
                })
            } else if (type === '作品著作权') {
                this.props.exportProductTrademarkDetailList({
                    year: year,
                })
            } else if (type === '网站域名') {
                this.props.exportWebsiteDetailList({
                    year: year,
                })
            }
        }
    }
    render() {
        const { countPager, detailPager, type } = this.state
        const { knowledgeRightList, knowledgeRightCountList } = this.props
        return (
            <Fragment>
                <Card
                    title="知识产权统计"
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
                        <PieChart data={knowledgeRightList} />
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
                        message={`共${knowledgeRightCountList.totalCount || 0}项`}
                        type="info"
                        showIcon
                        style={{ marginBottom: '15px' }}
                    />
                    <Table
                        dataSource={knowledgeRightCountList.list}
                        columns={columns}
                        rowClassName={this.setRowClassName}
                        pagination={{
                            current: countPager.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '20', '30'],
                            total: knowledgeRightCountList.totalCount,
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onChange,
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    this.setState({
                                        rowIndex: index,
                                        type: record.type,
                                    })
                                    this.renderDetailData(record.type)
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
                                onClick={() => this.exportTableDetail(0)}
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
                    {this.getData(type) ? (
                        <Alert
                            message={`共${this.getData(type).totalCount || 0}项`}
                            type="info"
                            showIcon
                            style={{ marginBottom: '15px' }}
                        />
                    ) : null}
                    {this.getData(type) ? (
                        <Table
                            dataSource={this.getData(type).list}
                            columns={this.state.columns}
                            scroll={{ x: 1350 }}
                            pagination={{
                                current: detailPager.pageNo,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                pageSizeOptions: ['10', '20', '30'],
                                total: this.getData(type) ? this.getData(type).totalCount : 0,
                                onShowSizeChange: this.onDetailPageSizeChange,
                                onChange: this.onDetailPageNoChange,
                            }}
                        />
                    ) : null}
                </Card>
            </Fragment>
        )
    }
}
export default Rights
