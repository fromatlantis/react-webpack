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
            InvestmentAbroadList: state.companyDetails.InvestmentAbroadList.map(item => {
                item.estiblishTime = moment(parseInt(item.estiblishTime)).format('YYYY-MM-DD') //将毫秒数格式转换的方法
                return item
            }), //对外投资列表
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                push: push,
                getInvestmentAbroadList: actions('getInvestmentAbroadList'),
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
        this.setState({ company_id })
        //对外投资
        this.props.getInvestmentAbroadList({ companyId: company_id, limit: 5 })
    }
    render() {
        const { company_id } = this.state
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="Investment:1"
                        title={<span style={{ color: '#1890ff' }}>投资事件</span>}
                        extra={<Button type="link">展开更多>></Button>}
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
                            rowKey={(record, index) => `complete${record.id}${index}`}
                            columns={[
                                {
                                    title: '投资公司名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                },
                                {
                                    title: '执行事务合伙人',
                                    dataIndex: 'age',
                                    key: 'age',
                                    align: 'center',
                                },
                                {
                                    title: '注册资本',
                                    dataIndex: 'address',
                                    key: 'address',
                                    align: 'center',
                                },
                                {
                                    title: '投资数额',
                                    dataIndex: 'money',
                                    key: 'money',
                                    align: 'center',
                                },
                                {
                                    title: '投资比例',
                                    dataIndex: 'desii',
                                    key: 'desii',
                                    align: 'center',
                                },
                            ]}
                            dataSource={[
                                {
                                    key: '1',
                                    name: 'XX公司',
                                    age: '张小明',
                                    address: '1亿美金',
                                    money: '5000万人民币',
                                    desii: '23.4%',
                                },
                                {
                                    key: '2',
                                    name: 'XX公司',
                                    age: '张小明',
                                    address: '1亿美金',
                                    money: '5000万人民币',
                                    desii: '23.4%',
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        id="Investment:2"
                        title={<span style={{ color: '#1890ff' }}>对外投资</span>}
                        extra={
                            <Button
                                type="link"
                                onClick={() => {
                                    this.props.getInvestmentAbroadList({ companyId: company_id })
                                }}
                            >
                                展开更多>>
                            </Button>
                        }
                        className={styles.cardSty}
                    >
                        <Table
                            bordered={true} //边框
                            pagination={false} //分页器
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
                                    title: '投资数额',
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
