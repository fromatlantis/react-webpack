/**
 * 企服首页（企服管理）/企业详情==> Information 基本信息
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button, Descriptions } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/companyDetails'
import { actions as dictionaryActions } from 'reduxDir/dictionary'
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
            staff: state.companyDetails.staff,
            PROVINCE: state.dictionary.PROVINCE,
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
                getStaffEdusList: actions('getStaffEdusList'),
                getDictionary: dictionaryActions('getDictionary'),
            },
            dispatch,
        )
    },
)
class Information extends PureComponent {
    state = {
        //企业id
        company_id: '',
        paginationShu: [false, false, false, false, false],
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
            // 人员情况
            this.props.getStaffEdusList({ companyId: company_id, pageNo: 1, pageSize: 5 })
            this.props.getDictionary('PROVINCE')
        }
    }
    paginationCon = num => {
        // alert(num)
        let shu = this.state.paginationShu
        shu[num] = true
        this.setState({ paginationShu: shu })
    }
    render() {
        const { company_id, paginationShu } = this.state
        const baseInfoDetial = this.props.BaseInfoDetial
        const [province] = this.props.PROVINCE.filter(item => item.value === baseInfoDetial.base)
        return (
            <Fragment>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>企业动态</span>
                        </div>
                        <div>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.props.getRecentNews({ companyId: company_id })
                                    this.paginationCon(0)
                                }}
                            >
                                展开更多>>
                            </Button>
                        </div>
                    </div>
                    <Table
                        bordered={true} //边框
                        pagination={paginationShu[0]} //分页器
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
                </div>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>工商信息</span>
                        </div>
                        <div />
                    </div>
                    <Descriptions title="" bordered column={2}>
                        <Descriptions.Item label="法人">
                            {baseInfoDetial.legalPersonName}
                        </Descriptions.Item>
                        <Descriptions.Item label="注册资本">
                            {baseInfoDetial.regCapital}
                        </Descriptions.Item>
                        <Descriptions.Item label="经营状态">
                            {baseInfoDetial.regStatus}
                        </Descriptions.Item>
                        <Descriptions.Item label="实缴资本">
                            {baseInfoDetial.actualCapital}
                        </Descriptions.Item>
                        <Descriptions.Item label="统一社会信用代码">
                            {baseInfoDetial.creditCode}
                        </Descriptions.Item>
                        <Descriptions.Item label="成立日期">
                            {baseInfoDetial.estiblishTime &&
                                moment(parseInt(baseInfoDetial.estiblishTime)).format('YYYY-MM-DD')}
                        </Descriptions.Item>
                        <Descriptions.Item label="工商注册号">
                            {baseInfoDetial.regNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="纳税人识别号">
                            {baseInfoDetial.taxNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="公司类型">
                            {baseInfoDetial.companyOrgType}
                        </Descriptions.Item>
                        <Descriptions.Item label="组织机构代码">
                            {baseInfoDetial.orgNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="核准日期">
                            {baseInfoDetial.approvedTime &&
                                moment(parseInt(baseInfoDetial.approvedTime)).format('YYYY-MM-DD')}
                        </Descriptions.Item>
                        <Descriptions.Item label="所属行业">
                            {baseInfoDetial.industry}
                        </Descriptions.Item>
                        <Descriptions.Item label="所属地区">
                            {province && province.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="登记机关">
                            {baseInfoDetial.regInstitute}
                        </Descriptions.Item>
                        <Descriptions.Item label="曾用名">
                            {baseInfoDetial.historyNames}
                        </Descriptions.Item>
                        <Descriptions.Item label="英文名">
                            {baseInfoDetial.property3}
                        </Descriptions.Item>
                        <Descriptions.Item label="人员规模">
                            {baseInfoDetial.staffNumRange}
                        </Descriptions.Item>
                        <Descriptions.Item label="参保人数">
                            {baseInfoDetial.socialStaffNum}
                        </Descriptions.Item>
                        <Descriptions.Item label="企业地址">
                            {baseInfoDetial.regLocation}
                        </Descriptions.Item>
                        <Descriptions.Item label="营业期限">
                            {baseInfoDetial.fromTime &&
                                moment(parseInt(baseInfoDetial.fromTime)).format('YYYY-MM-DD')}
                            至
                            {baseInfoDetial.toTime &&
                                moment(parseInt(baseInfoDetial.toTime)).format('YYYY-MM-DD')}
                        </Descriptions.Item>
                        <Descriptions.Item label="经营范围" span={2}>
                            {baseInfoDetial.businessScope}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>融资历程</span>
                        </div>
                        <div>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.props.getFinancingList({ companyId: company_id })
                                    this.paginationCon(1)
                                }}
                            >
                                展开更多>>
                            </Button>
                        </div>
                    </div>
                    <Table
                        bordered={true} //边框
                        pagination={paginationShu[1]} //分页器
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        columns={[
                            {
                                title: '时间',
                                dataIndex: 'date',
                                key: 'date',
                                align: 'center',
                                render: date => <span>{moment(date).format('YYYY-MM-DD')}</span>,
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
                </div>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>核心人员</span>
                        </div>
                        <div>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.props.getCoreTeamList({ companyId: company_id })
                                    this.paginationCon(2)
                                }}
                            >
                                展开更多>>
                            </Button>
                        </div>
                    </div>
                    <Table
                        bordered={true} //边框
                        pagination={paginationShu[2]} //分页器
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
                </div>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>人员情况</span>
                        </div>
                        <div>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.props.getStaffEdusList({ companyId: company_id })
                                    this.paginationCon(3)
                                }}
                            >
                                展开更多>>
                            </Button>
                        </div>
                    </div>
                    <Table
                        bordered={true} //边框
                        pagination={paginationShu[3]} //分页器
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        scroll={{ x: 1300 }}
                        columns={[
                            {
                                title: '年份',
                                dataIndex: 'years',
                                key: 'years',
                            },
                            {
                                title: '就业人员',
                                dataIndex: 'employment',
                                key: 'employment',
                            },
                            {
                                title: '博士',
                                dataIndex: 'doctoral',
                                key: 'doctoral',
                            },
                            {
                                title: '入选区、本市和国家相关人才计划的人员',
                                dataIndex: 'talents',
                                key: 'talents',
                            },
                            {
                                title: '留学生人员',
                                dataIndex: 'overseasStudent',
                                key: 'overseasStudent',
                            },
                            {
                                title: '本科及以上学历人员',
                                dataIndex: 'undergraduate',
                                key: 'undergraduate',
                            },
                            {
                                title: '大专及以上学历人员',
                                dataIndex: 'juniorCollege',
                                key: 'juniorCollege',
                            },
                            {
                                title: '本公司社保缴纳人员',
                                dataIndex: 'socialPay',
                                key: 'socialPay',
                            },
                            {
                                title: '更新日期',
                                dataIndex: 'updateTime',
                                key: 'updateTime',
                            },
                        ]}
                        dataSource={this.props.staff.list}
                    />
                </div>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>主要产品</span>
                        </div>
                        <div>
                            {company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getProductInfoList({ companyId: company_id })
                                        this.paginationCon(4)
                                    }}
                                >
                                    展开更多>>
                                </Button>
                            )}
                        </div>
                    </div>
                    <Table
                        bordered={true} //边框
                        pagination={paginationShu[4]} //分页器
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
                </div>
            </Fragment>
        )
    }
}
export default Information
