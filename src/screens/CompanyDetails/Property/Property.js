/**
 * 企服首页（企服管理）/企业详情==> Property 知识产权
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Steps, Button, Tooltip } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions } from '../../../redux/companyDetails'
import moment from 'moment'
import styles from '../CompanyDetails.module.css'

const Step = Steps.Step

@connect(
    state => {
        return {
            TrademarkList: state.companyDetails.TrademarkList, //商标信息列表
            PatentList: state.companyDetails.PatentList, //专利列表
            SoftwareCopyrightList: state.companyDetails.SoftwareCopyrightList, //软件著作权列表
            ProductTrademarkList: state.companyDetails.ProductTrademarkList, //产品著作权列表
            WebsiteRecordsList: state.companyDetails.WebsiteRecordsList, //网站备案列表
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getTrademarkList: actions('getTrademarkList'),
                getPatentList: actions('getPatentList'),
                getSoftwareCopyrightList: actions('getSoftwareCopyrightList'),
                getProductTrademarkList: actions('getProductTrademarkList'),
                getWebsiteRecordsList: actions('getWebsiteRecordsList'),
            },
            dispatch,
        )
    },
)
class Property extends PureComponent {
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
        if (company_id) {
            this.setState({ company_id })
            //商标信息
            this.props.getTrademarkList({ companyId: company_id, limit: 5 })
            //专利信息
            this.props.getPatentList({ companyId: company_id, limit: 3 })
            //软件著作权
            this.props.getSoftwareCopyrightList({ companyId: company_id, limit: 5 })
            //作品著作权
            this.props.getProductTrademarkList({ companyId: company_id, limit: 5 })
            //网站域名
            this.props.getWebsiteRecordsList({ companyId: company_id, limit: 5 })
        }
    }
    paginationCon = num => {
        let shu = this.state.paginationShu
        shu[num] = true
        this.setState({ paginationShu: shu })
    }
    render() {
        const { company_id, paginationShu } = this.state
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="property:1"
                        title={<span style={{ color: '#1890ff' }}>商标信息</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getTrademarkList({ companyId: company_id })
                                        this.paginationCon(0)
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
                            pagination={paginationShu[0]} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '商标名称',
                                    dataIndex: 'tmName',
                                    key: 'tmName',
                                    align: 'center',
                                },
                                {
                                    title: '国际分类',
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
                                    title: '状态',
                                    dataIndex: 'category',
                                    key: 'category',
                                    align: 'center',
                                },
                                {
                                    title: '申请时间',
                                    dataIndex: 'appDate',
                                    key: 'appDate',
                                    align: 'center',
                                    render: appDate => (
                                        <span>
                                            {moment(parseInt(appDate)).format('YYYY-MM-DD')}
                                        </span>
                                    ),
                                },
                                // {
                                //     title: '公司',
                                //     dataIndex: 'applicantCn',
                                //     key: 'applicantCn',
                                //     align: 'center',
                                // },
                                {
                                    title: '申请进度',
                                    dataIndex: 'status',
                                    key: 'status',
                                    align: 'center',
                                },
                                {
                                    title: '申请人',
                                    dataIndex: 'applicantCn',
                                    key: 'applicantCn',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.TrademarkList}
                        />
                    </Card>
                    <Card
                        id="property:2"
                        title={<span style={{ color: '#1890ff' }}>专利信息</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getPatentList({ companyId: company_id })
                                        this.paginationCon(1)
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
                            pagination={paginationShu[1]} //分页器
                            scroll={{ x: 1800 }}
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '专利名称',
                                    dataIndex: 'patentName',
                                    key: 'patentName',
                                    align: 'center',
                                    fixed: 'left',
                                    width: 200,
                                },
                                {
                                    title: '申请号',
                                    dataIndex: 'appnumber',
                                    key: 'appnumber',
                                    align: 'center',
                                    width: 200,
                                },
                                {
                                    title: '申请日期',
                                    dataIndex: 'applicationTime',
                                    key: 'applicationTime',
                                    align: 'center',
                                    width: 200,
                                },
                                {
                                    title: '专利发明人',
                                    dataIndex: 'inventor',
                                    key: 'inventor',
                                    align: 'center',
                                    width: 200,
                                },
                                {
                                    title: '专利申请人',
                                    dataIndex: 'applicantName',
                                    key: 'applicantName',
                                    align: 'center',
                                    width: 200,
                                },
                                {
                                    title: '专利类型',
                                    dataIndex: 'patentType',
                                    key: 'patentType',
                                    align: 'center',
                                    width: 200,
                                },
                                {
                                    title: '专利代理机构',
                                    dataIndex: 'agency',
                                    key: 'agency',
                                    align: 'center',
                                    width: 200,
                                },
                                {
                                    title: '公开（公告）号',
                                    dataIndex: 'pubnumber',
                                    key: 'pubnumber',
                                    align: 'center',
                                    width: 200,
                                },
                                // {
                                //     title: '法律状态',
                                //     dataIndex: 'jigou',
                                //     key: 'jigou',
                                //     align: 'center',
                                //     // width: '15%',
                                //     // render: jigou => (
                                //     //     <Steps direction="vertical" size="small" current={0}>
                                //     //         {jigou.map((item, i) => {
                                //     //             return (
                                //     //                 <Step
                                //     //                     key={i}
                                //     //                     title={item.time}
                                //     //                     description={item.str}
                                //     //                 />
                                //     //             )
                                //     //         })}
                                //     //     </Steps>
                                //     // ),
                                // },
                                {
                                    title: '专利说明',
                                    dataIndex: 'abstracts',
                                    key: 'abstracts',
                                    align: 'center',
                                    width: 200,
                                    render: abstracts => {
                                        return (
                                            <Tooltip placement="left" title={abstracts}>
                                                <span>{abstracts.substring(0, 26)}...</span>
                                            </Tooltip>
                                        )
                                    },
                                },
                            ]}
                            dataSource={this.props.PatentList}
                            // dataSource={[
                            //     {
                            //         jigou: [
                            //             { time: '2019-04-03', str: '授权' },
                            //             { time: '2019-04-05', str: '审查生效' },
                            //         ],
                            //     },
                            // ]}
                        />
                    </Card>
                    <Card
                        id="property:3"
                        title={<span style={{ color: '#1890ff' }}>软件著作权</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getSoftwareCopyrightList({
                                            companyId: company_id,
                                        })
                                        this.paginationCon(2)
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
                            pagination={paginationShu[2]} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '著作权名称',
                                    dataIndex: 'fullname',
                                    key: 'fullname',
                                    align: 'center',
                                },
                                {
                                    title: '著作权人',
                                    dataIndex: 'authorNationality',
                                    key: 'authorNationality',
                                    align: 'center',
                                },
                                {
                                    title: '简称',
                                    dataIndex: 'simplename',
                                    key: 'simplename',
                                    align: 'center',
                                },
                                {
                                    title: '登记日期',
                                    dataIndex: 'regtime',
                                    key: 'regtime',
                                    align: 'center',
                                    render: regtime => (
                                        <span>
                                            {moment(parseInt(regtime)).format('YYYY-MM-DD')}
                                        </span>
                                    ),
                                },
                                {
                                    title: '登记号',
                                    dataIndex: 'regnum',
                                    key: 'regnum',
                                    align: 'center',
                                },
                                {
                                    title: '分类号',
                                    dataIndex: 'catnum',
                                    key: 'catnum',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.SoftwareCopyrightList}
                        />
                    </Card>
                    <Card
                        id="property:4"
                        title={<span style={{ color: '#1890ff' }}>作品著作权</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getProductTrademarkList({
                                            companyId: company_id,
                                        })
                                        this.paginationCon(3)
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
                            pagination={paginationShu[3]} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '著作权名称',
                                    dataIndex: 'fullname',
                                    key: 'fullname',
                                    align: 'center',
                                },
                                {
                                    title: '著作权类别',
                                    dataIndex: 'type',
                                    key: 'type',
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
                                    title: '登记号',
                                    dataIndex: 'regnum',
                                    key: 'duess',
                                    align: 'center',
                                },
                                {
                                    title: '完成创作时间',
                                    dataIndex: 'finishTime',
                                    key: 'finishTime',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.ProductTrademarkList}
                        />
                    </Card>
                    <Card
                        id="property:5"
                        title={<span style={{ color: '#1890ff' }}>网站域名</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getWebsiteRecordsList({ companyId: company_id })
                                        this.paginationCon(4)
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
                            pagination={paginationShu[4]} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '主办单位/域名/网站',
                                    dataIndex: 'ym',
                                    key: 'ym',
                                    align: 'center',
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
                                    title: '网站首页',
                                    dataIndex: 'webSite',
                                    key: 'webSite',
                                    align: 'center',
                                },
                                {
                                    title: '审核时间',
                                    dataIndex: 'examineDate',
                                    key: 'examineDate',
                                    align: 'center',
                                },
                                {
                                    title: '创建时间',
                                    dataIndex: 'd',
                                    key: 'd',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.WebsiteRecordsList}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default Property
