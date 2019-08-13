import React, { PureComponent } from 'react'
import { Card, Col, Divider, Row, Statistic, DatePicker, message } from 'antd'
import { BarChart, LineChart, PieChart } from 'components/Charts'
// import RevenueChart from './RevenueChart'
import RevenueCharts from '../Revenue/RevenueCharts'
import styles from '../Stats.module.css'
// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/statOverview'
import moment from 'moment'

const mapStateToProps = state => {
    return {
        companyInfosCount: state.statOverview.companyInfosCount,
        financingTrend: state.statOverview.financingTrend
            .map(item => ({
                name: item.year,
                value: item.totalAmount,
            }))
            .reverse(),
        introducedCompanyCount: state.statOverview.introducedCompanyCount.map(item => ({
            name: item.year,
            value: item.count,
        })),
        knowledgeRight: state.statOverview.knowledgeRight.map(item => ({
            name: item.name,
            value: item.count,
        })),
        intelligenceCompanyCount: state.statOverview.intelligenceCompanyCount,
        staffDistribute: state.statOverview.staffDistribute.map(item => ({
            name: item.name,
            value: item.count,
        })),
        industryDistribute: state.statOverview.industryDistribute.map(item => ({
            name: item.name,
            value: item.count,
        })),
        financialStatus: state.statOverview.financialStatus,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getCompanyInfosCount: actions('getCompanyInfosCount'),
            getFinancingTrend: actions('getFinancingTrend'),
            getIntroducedCompanyCount: actions('getIntroducedCompanyCount'),
            getKnowledgeRightDistribute: actions('getKnowledgeRightDistribute'),
            getIntelligenceCompanyCount: actions('getIntelligenceCompanyCount'),
            getStaffDistribute: actions('getStaffDistribute'),
            getIndustryDistribute: actions('getIndustryDistribute'),
            getFinancialStatus: actions('getFinancialStatus'),
        },
        dispatch,
    )
}
@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class Overview extends PureComponent {
    state = {
        isopen: false,
        time: null,
        year: moment().year(),
    }
    componentDidMount() {
        this.renderData({ year: this.state.year })
    }
    renderData = params => {
        const {
            getCompanyInfosCount,
            getFinancingTrend,
            getIntroducedCompanyCount,
            getKnowledgeRightDistribute,
            getIntelligenceCompanyCount,
            getStaffDistribute,
            getIndustryDistribute,
            getFinancialStatus,
        } = this.props
        getCompanyInfosCount(params)
        getFinancingTrend(params)
        getIntroducedCompanyCount(params)
        getKnowledgeRightDistribute(params)
        getIntelligenceCompanyCount(params)
        getStaffDistribute(params)
        getIndustryDistribute(params)
        getFinancialStatus(params)
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
    render() {
        const {
            companyInfosCount,
            financingTrend,
            introducedCompanyCount,
            knowledgeRight,
            intelligenceCompanyCount,
            staffDistribute,
            industryDistribute,
            financialStatus,
        } = this.props
        return (
            <div className={styles.containerTotal}>
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
                <Row style={{ marginTop: '0.3rem' }} gutter={12}>
                    <Col span={16}>
                        <Card bordered={false}>
                            <div className={styles.dividerTitle}>
                                <Divider className={styles.dividerSty} type="vertical" />
                                企业分析
                            </div>
                            <div className={styles.nums}>
                                <div className={styles.viewBlue}>
                                    <p className={styles.figureBlue}>{companyInfosCount.company}</p>
                                    <p className={styles.character}>企业</p>
                                </div>
                                <div className={styles.viewBlue}>
                                    <p className={styles.figureBlue}>
                                        {companyInfosCount.settledCompany}
                                    </p>
                                    <p className={styles.character}>实驻企业</p>
                                </div>
                                <div className={styles.viewBlue}>
                                    <p className={styles.figureBlue}>
                                        {companyInfosCount.unsettledCompany}
                                    </p>
                                    <p className={styles.character}>虚拟企业</p>
                                </div>
                                <div className={styles.viewBlue}>
                                    <p className={styles.figureBlue}>{companyInfosCount.staff}</p>
                                    <p className={styles.character}>企业人数</p>
                                </div>
                            </div>
                            <div className={styles.nums}>
                                <div className={styles.viewPink}>
                                    <p className={styles.figurePink}>
                                        {companyInfosCount.totalKnowledgeRight}
                                    </p>
                                    <p className={styles.character}>知识产权</p>
                                </div>
                                <div className={styles.viewPink}>
                                    <p className={styles.figurePink}>
                                        {companyInfosCount.currentKnowledgeRight}
                                    </p>
                                    <p className={styles.character}>新增知识产权</p>
                                </div>
                                <div className={styles.viewPink}>
                                    <p className={styles.figurePink}>
                                        {companyInfosCount.totalPatent}
                                    </p>
                                    <p className={styles.character}>专利</p>
                                </div>
                                <div className={styles.viewPink}>
                                    <p className={styles.figurePink}>
                                        {companyInfosCount.currentPatent}
                                    </p>
                                    <p className={styles.character}>新增专利</p>
                                </div>
                            </div>
                            <Row>
                                <Col span={12} className={styles.card}>
                                    <div className={styles.title}>
                                        <Divider
                                            style={{ background: '#1890ff', width: '2px' }}
                                            type="vertical"
                                        />
                                        引进企业数量统计
                                    </div>
                                    <BarChart data={introducedCompanyCount} />
                                </Col>
                                <Col span={12} className={styles.card}>
                                    <div className={styles.title}>
                                        <Divider
                                            style={{ background: '#1890ff', width: '2px' }}
                                            type="vertical"
                                        />
                                        知识产权分布
                                    </div>
                                    <PieChart data={knowledgeRight} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <div className={styles.dividerTitle}>
                                <Divider className={styles.dividerSty} type="vertical" />
                                融资趋势
                            </div>
                            <div style={{ height: '230px', display: 'flex' }}>
                                <LineChart titleTop data={financingTrend} />
                            </div>
                        </Card>
                        <Card
                            bordered={false}
                            style={{ marginTop: '12px', height: '358px', paddingBottom: '0.3rem' }}
                        >
                            <div className={styles.dividerTitle}>
                                <Divider className={styles.dividerSty} type="vertical" />
                                企业资质
                            </div>
                            {intelligenceCompanyCount.map(item => (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: '0.2rem',
                                    }}
                                >
                                    <div>{item.name}</div>
                                    <div>{item.count}家</div>
                                </div>
                            ))}
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '12px' }} gutter={12}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <div className={styles.dividerTitle}>
                                <Divider className={styles.dividerSty} type="vertical" />
                                人才建设
                            </div>
                            <div className={styles.card}>
                                <PieChart name="circle" data={staffDistribute} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <div className={styles.dividerTitle}>
                                <Divider className={styles.dividerSty} type="vertical" />
                                行业分布
                            </div>
                            <div className={styles.card}>
                                <PieChart data={industryDistribute} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <div className={styles.dividerTitle}>
                                <Divider className={styles.dividerSty} type="vertical" />
                                营收和纳税情况
                            </div>
                            <div className={styles.card}>
                                <RevenueCharts data={financialStatus} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Overview
