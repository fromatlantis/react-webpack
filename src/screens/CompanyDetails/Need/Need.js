/**
 * 企服首页/企业详情==> Need 企业需求
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Form } from 'antd'
import styles from '../CompanyDetails.module.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../redux/agencyRequire'

class Need extends PureComponent {
    componentWillReceiveProps(nextProps) {
        if (this.props.BasicInfoDetial !== nextProps.BasicInfoDetial) {
            //console.log('dsf', nextProps.BasicInfoDetial)
            if (nextProps.BasicInfoDetial.name) {
                this.props.getDemandList({ enterpriseName: nextProps.BasicInfoDetial.name })
            }
        }
    }
    render() {
        return (
            <Fragment>
                <div className={styles.detailCard}>
                    <div className={styles.titleChip}>
                        <div>
                            <span className={styles.divider}>|</span>
                            <span className={styles.title}>企业需求</span>
                        </div>
                        <div />
                    </div>
                    <Table
                        bordered={true} //边框
                        pagination={false} //分页器
                        rowKey={(record, index) => `complete${record.id}${index}`}
                        columns={[
                            {
                                title: '序号',
                                dataIndex: 'key',
                                key: 'key',
                                align: 'center',
                                render: (text, record, index) => <span>{index + 1}</span>,
                            },
                            {
                                title: '供应商类型',
                                dataIndex: 'category',
                                key: 'category',
                                align: 'center',
                            },
                            {
                                title: '发起人',
                                dataIndex: 'contract',
                                key: 'contract',
                                align: 'center',
                            },
                            {
                                title: '发起时间',
                                dataIndex: 'requestTime',
                                key: 'requestTime',
                                align: 'center',
                            },
                            {
                                title: '状态',
                                dataIndex: 'processStatus',
                                key: 'processStatus',
                                align: 'center',
                                render: (text, record) => (
                                    <div>
                                        <span>
                                            {text === '0'
                                                ? '已下单'
                                                : text === '1'
                                                ? '已办理'
                                                : '已完成'}
                                        </span>
                                    </div>
                                ),
                            },
                        ]}
                        dataSource={this.props.demandList}
                    />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        demandList: state.agencyRequire.demandList,
        BasicInfoDetial: state.companyDetails.BasicInfoDetial,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDemandList: actions('getDemandList'),
        },
        dispatch,
    )
}
export default Form.create()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Need),
)
