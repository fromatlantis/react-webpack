import React, { PureComponent } from 'react'
import { Button, Skeleton, Table } from 'antd'
import styles from '../CompanyDetails.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/companyDetails'

const mapStateToProps = state => {
    return {
        revenue: state.companyDetails.revenue,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFinanceInfosList: actions('getFinanceInfosList'),
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
        company_id: '',
        pagination: false,
    }
    componentDidMount() {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        // 查看档案详情时没有company_id
        if (company_id) {
            this.setState({ company_id })
            this.props.getFinanceInfosList({ companyId: company_id, pageNo: 1, pageSize: 5 })
        }
    }
    render() {
        const columns = [
            {
                title: '年份',
                dataIndex: 'years',
                key: 'years',
            },
            {
                title: '更新日期',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '营业收入/元',
                dataIndex: 'operatingRevenue',
                key: 'operatingRevenue',
            },
            {
                title: '出口总额/元',
                dataIndex: 'grossExport',
                key: 'grossExport',
            },
            {
                title: '专利产品年产值/元',
                dataIndex: 'patentYearValue',
                key: 'patentYearValue',
            },
            {
                title: '研发费用/元',
                dataIndex: 'researchExpenditure',
                key: 'researchExpenditure',
            },
            {
                title: '上缴税金/元',
                dataIndex: 'taxes',
                key: 'taxes',
            },
            {
                title: '利润总额/元',
                dataIndex: 'totalProfit',
                key: 'totalProfit',
            },
            {
                title: '净利润/元',
                dataIndex: 'retainedProfits',
                key: 'retainedProfits',
            },
        ]
        const { revenue } = this.props
        const { company_id, pagination } = this.state
        return (
            <div className={styles.detailCard}>
                <div className={styles.titleChip}>
                    <div>
                        <span className={styles.divider}>|</span>
                        <span className={styles.title}>财务信息</span>
                    </div>
                    <div>
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.getFinanceInfosList({ companyId: company_id })
                                this.setState({ pagination: true })
                            }}
                        >
                            展开更多>>
                        </Button>
                    </div>
                </div>
                <Skeleton loading={revenue.list ? false : true} active avatar>
                    <Table
                        bordered
                        scroll={{ x: 1100 }}
                        dataSource={revenue.list}
                        columns={columns}
                        pagination={pagination}
                    />
                </Skeleton>
            </div>
        )
    }
}
export default Revenue
