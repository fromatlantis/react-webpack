import React, { PureComponent } from 'react'
import { Alert, Button, DatePicker, Table } from 'antd'
import { BarChart } from 'components/Charts'
import { YearPicker } from 'components'
import moment from 'moment'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/statSettle'
const { RangePicker } = DatePicker
@connect(
    state => ({
        squareUpStatus: state.statTypes.squareUpStatus,
        settleCount: state.statTypes.typeCount,
        searchParams: state.statTypes.searchParams,
        settleDetailList: state.statTypes.typeDetailList,
        detailSearchParams: state.statTypes.detailSearchParams,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getSquareUpStatus: actions('getSquareUpStatus'),
                getSquareUpStatusCountList: actions('getSquareUpStatusCountList'),
                exportSquareUpStatusCountList: actions('exportSquareUpStatusCountList'),
                getSquareUpDetailList: actions('getSquareUpDetailList'),
                exportSquareUpDetailList: actions('exportSquareUpDetailList'),
            },
            dispatch,
        )
    },
)
class Settle extends PureComponent {
    state = {
        year: moment(),
    }
    componentDidMount() {
        const { year } = this.state
        this.props.getSquareUpStatus({ year: year.format('YYYY') })
        this.props.getSquareUpStatusCountList({ year: year.format('YYYY') })
    }
    //  初始化详细信息
    componentWillReceiveProps(nextProps) {
        if (this.props.settleCount !== nextProps.settleCount) {
            const {
                list: [first],
            } = nextProps.settleCount
            if (first) {
                this.props.getSquareUpDetailList({
                    month: first.month,
                })
            }
        }
    }
    // 分页
    onPageNoChange = pageNo => {
        this.props.getSquareUpStatusCountList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getSquareUpStatusCountList({ pageNo: 1, pageSize })
    }
    changeDate = year => {
        this.setState({ year })
        this.props.getSquareUpStatusCountList({
            year: year.format('YYYY'),
        })
    }
    exportCurrent = () => {
        const { year } = this.state
        const {
            searchParams: { pageNo, pageSize },
        } = this.props
        this.props.exportSquareUpStatusCountList({
            year: year && year.format('YYYY'),
            pageNo,
            pageSize,
        })
    }
    exportAll = () => {
        const { year } = this.state
        this.props.exportSquareUpStatusCountList({
            year: year ? year.format('YYYY') : '',
        })
    }
    //详细信息
    getDetail = month => {
        const {
            detailSearchParams: { pageNo, pageSize },
        } = this.props
        this.props.getSquareUpDetailList({
            pageNo: 1,
            pageSize,
            month,
        })
    }
    // 分页
    onDetailNoChange = pageNo => {
        this.props.getSquareUpDetailList({ pageNo })
    }
    onDetailSizeChange = (_, pageSize) => {
        this.props.getSquareUpDetailList({ pageNo: 1, pageSize })
    }
    exportDetailCurrent = () => {
        const {
            detailSearchParams: { pageNo, pageSize, month },
        } = this.props
        this.props.exportSquareUpDetailList({
            pageNo,
            pageSize,
            month,
        })
    }
    exportDetailAll = () => {
        const {
            detailSearchParams: { month },
        } = this.props
        this.props.exportSquareUpDetailList({
            month,
        })
    }
    render() {
        const {
            squareUpStatus,
            settleCount,
            searchParams,
            settleDetailList,
            detailSearchParams,
        } = this.props
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <b>选择时间：</b>
                    <YearPicker value={this.state.year} onChange={this.changeDate} />
                </div>
                <div className={theme.content}>
                    <div style={{ height: 360, display: 'flex' }}>
                        <BarChart direction="row" title="结清数统计" data={squareUpStatus} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                        <Alert style={{ flex: 1 }} message={`共${settleCount.totalCount || 0}项`} />
                        <Button
                            style={{ marginLeft: 15 }}
                            type="primary"
                            onClick={this.exportCurrent}
                        >
                            导出当前页
                        </Button>
                        <Button style={{ marginLeft: 15 }} type="primary" onClick={this.exportAll}>
                            导出全部
                        </Button>
                    </div>
                    <Table
                        style={{ background: '#fff' }}
                        dataSource={settleCount.list}
                        columns={[
                            {
                                title: '费用类型',
                                dataIndex: 'type',
                                key: 'type',
                            },
                            {
                                title: '数量总计',
                                dataIndex: 'totalCount',
                                key: 'totalCount',
                            },
                            {
                                title: '当前时间数量',
                                dataIndex: 'currentCount',
                                key: 'currentCount',
                            },
                            {
                                title: '当期类型占比',
                                dataIndex: 'ratio',
                                key: 'ratio',
                            },
                        ]}
                        pagination={{
                            hideOnSinglePage: true,
                            total: settleCount.totalCount,
                            current: searchParams.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            onShowSizeChange: this.onShowSizeChange,
                            onChange: this.onPageNoChange,
                        }}
                        onRow={record => {
                            return {
                                onClick: event => {
                                    this.getDetail(record.month)
                                }, // 点击行
                            }
                        }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                        <Alert
                            style={{ flex: 1 }}
                            message={`共${settleDetailList.totalCount || 0}项`}
                        />
                        <Button
                            style={{ marginLeft: 15 }}
                            type="primary"
                            onClick={this.exportDetailCurrent}
                        >
                            导出当前页
                        </Button>
                        <Button
                            style={{ marginLeft: 15 }}
                            type="primary"
                            onClick={this.exportDetailAll}
                        >
                            导出全部
                        </Button>
                    </div>
                    <Table
                        style={{ background: '#fff' }}
                        dataSource={settleDetailList.list}
                        columns={[
                            {
                                title: '费用类型',
                                dataIndex: 'type',
                                key: 'type',
                            },
                            {
                                title: '楼栋',
                                dataIndex: 'building',
                                key: 'building',
                            },
                            {
                                title: '房号',
                                dataIndex: 'room',
                                key: 'room',
                            },
                            {
                                title: '企业名称',
                                dataIndex: 'customerName',
                                key: 'customerName',
                            },
                            {
                                title: '收款所属期',
                                dataIndex: 'realReceiveDate',
                                key: 'realReceiveDate',
                            },
                            {
                                title: '收款日期',
                                dataIndex: 'receiveDate',
                                key: 'receiveDate',
                            },
                            {
                                title: '实收款金额',
                                dataIndex: 'realAmount',
                                key: 'realAmount',
                            },
                        ]}
                        pagination={{
                            hideOnSinglePage: true,
                            total: settleDetailList.totalCount,
                            current: detailSearchParams.pageNo,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['10', '15', '20'],
                            onShowSizeChange: this.onDetailSizeChange,
                            onChange: this.onDetailNoChange,
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default Settle
