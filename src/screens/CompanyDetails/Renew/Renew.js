/**
 * 企服首页/企业详情==> Property 更新记录
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button } from 'antd'
import styles from '../CompanyDetails.module.css'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../../redux/companyDetails'

@connect(
    state => {
        return {
            changesList: state.companyDetails.changesList,
            changeRecords: state.companyDetails.changeRecords,
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                getChangesList: actions('getChangesList'),
                companyChangeRecords: actions('companyChangeRecords'),
            },
            dispatch,
        )
    },
)
class Renew extends PureComponent {
    componentDidMount() {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        if (company_id) {
            this.props.getChangesList(company_id)
            this.props.companyChangeRecords(company_id)
        }
    }
    render() {
        const { changesList, changeRecords } = this.props
        return (
            <Fragment>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>更新消息</span>
                        </div>
                        <div />
                    </div>
                    <Table
                        bordered={true} //边框
                        //pagination={false} //分页器
                        columns={[
                            {
                                title: '序号',
                                dataIndex: 'key',
                                key: 'key',
                                align: 'center',
                                render: (text, record, index) => <span>{index + 1}</span>,
                            },
                            {
                                title: '更新项',
                                dataIndex: 'changeItem',
                                key: 'changeItem',
                                align: 'center',
                            },
                            {
                                title: '更新时间',
                                dataIndex: 'changeTime',
                                key: 'changeTime',
                                align: 'center',
                                render: changeTime => (
                                    <span>{moment(changeTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                                ),
                            },
                            {
                                title: '公司名称',
                                dataIndex: 'name',
                                key: 'name',
                                align: 'center',
                            },
                        ]}
                        dataSource={changesList}
                    />
                </div>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>历史记录</span>
                        </div>
                        <div />
                    </div>
                    <Table
                        bordered={true} //边框
                        // pagination={false} //分页器
                        columns={[
                            {
                                title: '序号',
                                dataIndex: 'key',
                                key: 'key',
                                align: 'center',
                                render: (text, record, index) => <span>{index + 1}</span>,
                            },
                            {
                                title: '变更日期',
                                dataIndex: 'changeTime',
                                key: 'changeTime',
                                align: 'center',
                                width: 120,
                            },
                            {
                                title: '变更项',
                                dataIndex: 'changeItem',
                                key: 'changeItem',
                                align: 'center',
                            },
                            {
                                title: '变更方式',
                                dataIndex: 'type',
                                key: 'type',
                                align: 'center',
                                render: () => <span>爬取信息</span>,
                                width: 100,
                            },
                            {
                                title: '变更前',
                                dataIndex: 'contentBefore',
                                key: 'contentBefore',
                                align: 'center',
                                render: contentBefore => (
                                    <span dangerouslySetInnerHTML={{ __html: contentBefore }} />
                                ),
                            },
                            {
                                title: '变更后',
                                dataIndex: 'contentAfter',
                                key: 'contentAfter',
                                align: 'center',
                                render: contentAfter => (
                                    <span dangerouslySetInnerHTML={{ __html: contentAfter }} />
                                ),
                            },
                        ]}
                        dataSource={changeRecords.items}
                    />
                </div>
            </Fragment>
        )
    }
}
export default Renew
