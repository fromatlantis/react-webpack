/**
 * 企服首页/企业详情==> OtherMes 其他信息
 */
import React, { PureComponent, Fragment } from 'react'
import { Card, Table, Button } from 'antd'
import styles from '../CompanyDetails.module.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../../redux/companyDetails'

@connect(
    state => {
        return {
            otherInfoList: state.companyDetails.otherInfoList, //指定企业投资图谱
        }
    },
    dispatch => {
        return bindActionCreators(
            {
                getOtherInfoList: actions('getOtherInfoList'),
            },
            dispatch,
        )
    },
)
class OtherMes extends PureComponent {
    componentDidMount() {
        let company_id = this.props.match
            ? this.props.match.params.company_id
            : this.props.company_id
        if (company_id) {
            this.props.getOtherInfoList(company_id)
        }
    }
    render() {
        const { otherInfoList } = this.props
        return (
            <Fragment>
                <div className={styles.messageCard}>
                    <Card
                        id="otherMes"
                        title={<span style={{ color: '#1890ff' }}>其他信息</span>}
                        // extra={<Button type="link">展开更多>></Button>}
                        className={styles.cardSty}
                    >
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
                                    title: '提出人',
                                    dataIndex: 'submitterName',
                                    key: 'submitterName',
                                    align: 'center',
                                },
                                {
                                    title: '提出时间',
                                    dataIndex: 'createTime',
                                    key: 'createTime',
                                    align: 'center',
                                },
                                {
                                    title: '信息内容',
                                    dataIndex: 'content',
                                    key: 'content',
                                    align: 'center',
                                },
                            ]}
                            dataSource={otherInfoList}
                        />
                    </Card>
                </div>
            </Fragment>
        )
    }
}
export default OtherMes
