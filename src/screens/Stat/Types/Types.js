import React, { PureComponent } from 'react'
import { Alert, Button, DatePicker, Table } from 'antd'
import { BarChart } from 'components/Charts'
import theme from 'Theme'
// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from 'reduxDir/statTypes'
const { RangePicker } = DatePicker
@connect(
    state => ({
        chargeType: state.statTypes.chargeType
            .map(item => ({
                name: item.type,
                value: item.count,
            }))
            .reverse(),
        typeCount: state.statTypes.typeCount,
        searchParams: state.statTypes.searchParams,
        typeDetailList: state.statTypes.typeDetailList,
        detailSearchParams: state.statTypes.detailSearchParams,
    }),
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getChargeTypeDistribute: actions('getChargeTypeDistribute'),
                getChargeTypeCountList: actions('getChargeTypeCountList'),
                exportChargeTypeCountList: actions('exportChargeTypeCountList'),
                getChargeTypeDetailList: actions('getChargeTypeDetailList'),
                exportChargeTypeDetailList: actions('exportChargeTypeDetailList'),
            },
            dispatch,
        )
    },
)
class Types extends PureComponent {
    state = {
        range: [],
    }
    componentDidMount() {
        this.props.getChargeTypeDistribute()
        this.props.getChargeTypeCountList()
    }
    //  初始化详细信息
    componentWillReceiveProps(nextProps) {
        if (this.props.typeCount !== nextProps.typeCount) {
            const {
                list: [first],
            } = nextProps.typeCount
            if (first) {
                const [beginDate, endDate] = this.state.range
                this.props.getChargeTypeDetailList({
                    beginDate: beginDate && beginDate.format('YYYY.MM.DD'),
                    endDate: endDate && endDate.format('YYYY.MM.DD'),
                    type: first.type,
                })
            }
        }
    }

    // 分页
    onPageNoChange = pageNo => {
        this.props.getChargeTypeCountList({ pageNo })
    }
    onShowSizeChange = (_, pageSize) => {
        this.props.getChargeTypeCountList({ pageNo: 1, pageSize })
    }
    changeDate = range => {
        this.setState({ range })
        const [beginDate, endDate] = range
        this.props.getChargeTypeDistribute({
            beginDate: beginDate && beginDate.format('YYYY.MM.DD'),
            endDate: endDate && endDate.format('YYYY.MM.DD'),
        })
        this.props.getChargeTypeCountList({
            beginDate: beginDate && beginDate.format('YYYY.MM.DD'),
            endDate: endDate && endDate.format('YYYY.MM.DD'),
        })
    }
    exportCurrent = () => {
        const [beginDate, endDate] = this.state.range
        const {
            searchParams: { pageNo, pageSize },
        } = this.props
        this.props.exportChargeTypeCountList({
            beginDate: beginDate && beginDate.format('YYYY.MM.DD'),
            endDate: endDate && endDate.format('YYYY.MM.DD'),
            pageNo,
            pageSize,
        })
    }
    exportAll = () => {
        const [beginDate, endDate] = this.state.range
        this.props.exportChargeTypeCountList({
            beginDate: beginDate ? beginDate.format('YYYY.MM.DD') : '',
            endDate: endDate ? endDate.format('YYYY.MM.DD') : '',
        })
    }
    //详细信息
    getDetail = type => {
        const [beginDate, endDate] = this.state.range
        const {
            detailSearchParams: { pageNo, pageSize },
        } = this.props
        this.props.getChargeTypeDetailList({
            beginDate: beginDate && beginDate.format('YYYY.MM.DD'),
            endDate: endDate && endDate.format('YYYY.MM.DD'),
            pageNo: 1,
            pageSize,
            type,
        })
    }
    // 分页
    onDetailNoChange = pageNo => {
        this.props.getChargeTypeDetailList({ pageNo })
    }
    onDetailSizeChange = (_, pageSize) => {
        this.props.getChargeTypeDetailList({ pageNo: 1, pageSize })
    }
    exportDetailCurrent = () => {
        const [beginDate, endDate] = this.state.range
        const {
            detailSearchParams: { pageNo, pageSize, type },
        } = this.props
        this.props.exportChargeTypeDetailList({
            beginDate: beginDate && beginDate.format('YYYY.MM.DD'),
            endDate: endDate && endDate.format('YYYY.MM.DD'),
            pageNo,
            pageSize,
            type,
        })
    }
    exportDetailAll = () => {
        const [beginDate, endDate] = this.state.range
        const {
            detailSearchParams: { type },
        } = this.props
        this.props.exportChargeTypeDetailList({
            beginDate: beginDate ? beginDate.format('YYYY.MM.DD') : '',
            endDate: endDate ? endDate.format('YYYY.MM.DD') : '',
            type,
        })
    }
    render() {
        const {
            chargeType,
            typeCount,
            searchParams,
            typeDetailList,
            detailSearchParams,
        } = this.props
        return (
            <div className={theme.card}>
                <div className={theme.title}>
                    <b>选择时间：</b>
                    <RangePicker onChange={this.changeDate} />
                </div>
                <div className={theme.content}>
                    <div style={{ height: 360, display: 'flex' }}>
                        <BarChart direction="row" title="费用类型统计" data={chargeType} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                        <Alert style={{ flex: 1 }} message={`共${typeCount.totalCount || 0}项`} />
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
                        dataSource={typeCount.list}
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
                            total: typeCount.totalCount,
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
                                    this.getDetail(record.type)
                                }, // 点击行
                            }
                        }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
                        <Alert
                            style={{ flex: 1 }}
                            message={`共${typeDetailList.totalCount || 0}项`}
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
                        dataSource={typeDetailList.list}
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
                            total: typeDetailList.totalCount,
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
export default Types
