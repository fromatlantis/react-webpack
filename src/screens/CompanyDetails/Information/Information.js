/**
 * 企服首页（企服管理）/企业详情==> Information 基本信息
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/companyDetails'
import moment from 'moment'
import styles from '../CompanyDetails.module.css'

@connect(
    state => {
        return {
            BaseInfoDetial: state.companyDetails.BaseInfoDetial, //工商信息
            RecentNews: state.companyDetails.RecentNews, //企业动态（新闻）
            FinancingList: state.companyDetails.FinancingList, //融资信息分页列表
            CoreTeamList: state.companyDetails.CoreTeamList, //核心人员的列表
            ProductInfoList: state.companyDetails.ProductInfoList, //主要产品的详情列表
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                queryBaseInfoDetial: actions('queryBaseInfoDetial'),
                getRecentNews: actions('getRecentNews'),
                getFinancingList: actions('getFinancingList'),
                getCoreTeamList: actions('getCoreTeamList'),
                getProductInfoList: actions('getProductInfoList'),
            },
            dispatch,
        )
    },
)
class Information extends PureComponent {
    state = {
        //企业id
        company_id: '',
    }
    //生命周期
    componentDidMount = () => {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        // 查看档案详情时没有company_id
        if (company_id) {
            this.setState({ company_id })
            //get工商信息
            this.props.queryBaseInfoDetial(company_id)
            //企业动态
            this.props.getRecentNews({ companyId: company_id, limit: 5 })
            //融资历程
            this.props.getFinancingList({ companyId: company_id, limit: 5 })
            //核心人员
            this.props.getCoreTeamList({ companyId: company_id, limit: 5 })
            //主要产品
            this.props.getProductInfoList({ companyId: company_id, limit: 5 })
        }
    }
    render() {
        const { company_id } = this.state
        const baseInfoDetial = this.props.BaseInfoDetial
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="information:1"
                        title={<span style={{ color: '#1890ff' }}>企业动态</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getRecentNews({ companyId: company_id })
                                    }}
                                >
                                    展开更多>>
                                </Button>
                            )
                        }
                        className={styles.cardSty}
                        // tabList={[{ key: '企业动态', tab: '企业动态' }]}
                    >
                        <Table
                            bordered={true} //边框
                            // pagination={false} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '标题',
                                    dataIndex: 'title',
                                    key: 'title',
                                    align: 'center',
                                },
                                {
                                    title: '新闻来源',
                                    dataIndex: 'website',
                                    key: 'website',
                                    align: 'center',
                                },
                                {
                                    title: '发布时间',
                                    dataIndex: 'time',
                                    key: 'time',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.RecentNews.resultList}
                        />
                    </Card>
                    <Card
                        id="information:2"
                        className={styles.cardSty}
                        tabList={[{ key: '工商信息', tab: '工商信息' }]}
                    >
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>法人</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.legalPersonName}
                                    </td>
                                    <td className={styles.tdleft}>注册资本</td>
                                    <td className={styles.tdright}>{baseInfoDetial.regCapital}</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>经营状态</td>
                                    <td className={styles.tdright}>{baseInfoDetial.regStatus}</td>
                                    <td className={styles.tdleft}>实缴资本</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.actualCapital}
                                    </td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>统一社会信用代码</td>
                                    <td className={styles.tdright}>{baseInfoDetial.creditCode}</td>
                                    <td className={styles.tdleft}>成立日期</td>
                                    <td className={styles.tdright}>
                                        {moment(parseInt(baseInfoDetial.estiblishTime)).format(
                                            'YYYY-MM-DD',
                                        )}
                                    </td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>工商注册号</td>
                                    <td className={styles.tdright}>{baseInfoDetial.regNumber}</td>
                                    <td className={styles.tdleft}>纳税人识别号</td>
                                    <td className={styles.tdright}>{baseInfoDetial.taxNumber}</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>公司类型</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.companyOrgType}
                                    </td>
                                    <td className={styles.tdleft}>组织机构代码</td>
                                    <td className={styles.tdright}>{baseInfoDetial.orgNumber}</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>核准日期</td>
                                    <td className={styles.tdright}>
                                        {moment(parseInt(baseInfoDetial.approvedTime)).format(
                                            'YYYY-MM-DD',
                                        )}
                                    </td>
                                    <td className={styles.tdleft}>所属行业</td>
                                    <td className={styles.tdright}>{baseInfoDetial.industry}</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>所属地区</td>
                                    <td className={styles.tdright}>北京市</td>
                                    <td className={styles.tdleft}>登记机关</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.regInstitute}
                                    </td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>曾用名</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.historyNames}
                                    </td>
                                    <td className={styles.tdleft}>英文名</td>
                                    <td className={styles.tdright}>{baseInfoDetial.property3}</td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>人员规模</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.staffNumRange}
                                    </td>
                                    <td className={styles.tdleft}>参保人数</td>
                                    <td className={styles.tdright}>
                                        {baseInfoDetial.socialStaffNum}
                                    </td>
                                </tr>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>企业地址</td>
                                    <td className={styles.tdright}>{baseInfoDetial.regLocation}</td>
                                    <td className={styles.tdleft}>营业期限</td>
                                    <td className={styles.tdright}>
                                        {moment(parseInt(baseInfoDetial.fromTime)).format(
                                            'YYYY-MM-DD',
                                        )}
                                        至
                                        {moment(parseInt(baseInfoDetial.toTime)).format(
                                            'YYYY-MM-DD',
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr className={styles.tabletr}>
                                    <td className={styles.tdleft}>经营范围</td>
                                    <td
                                        style={{
                                            width: '84%',
                                            border: '1px rgb(230, 235, 241) solid',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {baseInfoDetial.businessScope}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                    <Card
                        id="information:3"
                        title={<span style={{ color: '#1890ff' }}>融资历程</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getFinancingList({ companyId: company_id })
                                    }}
                                >
                                    展开更多>>
                                </Button>
                            )
                        }
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            // pagination={false} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '时间',
                                    dataIndex: 'sourceTime',
                                    key: 'sourceTime',
                                    align: 'center',
                                },
                                {
                                    title: '金额',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '投资方',
                                    dataIndex: 'investorName',
                                    key: 'investorName',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.FinancingList}
                        />
                    </Card>
                    <Card
                        id="information:4"
                        title={<span style={{ color: '#1890ff' }}>核心人员</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getCoreTeamList({ companyId: company_id })
                                    }}
                                >
                                    展开更多>>
                                </Button>
                            )
                        }
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            // pagination={false} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '姓名',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                    width: '30%',
                                },
                                {
                                    title: '职位',
                                    dataIndex: 'title',
                                    key: 'title',
                                    align: 'center',
                                    width: '30%',
                                },
                                {
                                    title: '介绍',
                                    dataIndex: 'description',
                                    key: 'description',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.CoreTeamList}
                        />
                    </Card>
                    <Card
                        id="information:5"
                        title={<span style={{ color: '#1890ff' }}>主要产品</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getProductInfoList({ companyId: company_id })
                                    }}
                                >
                                    展开更多>>
                                </Button>
                            )
                        }
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            // pagination={false} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '产品名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                    width: '20%',
                                },
                                {
                                    title: '产品介绍',
                                    dataIndex: 'brief',
                                    key: 'brief',
                                    align: 'center',
                                    width: '40%',
                                },
                                {
                                    title: '领域',
                                    dataIndex: 'classes',
                                    key: 'classes',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.ProductInfoList}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default Information
