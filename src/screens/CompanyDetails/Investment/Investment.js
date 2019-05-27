/**
 * 企服首页（企服管理）/企业详情==> Investment 投资关系
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
            InvestmentAbroadList: state.companyDetails.InvestmentAbroadList, //对外投资列表
            InvestmentEventList: state.companyDetails.InvestmentEventList, //投资事件列表
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getInvestmentAbroadList: actions('getInvestmentAbroadList'),
                getInvestmentEventList: actions('getInvestmentEventList'),
            },
            dispatch,
        )
    },
)
class Investment extends PureComponent {
    state = {
        //企业id
        company_id: '',
    }
    //生命周期
    componentDidMount = () => {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        if (company_id) {
            this.setState({ company_id })
            //对外投资
            this.props.getInvestmentAbroadList({ companyId: company_id, limit: 5 })
            //投资事件
            this.props.getInvestmentEventList({ companyId: company_id, limit: 5 })
        }
    }
    render() {
        const { company_id } = this.state
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="Investment:1"
                        title={<span style={{ color: '#1890ff' }}>投资事件</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getInvestmentEventList({ companyId: company_id })
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
                                    title: '投资公司名称',
                                    dataIndex: 'organizationName',
                                    key: 'organizationName',
                                    align: 'center',
                                },
                                {
                                    title: '轮次',
                                    dataIndex: 'lunci',
                                    key: 'lunci',
                                    align: 'center',
                                },
                                {
                                    title: '投资时间',
                                    dataIndex: 'tzdate',
                                    key: 'tzdate',
                                    align: 'center',
                                    render: tzdate => (
                                        <span>{moment(parseInt(tzdate)).format('YYYY-MM-DD')}</span>
                                    ),
                                },
                                {
                                    title: '业务范围',
                                    dataIndex: 'yewu',
                                    key: 'yewu',
                                    align: 'center',
                                },
                                {
                                    title: '投资数额',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '股权机构',
                                    dataIndex: 'd',
                                    key: 'd',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.InvestmentEventList}
                        />
                    </Card>
                    <Card
                        id="Investment:2"
                        title={<span style={{ color: '#1890ff' }}>对外投资</span>}
                        extra={
                            company_id && (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        this.props.getInvestmentAbroadList({
                                            companyId: company_id,
                                        })
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
                                    title: '被投资公司名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '被投资法定代表人',
                                    dataIndex: 'legalPersonName',
                                    key: 'legalPersonName',
                                    align: 'center',
                                },
                                {
                                    title: '注册资本',
                                    dataIndex: 'regCapital',
                                    key: 'regCapital',
                                    align: 'center',
                                },
                                {
                                    title: '投资数额(万)',
                                    dataIndex: 'amount',
                                    key: 'amount',
                                    align: 'center',
                                },
                                {
                                    title: '出资比例',
                                    dataIndex: 'percent',
                                    key: 'percent',
                                    align: 'center',
                                },
                                {
                                    title: '成立日期',
                                    dataIndex: 'estiblishTime',
                                    key: 'estiblishTime',
                                    align: 'center',
                                    render: estiblishTime => (
                                        <span>
                                            {moment(parseInt(estiblishTime)).format('YYYY-MM-DD')}
                                        </span>
                                    ),
                                },
                                {
                                    title: '状态',
                                    dataIndex: 'regStatus',
                                    key: 'regStatus',
                                    align: 'center',
                                },
                            ]}
                            dataSource={this.props.InvestmentAbroadList}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default Investment
